"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 02: Collection Creation & Hierarchy
Target: Blender 3.6 LTS / 4.x
Compatible Engine: Rockstar Advanced Game Engine (RAGE) / GTA V (player_one)
=============================================================================

STATUS:
  [X] READY NOW: Python code verified against standard Blender bpy API.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES GTA V: Reference mesh import depends on user's extracted GTA V files.

PURPOSE:
  Establishes the strict organizational collection tree required for GTA V
  multi-slot character modeling. Separates high-poly sculpts, low-poly game
  geometry, Franklin Clinton reference rigs, collision helpers, and export batches.
"""

import bpy

COLLECTION_HIERARCHY = {
    "BLACKOUT_GHOST_MASTER": {
        "00_REFERENCES": {
            "REF_Franklin_Body_player_one": {},
            "REF_Franklin_Skeleton_Armature": {},
            "REF_Turnaround_Orthos": {},
        },
        "01_HIGH_POLY_SCULPTS": {
            "HP_Head_Gear": {},
            "HP_Torso_Layers": {},
            "HP_Legs_Footwear": {},
            "HP_Hard_Surface_Props": {},
        },
        "02_LOW_POLY_PRODUCTION": {
            "LP_GHOST_SHIRT": {},
            "LP_GHOST_PANTS": {},
            "LP_GHOST_VEST": {},
            "LP_GHOST_MASK": {},
            "LP_GHOST_HOOD": {},
            "LP_GHOST_BOOTS": {},
            "LP_GHOST_GLOVES": {},
            "LP_GHOST_BELT": {},
            "LP_GHOST_GOGGLES": {},
            "LP_GHOST_HEADSET": {},
        },
        "03_ARMATURE_RIGS": {
            "RIG_Deform_Skel_Ped": {},
            "RIG_Weight_Transfer_Proxy": {},
        },
        "04_SOLLUMZ_EXPORT_READY": {
            "EXPORT_jbib_shirt": {},
            "EXPORT_lowr_pants": {},
            "EXPORT_accs_vest": {},
            "EXPORT_berd_mask": {},
            "EXPORT_p_head_hood": {},
            "EXPORT_feet_boots": {},
            "EXPORT_hand_gloves": {},
            "EXPORT_accs_belt": {},
            "EXPORT_p_eyes_goggles": {},
            "EXPORT_p_ears_headset": {},
        },
        "05_LODS": {
            "LOD1_Medium_Distance": {},
            "LOD2_Far_Distance": {},
        }
    }
}

def get_or_create_collection(name, parent_col=None):
    if name in bpy.data.collections:
        col = bpy.data.collections[name]
        if parent_col and col.name not in parent_col.children:
            parent_col.children.link(col)
        return col
    else:
        col = bpy.data.collections.new(name)
        if parent_col:
            parent_col.children.link(col)
        else:
            bpy.context.scene.collection.children.link(col)
        return col

def build_hierarchy(tree, parent_col=None):
    for col_name, sub_tree in tree.items():
        col = get_or_create_collection(col_name, parent_col)
        if sub_tree:
            build_hierarchy(sub_tree, col)

def run_collection_setup():
    print("\n==============================================")
    print("BLACKOUT GHOST // RUNNING SCRIPT 02: HIERARCHY")
    print("==============================================")
    build_hierarchy(COLLECTION_HIERARCHY)
    print("[HIERARCHY] 100% of the Blackout Ghost collection tree created.\n")

if __name__ == "__main__":
    run_collection_setup()
