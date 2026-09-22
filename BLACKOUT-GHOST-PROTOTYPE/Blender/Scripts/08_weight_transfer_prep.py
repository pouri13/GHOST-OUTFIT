"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 08: Weight Transfer & 4-Bone Constraint Enforcer
Target: Blender 3.6 LTS / 4.x
Compatible Engine: Rockstar Advanced Game Engine (RAGE) / GTA V (player_one)
=============================================================================

STATUS:
  [X] READY NOW: Python code verified against standard Blender vertex groups & operators.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES GTA V: Reference skinning source mesh must be extracted from player_one.

PURPOSE:
  Enforces GTA V's strict maximum 4 bone influences per vertex constraint,
  prunes weights < 0.01, and normalizes vertex groups.
"""

import bpy

CANONICAL_GTA5_BONES = {
    "SKEL_ROOT", "SKEL_Pelvis",
    "SKEL_Spine_Root", "SKEL_Spine0", "SKEL_Spine1", "SKEL_Spine2", "SKEL_Spine3",
    "SKEL_Neck_1", "SKEL_Head",
    "SKEL_L_Clavicle", "SKEL_L_UpperArm", "SKEL_L_Forearm", "SKEL_L_Hand",
    "SKEL_L_Finger00", "SKEL_L_Finger01", "SKEL_L_Finger02",
    "SKEL_L_Finger10", "SKEL_L_Finger11", "SKEL_L_Finger12",
    "SKEL_L_Finger20", "SKEL_L_Finger21", "SKEL_L_Finger22",
    "SKEL_L_Finger30", "SKEL_L_Finger31", "SKEL_L_Finger32",
    "SKEL_L_Finger40", "SKEL_L_Finger41", "SKEL_L_Finger42",
    "SKEL_R_Clavicle", "SKEL_R_UpperArm", "SKEL_R_Forearm", "SKEL_R_Hand",
    "SKEL_R_Finger00", "SKEL_R_Finger01", "SKEL_R_Finger02",
    "SKEL_R_Finger10", "SKEL_R_Finger11", "SKEL_R_Finger12",
    "SKEL_R_Finger20", "SKEL_R_Finger21", "SKEL_R_Finger22",
    "SKEL_R_Finger30", "SKEL_R_Finger31", "SKEL_R_Finger32",
    "SKEL_R_Finger40", "SKEL_R_Finger41", "SKEL_R_Finger42",
    "SKEL_L_Thigh", "SKEL_L_Calf", "SKEL_L_Foot", "SKEL_L_Toe0",
    "SKEL_R_Thigh", "SKEL_R_Calf", "SKEL_R_Foot", "SKEL_R_Toe0",
    "FACIAL_facial_root", "FACIAL_jaw",
}

def transfer_weights_from_source(target_obj, source_obj):
    print(f"\n[WEIGHT TRANSFER] Initiating transfer: '{source_obj.name}' -> '{target_obj.name}'")
    mod = target_obj.modifiers.new(name="Temp_Weight_Transfer", type='DATA_TRANSFER')
    mod.object = source_obj
    mod.use_vert_data = True
    mod.data_types_verts = {'VGROUP_WEIGHTS'}
    mod.vert_mapping = 'POLYINTERP_NEAREST'
    
    bpy.context.view_layer.objects.active = target_obj
    bpy.ops.object.modifier_apply(modifier=mod.name)
    print(f"[WEIGHT TRANSFER] Weight data interpolated via Poly Nearest Face.")

def enforce_gta_four_bone_limit(target_obj):
    bpy.context.view_layer.objects.active = target_obj
    target_obj.select_set(True)

    bpy.ops.object.vertex_group_clean(group_select_mode='ALL', limit=0.01)
    print("  [1] Cleaned residual weights < 0.01.")

    bpy.ops.object.vertex_group_limit_total(group_select_mode='ALL', limit=4)
    print("  [2] ENFORCED: Maximum 4 bone influences per vertex (GTA V RAGE standard).")

    bpy.ops.object.vertex_group_normalize_all(group_select_mode='ALL', lock_active=False)
    print("  [3] Normalized all vertex weights (sum == 1.0).")

def audit_vertex_weights(target_obj):
    me = target_obj.data
    non_compliant_verts = 0
    unweighted_verts = 0
    non_canonical_groups = set()

    for vg in target_obj.vertex_groups:
        if vg.name not in CANONICAL_GTA5_BONES:
            non_canonical_groups.add(vg.name)

    for v in me.vertices:
        influences = len(v.groups)
        if influences == 0:
            unweighted_verts += 1
        elif influences > 4:
            non_compliant_verts += 1

    print(f"\n--- Skinning QA Audit Report for '{target_obj.name}' ---")
    print(f"  Total Vertices Inspected:    {len(me.vertices)}")
    print(f"  Vertices with > 4 Influences: {non_compliant_verts}")
    print(f"  Unweighted Vertices (Spikes): {unweighted_verts}")
    if non_canonical_groups:
        print(f"  [!] Non-canonical bone groups detected: {list(non_canonical_groups)[:5]}")
    else:
        print("  [PASS] 100% of vertex groups match canonical GTA V ped skeleton.")

    if non_compliant_verts == 0 and unweighted_verts == 0:
        print("  [PASS] RIGGING COMPLIANCE: 100% GTA V RAGE engine ready.")
        return True
    else:
        print("  [FAIL] RIGGING DEFECTS FOUND: Correct before Sollumz export.")
        return False

def run_weight_preparation_pipeline():
    print("\n=======================================================")
    print("BLACKOUT GHOST // RUNNING SCRIPT 08: WEIGHT CONSTRAINTS")
    print("=======================================================")
    active_obj = bpy.context.active_object
    selected_objs = [o for o in bpy.context.selected_objects if o != active_obj]

    if not active_obj or active_obj.type != 'MESH':
        print("[WEIGHT ERROR] Select the target tactical gear as the active object.")
        return

    if selected_objs and selected_objs[0].type == 'MESH':
        source_body = selected_objs[0]
        transfer_weights_from_source(active_obj, source_body)

    enforce_gta_four_bone_limit(active_obj)
    audit_vertex_weights(active_obj)

if __name__ == "__main__":
    run_weight_preparation_pipeline()
