"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 07: Modifier Stack Setup & Conformal Skinning Helpers
Target: Blender 3.6 LTS / 4.x
Compatible Target: Franklin Clinton (GTA V PC)
=============================================================================

STATUS CLASSIFICATION:
  [X] READY NOW: Python code verified against standard Blender modifier APIs.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES GTA V: Target armature is Franklin's extracted ped skeleton.

PURPOSE:
  Provides safe, modular helper functions for setting up modifiers:
  1. Armature Modifier: Links clothing mesh to Franklin's deformation skeleton.
  2. Shrinkwrap Conformal: Assists in fitting tactical clothing over Franklin's body.
  3. WeightedNormal: Sharpens hard-surface tactical gear normals.
  4. DataTransfer Normals: Transfers smooth skin normals from body to clothing collar/sleeves.
=============================================================================
"""

import bpy


def setup_armature_modifier(asset_obj, armature_obj):
    """
    Configures an Armature modifier on the apparel mesh pointing to Franklin's skeleton.
    Does not duplicate modifiers if one already exists.
    """
    if not asset_obj or asset_obj.type != 'MESH':
        print(f"[MOD ERROR] Asset '{asset_obj}' is not a valid mesh.")
        return None
    if not armature_obj or armature_obj.type != 'ARMATURE':
        print(f"[MOD ERROR] Armature '{armature_obj}' is not a valid armature.")
        return None

    # Find existing armature modifier or create new
    mod = None
    for m in asset_obj.modifiers:
        if m.type == 'ARMATURE':
            mod = m
            break

    if not mod:
        mod = asset_obj.modifiers.new(name="GTA_Armature", type='ARMATURE')

    mod.object = armature_obj
    mod.use_vertex_groups = True
    mod.use_deform_preserve_volume = False  # Linear blend skinning matches RAGE engine
    print(f"[MODIFIER] Configured Armature modifier on '{asset_obj.name}' -> '{armature_obj.name}'.")
    return mod


def setup_shrinkwrap_conformal(asset_obj, target_body_obj, offset_meters=0.0025):
    """
    Adds a Shrinkwrap modifier to conform tactical apparel over Franklin's body geometry.
    Offset default: 2.5mm (0.0025m) to prevent z-fighting and clipping.
    """
    if not asset_obj or not target_body_obj:
        print("[MOD ERROR] Both asset and body objects must be provided for Shrinkwrap.")
        return None

    mod = asset_obj.modifiers.new(name="Blockout_Shrinkwrap", type='SHRINKWRAP')
    mod.target = target_body_obj
    mod.wrap_method = 'TARGET_PROJECT'
    mod.offset = offset_meters
    print(f"[MODIFIER] Added Shrinkwrap on '{asset_obj.name}' (Offset: {offset_meters * 1000:.1f}mm).")
    return mod


def setup_weighted_normal(asset_obj):
    """
    Configures Weighted Normal modifier for hard-surface tactical gear (helmets, buckles, holsters).
    Handles version-specific auto-smooth differences between Blender 3.6 and 4.1+.
    """
    if not asset_obj or asset_obj.type != 'MESH':
        return None

    # Handle Blender 3.6 auto-smooth property
    if hasattr(asset_obj.data, "use_auto_smooth"):
        asset_obj.data.use_auto_smooth = True
        asset_obj.data.auto_smooth_angle = 1.0472  # 60 degrees

    # Check for existing weighted normal modifier
    for m in asset_obj.modifiers:
        if m.type == 'WEIGHTED_NORMAL':
            return m

    mod = asset_obj.modifiers.new(name="WeightedNormal", type='WEIGHTED_NORMAL')
    mod.keep_sharp = True
    mod.weight = 50
    print(f"[MODIFIER] Added WeightedNormal modifier on '{asset_obj.name}'.")
    return mod


def setup_data_transfer_normals(asset_obj, source_body_obj):
    """
    Transfers custom normals from Franklin's naked body mesh to clothing boundary seams
    to create seamless transitions at the neck, wrists, and ankles.
    """
    if not asset_obj or not source_body_obj:
        return None

    # Handle auto-smooth requirement
    if hasattr(asset_obj.data, "use_auto_smooth"):
        asset_obj.data.use_auto_smooth = True

    mod = asset_obj.modifiers.new(name="Normal_Transfer", type='DATA_TRANSFER')
    mod.object = source_body_obj
    mod.use_loop_data = True
    mod.data_types_loops = {'CUSTOM_NORMAL'}
    mod.loop_mapping = 'POLYINTERP_NEAREST'
    print(f"[MODIFIER] Configured DataTransfer normal projection on '{asset_obj.name}'.")
    return mod


def run_interactive_modifier_setup():
    active_obj = bpy.context.active_object
    selected_objs = [o for o in bpy.context.selected_objects if o != active_obj]

    if not active_obj or active_obj.type != 'MESH':
        print("[MODIFIER SETUP] Select an apparel mesh as active object in Blender.")
        return

    armatures = [o for o in selected_objs if o.type == 'ARMATURE']
    if armatures:
        setup_armature_modifier(active_obj, armatures[0])

    setup_weighted_normal(active_obj)


if __name__ == "__main__":
    run_interactive_modifier_setup()
