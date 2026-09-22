"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 07: Modifier Stack Setup & Conformal Skinning Helpers
Target: Blender 3.6 LTS / 4.x
Compatible Engine: Rockstar Advanced Game Engine (RAGE) / GTA V (player_one)
=============================================================================

STATUS:
  [X] READY NOW: Python code verified against standard Blender modifier APIs.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES GTA V: Target armature is Franklin's extracted ped skeleton.

PURPOSE:
  Prepares modifier stacks for apparel modeling, base mesh conforming, and rigging.
"""

import bpy

def setup_armature_modifier(asset_obj, armature_obj):
    if not asset_obj or asset_obj.type != 'MESH':
        print("[MOD ERROR] Invalid mesh object.")
        return None
    if not armature_obj or armature_obj.type != 'ARMATURE':
        print("[MOD ERROR] Invalid armature object.")
        return None

    mod = None
    for m in asset_obj.modifiers:
        if m.type == 'ARMATURE':
            mod = m
            break
    
    if not mod:
        mod = asset_obj.modifiers.new(name="GTA_Armature", type='ARMATURE')
    
    mod.object = armature_obj
    mod.use_vertex_groups = True
    mod.use_deform_preserve_volume = False
    print(f"[MODIFIER] Configured Armature modifier on '{asset_obj.name}' -> '{armature_obj.name}'.")
    return mod

def setup_shrinkwrap_conformal(asset_obj, target_body_obj, offset_meters=0.0025):
    if not asset_obj or not target_body_obj:
        return None

    mod = asset_obj.modifiers.new(name="Blockout_Shrinkwrap", type='SHRINKWRAP')
    mod.target = target_body_obj
    mod.wrap_method = 'TARGET_PROJECT'
    mod.offset = offset_meters
    print(f"[MODIFIER] Added Shrinkwrap on '{asset_obj.name}' with {offset_meters*1000:.1f}mm offset.")
    return mod

def setup_weighted_normal(asset_obj):
    if not asset_obj:
        return None
    
    if hasattr(asset_obj.data, "use_auto_smooth"):
        asset_obj.data.use_auto_smooth = True
        asset_obj.data.auto_smooth_angle = 1.0472

    mod = asset_obj.modifiers.new(name="WeightedNormal", type='WEIGHTED_NORMAL')
    mod.keep_sharp = True
    mod.weight = 50
    print(f"[MODIFIER] Added WeightedNormal modifier on '{asset_obj.name}'.")
    return mod

def setup_data_transfer_normals(asset_obj, source_body_obj):
    if not asset_obj or not source_body_obj:
        return None

    mod = asset_obj.modifiers.new(name="Normal_Transfer", type='DATA_TRANSFER')
    mod.object = source_body_obj
    mod.use_loop_data = True
    mod.data_types_loops = {'CUSTOM_NORMAL'}
    mod.loop_mapping = 'POLYINTERP_NEAREST'
    print(f"[MODIFIER] Configured DataTransfer normal projection from '{source_body_obj.name}'.")
    return mod

def run_modifier_setup():
    print("\n================================================")
    print("BLACKOUT GHOST // RUNNING SCRIPT 07: MODIFIERS")
    print("================================================")
    active_obj = bpy.context.active_object
    selected_objs = [o for o in bpy.context.selected_objects if o != active_obj]

    if not active_obj:
        print("[MOD INFO] Usage: Select Armature/Body first, then active Asset mesh, then run script.")
        return

    armatures = [o for o in selected_objs if o.type == 'ARMATURE']
    if armatures and active_obj.type == 'MESH':
        setup_armature_modifier(active_obj, armatures[0])
    
    if active_obj.type == 'MESH':
        setup_weighted_normal(active_obj)

if __name__ == "__main__":
    run_modifier_setup()
