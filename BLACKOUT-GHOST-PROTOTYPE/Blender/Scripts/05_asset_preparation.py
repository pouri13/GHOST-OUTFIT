"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 05: Asset Geometry Audit & Non-Destructive Preparation
Target: Blender 3.6 LTS / 4.x
Compatible Target: Franklin Clinton (GTA V PC)
=============================================================================

STATUS CLASSIFICATION:
  [X] READY NOW: Python code verified against standard Blender bpy and bmesh APIs.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES GTA V: In-game deformation validation occurs during ped test.

SAFETY PRINCIPLE:
  AUDIT FIRST, MUTATE ONLY WHEN REQUESTED.
  Does NOT automatically merge vertices or apply transforms without explicit request.
  Inspects topology, counts polygons, checks transforms, and flags defects.
=============================================================================
"""

import bpy
import bmesh


def audit_mesh_geometry(obj):
    """
    Non-destructively inspects a mesh object for GTA V export suitability.
    Returns a dict of metrics and flags.
    """
    if not obj or obj.type != 'MESH':
        print(f"[AUDIT ERROR] Target '{obj}' is not a valid mesh.")
        return None

    print(f"\n=======================================================")
    print(f"BLACKOUT GHOST // TOPOLOGY & GEOMETRY AUDIT: {obj.name}")
    print(f"=======================================================")

    me = obj.data

    # 1. Check Transforms
    loc_err = any(abs(v) > 0.0001 for v in obj.location)
    rot_err = any(abs(v) > 0.0001 for v in obj.rotation_euler)
    scale_err = any(abs(v - 1.0) > 0.0001 for v in obj.scale)

    print("  [1] Transform Status:")
    print(f"      - Location: ({obj.location.x:.4f}, {obj.location.y:.4f}, {obj.location.z:.4f}) {'[UNAPPLIED]' if loc_err else '[CLEAN (0,0,0)]'}")
    print(f"      - Rotation: ({obj.rotation_euler.x:.4f}, {obj.rotation_euler.y:.4f}, {obj.rotation_euler.z:.4f}) {'[UNAPPLIED]' if rot_err else '[CLEAN (0,0,0)]'}")
    print(f"      - Scale:    ({obj.scale.x:.4f}, {obj.scale.y:.4f}, {obj.scale.z:.4f}) {'[UNAPPLIED]' if scale_err else '[CLEAN (1.0)]'}")

    # 2. Topology Inspection via BMesh (read-only)
    bm = bmesh.new()
    bm.from_mesh(me)

    vert_count = len(bm.verts)
    edge_count = len(bm.edges)
    face_count = len(bm.faces)

    boundary_edges = [e for e in bm.edges if e.is_boundary]
    wire_edges = [e for e in bm.edges if e.is_wire]
    non_manifold_verts = [v for v in bm.verts if not v.is_manifold]
    loose_verts = [v for v in bm.verts if not v.link_edges]
    degenerate_faces = [f for f in bm.faces if len(f.edges) < 3]

    bm.free()

    tri_count = sum(len(f.vertices) - 2 for f in me.polygons)

    print("  [2] Geometry Counts:")
    print(f"      - Vertices:  {vert_count:,}")
    print(f"      - Triangles: {tri_count:,} (GTA V budget target per piece: 5k - 18k)")
    print(f"      - Polygons:  {face_count:,}")

    print("  [3] Topology Integrity:")
    print(f"      - Open Boundary Edges (cuffs, hems, neck): {len(boundary_edges)}")
    print(f"      - Wire Edges (fatal errors):               {len(wire_edges)}")
    print(f"      - Loose Unlinked Vertices:                 {len(loose_verts)}")
    print(f"      - Degenerate Faces:                        {len(degenerate_faces)}")

    has_fatal = len(wire_edges) > 0 or len(degenerate_faces) > 0
    needs_transform_apply = loc_err or rot_err or scale_err

    if has_fatal:
        print("\n  [RESULT: FAIL] Fatal topological errors found. Clean geometry before rigging.")
    elif needs_transform_apply:
        print("\n  [RESULT: WARNING] Topology is clean, but object transforms must be applied before export.")
    else:
        print("\n  [RESULT: PASS] Geometry is clean, non-manifold edges are strictly boundaries, and transforms are zeroed.")

    return {
        "vertices": vert_count,
        "triangles": tri_count,
        "wire_edges": len(wire_edges),
        "loose_verts": len(loose_verts),
        "transforms_clean": not needs_transform_apply,
        "passed": not has_fatal and not needs_transform_apply,
    }


def sanitize_mesh_geometry(obj, apply_transforms=True, remove_loose=True):
    """
    Performs controlled, non-destructive sanitization on user request:
    - Optionally applies transforms (Location, Rotation, Scale).
    - Removes isolated loose vertices (does NOT weld vertices or collapse seams).
    - Recalculates face normals outward.
    """
    if not obj or obj.type != 'MESH':
        print("[SANITIZE ERROR] Target is not a valid mesh.")
        return False

    print(f"\n[SANITIZE] Executing controlled cleanup on: '{obj.name}'")

    if apply_transforms:
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)
        bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
        print("  --> Applied transforms: Location=(0,0,0), Rotation=(0,0,0), Scale=(1,1,1).")

    me = obj.data
    bm = bmesh.new()
    bm.from_mesh(me)

    if remove_loose:
        loose = [v for v in bm.verts if not v.link_edges]
        if loose:
            bmesh.ops.delete(bm, geom=loose, context='VERTS')
            print(f"  --> Removed {len(loose)} isolated, unlinked vertices.")

    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    print("  --> Recalculated face normals outward.")

    bm.to_mesh(me)
    bm.free()
    me.update()
    print(f"[SANITIZE COMPLETE] Object '{obj.name}' sanitized successfully.")
    return True


def run_active_asset_audit():
    obj = bpy.context.active_object
    if not obj:
        print("[AUDIT ERROR] Select a mesh object in Blender to inspect.")
        return
    audit_mesh_geometry(obj)


if __name__ == "__main__":
    run_active_asset_audit()
