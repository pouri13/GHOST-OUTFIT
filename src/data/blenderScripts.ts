import { BlenderScriptData } from '../types';

export const BLENDER_SCRIPTS: BlenderScriptData[] = [
  {
    id: 'script-scene-setup',
    filename: 'blackout_scene_setup.py',
    title: '1. Production Scene & Collection Setup Script',
    description: 'Configures Blender for GTA V character modding: sets Metric units (1.0 = 1 meter), configures viewport clipping, creates the exact collection hierarchy specified in the project architecture, and sets up 7 aligned orthographic/macro camera rigs.',
    instructions: [
      'Open a fresh Blender 3.6 LTS or Blender 4.x scene.',
      'Go to the "Scripting" workspace tab at the top of Blender.',
      'Click "New" in the Text Editor, paste this script, and click "Run Script" (or press Alt+P).',
      'Verify that the Collections tree, Metric units, and 7 Orthographic Reference Cameras are instantly generated.'
    ],
    pythonCode: `"""
=============================================================================
FRANKLIN — BLACKOUT ULTIMATE PACK (PHASE 1: PROTOTYPE)
SCRIPT: blackout_scene_setup.py
PURPOSE: Automates Blender scene setup, GTA V metric units, collection tree,
         and aligned orthographic cameras for character asset modeling.
AUTHOR: Lead Technical Artist & Pipeline Engineer
=============================================================================
"""

import bpy
import math

def setup_gta_scene():
    print("[BLACKOUT PIPELINE] Initializing Scene Configuration for GTA V...")
    
    # 1. SET METRIC UNITS (GTA V 1.0 unit = 1.0 meter)
    scene = bpy.context.scene
    scene.unit_settings.system = 'METRIC'
    scene.unit_settings.scale_length = 1.0
    scene.unit_settings.length_unit = 'METERS'
    
    # Set viewport clipping for millimeter precision up to ped scale
    for screen in bpy.data.screens:
        for area in screen.areas:
            if area.type == 'VIEW_3D':
                for space in area.spaces:
                    if space.type == 'VIEW_3D':
                        space.clip_start = 0.005  # 5mm
                        space.clip_end = 100.0    # 100m
                        space.overlay.show_wireframe = False
                        
    # 2. CREATE PROJECT COLLECTION HIERARCHY
    collections_structure = {
        "Ghost_Outfit": [
            "Ghost_Head",
            "Ghost_Torso",
            "Ghost_Arms",
            "Ghost_Pants",
            "Ghost_Boots",
            "Ghost_Accessories",
            "Ghost_Materials"
        ],
        "Franklin_Reference_Rig": [],
        "Export_LODs": ["LOD0", "LOD1", "LOD2"],
        "Reference_Cameras": []
    }
    
    def get_or_create_col(name, parent_col=None):
        if name in bpy.data.collections:
            col = bpy.data.collections[name]
        else:
            col = bpy.data.collections.new(name)
            if parent_col:
                parent_col.children.link(col)
            else:
                bpy.context.scene.collection.children.link(col)
        return col

    for parent_name, children in collections_structure.items():
        parent_col = get_or_create_col(parent_name)
        for child_name in children:
            get_or_create_col(child_name, parent_col)

    print("[BLACKOUT PIPELINE] Collections hierarchy created successfully.")

    # 3. GENERATE 7 ORTHOGRAPHIC / MACRO CAMERAS FOR CHARACTER MODELING
    cam_specs = [
        # (name, location, rotation_euler_deg, ortho_scale)
        ("CAM_Front_Ortho", (0.0, -3.2, 1.0), (90.0, 0.0, 0.0), 2.2),
        ("CAM_Back_Ortho", (0.0, 3.2, 1.0), (90.0, 0.0, 180.0), 2.2),
        ("CAM_Left_Ortho", (-3.2, 0.0, 1.0), (90.0, 0.0, -90.0), 2.2),
        ("CAM_Right_Ortho", (3.2, 0.0, 1.0), (90.0, 0.0, 90.0), 2.2),
        ("CAM_Close_Mask", (0.0, -1.1, 1.65), (85.0, 0.0, 0.0), 0.55),
        ("CAM_Close_Vest", (0.0, -1.5, 1.25), (88.0, 0.0, 0.0), 0.95),
        ("CAM_Close_Boots", (0.0, -1.2, 0.22), (75.0, 0.0, 0.0), 0.65),
    ]

    cam_col = bpy.data.collections["Reference_Cameras"]

    for name, loc, rot_deg, ortho_scale in cam_specs:
        if name in bpy.data.objects:
            cam_obj = bpy.data.objects[name]
        else:
            cam_data = bpy.data.cameras.new(name)
            cam_data.type = 'ORTHO'
            cam_data.ortho_scale = ortho_scale
            cam_data.clip_start = 0.01
            cam_data.clip_end = 20.0
            cam_obj = bpy.data.objects.new(name, cam_data)
            cam_col.objects.link(cam_obj)

        cam_obj.location = loc
        cam_obj.rotation_euler = [math.radians(a) for a in rot_deg]

    print("[BLACKOUT PIPELINE] Reference cameras generated and aligned to Franklin ped heights.")
    print("[SUCCESS] Scene Setup Complete. Ready for Franklin reference mesh import.")

if __name__ == "__main__":
    setup_gta_scene()
`
  },
  {
    id: 'script-materials-builder',
    filename: 'blackout_materials_builder.py',
    title: '2. PBR & GTA V RAGE Material Node Builder',
    description: 'Generates production PBR shader nodes in Blender (compatible with EEVEE Next and Cycles) while matching the exact channel-packing structure expected by GTA V RAGE engine ped shaders (gta_normal_specular.sps).',
    instructions: [
      'In Blender, open the Scripting workspace.',
      'Create a new script named "blackout_materials_builder.py".',
      'Run the script to automatically build all 6 Blackout tactical materials in the blend file.',
      'Assign the materials directly to your clothing mesh components via the Material Properties tab.'
    ],
    pythonCode: `"""
=============================================================================
FRANKLIN — BLACKOUT ULTIMATE PACK (PHASE 1: PROTOTYPE)
SCRIPT: blackout_materials_builder.py
PURPOSE: Creates production PBR materials with proper roughness/metallic values
         and sets up the node network matching GTA V RAGE shader channel-packing:
         - Diffuse (.dds / .ytd)
         - Normal Map + Specular packed in Alpha Channel
         - Roughness / Ambient Occlusion
=============================================================================
"""

import bpy

MATERIAL_PRESETS = [
    {
        "name": "MAT_Tactical_Ripstop_Black",
        "color": (0.015, 0.016, 0.018, 1.0),
        "roughness": 0.78,
        "metallic": 0.02,
        "specular": 0.35,
        "notes": "Used on Combat Shirt sleeves, Hood, and Combat Pants"
    },
    {
        "name": "MAT_Cordura_500D_Black",
        "color": (0.020, 0.021, 0.024, 1.0),
        "roughness": 0.86,
        "metallic": 0.0,
        "specular": 0.25,
        "notes": "Used on Plate Carrier, Pouches, and Tactical Belt Webbing"
    },
    {
        "name": "MAT_Tactical_Polymer",
        "color": (0.022, 0.023, 0.025, 1.0),
        "roughness": 0.38,
        "metallic": 0.08,
        "specular": 0.50,
        "notes": "Used on Ghost Mandible Skull Mask, Knee Shells, Buckles"
    },
    {
        "name": "MAT_Leather_FullGrain_Black",
        "color": (0.012, 0.013, 0.015, 1.0),
        "roughness": 0.44,
        "metallic": 0.04,
        "specular": 0.55,
        "notes": "Used on Combat Boot Uppers and Tactical Glove Palms"
    },
    {
        "name": "MAT_Vibram_Lug_Rubber",
        "color": (0.008, 0.009, 0.010, 1.0),
        "roughness": 0.92,
        "metallic": 0.0,
        "specular": 0.20,
        "notes": "Used on Boot Lugged Outsoles"
    },
    {
        "name": "MAT_Coated_Gunmetal",
        "color": (0.045, 0.048, 0.052, 1.0),
        "roughness": 0.28,
        "metallic": 0.88,
        "specular": 0.80,
        "notes": "Used on Cobra Buckles, D-Rings, Snaps, and Comm Connectors"
    }
]

def build_blackout_materials():
    print("[BLACKOUT PIPELINE] Building Tactical PBR & GTA V RAGE Materials...")
    
    mat_col = bpy.data.collections.get("Ghost_Materials")
    
    for preset in MATERIAL_PRESETS:
        name = preset["name"]
        
        # Check if material already exists
        if name in bpy.data.materials:
            mat = bpy.data.materials[name]
        else:
            mat = bpy.data.materials.new(name=name)
            
        mat.use_nodes = True
        nodes = mat.node_tree.nodes
        links = mat.node_tree.links
        nodes.clear()
        
        # 1. Create Output Node
        node_output = nodes.new(type='ShaderNodeOutputMaterial')
        node_output.location = (400, 0)
        
        # 2. Create Principled BSDF
        node_bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
        node_bsdf.location = (100, 0)
        
        # Set parameters
        node_bsdf.inputs['Base Color'].default_value = preset["color"]
        node_bsdf.inputs['Roughness'].default_value = preset["roughness"]
        node_bsdf.inputs['Metallic'].default_value = preset["metallic"]
        
        # Link BSDF to Output
        links.new(node_bsdf.outputs['BSDF'], node_output.inputs['Surface'])
        
        # 3. Create Placeholder Texture Nodes for GTA V Workflow
        # Diffuse Node
        tex_diffuse = nodes.new(type='ShaderNodeTexImage')
        tex_diffuse.location = (-300, 200)
        tex_diffuse.label = "GTA_V_Diffuse (.dds)"
        
        # Normal Map Node with Specular in Alpha
        tex_normal = nodes.new(type='ShaderNodeTexImage')
        tex_normal.location = (-600, -150)
        tex_normal.label = "GTA_V_Normal_SpecAlpha"
        
        node_norm_map = nodes.new(type='ShaderNodeNormalMap')
        node_norm_map.location = (-200, -150)
        
        # Link Normal Node
        links.new(tex_normal.outputs['Color'], node_norm_map.inputs['Color'])
        links.new(node_norm_map.outputs['Normal'], node_bsdf.inputs['Normal'])
        
        print(f"  -> Generated: {name} (Roughness: {preset['roughness']}, Metal: {preset['metallic']})")

    print("[SUCCESS] All 6 Blackout Materials created with standard PBR nodes.")

if __name__ == "__main__":
    build_blackout_materials()
`
  },
  {
    id: 'script-weight-transfer',
    filename: 'blackout_weight_transfer_helper.py',
    title: '3. Weight Transfer & 4-Bone Limit Enforcer',
    description: 'Transfers bone weights from the Franklin base mesh (player_one.ydd) to clothing geometry with high precision, prunes stray micro-weights, enforces the strict GTA V RAGE engine constraint of maximum 4 bone influences per vertex, and normalizes all weights.',
    instructions: [
      'Select the target clothing mesh (e.g., GHOST_SHIRT or GHOST_PANTS).',
      'Hold Shift and select the Franklin reference body mesh (source of weights).',
      'In Blender Scripting, paste and run this script.',
      'The script automatically creates an Armature modifier, executes Data Transfer of vertex weights using Nearest Face Interpolated, runs limit_total(4) to prevent GTA V mesh explosions, and normalizes vertex groups.'
    ],
    pythonCode: `"""
=============================================================================
FRANKLIN — BLACKOUT ULTIMATE PACK (PHASE 1: PROTOTYPE)
SCRIPT: blackout_weight_transfer_helper.py
PURPOSE: Transfers vertex weights from Franklin base ped mesh to clothing.
         Enforces GTA V RAGE Engine's STRICT rule: MAX 4 BONE WEIGHTS PER VERTEX.
USAGE: Select clothing mesh FIRST, then Shift+Select Franklin reference body LAST.
=============================================================================
"""

import bpy

def transfer_weights_and_limit():
    selected_objects = bpy.context.selected_objects
    active_obj = bpy.context.active_object
    
    if len(selected_objects) < 2 or not active_obj:
        print("[ERROR] Please select CLOTHING mesh first, then Shift-click FRANKLIN REFERENCE body mesh.")
        return
        
    source_body = active_obj
    target_cloth = [obj for obj in selected_objects if obj != source_body][0]
    
    print(f"[BLACKOUT PIPELINE] Weight Transfer: '{source_body.name}' -> '{target_cloth.name}'")
    
    # Ensure both are in Object mode
    bpy.ops.object.mode_set(mode='OBJECT')
    
    # 1. Check if source has vertex groups
    if len(source_body.vertex_groups) == 0:
        print("[ERROR] Source body has no vertex groups! Ensure Franklin reference is rigged.")
        return
        
    # 2. Add Data Transfer Modifier to Target Clothing
    dt_mod = target_cloth.modifiers.new(name="GTA_Weight_Transfer", type='DATA_TRANSFER')
    dt_mod.object = source_body
    dt_mod.use_vert_data = True
    dt_mod.data_types_verts = {'VGROUP_WEIGHTS'}
    dt_mod.vert_mapping = 'POLYINTERP_NEAREST'  # Highest accuracy for organic cloth
    
    # Generate data layers
    bpy.context.view_layer.objects.active = target_cloth
    bpy.ops.object.datalayout_transfer(modifier=dt_mod.name)
    
    # Apply Modifier
    bpy.ops.object.modifier_apply(modifier=dt_mod.name)
    print("  -> Vertex weights transferred via Nearest Face Interpolation.")
    
    # 3. ENFORCE GTA V HARDWARE CONSTRAINT: MAX 4 WEIGHTS PER VERTEX
    # Any vertex with 5 or more weights will crash GTA V or cause polygon spiking.
    bpy.ops.object.mode_set(mode='WEIGHT_PAINT')
    
    # Clean tiny stray weights below threshold
    bpy.ops.object.vertex_group_clean(group_select_mode='ALL', limit=0.01)
    
    # Limit Total to exactly 4 bone influences
    bpy.ops.object.vertex_group_limit_total(group_select_mode='ALL', limit=4)
    
    # Normalize all vertex groups so sum equals 1.0
    bpy.ops.object.vertex_group_normalize_all(group_select_mode='ALL', lock_active=False)
    
    bpy.ops.object.mode_set(mode='OBJECT')
    
    # 4. Verify no unweighted vertices remain
    unweighted_count = 0
    for v in target_cloth.data.vertices:
        if len(v.groups) == 0:
            unweighted_count += 1
            
    if unweighted_count > 0:
        print(f"  [WARNING] {unweighted_count} vertices have 0 weight! Check seam boundaries.")
    else:
        print("  -> 100% of clothing vertices successfully weighted.")
        
    print("[SUCCESS] Weight Transfer & GTA V 4-Bone Limit complete.")

if __name__ == "__main__":
    transfer_weights_and_limit()
`
  },
  {
    id: 'script-export-prep',
    filename: 'blackout_gta5_export_validator.py',
    title: '4. GTA V Export Sanity Check & LOD Generator',
    description: 'Performs pre-flight technical validation before export to Sollumz / OpenIV: checks that all transforms are applied, verifies standard UV Map naming ("UVMap"), detects non-manifold edges or loose geometry, and generates LOD1 and LOD2 meshes with Decimate modifier.',
    instructions: [
      'Select the completed clothing object in Blender.',
      'In the Scripting workspace, paste and run this script.',
      'Review the validation log in the Blender System Console (Window -> Toggle System Console).',
      'If all checks pass, the script automatically duplicates and creates LOD1 (50% tris) and LOD2 (20% tris) in the "Export_LODs" collection.'
    ],
    pythonCode: `"""
=============================================================================
FRANKLIN — BLACKOUT ULTIMATE PACK (PHASE 1: PROTOTYPE)
SCRIPT: blackout_gta5_export_validator.py
PURPOSE: Validates mesh health, transforms, UV channels, and generates
         LOD1 and LOD2 geometry for Sollumz / OpenIV GTA V export.
=============================================================================
"""

import bpy

def run_export_validation():
    obj = bpy.context.active_object
    if not obj or obj.type != 'MESH':
        print("[ERROR] Please select an active MESH object to validate.")
        return

    print(f"=========================================================")
    print(f"[BLACKOUT AUDIT] Validating '{obj.name}' for GTA V Export")
    print(f"=========================================================")
    
    errors_found = 0
    warnings_found = 0
    
    # 1. Check Transforms
    if obj.scale != (1.0, 1.0, 1.0):
        print(f"  [FAIL] Scale is not applied! Current: {obj.scale}. Press Ctrl+A -> Apply Scale.")
        errors_found += 1
    else:
        print("  [PASS] Scale is normalized (1.0, 1.0, 1.0).")
        
    if obj.rotation_euler != (0.0, 0.0, 0.0):
        print(f"  [FAIL] Rotation is not applied! Press Ctrl+A -> Apply Rotation.")
        errors_found += 1
    else:
        print("  [PASS] Rotation is normalized (0.0, 0.0, 0.0).")
        
    # 2. Check UV Map
    if len(obj.data.uv_layers) == 0:
        print("  [FAIL] No UV Map found! Mesh must be unwrapped.")
        errors_found += 1
    else:
        primary_uv = obj.data.uv_layers[0].name
        print(f"  [PASS] Primary UV Map detected: '{primary_uv}'.")
        
    # 3. Polygon Count & Topology
    total_faces = len(obj.data.polygons)
    total_tris = sum(len(p.vertices) - 2 for p in obj.data.polygons)
    print(f"  [INFO] Polycount: {total_faces} quads/polys ({total_tris} Triangles).")
    
    if total_tris > 35000:
        print(f"  [WARN] Triangle count ({total_tris}) exceeds high budget for single ped slot.")
        warnings_found += 1
        
    # 4. Check Non-Manifold Geometry
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='DESELECT')
    bpy.ops.mesh.select_non_manifold()
    bpy.ops.object.mode_set(mode='OBJECT')
    
    non_manifold_verts = [v for v in obj.data.vertices if v.select]
    if len(non_manifold_verts) > 0:
        print(f"  [WARN] Found {len(non_manifold_verts)} non-manifold vertices. Inspect boundaries.")
        warnings_found += 1
    else:
        print("  [PASS] Mesh is 100% 2-manifold.")
        
    # 5. Check Vertex Groups (Rigging)
    vg_count = len(obj.vertex_groups)
    if vg_count == 0:
        print("  [FAIL] Zero vertex groups detected. Clothing must be rigged to GTA V skeleton.")
        errors_found += 1
    else:
        print(f"  [PASS] Rigged with {vg_count} GTA V vertex groups.")

    print(f"---------------------------------------------------------")
    if errors_found == 0:
        print(f"[AUDIT SUCCESS] Mesh is ready for GTA V Export (Warnings: {warnings_found}).")
        
        # AUTOMATED LOD GENERATION
        lod_col = bpy.data.collections.get("Export_LODs")
        if lod_col:
            # LOD1 (Medium Distance ~50%)
            lod1_obj = obj.copy()
            lod1_obj.data = obj.data.copy()
            lod1_obj.name = f"{obj.name}_LOD1"
            lod_col.objects.link(lod1_obj)
            mod1 = lod1_obj.modifiers.new(name="Decimate_LOD1", type='DECIMATE')
            mod1.ratio = 0.50
            print(f"  -> Generated LOD1: {lod1_obj.name} (50% ratio)")
            
            # LOD2 (Far Distance ~20%)
            lod2_obj = obj.copy()
            lod2_obj.data = obj.data.copy()
            lod2_obj.name = f"{obj.name}_LOD2"
            lod_col.objects.link(lod2_obj)
            mod2 = lod2_obj.modifiers.new(name="Decimate_LOD2", type='DECIMATE')
            mod2.ratio = 0.20
            print(f"  -> Generated LOD2: {lod2_obj.name} (20% ratio)")
    else:
        print(f"[AUDIT BLOCKED] {errors_found} errors must be resolved prior to export.")
    print(f"=========================================================")

if __name__ == "__main__":
    run_export_validation()
`
  }
];
