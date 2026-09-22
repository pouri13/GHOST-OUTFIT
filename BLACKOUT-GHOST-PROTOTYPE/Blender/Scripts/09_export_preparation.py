"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 09: Export Pre-Flight Audit & Inspection
Target: Blender 3.6 LTS / 4.x
Compatible Target: Franklin Clinton (GTA V PC)
=============================================================================

STATUS CLASSIFICATION:
  [X] READY NOW: Python audit code verified against standard Blender bpy API.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES SOLLUMZ: Final conversion into .ydd/.ytd requires Sollumz addon.
  [ ] REQUIRES GTA V: Final in-game testing in OpenIV and GTA V.

SAFETY PRINCIPLE:
  AUDIT FIRST — NEVER MUTATE WITHOUT EXPLICIT PERMISSION.
  - Does NOT automatically decimate meshes.
  - Does NOT automatically apply transforms without reporting.
  - Does NOT delete geometry or duplicate scenes.
=============================================================================
"""

import bpy


def audit_export_readiness(obj):
    """
    Comprehensive non-destructive pre-flight audit for GTA V Sollumz export candidates.
    Checks:
      1. Mesh Type & Object Naming
      2. Collection Placement
      3. Object Transforms (Location, Rotation, Scale)
      4. UV Layers & Primary Name
      5. Assigned Materials
      6. Armature Modifier Binding
      7. Vertex Group Weight Constraints
      8. Triangle Count Budget
    """
    if not obj or obj.type != 'MESH':
        print(f"[PREFLIGHT ERROR] Object '{obj}' is not a valid mesh.")
        return False

    print(f"\n=======================================================")
    print(f"BLACKOUT GHOST // EXPORT PRE-FLIGHT AUDIT: {obj.name}")
    print(f"=======================================================")

    failures = 0
    warnings = 0

    # 1. Naming & Type
    print("\n--- [1] Object Identity & Naming ---")
    if obj.name.startswith("LP_GHOST_") or obj.name.startswith("HP_GHOST_"):
        print(f"  [PASS] Name conforms to canonical pattern: '{obj.name}'")
    else:
        print(f"  [WARNING] Name '{obj.name}' does not start with LP_GHOST_ or HP_GHOST_.")
        warnings += 1

    # 2. Collection Placement
    print("\n--- [2] Collection Placement ---")
    parent_cols = [c.name for c in bpy.data.collections if obj.name in c.objects]
    if parent_cols:
        print(f"  [PASS] Located in collection(s): {', '.join(parent_cols)}")
    else:
        print("  [WARNING] Object is not linked to any specific production collection.")
        warnings += 1

    # 3. Transform Status
    print("\n--- [3] Transform Calibration ---")
    loc_err = any(abs(v) > 0.0001 for v in obj.location)
    rot_err = any(abs(v) > 0.0001 for v in obj.rotation_euler)
    scale_err = any(abs(v - 1.0) > 0.0001 for v in obj.scale)

    if loc_err or rot_err or scale_err:
        print(f"  [FAIL] Unapplied transforms detected! Must apply before export.")
        print(f"         Location: ({obj.location.x:.3f}, {obj.location.y:.3f}, {obj.location.z:.3f})")
        print(f"         Rotation: ({obj.rotation_euler.x:.3f}, {obj.rotation_euler.y:.3f}, {obj.rotation_euler.z:.3f})")
        print(f"         Scale:    ({obj.scale.x:.3f}, {obj.scale.y:.3f}, {obj.scale.z:.3f})")
        failures += 1
    else:
        print("  [PASS] Transforms zeroed (Location = 0, Rotation = 0, Scale = 1.0).")

    # 4. UV Configuration
    print("\n--- [4] UV Layer Inspection ---")
    if not obj.data.uv_layers:
        print("  [FAIL] Object has NO UV layers! Must be unwrapped before export.")
        failures += 1
    else:
        primary_uv = obj.data.uv_layers[0]
        if primary_uv.name == "UVMap":
            print(f"  [PASS] Primary UV map verified: '{primary_uv.name}'")
        else:
            print(f"  [WARNING] Primary UV layer is named '{primary_uv.name}' (Standard convention: 'UVMap').")
            warnings += 1

    # 5. Materials
    print("\n--- [5] Material Slots ---")
    if not obj.material_slots:
        print("  [FAIL] No material assigned to object!")
        failures += 1
    else:
        for idx, slot in enumerate(obj.material_slots):
            if slot.material:
                sollumz_tag = slot.material.get("sollumz_status", "NOT_TAGGED")
                print(f"  [PASS] Slot {idx}: '{slot.material.name}' (Sollumz Status: {sollumz_tag})")
            else:
                print(f"  [FAIL] Slot {idx} is empty (no material assigned).")
                failures += 1

    # 6. Armature Binding
    print("\n--- [6] Armature Rig Binding ---")
    bound_armature = None
    for m in obj.modifiers:
        if m.type == 'ARMATURE' and m.object:
            bound_armature = m.object
            break

    if bound_armature:
        print(f"  [PASS] Bound to armature: '{bound_armature.name}'")
    else:
        print("  [FAIL] Missing Armature modifier! RAGE engine requires skeleton binding for apparel.")
        failures += 1

    # 7. Skinning Influences
    print("\n--- [7] Skinning & Vertex Groups ---")
    if not obj.vertex_groups:
        print("  [FAIL] Object has NO vertex groups (no bone weights).")
        failures += 1
    else:
        unweighted = 0
        over_four = 0
        for v in obj.data.vertices:
            inf = len(v.groups)
            if inf == 0:
                unweighted += 1
            elif inf > 4:
                over_four += 1

        if unweighted > 0:
            print(f"  [FAIL] {unweighted} unweighted vertices detected (will cause vertex spikes in GTA V).")
            failures += 1
        elif over_four > 0:
            print(f"  [FAIL] {over_four} vertices have > 4 influences (exceeds RAGE buffer limit).")
            failures += 1
        else:
            print(f"  [PASS] Vertex weights valid: 0 unweighted, all vertices <= 4 influences.")

    # 8. Geometry Budget
    print("\n--- [8] Geometry & Polygon Budget ---")
    tri_count = sum(len(f.vertices) - 2 for f in obj.data.polygons)
    vert_count = len(obj.data.vertices)
    print(f"  Polycount: {vert_count:,} Vertices | {tri_count:,} Triangles")
    if tri_count > 25000:
        print(f"  [WARNING] Triangle count ({tri_count:,}) is high for a single apparel piece.")
        warnings += 1
    else:
        print("  [PASS] Triangle count within normal GTA V budget range.")

    # Summary
    print("\n=======================================================")
    print(f"AUDIT SUMMARY FOR '{obj.name}':")
    print(f"  Failures: {failures} | Warnings: {warnings}")
    if failures == 0:
        print("RESULT: PASS — Asset is clean and ready for Phase D (Sollumz Packaging).")
    else:
        print("RESULT: FAIL — Resolve the failure items above before attempting Sollumz export.")
    print("=======================================================\n")

    return failures == 0


def run_active_export_preflight():
    obj = bpy.context.active_object
    if not obj:
        print("[PREFLIGHT ERROR] Select a target mesh object in Blender to inspect.")
        return
    audit_export_readiness(obj)


if __name__ == "__main__":
    run_active_export_preflight()
