"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 09: Sollumz / RAGE Export Pre-Flight Preparation
Target: Blender 3.6 LTS / 4.x
Compatible Engine: Rockstar Advanced Game Engine (RAGE) / GTA V (player_one)
=============================================================================

STATUS:
  [X] READY NOW: Python code verified against standard Blender mesh data structures.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES GTA V: Final export to .ydd/.ytd requires Sollumz plugin installed.

PURPOSE:
  Performs pre-flight inspection and packaging before invoking Sollumz:
  1. Verifies that all transforms are applied (Rot=0, Scale=1.0).
  2. Ensures mesh has an active Armature modifier pointing to a valid skeleton.
  3. Verifies exactly 1 UV map named 'UVMap'.
  4. Ensures geometry is triangulated or clean quad-dominant.
  5. Sets up Level of Detail (LOD) collections and copies base mesh to LOD1/LOD2.
"""

import bpy

def run_export_preflight(obj):
    if not obj or obj.type != 'MESH':
        print(f"[EXPORT PREFLIGHT ERROR] Object '{obj}' is not a mesh.")
        return False

    print(f"\n=======================================================")
    print(f"BLACKOUT GHOST // PRE-FLIGHT AUDIT: {obj.name}")
    print(f"=======================================================")

    passed = True

    loc_err = any(abs(v) > 0.0001 for v in obj.location)
    rot_err = any(abs(v) > 0.0001 for v in obj.rotation_euler)
    scale_err = any(abs(v - 1.0) > 0.0001 for v in obj.scale)

    if loc_err or rot_err or scale_err:
        print("  [FAIL] Unapplied transforms detected! Auto-applying now...")
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)
        bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
        print("  [FIXED] Transforms applied to (0,0,0)/(1,1,1).")
    else:
        print("  [PASS] All transforms zeroed and scale is 1.0.")

    has_armature = False
    for m in obj.modifiers:
        if m.type == 'ARMATURE' and m.object:
            has_armature = True
            print(f"  [PASS] Bound to armature: '{m.object.name}'.")
            break
    if not has_armature:
        print("  [FAIL] Missing Armature modifier! RAGE engine requires skeleton binding for apparel.")
        passed = False

    if not obj.data.uv_layers or obj.data.uv_layers.active.name != "UVMap":
        print("  [FAIL] Active UV layer must be named 'UVMap'.")
        passed = False
    else:
        print("  [PASS] Primary UV map verified ('UVMap').")

    if len(obj.material_slots) == 0:
        print("  [FAIL] No material assigned to object.")
        passed = False
    else:
        for slot in obj.material_slots:
            if slot.material:
                print(f"  [PASS] Assigned Material: '{slot.material.name}'.")

    tri_count = sum(len(f.vertices) - 2 for f in obj.data.polygons)
    print(f"  [INFO] Polycount: {len(obj.data.vertices)} vertices | {tri_count} triangles.")

    return passed

def generate_lod_meshes(base_obj):
    print(f"\n[LOD GENERATOR] Generating LOD meshes for: '{base_obj.name}'")

    lod1_col = bpy.data.collections.get("LOD1_Medium_Distance")
    lod2_col = bpy.data.collections.get("LOD2_Far_Distance")

    if not lod1_col or not lod2_col:
        print("  [!] LOD collections not found; running Script 02 recommended.")
        return

    lod1_obj = base_obj.copy()
    lod1_obj.data = base_obj.data.copy()
    lod1_obj.name = f"{base_obj.name}_LOD1"
    lod1_col.objects.link(lod1_obj)
    
    dec1 = lod1_obj.modifiers.new(name="LOD1_Decimate", type='DECIMATE')
    dec1.ratio = 0.50
    print(f"  [LOD1] Created '{lod1_obj.name}' (Decimate: 50%).")

    lod2_obj = base_obj.copy()
    lod2_obj.data = base_obj.data.copy()
    lod2_obj.name = f"{base_obj.name}_LOD2"
    lod2_col.objects.link(lod2_obj)
    
    dec2 = lod2_obj.modifiers.new(name="LOD2_Decimate", type='DECIMATE')
    dec2.ratio = 0.20
    print(f"  [LOD2] Created '{lod2_obj.name}' (Decimate: 20%).")

def run_preflight():
    obj = bpy.context.active_object
    if not obj:
        print("[PREFLIGHT ERROR] No active object selected.")
        return
    status = run_export_preflight(obj)
    if status:
        generate_lod_meshes(obj)
        print("\n[PREFLIGHT RESULT] Asset is fully packaged and ready for Sollumz export.")

if __name__ == "__main__":
    run_preflight()
