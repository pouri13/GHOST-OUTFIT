"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 10: Master Batch Quality Assurance Inspector
Target: Blender 3.6 LTS / 4.x
Compatible Target: Franklin Clinton (GTA V PC)
=============================================================================

STATUS CLASSIFICATION:
  [X] READY NOW: Non-destructive batch inspector verified on Blender bpy API.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES SOLLUMZ: Sollumz drawable conversion occurs in Phase D.
  [ ] REQUIRES GTA V: In-game pedestrian animation & deformation test.

CRITICAL PIPELINE TRUTH:
  - NON-DESTRUCTIVE: Inspects all scene meshes without modifying geometry,
    transforms, UVs, or weights.
  - HONEST REPORTING: Output flags items as PASS, WARNING, or FAIL.
  - NO FALSE CLAIMS: Passing this batch check confirms clean Blender data,
    but does NOT guarantee GTA V in-game compatibility without in-game testing.
=============================================================================
"""

import bpy


def inspect_single_mesh(obj):
    """
    Performs comprehensive, read-only analysis of a single mesh object.
    Returns a result record dict.
    """
    me = obj.data
    tri_count = sum(len(f.vertices) - 2 for f in me.polygons)
    vert_count = len(me.vertices)

    # Transforms
    loc_clean = not any(abs(v) > 0.0001 for v in obj.location)
    rot_clean = not any(abs(v) > 0.0001 for v in obj.rotation_euler)
    scale_clean = not any(abs(v - 1.0) > 0.0001 for v in obj.scale)
    transforms_ok = loc_clean and rot_clean and scale_clean

    # UVs
    has_uv = bool(me.uv_layers)
    uv_named_correctly = has_uv and (me.uv_layers[0].name == "UVMap")

    # Materials
    has_materials = bool(obj.material_slots and any(s.material for s in obj.material_slots))
    mat_names = [s.material.name for s in obj.material_slots if s.material]

    # Armature
    bound_armature = None
    for m in obj.modifiers:
        if m.type == 'ARMATURE' and m.object:
            bound_armature = m.object.name
            break

    # Vertex Groups & Influences
    has_vgroups = bool(obj.vertex_groups)
    unweighted = 0
    over_four = 0
    for v in me.vertices:
        inf = len(v.groups)
        if inf == 0:
            unweighted += 1
        elif inf > 4:
            over_four += 1

    weights_ok = has_vgroups and (unweighted == 0) and (over_four == 0)

    # Determine Status
    reasons = []
    if not transforms_ok:
        reasons.append("Unapplied transforms")
    if not has_uv:
        reasons.append("Missing UVMap")
    elif not uv_named_correctly:
        reasons.append(f"UV named '{me.uv_layers[0].name}' instead of 'UVMap'")
    if not has_materials:
        reasons.append("No material assigned")
    if not bound_armature:
        reasons.append("No armature modifier")
    if not has_vgroups:
        reasons.append("No vertex groups")
    elif unweighted > 0:
        reasons.append(f"{unweighted} unweighted verts")
    elif over_four > 0:
        reasons.append(f"{over_four} verts with >4 influences")

    if not has_uv or unweighted > 0 or over_four > 0:
        status = "FAIL"
    elif not transforms_ok or not bound_armature or not has_materials or not uv_named_correctly:
        status = "WARNING"
    else:
        status = "PASS"

    return {
        "name": obj.name,
        "status": status,
        "vertices": vert_count,
        "triangles": tri_count,
        "transforms_ok": transforms_ok,
        "has_uv": has_uv,
        "uv_name": me.uv_layers[0].name if has_uv else "None",
        "materials": mat_names,
        "armature": bound_armature or "None",
        "vgroups_count": len(obj.vertex_groups),
        "unweighted": unweighted,
        "over_four": over_four,
        "reasons": reasons,
    }


def run_batch_qa():
    print("\n==================================================================")
    print("BLACKOUT GHOST // SCRIPT 10: MASTER BATCH QUALITY ASSURANCE")
    print("==================================================================")
    print("[MODE] Read-only, non-destructive scene audit.\n")

    # Gather production meshes
    target_collections = ["04_CLOTHING", "05_ACCESSORIES", "03_LOW_POLY", "08_EXPORT"]
    mesh_objects = []

    for col_name in target_collections:
        col = bpy.data.collections.get(col_name)
        if col:
            for obj in col.all_objects:
                if obj.type == 'MESH' and obj not in mesh_objects:
                    mesh_objects.append(obj)

    # Fallback to all scene meshes if production collections are empty
    if not mesh_objects:
        mesh_objects = [o for o in bpy.data.objects if o.type == 'MESH' and not o.name.startswith("REF_")]

    if not mesh_objects:
        print("[BATCH QA NOTICE] No candidate mesh objects found in scene to evaluate.")
        print("Import or model tactical apparel meshes to execute batch QA.")
        return

    print(f"Inspecting {len(mesh_objects)} mesh object(s):\n")

    results = []
    pass_count = 0
    warn_count = 0
    fail_count = 0
    total_triangles = 0

    for obj in mesh_objects:
        rec = inspect_single_mesh(obj)
        results.append(rec)
        total_triangles += rec["triangles"]

        if rec["status"] == "PASS":
            pass_count += 1
            print(f"  [PASS]    {rec['name']:<25} | Tris: {rec['triangles']:>6,} | Armature: {rec['armature']}")
        elif rec["status"] == "WARNING":
            warn_count += 1
            issues = "; ".join(rec["reasons"])
            print(f"  [WARNING] {rec['name']:<25} | Tris: {rec['triangles']:>6,} | {issues}")
        else:
            fail_count += 1
            issues = "; ".join(rec["reasons"])
            print(f"  [FAIL]    {rec['name']:<25} | Tris: {rec['triangles']:>6,} | {issues}")

    # Summary Card
    print("\n==================================================================")
    print("BATCH QUALITY ASSURANCE AUDIT REPORT CARD")
    print("==================================================================")
    print(f"  Total Meshes Audited:     {len(results)}")
    print(f"  Combined Triangle Count:  {total_triangles:,} Tris")
    print(f"  PASS:                     {pass_count}")
    print(f"  WARNING:                  {warn_count}")
    print(f"  FAIL:                     {fail_count}")
    print("------------------------------------------------------------------")

    if fail_count > 0:
        print("OVERALL STATUS: FAIL (Resolve fatal weight/UV errors prior to export)")
    elif warn_count > 0:
        print("OVERALL STATUS: ACTION REQUIRED (Apply transforms / configure armatures)")
    else:
        print("OVERALL STATUS: PASS (Scene data structures meet Blender modeling standards)")

    print("\n[MANDATORY ACCURACY NOTICE]")
    print("This QA check verifies clean geometry and Blender data structures.")
    print("It does NOT certify in-game GTA V functionality.")
    print("In-game certification requires CodeWalker inspection and GTA V playtesting.")
    print("==================================================================\n")


if __name__ == "__main__":
    run_batch_qa()
