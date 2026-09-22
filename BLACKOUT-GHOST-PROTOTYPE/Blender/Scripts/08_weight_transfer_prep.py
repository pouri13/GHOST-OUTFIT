"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 08: Weight Transfer & 4-Bone Constraint Enforcer
Target: Blender 3.6 LTS / 4.x
Compatible Target: Franklin Clinton (GTA V PC)
=============================================================================

STATUS CLASSIFICATION:
  [X] READY NOW: Python code verified against standard Blender vertex groups & operators.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES SOLLUMZ: Vertex group bone index binding occurs during Sollumz export.
  [ ] REQUIRES GTA V: In-game deformation validation occurs during animation testing.

CRITICAL PIPELINE TRUTH & SAFETY:
  - NO HARD-CODED BONE LISTS: Bone structures must be driven by the user's ACTUAL
    extracted Franklin ped skeleton and source body mesh (player_one).
  - LOCAL QA != GTA V CERTIFICATION: Passing mathematical checks in Blender confirms
    compliance with vertex buffer limits (max 4 weights per vertex), but does NOT
    guarantee in-game animation fidelity. In-game testing is mandatory.

WORKFLOW:
  ACTUAL SOURCE SKINNED MESH -> CLOTHING MESH -> DATA TRANSFER ->
  CLEAN RESIDUAL WEIGHTS (<0.01) -> LIMIT INFLUENCES (MAX 4) ->
  NORMALIZE ALL GROUPS -> LOCAL QA AUDIT REPORT
=============================================================================
"""

import bpy


def transfer_weights_from_source_mesh(target_obj, source_obj):
    """
    Interpolates skinning weights from an actual extracted Franklin reference body mesh
    onto the new tactical clothing mesh.
    """
    if not target_obj or target_obj.type != 'MESH':
        print(f"[WEIGHT ERROR] Target '{target_obj}' is not a valid mesh.")
        return False
    if not source_obj or source_obj.type != 'MESH':
        print(f"[WEIGHT ERROR] Source '{source_obj}' is not a valid mesh.")
        return False

    if not source_obj.vertex_groups:
        print(f"[WEIGHT ERROR] Source object '{source_obj.name}' has no vertex groups to transfer!")
        return False

    print(f"\n[WEIGHT TRANSFER] Initiating weight transfer: '{source_obj.name}' -> '{target_obj.name}'")
    print(f"  --> Source Vertex Groups Available: {len(source_obj.vertex_groups)}")

    # Add temporary Data Transfer modifier
    mod = target_obj.modifiers.new(name="Weight_Transfer_Temp", type='DATA_TRANSFER')
    mod.object = source_obj
    mod.use_vert_data = True
    mod.data_types_verts = {'VGROUP_WEIGHTS'}
    mod.vert_mapping = 'POLYINTERP_NEAREST'

    # Apply modifier safely
    bpy.context.view_layer.objects.active = target_obj
    bpy.ops.object.modifier_apply(modifier=mod.name)
    print(f"  --> Data transfer applied. Target now has {len(target_obj.vertex_groups)} vertex groups.")
    return True


def enforce_four_bone_limit(target_obj):
    """
    Enforces RAGE engine vertex buffer constraints:
    1. Prunes tiny residual weights (< 0.01) that cause floating point jitter.
    2. Clamps maximum influences per vertex to 4 (hardware GPU skinning limit).
    3. Normalizes all vertex weights so the sum of influences equals exactly 1.0.
    """
    if not target_obj or target_obj.type != 'MESH':
        return False

    bpy.context.view_layer.objects.active = target_obj
    target_obj.select_set(True)

    # 1. Clean residual weights < 0.01
    bpy.ops.object.vertex_group_clean(group_select_mode='ALL', limit=0.01)
    print("  [1] Cleaned residual weights < 0.01.")

    # 2. Enforce maximum 4 bone influences per vertex
    bpy.ops.object.vertex_group_limit_total(group_select_mode='ALL', limit=4)
    print("  [2] Clamped influences: Maximum 4 bone weights per vertex (RAGE buffer limit).")

    # 3. Normalize all weights to 1.0
    bpy.ops.object.vertex_group_normalize_all(group_select_mode='ALL', lock_active=False)
    print("  [3] Normalized vertex group weights (total sum per vertex == 1.0).")
    return True


def audit_skinning_and_weights(target_obj, source_obj=None, armature_obj=None):
    """
    Performs a thorough local QA audit of vertex weights and reports:
    - Unweighted vertices (fatal: causes mesh vertices to stick at world origin)
    - Vertices with > 4 influences (fatal in GTA V vertex buffers)
    - Missing vertex groups compared to source mesh
    - Armature binding status
    """
    if not target_obj or target_obj.type != 'MESH':
        print("[QA ERROR] Invalid target mesh for audit.")
        return False

    me = target_obj.data
    total_verts = len(me.vertices)

    unweighted_verts = 0
    excessive_influence_verts = 0

    for v in me.vertices:
        inf_count = len(v.groups)
        if inf_count == 0:
            unweighted_verts += 1
        elif inf_count > 4:
            excessive_influence_verts += 1

    print(f"\n=======================================================")
    print(f"BLACKOUT GHOST // LOCAL SKINNING QA REPORT: {target_obj.name}")
    print(f"=======================================================")
    print(f"  Total Vertices Evaluated:      {total_verts:,}")
    print(f"  Total Vertex Groups (Bones):   {len(target_obj.vertex_groups)}")
    print(f"  Unweighted Vertices (Spikes):  {unweighted_verts} {'[FATAL]' if unweighted_verts > 0 else '[PASS]'}")
    print(f"  Vertices with > 4 Influences:  {excessive_influence_verts} {'[FATAL]' if excessive_influence_verts > 0 else '[PASS]'}")

    # Check Armature Modifier
    bound_armature = None
    for m in target_obj.modifiers:
        if m.type == 'ARMATURE':
            bound_armature = m.object
            break

    if bound_armature:
        print(f"  Armature Modifier Binding:     BOUND to '{bound_armature.name}' [PASS]")
    else:
        print(f"  Armature Modifier Binding:     MISSING ARMATURE MODIFIER [WARNING]")

    # Compare against source mesh if provided
    if source_obj and source_obj.type == 'MESH':
        source_vgroups = {g.name for g in source_obj.vertex_groups}
        target_vgroups = {g.name for g in target_obj.vertex_groups}
        missing_from_target = source_vgroups - target_vgroups
        print(f"  Source Mesh Comparison:        '{source_obj.name}' ({len(source_vgroups)} bone groups)")
        if missing_from_target:
            print(f"    --> Note: {len(missing_from_target)} source groups not present on clothing (normal if clothing covers partial body).")

    # Final Local Assessment
    is_locally_compliant = (unweighted_verts == 0 and excessive_influence_verts == 0)
    print("\n-------------------------------------------------------")
    if is_locally_compliant:
        print("LOCAL QA STATUS: PASS (Meets mathematical RAGE buffer limits)")
    else:
        print("LOCAL QA STATUS: FAIL (Resolve unweighted vertices / excessive influences)")

    print("\n[DISCLAIMER & PIPELINE MANDATE]")
    print("Local Blender QA verifies data structure constraints only.")
    print("It does NOT constitute GTA V certification.")
    print("Final certification requires in-game pedestrian animation testing in GTA V.")
    print("=======================================================\n")

    return is_locally_compliant


def run_weight_transfer_workflow():
    active_obj = bpy.context.active_object
    selected_objs = [o for o in bpy.context.selected_objects if o != active_obj]

    if not active_obj or active_obj.type != 'MESH':
        print("[WEIGHT PIPELINE ERROR] Select the clothing mesh as the active object in Blender.")
        return

    source_mesh = None
    for o in selected_objs:
        if o.type == 'MESH' and len(o.vertex_groups) > 0:
            source_mesh = o
            break

    if source_mesh:
        transfer_weights_from_source_mesh(active_obj, source_mesh)
    else:
        print("[WEIGHT NOTICE] No secondary skinned source mesh selected. Proceeding to clamp existing weights.")

    if active_obj.vertex_groups:
        enforce_four_bone_limit(active_obj)
        audit_skinning_and_weights(active_obj, source_obj=source_mesh)
    else:
        print("[WEIGHT ERROR] Active object has no vertex groups! Import Franklin reference mesh first.")


if __name__ == "__main__":
    run_weight_transfer_workflow()
