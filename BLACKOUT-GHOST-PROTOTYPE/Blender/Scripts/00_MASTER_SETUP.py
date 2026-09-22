"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 00: Master Project Initialization & Safe Calibration
Target: Blender 3.6 LTS / 4.x
Compatible Target: Franklin Clinton (GTA V PC)
=============================================================================

STATUS CLASSIFICATION:
  [X] READY NOW: Static Python code verified against standard Blender bpy API.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES SOLLUMZ: Final RAGE shader and .ydd export requires Sollumz addon.
  [ ] REQUIRES GTA V: Extraction of Franklin's base body and skeleton via OpenIV.

SAFETY DIRECTIVES:
  - IDEMPOTENT: Safe to run multiple times without duplicating collections or materials.
  - NON-DESTRUCTIVE: Never deletes user objects, default scenes, or meshes automatically.
  - HEADLESS COMPATIBLE: Safely handles execution in background/headless mode (blender -b).
=============================================================================
"""

import bpy
import math

# Production collection structure required for the Blackout modding pipeline
CANONICAL_COLLECTIONS = [
    "01_REFERENCE",
    "02_HIGH_POLY",
    "03_LOW_POLY",
    "04_CLOTHING",
    "05_ACCESSORIES",
    "06_SKELETON",
    "07_MATERIALS",
    "08_EXPORT",
    "09_TEST",
]

MATERIAL_DEFINITIONS = {
    "MAT_Tactical_Ripstop_Black": {
        "base_color": (0.078, 0.082, 0.090, 1.0),
        "roughness": 0.78,
        "metallic": 0.02,
        "specular": 0.35,
        "alpha": 1.0,
        "target_rage_shader": "gta_normal_specular.sps",
        "sollumz_status": "VERIFY_IN_SOLLUMZ",
        "description": "210D ripstop nylon with micro-grid weave for tactical combat shirt.",
    },
    "MAT_Cordura_Black": {
        "base_color": (0.094, 0.098, 0.110, 1.0),
        "roughness": 0.86,
        "metallic": 0.00,
        "specular": 0.25,
        "alpha": 1.0,
        "target_rage_shader": "gta_normal_specular.sps",
        "sollumz_status": "VERIFY_IN_SOLLUMZ",
        "description": "500D ballistic Cordura nylon for tactical plate carrier and modular pouches.",
    },
    "MAT_Tactical_Polymer": {
        "base_color": (0.102, 0.106, 0.114, 1.0),
        "roughness": 0.38,
        "metallic": 0.08,
        "specular": 0.55,
        "alpha": 1.0,
        "target_rage_shader": "gta_normal_specular.sps",
        "sollumz_status": "VERIFY_IN_SOLLUMZ",
        "description": "High-impact matte tactical polymer for buckles, fasteners, and hard shell gear.",
    },
    "MAT_Leather_Black": {
        "base_color": (0.067, 0.071, 0.078, 1.0),
        "roughness": 0.44,
        "metallic": 0.04,
        "specular": 0.50,
        "alpha": 1.0,
        "target_rage_shader": "gta_normal_specular.sps",
        "sollumz_status": "VERIFY_IN_SOLLUMZ",
        "description": "Oiled full-grain tactical combat leather for gloves and boot reinforcement.",
    },
    "MAT_Rubber": {
        "base_color": (0.047, 0.051, 0.055, 1.0),
        "roughness": 0.92,
        "metallic": 0.00,
        "specular": 0.15,
        "alpha": 1.0,
        "target_rage_shader": "gta_normal_specular.sps",
        "sollumz_status": "VERIFY_IN_SOLLUMZ",
        "description": "High-traction vulcanized rubber for tactical boot outsoles and protective bumpers.",
    },
    "MAT_Coated_Metal": {
        "base_color": (0.145, 0.153, 0.165, 1.0),
        "roughness": 0.28,
        "metallic": 0.88,
        "specular": 0.70,
        "alpha": 1.0,
        "target_rage_shader": "gta_normal_specular.sps",
        "sollumz_status": "VERIFY_IN_SOLLUMZ",
        "description": "Matte hard-anodized tactical gunmetal coating for D-rings, carabiners, and zippers.",
    },
    "MAT_Glass_Dark": {
        "base_color": (0.030, 0.035, 0.040, 0.65),
        "roughness": 0.08,
        "metallic": 0.10,
        "specular": 0.95,
        "alpha": 0.75,
        "target_rage_shader": "gta_glass.sps",
        "sollumz_status": "VERIFY_IN_SOLLUMZ",
        "description": "Dark ballistic polycarbonate eye-protection lens with anti-reflective coating.",
    },
}


def configure_scene_units():
    """Sets metric units to 1 unit = 1 meter, matching GTA V RAGE engine scale."""
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.scale_length = 1.0
    scene.unit_settings.length_unit = "METERS"
    scene.unit_settings.mass_unit = "KILOGRAMS"
    scene.unit_settings.time_unit = "SECONDS"
    print("[MASTER SETUP] Metric units calibrated: 1.0 unit = 1.0 meter.")


def configure_viewport_clipping():
    """Safely adjusts 3D Viewport clipping if UI context is available."""
    if not hasattr(bpy.context, "window_manager") or not bpy.context.window_manager:
        print("[MASTER SETUP] Headless environment detected; skipping UI viewport configuration.")
        return

    configured_views = 0
    for window in bpy.context.window_manager.windows:
        screen = window.screen
        if not screen:
            continue
        for area in screen.areas:
            if area.type == "VIEW_3D":
                for space in area.spaces:
                    if space.type == "VIEW_3D":
                        space.clip_start = 0.005  # 5mm near clip
                        space.clip_end = 100.0   # 100m far clip
                        if hasattr(space, "overlay"):
                            space.overlay.grid_scale = 0.1
                            space.overlay.grid_subdivisions = 10
                        configured_views += 1
    if configured_views > 0:
        print(f"[MASTER SETUP] Viewport clipping configured for {configured_views} 3D view(s).")
    else:
        print("[MASTER SETUP] No active 3D viewports open; settings will apply on workspace load.")


def build_collection_hierarchy():
    """Builds the 9 canonical production collections idempotently without duplicates."""
    scene_col = bpy.context.scene.collection
    existing_col_names = {c.name for c in scene_col.children}
    created_count = 0

    for col_name in CANONICAL_COLLECTIONS:
        if col_name in bpy.data.collections:
            col = bpy.data.collections[col_name]
            if col_name not in existing_col_names:
                scene_col.children.link(col)
                existing_col_names.add(col_name)
        else:
            col = bpy.data.collections.new(name=col_name)
            scene_col.children.link(col)
            existing_col_names.add(col_name)
            created_count += 1

    print(f"[MASTER SETUP] Production collections verified (9/9 ready, {created_count} newly linked).")


def build_preview_materials():
    """
    Creates calibrated Blender PBR preview materials.
    NOTE: These are viewport preview materials, NOT native Sollumz RAGE shaders.
    Native Sollumz shaders require the Sollumz addon and will be converted in Phase D.
    """
    materials_created = 0
    for name, spec in MATERIAL_DEFINITIONS.items():
        if name in bpy.data.materials:
            mat = bpy.data.materials[name]
        else:
            mat = bpy.data.materials.new(name=name)
            materials_created += 1

        mat.use_nodes = True
        nodes = mat.node_tree.nodes
        links = mat.node_tree.links
        nodes.clear()

        out_node = nodes.new(type="ShaderNodeOutputMaterial")
        out_node.location = (350, 0)

        p_node = nodes.new(type="ShaderNodeBsdfPrincipled")
        p_node.location = (0, 0)

        # Set PBR values safely with version-agnostic input checking
        if "Base Color" in p_node.inputs:
            p_node.inputs["Base Color"].default_value = spec["base_color"]
        if "Roughness" in p_node.inputs:
            p_node.inputs["Roughness"].default_value = spec["roughness"]
        if "Metallic" in p_node.inputs:
            p_node.inputs["Metallic"].default_value = spec["metallic"]

        # Specular input name varies between Blender 3.6 and 4.0+
        if "Specular IOR Level" in p_node.inputs:
            p_node.inputs["Specular IOR Level"].default_value = spec["specular"]
        elif "Specular" in p_node.inputs:
            p_node.inputs["Specular"].default_value = spec["specular"]

        if spec["alpha"] < 1.0 and "Alpha" in p_node.inputs:
            p_node.inputs["Alpha"].default_value = spec["alpha"]
            mat.blend_method = "BLEND"
        else:
            mat.blend_method = "OPAQUE"

        links.new(p_node.outputs["BSDF"], out_node.inputs["Surface"])

        # Metadata tags for pipeline clarity
        mat["blackout_material_type"] = "BLENDER_PREVIEW_MATERIAL"
        mat["target_rage_shader"] = spec["target_rage_shader"]
        mat["sollumz_status"] = spec["sollumz_status"]
        mat["blackout_desc"] = spec["description"]

    print(f"[MASTER SETUP] Calibrated preview materials prepared (7/7 ready, {materials_created} created).")


def setup_studio_lighting():
    """Idempotently ensures studio inspection lighting exists without overwriting user lights."""
    light_col_name = "07_MATERIALS"
    target_col = bpy.data.collections.get(light_col_name) or bpy.context.scene.collection

    lights = [
        ("LIGHT_Key_FrontRight", "SUN", (2.5, -2.5, 2.5), 3.0, (1.0, 0.98, 0.95)),
        ("LIGHT_Fill_FrontLeft", "SUN", (-2.5, -2.0, 1.8), 1.2, (0.85, 0.90, 1.0)),
        ("LIGHT_Rim_Back", "SUN", (0.0, 3.0, 2.8), 4.5, (0.95, 0.95, 1.0)),
    ]

    for name, l_type, loc, energy, color in lights:
        if name not in bpy.data.objects:
            light_data = bpy.data.lights.new(name=name, type=l_type)
            light_data.energy = energy
            light_data.color = color
            light_obj = bpy.data.objects.new(name=name, object_data=light_data)
            light_obj.location = loc
            dx = 0.0 - loc[0]
            dy = 0.0 - loc[1]
            dz = 1.0 - loc[2]
            dist = math.sqrt(dx * dx + dy * dy + dz * dz)
            pitch = math.asin(-dz / dist)
            yaw = math.atan2(dy, dx)
            light_obj.rotation_euler = (pitch, 0.0, yaw - math.pi / 2)
            target_col.objects.link(light_obj)

    print("[MASTER SETUP] Calibrated studio lighting rig verified.")


def run_master_setup():
    print("\n==================================================================")
    print("BLACKOUT ULTIMATE PACK // INITIALIZING MASTER PIPELINE SETUP")
    print("==================================================================")
    print("[SAFETY] Existing user objects and scenes will be preserved.")

    configure_scene_units()
    configure_viewport_clipping()
    build_collection_hierarchy()
    build_preview_materials()
    setup_studio_lighting()

    print("\n==================================================================")
    print("BLACKOUT MASTER SETUP COMPLETE")
    print("NEXT STEP:")
    print("IMPORT / PREPARE ACTUAL FRANKLIN TARGET")
    print("==================================================================\n")


if __name__ == "__main__":
    run_master_setup()
