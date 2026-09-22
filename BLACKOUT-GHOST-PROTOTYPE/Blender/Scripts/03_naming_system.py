"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 03: Naming System & Validation Utilities
Target: Blender 3.6 LTS / 4.x
Compatible Target: Franklin Clinton (GTA V PC)
=============================================================================

STATUS CLASSIFICATION:
  [X] READY NOW: Python code verified against standard Blender bpy API.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES SOLLUMZ: Mapping to .ydd files is finalized during Sollumz export.

PURPOSE:
  Enforces consistent, predictable naming conventions across the 10 canonical
  tactical outfit components, their materials, and their texture sets:
  - Assets:
      GHOST_SHIRT, GHOST_PANTS, GHOST_VEST, GHOST_MASK, GHOST_HOOD,
      GHOST_BOOTS, GHOST_GLOVES, GHOST_BELT, GHOST_GOGGLES, GHOST_HEADSET
  - Mesh Prefixes:
      LP_GHOST_<NAME> (Low-Poly), HP_GHOST_<NAME> (High-Poly)
  - Materials:
      MAT_GHOST_<NAME> or shared tactical materials (MAT_Tactical_Ripstop_Black, etc.)
  - Textures:
      GHOST_<NAME>_D (Diffuse/Albedo), GHOST_<NAME>_N (Normal), GHOST_<NAME>_S (Specular)
=============================================================================
"""

import bpy

CANONICAL_OUTFIT_COMPONENTS = {
    "SHIRT": {
        "full_name": "GHOST_SHIRT",
        "category": "CLOTHING",
        "gta_slot": "jbib",
        "target_ydd": "jbib_001_u.ydd",
        "material_primary": "MAT_Tactical_Ripstop_Black",
        "textures": ["GHOST_SHIRT_D", "GHOST_SHIRT_N", "GHOST_SHIRT_S"],
    },
    "PANTS": {
        "full_name": "GHOST_PANTS",
        "category": "CLOTHING",
        "gta_slot": "lowr",
        "target_ydd": "lowr_001_u.ydd",
        "material_primary": "MAT_Tactical_Ripstop_Black",
        "textures": ["GHOST_PANTS_D", "GHOST_PANTS_N", "GHOST_PANTS_S"],
    },
    "VEST": {
        "full_name": "GHOST_VEST",
        "category": "ACCESSORY",
        "gta_slot": "accs",
        "target_ydd": "accs_001_u.ydd",
        "material_primary": "MAT_Cordura_Black",
        "textures": ["GHOST_VEST_D", "GHOST_VEST_N", "GHOST_VEST_S"],
    },
    "MASK": {
        "full_name": "GHOST_MASK",
        "category": "ACCESSORY",
        "gta_slot": "berd",
        "target_ydd": "berd_001_u.ydd",
        "material_primary": "MAT_Tactical_Polymer",
        "textures": ["GHOST_MASK_D", "GHOST_MASK_N", "GHOST_MASK_S"],
    },
    "HOOD": {
        "full_name": "GHOST_HOOD",
        "category": "CLOTHING",
        "gta_slot": "p_head",
        "target_ydd": "p_head_001.ydd",
        "material_primary": "MAT_Tactical_Ripstop_Black",
        "textures": ["GHOST_HOOD_D", "GHOST_HOOD_N", "GHOST_HOOD_S"],
    },
    "BOOTS": {
        "full_name": "GHOST_BOOTS",
        "category": "CLOTHING",
        "gta_slot": "feet",
        "target_ydd": "feet_001_u.ydd",
        "material_primary": "MAT_Leather_Black",
        "textures": ["GHOST_BOOTS_D", "GHOST_BOOTS_N", "GHOST_BOOTS_S"],
    },
    "GLOVES": {
        "full_name": "GHOST_GLOVES",
        "category": "CLOTHING",
        "gta_slot": "hand",
        "target_ydd": "hand_001_u.ydd",
        "material_primary": "MAT_Leather_Black",
        "textures": ["GHOST_GLOVES_D", "GHOST_GLOVES_N", "GHOST_GLOVES_S"],
    },
    "BELT": {
        "full_name": "GHOST_BELT",
        "category": "ACCESSORY",
        "gta_slot": "accs",
        "target_ydd": "accs_002_u.ydd",
        "material_primary": "MAT_Cordura_Black",
        "textures": ["GHOST_BELT_D", "GHOST_BELT_N", "GHOST_BELT_S"],
    },
    "GOGGLES": {
        "full_name": "GHOST_GOGGLES",
        "category": "ACCESSORY",
        "gta_slot": "p_eyes",
        "target_ydd": "p_eyes_001.ydd",
        "material_primary": "MAT_Glass_Dark",
        "textures": ["GHOST_GOGGLES_D", "GHOST_GOGGLES_N", "GHOST_GOGGLES_S"],
    },
    "HEADSET": {
        "full_name": "GHOST_HEADSET",
        "category": "ACCESSORY",
        "gta_slot": "p_ears",
        "target_ydd": "p_ears_001.ydd",
        "material_primary": "MAT_Tactical_Polymer",
        "textures": ["GHOST_HEADSET_D", "GHOST_HEADSET_N", "GHOST_HEADSET_S"],
    },
}


def audit_scene_naming():
    """Non-destructive audit of all mesh objects and materials in the scene."""
    print("\n==============================================")
    print("BLACKOUT GHOST // RUNNING SCRIPT 03: NAMING QA")
    print("==============================================")

    matched_assets = 0
    warnings = 0

    print("\n--- Auditing Mesh Objects ---")
    mesh_objects = [o for o in bpy.data.objects if o.type == 'MESH']
    if not mesh_objects:
        print("  [INFO] No mesh objects present in the scene yet.")
    else:
        for obj in mesh_objects:
            obj_upper = obj.name.upper()
            found_component = False
            for key, info in CANONICAL_OUTFIT_COMPONENTS.items():
                if key in obj_upper:
                    found_component = True
                    matched_assets += 1
                    if obj.name.startswith("LP_GHOST_") or obj.name.startswith("HP_GHOST_"):
                        print(f"  [PASS] Mesh '{obj.name}' conforms to canonical standard.")
                    else:
                        print(f"  [WARNING] Mesh '{obj.name}' detected as {key} but lacks LP_GHOST_ or HP_GHOST_ prefix.")
                        warnings += 1
                    break
            if not found_component and not obj.name.startswith("REF_"):
                print(f"  [INFO] Custom / scratch mesh: '{obj.name}' (untracked in canonical list).")

    print("\n--- Auditing Materials ---")
    if not bpy.data.materials:
        print("  [INFO] No materials present in the scene yet.")
    else:
        for mat in bpy.data.materials:
            if mat.name.startswith("MAT_"):
                print(f"  [PASS] Material '{mat.name}' adheres to MAT_ prefix.")
            else:
                print(f"  [WARNING] Material '{mat.name}' is missing MAT_ prefix.")
                warnings += 1

    print(f"\n[NAMING QA SUMMARY] Matched canonical assets: {matched_assets} | Warnings: {warnings}")
    if warnings == 0:
        print("[NAMING QA RESULT] PASS: Scene conforms to Blackout naming standards.\n")
    else:
        print("[NAMING QA RESULT] WARNING: Review flagged naming anomalies above.\n")


def rename_object_safely(obj, asset_key, is_high_poly=False):
    """
    Safely renames an existing mesh object and its underlying mesh data to canonical naming.
    """
    if not obj or obj.type != 'MESH':
        print(f"[RENAME ERROR] Invalid mesh object: {obj}")
        return False

    key = asset_key.upper()
    if key not in CANONICAL_OUTFIT_COMPONENTS:
        print(f"[RENAME ERROR] Unknown asset key: '{asset_key}'. Valid keys: {list(CANONICAL_OUTFIT_COMPONENTS.keys())}")
        return False

    prefix = "HP_GHOST_" if is_high_poly else "LP_GHOST_"
    canonical_name = f"{prefix}{key}"
    old_name = obj.name
    obj.name = canonical_name
    if obj.data:
        obj.data.name = f"MESH_{prefix}{key}"

    print(f"[RENAME OK] '{old_name}' -> '{canonical_name}' (Mesh data: '{obj.data.name}').")
    return True


if __name__ == "__main__":
    audit_scene_naming()
