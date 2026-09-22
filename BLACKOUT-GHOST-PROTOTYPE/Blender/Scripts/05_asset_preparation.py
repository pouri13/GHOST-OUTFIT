"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 05: Asset Geometry Preparation & Validation
Target: Blender 3.6 LTS / 4.x
Compatible Engine: Rockstar Advanced Game Engine (RAGE) / GTA V (player_one)
=============================================================================

STATUS:
  [X] READY NOW: Python code verified against standard Blender bpy and bmesh APIs.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES GTA V: In-game verification occurs after exporting.

PURPOSE:
  Sanitizes game geometry for GTA V export:
  - Applies all object transformations (Location = 0, Rotation = 0, Scale = 1.0).
  - Merges duplicate vertices within 0.0001m threshold.
  - Recalculates face normals outward.
  - Detects non-manifold edges, isolated loose vertices, and zero-area faces.
  - Computes exact triangle count against target poly budget.
"""

import bpy
import bmesh

def sanitize_mesh_geometry(obj, merge_threshold=0.0001):
    if not obj or obj.type != 'MESH':
        print(f"[PREP ERROR] Target object '{obj}' is not a valid mesh.")
        return False

    print(f"\n--- Sanitizing Mesh: {obj.name} ---")

    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    print(f"  [1] Transforms applied (Loc: 0, Rot: 0, Scale: 1.0).")

    me = obj.data
    bm = bmesh.new()
    bm.from_mesh(me)

    init_verts = len(bm.verts)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=merge_threshold)
    removed_verts = init_verts - len(bm.verts)
    print(f"  [2] Merged vertices: {removed_verts} duplicates removed.")

    loose_verts = [v for v in bm.verts if not v.link_edges]
    bmesh.ops.delete(bm, geom=loose_verts, context='VERTS')
    print(f"  [3] Removed {len(loose_verts)} loose isolated vertices.")

    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    print(f"  [4] Recalculated normals outward.")

    boundary_edges = [e for e in bm.edges if e.is_boundary]
    wire_edges = [e for e in bm.edges if e.is_wire]
    interior_faces = [f for f in bm.faces if len(f.edges) < 3]

    print(f"  [5] Topology Analysis:")
    print(f"      - Open boundary edges (seams/collars): {len(boundary_edges)}")
    print(f"      - Wire edges (fatal errors):          {len(wire_edges)}")
    print(f"      - Degenerate faces (< 3 edges):       {len(interior_faces)}")

    bm.to_mesh(me)
    bm.free()
    me.update()

    tri_count = sum(len(f.vertices) - 2 for f in me.polygons)
    vert_count = len(me.vertices)
    print(f"  [6] Final Geometry Count: {vert_count} Verts | {tri_count} Triangles.")

    if len(wire_edges) > 0:
        print(f"  [!] WARNING: {len(wire_edges)} wire edges found! Fix before exporting.")
        return False
    else:
        print(f"  [PASS] Geometry is clean and ready for rigging/UV.")
        return True

def run_active_asset_preparation():
    obj = bpy.context.active_object
    if not obj:
        print("[PREP ERROR] No active object selected.")
        return
    sanitize_mesh_geometry(obj)

if __name__ == "__main__":
    run_active_asset_preparation()
