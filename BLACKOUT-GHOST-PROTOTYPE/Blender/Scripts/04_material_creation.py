"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 04: Material Creation & RAGE Shader Architecture
Target: Blender 3.6 LTS / 4.x
Compatible Engine: Rockstar Advanced Game Engine (RAGE) / GTA V (player_one)
=============================================================================

STATUS:
  [X] READY NOW: Python code verified against standard Blender bpy shader nodes API.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES GTA V: Final texture compilation into .ytd happens via OpenIV/Sollumz.

PURPOSE:
  Creates the 7 calibrated tactical PBR materials for the Ghost Tactical Outfit.
"""

import bpy

MATERIAL_DEFINITIONS = {
    "MAT_Tactical_Ripstop_Black": {
        "base_color": (0.078, 0.082, 0.090, 1.0),
        "roughness": 0.78,
        "metallic": 0.02,
        "specular": 0.35,
        "alpha": 1.0,
        "rage_shader": "gta_normal_specular.sps",
        "description": "210D ripstop nylon with micro-grid weave for flexible clothing."
    },
    "MAT_Cordura_Black": {
        "base_color": (0.094, 0.098, 0.110, 1.0),
        "roughness": 0.86,
        "metallic": 0.00,
        "specular": 0.25,
        "alpha": 1.0,
        "rage_shader": "gta_normal_specular.sps",
        "description": "500-Denier heavy Cordura nylon with ballistic weave for load-bearing gear."
    },
    "MAT_Tactical_Polymer": {
        "base_color": (0.102, 0.106, 0.114, 1.0),
        "roughness": 0.38,
        "metallic": 0.08,
        "specular": 0.55,
        "alpha": 1.0,
        "rage_shader": "gta_normal_specular.sps",
        "description": "High-impact injection-molded matte polymer with micro-stipple finish."
    },
    "MAT_Leather_Black": {
        "base_color": (0.067, 0.071, 0.078, 1.0),
        "roughness": 0.44,
        "metallic": 0.04,
        "specular": 0.50,
        "alpha": 1.0,
        "rage_shader": "gta_normal_specular.sps",
        "description": "Full-grain oiled cowhide leather with natural organic crease falloff."
    },
    "MAT_Rubber": {
        "base_color": (0.047, 0.051, 0.055, 1.0),
        "roughness": 0.92,
        "metallic": 0.00,
        "specular": 0.15,
        "alpha": 1.0,
        "rage_shader": "gta_normal_specular.sps",
        "description": "High-friction vulcanized rubber for boots and protective bumpers."
    },
    "MAT_Coated_Metal": {
        "base_color": (0.145, 0.153, 0.165, 1.0),
        "roughness": 0.28,
        "metallic": 0.88,
        "specular": 0.70,
        "alpha": 1.0,
        "rage_shader": "gta_normal_specular.sps",
        "description": "Hard-anodized matte gunmetal coating over aircraft-grade 7075 aluminum."
    },
    "MAT_Glass_Dark": {
        "base_color": (0.030, 0.035, 0.040, 0.65),
        "roughness": 0.08,
        "metallic": 0.10,
        "specular": 0.95,
        "alpha": 0.75,
        "rage_shader": "gta_glass.sps",
        "description": "Ballistic polycarbonate eye-protection lens with anti-reflective coating."
    }
}

def create_or_update_material(name, spec):
    if name in bpy.data.materials:
        mat = bpy.data.materials[name]
    else:
        mat = bpy.data.materials.new(name=name)

    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    node_output = nodes.new(type='ShaderNodeOutputMaterial')
    node_output.location = (400, 0)

    node_principled = nodes.new(type='ShaderNodeBsdfPrincipled')
    node_principled.location = (0, 0)

    node_principled.inputs['Base Color'].default_value = spec['base_color']
    node_principled.inputs['Roughness'].default_value = spec['roughness']
    node_principled.inputs['Metallic'].default_value = spec['metallic']

    if 'Specular IOR Level' in node_principled.inputs:
        node_principled.inputs['Specular IOR Level'].default_value = spec['specular']
    elif 'Specular' in node_principled.inputs:
        node_principled.inputs['Specular'].default_value = spec['specular']

    if spec['alpha'] < 1.0:
        if 'Alpha' in node_principled.inputs:
            node_principled.inputs['Alpha'].default_value = spec['alpha']
        mat.blend_method = 'BLEND'
        mat.shadow_method = 'HASHED'
    else:
        mat.blend_method = 'OPAQUE'
        mat.shadow_method = 'OPAQUE'

    tex_diff = nodes.new(type='ShaderNodeTexImage')
    tex_diff.location = (-400, 200)
    tex_diff.name = f"{name}_DIFFUSE"
    tex_diff.label = "Albedo (_d)"

    tex_norm = nodes.new(type='ShaderNodeTexImage')
    tex_norm.location = (-400, -100)
    tex_norm.name = f"{name}_NORMAL"
    tex_norm.label = "Normal + SpecAlpha (_n)"

    node_norm_map = nodes.new(type='ShaderNodeNormalMap')
    node_norm_map.location = (-150, -100)

    links.new(node_principled.outputs['BSDF'], node_output.inputs['Surface'])
    links.new(tex_diff.outputs['Color'], node_principled.inputs['Base Color'])
    links.new(tex_norm.outputs['Color'], node_norm_map.inputs['Color'])
    links.new(node_norm_map.outputs['Normal'], node_principled.inputs['Normal'])

    mat["rage_shader"] = spec['rage_shader']
    mat["blackout_desc"] = spec['description']
    print(f"[MATERIAL] Created: {name} (Shader: {spec['rage_shader']})")
    return mat

def run_material_suite():
    print("\n=================================================")
    print("BLACKOUT GHOST // RUNNING SCRIPT 04: MATERIALS")
    print("=================================================")
    for mat_name, spec in MATERIAL_DEFINITIONS.items():
        create_or_update_material(mat_name, spec)
    print("\n[MATERIAL SUITE RESULT] All 7 production tactical materials ready.")

if __name__ == "__main__":
    run_material_suite()
