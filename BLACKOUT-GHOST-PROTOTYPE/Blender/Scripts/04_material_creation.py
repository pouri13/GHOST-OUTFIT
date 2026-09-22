"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 04: Material Creation & Preview Material Architecture
Target: Blender 3.6 LTS / 4.x
Compatible Target: Franklin Clinton (GTA V PC)
=============================================================================

STATUS CLASSIFICATION:
  [X] READY NOW: Blender PBR viewport preview materials.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES SOLLUMZ: Conversion to native GTA V RAGE shaders (sollumz_material_shader)
      must be executed after Sollumz is installed.
  [ ] REQUIRES GTA V: In-game appearance depends on engine lighting, time-of-day, and weather.

CRITICAL PIPELINE ARCHITECTURE DISTINCTION:
  1. BLENDER PREVIEW MATERIAL:
     Uses standard Blender Principled BSDF nodes for real-time viewport visualization,
     lighting validation, and PBR channel balancing during modeling and UV layout.
  2. GTA V / SOLLUMZ RAGE SHADER:
     GTA V does NOT execute Blender nodes. In Phase D, when Sollumz is installed,
     these materials must be mapped to native Sollumz RAGE shaders (e.g., gta_normal_specular.sps)
     and bound to .ytd texture dictionaries.
  All materials generated here are explicitly flagged as: VERIFY_IN_SOLLUMZ.
=============================================================================
"""

import bpy

MATERIAL_DEFINITIONS = {
    "MAT_Tactical_Ripstop_Black": {
        "base_color": (0.078, 0.082, 0.090, 1.0),
        "roughness": 0.78,
        "metallic": 0.02,
        "specular": 0.35,
        "alpha": 1.0,
        "target_rage_shader": "gta_normal_specular.sps",
        "sollumz_status": "VERIFY_IN_SOLLUMZ",
        "description": "210D ripstop nylon with micro-grid weave for tactical combat shirt and pants.",
    },
    "MAT_Cordura_Black": {
        "base_color": (0.094, 0.098, 0.110, 1.0),
        "roughness": 0.86,
        "metallic": 0.00,
        "specular": 0.25,
        "alpha": 1.0,
        "target_rage_shader": "gta_normal_specular.sps",
        "sollumz_status": "VERIFY_IN_SOLLUMZ",
        "description": "500-Denier heavy Cordura nylon with ballistic weave for tactical plate carrier.",
    },
    "MAT_Tactical_Polymer": {
        "base_color": (0.102, 0.106, 0.114, 1.0),
        "roughness": 0.38,
        "metallic": 0.08,
        "specular": 0.55,
        "alpha": 1.0,
        "target_rage_shader": "gta_normal_specular.sps",
        "sollumz_status": "VERIFY_IN_SOLLUMZ",
        "description": "High-impact injection-molded matte polymer with micro-stipple finish.",
    },
    "MAT_Leather_Black": {
        "base_color": (0.067, 0.071, 0.078, 1.0),
        "roughness": 0.44,
        "metallic": 0.04,
        "specular": 0.50,
        "alpha": 1.0,
        "target_rage_shader": "gta_normal_specular.sps",
        "sollumz_status": "VERIFY_IN_SOLLUMZ",
        "description": "Full-grain oiled cowhide leather with natural organic crease falloff.",
    },
    "MAT_Rubber": {
        "base_color": (0.047, 0.051, 0.055, 1.0),
        "roughness": 0.92,
        "metallic": 0.00,
        "specular": 0.15,
        "alpha": 1.0,
        "target_rage_shader": "gta_normal_specular.sps",
        "sollumz_status": "VERIFY_IN_SOLLUMZ",
        "description": "High-friction vulcanized rubber for combat boots and protective edge trim.",
    },
    "MAT_Coated_Metal": {
        "base_color": (0.145, 0.153, 0.165, 1.0),
        "roughness": 0.28,
        "metallic": 0.88,
        "specular": 0.70,
        "alpha": 1.0,
        "target_rage_shader": "gta_normal_specular.sps",
        "sollumz_status": "VERIFY_IN_SOLLUMZ",
        "description": "Hard-anodized matte gunmetal coating over aircraft-grade 7075 aluminum.",
    },
    "MAT_Glass_Dark": {
        "base_color": (0.030, 0.035, 0.040, 0.65),
        "roughness": 0.08,
        "metallic": 0.10,
        "specular": 0.95,
        "alpha": 0.75,
        "target_rage_shader": "gta_glass.sps",
        "sollumz_status": "VERIFY_IN_SOLLUMZ",
        "description": "Ballistic polycarbonate eye-protection lens with anti-reflective coating.",
    },
}


def create_or_update_preview_material(name, spec):
    """
    Creates or updates a calibrated Blender viewport preview material.
    Attaches metadata for future Sollumz conversion in Phase D.
    """
    if name in bpy.data.materials:
        mat = bpy.data.materials[name]
    else:
        mat = bpy.data.materials.new(name=name)

    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    out_node = nodes.new(type="ShaderNodeOutputMaterial")
    out_node.location = (400, 0)

    p_node = nodes.new(type="ShaderNodeBsdfPrincipled")
    p_node.location = (0, 0)

    # Set base color
    if "Base Color" in p_node.inputs:
        p_node.inputs["Base Color"].default_value = spec["base_color"]
    if "Roughness" in p_node.inputs:
        p_node.inputs["Roughness"].default_value = spec["roughness"]
    if "Metallic" in p_node.inputs:
        p_node.inputs["Metallic"].default_value = spec["metallic"]

    # Specular compatibility
    if "Specular IOR Level" in p_node.inputs:
        p_node.inputs["Specular IOR Level"].default_value = spec["specular"]
    elif "Specular" in p_node.inputs:
        p_node.inputs["Specular"].default_value = spec["specular"]

    if spec["alpha"] < 1.0 and "Alpha" in p_node.inputs:
        p_node.inputs["Alpha"].default_value = spec["alpha"]
        mat.blend_method = "BLEND"
    else:
        mat.blend_method = "OPAQUE"

    # Setup texture sampler preview nodes
    tex_diff = nodes.new(type="ShaderNodeTexImage")
    tex_diff.location = (-350, 150)
    tex_diff.label = "Albedo (_d) [Preview]"

    tex_norm = nodes.new(type="ShaderNodeTexImage")
    tex_norm.location = (-350, -150)
    tex_norm.label = "Normal (_n) [Preview]"

    norm_map = nodes.new(type="ShaderNodeNormalMap")
    norm_map.location = (-120, -150)

    links.new(p_node.outputs["BSDF"], out_node.inputs["Surface"])
    links.new(tex_diff.outputs["Color"], p_node.inputs["Base Color"])
    links.new(tex_norm.outputs["Color"], norm_map.inputs["Color"])
    links.new(norm_map.outputs["Normal"], p_node.inputs["Normal"])

    # Metadata tagging for pipeline clarity
    mat["material_role"] = "BLENDER_VIEWPORT_PREVIEW"
    mat["target_rage_shader"] = spec["target_rage_shader"]
    mat["sollumz_status"] = spec["sollumz_status"]
    mat["description"] = spec["description"]

    print(f"  [MATERIAL PREVIEW READY] {name}")
    print(f"    --> Target RAGE Shader: {spec['target_rage_shader']} (Status: {spec['sollumz_status']})")
    return mat


def run_material_suite():
    print("\n=================================================")
    print("BLACKOUT GHOST // RUNNING SCRIPT 04: MATERIALS")
    print("=================================================")
    print("[NOTICE] Creating Blender PBR Viewport Previews.")
    print("         Native GTA V Sollumz shaders will be generated in Phase D.")
    print("-------------------------------------------------")

    for mat_name, spec in MATERIAL_DEFINITIONS.items():
        create_or_update_preview_material(mat_name, spec)

    print("\n[MATERIAL SUITE RESULT] 7 tactical preview materials ready.")
    print("Reminder: RAGE shader compilation occurs during Sollumz export.\n")


if __name__ == "__main__":
    run_material_suite()
