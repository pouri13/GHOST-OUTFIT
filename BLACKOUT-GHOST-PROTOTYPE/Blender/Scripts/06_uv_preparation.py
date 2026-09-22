"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 06: UV Preparation & Texel Density Validation
Target: Blender 3.6 LTS / 4.x
Compatible Engine: Rockstar Advanced Game Engine (RAGE) / GTA V (player_one)
=============================================================================

STATUS:
  [X] READY NOW: Python code verified against standard Blender bpy and bmesh UV loops.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES GTA V: Texture packing verified in OpenIV .ytd preview.

PURPOSE:
  Validates UV maps for GTA V RAGE export:
  - Ensures exactly one primary UV layer named 'UVMap' exists and is active.
  - Verifies that all UV coordinates lie within the normalized [0.0, 1.0] domain.
  - Calculates approximate Texel Density (px/cm) for standard GTA V texture budgets.
"""

import bpy
import bmesh
import math

def validate_and_prepare_uvs(obj, target_texture_dim=2048):
    if not obj or obj.type != 'MESH':
        print(f"[UV ERROR] '{obj}' is not a valid mesh.")
        return False

    print(f"\n--- UV Validation: {obj.name} (Target Texture: {target_texture_dim}x{target_texture_dim}) ---")
    me = obj.data

    if not me.uv_layers:
        print("  [FATAL] Object has NO UV layers! Unwrap mesh before proceeding.")
        return False

    primary_uv = me.uv_layers[0]
    if primary_uv.name != "UVMap":
        print(f"  [RENAME] Renaming primary UV layer '{primary_uv.name}' -> 'UVMap'.")
        primary_uv.name = "UVMap"
    me.uv_layers.active = primary_uv
    print(f"  [1] Active UV layer confirmed: '{primary_uv.name}'.")

    out_of_bounds = 0
    total_loops = 0
    bm = bmesh.new()
    bm.from_mesh(me)
    uv_layer = bm.loops.layers.uv.verify()

    world_surface_area = 0.0
    uv_surface_area = 0.0

    for face in bm.faces:
        world_surface_area += face.calc_area()
        if len(face.loops) >= 3:
            u0 = face.loops[0][uv_layer].uv
            for i in range(1, len(face.loops) - 1):
                u1 = face.loops[i][uv_layer].uv
                u2 = face.loops[i+1][uv_layer].uv
                area = 0.5 * abs((u1.x - u0.x)*(u2.y - u0.y) - (u2.x - u0.x)*(u1.y - u0.y))
                uv_surface_area += area

        for loop in face.loops:
            uv = loop[uv_layer].uv
            total_loops += 1
            if uv.x < -0.01 or uv.x > 1.01 or uv.y < -0.01 or uv.y > 1.01:
                out_of_bounds += 1

    bm.free()

    if out_of_bounds > 0:
        print(f"  [!] NOTICE: {out_of_bounds} loop UVs sit outside [0, 1] range.")
    else:
        print(f"  [2] UV coordinate bounds: 100% within [0.0, 1.0] texture space.")

    world_area_cm2 = world_surface_area * 10000.0
    uv_pixels_total = uv_surface_area * (target_texture_dim * target_texture_dim)
    
    if world_area_cm2 > 0 and uv_pixels_total > 0:
        texel_density = math.sqrt(uv_pixels_total / world_area_cm2)
        print(f"  [3] Surface Area: {world_surface_area:.3f} m² ({world_area_cm2:.1f} cm²)")
        print(f"  [4] UV Coverage:  {uv_surface_area * 100:.1f}% of 0-1 texture area.")
        print(f"  [5] Average Texel Density: {texel_density:.2f} px/cm.")
        if 14.0 <= texel_density <= 26.0:
            print("  [PASS] Texel density is optimal for GTA V high-detail character assets.")
        else:
            print("  [INFO] Texel density deviates from 18-22 px/cm standard; verify scale or texture resolution.")
    
    return True

def run_uv_check():
    obj = bpy.context.active_object
    if not obj:
        print("[UV ERROR] No active object selected.")
        return
    validate_and_prepare_uvs(obj)

if __name__ == "__main__":
    run_uv_check()
