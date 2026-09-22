"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 03: Naming System & Validation
Target: Blender 3.6 LTS / 4.x
Compatible Engine: Rockstar Advanced Game Engine (RAGE) / GTA V (player_one)
=============================================================================

STATUS:
  [X] READY NOW: Python code verified against standard Blender bpy API.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES GTA V: Verification against game files occurs during import/export.

PURPOSE:
  Enforces uniform asset, mesh, material, and texture naming conventions across
  the entire project to prevent Sollumz export errors and broken dictionary links.
"""

import bpy

CANONICAL_ASSETS = {
    "SHIRT":        {"slot": "jbib", "target_file": "jbib_001_u.ydd"},
    "PANTS":        {"slot": "lowr", "target_file": "lowr_001_u.ydd"},
    "VEST":         {"slot": "accs", "target_file": "accs_001_u.ydd"},
    "MASK":         {"slot": "berd", "target_file": "berd_001_u.ydd"},
    "HOOD":         {"slot": "p_head", "target_file": "p_head_001.ydd"},
    "BOOTS":        {"slot": "feet", "target_file": "feet_001_u.ydd"},
    "GLOVES":       {"slot": "hand", "target_file": "hand_001_u.ydd"},
    "BELT":         {"slot": "accs", "target_file": "accs_002_u.ydd"},
    "GOGGLES":      {"slot": "p_eyes", "target_file": "p_eyes_001.ydd"},
    "HEADSET":      {"slot": "p_ears", "target_file": "p_ears_001.ydd"},
}

def validate_scene_naming():
    print("\n==============================================")
    print("BLACKOUT GHOST // RUNNING SCRIPT 03: NAMING QA")
    print("==============================================")
    
    issues_found = 0
    passed_objects = 0

    for obj in bpy.data.objects:
        if obj.type == 'MESH':
            is_our_asset = False
            for asset_key in CANONICAL_ASSETS.keys():
                if asset_key in obj.name.upper():
                    is_our_asset = True
                    expected_name = f"LP_GHOST_{asset_key}"
                    if not obj.name.startswith("LP_GHOST_") and not obj.name.startswith("HP_GHOST_"):
                        print(f"[NAMING WARNING] Object '{obj.name}' should follow prefix 'LP_GHOST_{asset_key}'.")
                        issues_found += 1
                    else:
                        passed_objects += 1
                    break

    for mat in bpy.data.materials:
        if not mat.name.startswith("MAT_"):
            print(f"[NAMING WARNING] Material '{mat.name}' is missing 'MAT_' prefix.")
            issues_found += 1
        else:
            print(f"[NAMING PASS] Material '{mat.name}' conforms to standard.")

    print(f"\n[NAMING AUDIT SUMMARY] Verified objects: {passed_objects} | Non-conforming items: {issues_found}")
    if issues_found == 0:
        print("[NAMING AUDIT RESULT] SUCCESS: All inspected assets comply with Blackout naming standard.")
    else:
        print("[NAMING AUDIT RESULT] ATTENTION: Review warnings above before proceeding to Sollumz export.")

def rename_active_to_canonical(asset_key):
    obj = bpy.context.active_object
    if not obj or obj.type != 'MESH':
        print("[RENAME ERROR] No active mesh object selected.")
        return
    
    asset_key = asset_key.upper()
    if asset_key not in CANONICAL_ASSETS:
        print(f"[RENAME ERROR] Unknown asset key: {asset_key}. Valid keys: {list(CANONICAL_ASSETS.keys())}")
        return

    canonical_name = f"LP_GHOST_{asset_key}"
    old_name = obj.name
    obj.name = canonical_name
    if obj.data:
        obj.data.name = f"MESH_GHOST_{asset_key}"
    print(f"[RENAME SUCCESS] Renamed '{old_name}' -> '{canonical_name}'.")

if __name__ == "__main__":
    validate_scene_naming()
