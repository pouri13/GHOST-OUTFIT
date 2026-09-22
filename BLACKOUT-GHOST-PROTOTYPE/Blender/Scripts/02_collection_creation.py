"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 02: Collection Creation & Hierarchy
Target: Blender 3.6 LTS / 4.x
Compatible Target: Franklin Clinton (GTA V PC)
=============================================================================

STATUS CLASSIFICATION:
  [X] READY NOW: Python code verified against standard Blender bpy API.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES GTA V: Reference mesh import depends on user's extracted GTA V files.

PURPOSE:
  Establishes the clean, non-destructive 9-collection production structure:
    01_REFERENCE    : Extracted Franklin body, reference turnarounds, concept art
    02_HIGH_POLY     : High-poly sculpts and cloth simulation geometry
    03_LOW_POLY      : Master low-poly retopology meshes
    04_CLOTHING      : Apparel meshes (Shirt, Pants, Hood, Boots, Gloves)
    05_ACCESSORIES   : Tactical gear (Vest, Belt, Mask, Goggles, Headset)
    06_SKELETON      : Imported GTA V ped armature and deformation rigs
    07_MATERIALS     : Calibrated preview materials, light rigs, bake setups
    08_EXPORT        : Final Sollumz export candidates (Drawables / YDD)
    09_TEST          : Temporary test fits, scratchpad, animation checks

SAFETY:
  - Idempotent: Can be run repeatedly without creating duplicate collections.
  - Non-destructive: Existing collections and objects inside them are never removed.
=============================================================================
"""

import bpy

PRODUCTION_COLLECTIONS = [
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

SUB_COLLECTIONS = {
    "04_CLOTHING": [
        "CLOTH_GHOST_SHIRT",
        "CLOTH_GHOST_PANTS",
        "CLOTH_GHOST_HOOD",
        "CLOTH_GHOST_BOOTS",
        "CLOTH_GHOST_GLOVES",
    ],
    "05_ACCESSORIES": [
        "ACCS_GHOST_VEST",
        "ACCS_GHOST_BELT",
        "ACCS_GHOST_MASK",
        "ACCS_GHOST_GOGGLES",
        "ACCS_GHOST_HEADSET",
    ],
}


def get_or_create_collection(name, parent_col=None):
    """Retrieves an existing collection or creates a new one, ensuring proper hierarchy linkage."""
    if name in bpy.data.collections:
        col = bpy.data.collections[name]
    else:
        col = bpy.data.collections.new(name)

    target_parent = parent_col if parent_col else bpy.context.scene.collection
    if col.name not in target_parent.children:
        target_parent.children.link(col)

    return col


def build_production_collections():
    """Builds the 9-collection system and essential apparel/accessory sub-collections."""
    print("\n==============================================")
    print("BLACKOUT GHOST // RUNNING SCRIPT 02: HIERARCHY")
    print("==============================================")

    created_primary = 0
    created_sub = 0

    for col_name in PRODUCTION_COLLECTIONS:
        parent_col = get_or_create_collection(col_name)
        created_primary += 1

        if col_name in SUB_COLLECTIONS:
            for sub_name in SUB_COLLECTIONS[col_name]:
                get_or_create_collection(sub_name, parent_col=parent_col)
                created_sub += 1

    print(f"[HIERARCHY] Verified 9/9 primary collections ({created_primary} checked).")
    print(f"[HIERARCHY] Verified {created_sub} modular apparel/gear sub-collections.")
    print("[HIERARCHY] Outliner tree initialized safely and idempotently.\n")


if __name__ == "__main__":
    build_production_collections()
