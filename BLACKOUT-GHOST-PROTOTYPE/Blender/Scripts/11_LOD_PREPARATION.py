"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 11: Controlled Level of Detail (LOD) Workflow
Target: Blender 3.6 LTS / 4.x
Compatible Target: Franklin Clinton (GTA V PC)
=============================================================================

STATUS CLASSIFICATION:
  [X] READY NOW: Python script verified against Blender bpy API.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES SOLLUMZ: Multi-LOD packaging inside .ydd containers happens in Sollumz.
  [ ] REQUIRES GTA V: In-game streaming distance and pop-in verification.

PURPOSE & SAFETY:
  - CONTROLLED WORKFLOW: LOD reduction is NEVER performed automatically.
  - NON-DESTRUCTIVE: The master production mesh (LOD0) is NEVER decimated.
  - SEPARATION: Generates explicit duplicate meshes for LOD1 (Medium Distance)
    and LOD2 (Far Distance) in a dedicated collection.
  - ARTIST CONTROL: The artist can visually inspect silhouette preservation
    and adjust decimate ratios before committing.
=============================================================================
"""

import bpy


def generate_controlled_lod_mesh(base_obj, lod_level="LOD1", decimate_ratio=0.50):
    """
    Safely generates a duplicate LOD mesh with an unapplied Decimate modifier,
    allowing the artist to visually inspect silhouette changes and edge collapse.
    """
    if not base_obj or base_obj.type != 'MESH':
        print(f"[LOD ERROR] '{base_obj}' is not a valid mesh.")
        return None

    lod_name = f"{base_obj.name}_{lod_level}"
    print(f"\n[LOD WORKFLOW] Generating controlled {lod_level} for '{base_obj.name}'...")

    # Ensure target LOD collection exists
    lod_col_name = "08_EXPORT"
    target_col = bpy.data.collections.get(lod_col_name) or bpy.context.scene.collection

    # Duplicate mesh data cleanly
    new_mesh = base_obj.data.copy()
    new_mesh.name = f"MESH_{lod_name}"

    lod_obj = base_obj.copy()
    lod_obj.data = new_mesh
    lod_obj.name = lod_name

    target_col.objects.link(lod_obj)

    # Add decimate modifier for inspection (NOT auto-applied)
    mod = lod_obj.modifiers.new(name=f"{lod_level}_Decimate", type='DECIMATE')
    mod.ratio = decimate_ratio

    base_tris = sum(len(f.vertices) - 2 for f in base_obj.data.polygons)
    target_tris = int(base_tris * decimate_ratio)

    print(f"  --> Created: '{lod_obj.name}' linked to collection '{target_col.name}'")
    print(f"  --> Decimate Ratio: {decimate_ratio * 100:.0f}%")
    print(f"  --> Estimated Triangles: {base_tris:,} -> ~{target_tris:,} Tris")
    print("  --> SAFETY NOTICE: Modifier is unapplied. Inspect silhouette in 3D Viewport before applying.")

    return lod_obj


def generate_full_lod_suite(base_obj, lod1_ratio=0.50, lod2_ratio=0.25):
    """
    Generates both Medium (LOD1) and Low/Far (LOD2) candidate meshes for a tactical component.
    """
    if not base_obj:
        print("[LOD ERROR] Select an active clothing mesh first.")
        return

    print("=======================================================")
    print(f"BLACKOUT GHOST // CONTROLLED LOD SUITE: {base_obj.name}")
    print("=======================================================")

    lod1 = generate_controlled_lod_mesh(base_obj, lod_level="LOD1", decimate_ratio=lod1_ratio)
    lod2 = generate_controlled_lod_mesh(base_obj, lod_level="LOD2", decimate_ratio=lod2_ratio)

    print("\n[LOD SUITE GENERATED]")
    print(f"  LOD0 (High Detail - Master): {base_obj.name}")
    print(f"  LOD1 (Medium Distance):      {lod1.name if lod1 else 'Failed'}")
    print(f"  LOD2 (Far Distance):         {lod2.name if lod2 else 'Failed'}")
    print("=======================================================\n")


def run_lod_generation():
    obj = bpy.context.active_object
    if not obj or obj.type != 'MESH':
        print("[LOD ERROR] Select the low-poly master apparel mesh in Blender to create LODs.")
        return
    generate_full_lod_suite(obj)


if __name__ == "__main__":
    run_lod_generation()
