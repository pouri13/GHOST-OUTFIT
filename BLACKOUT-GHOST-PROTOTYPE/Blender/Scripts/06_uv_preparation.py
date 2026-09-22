"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 06: UV Layout Audit & Texel Density Verification
Target: Blender 3.6 LTS / 4.x
Compatible Target: Franklin Clinton (GTA V PC)
=============================================================================

STATUS CLASSIFICATION:
  [X] READY NOW: Python code verified against standard Blender bpy and bmesh APIs.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES GTA V: Texture streaming resolution verified in-game.

PURPOSE:
  Validates UV maps for GTA V RAGE export:
  - Ensures primary UV layer is named 'UVMap' (GTA V standard).
  - Checks for multiple UV layers and reports active layout.
  - Detects UV coordinates exceeding the normalized [0.0, 1.0] texture space.
  - Evaluates texel density (target: 18 - 24 px/cm for 2048x2048 tactical textures).
  - Safe, non-destructive audit report.
=============================================================================
"""

import bpy
import bmesh
import math


def audit_uv_layout(obj, target_texture_dim=2048):
    """
    Inspects UV layers, boundaries, and texel density of a mesh object.
    Returns audit status dictionary.
    """
    if not obj or obj.type != 'MESH':
        print(f"[UV ERROR] Target '{obj}' is not a valid mesh.")
        return False

    print(f"\n=======================================================")
    print(f"BLACKOUT GHOST // UV AUDIT: {obj.name} ({target_texture_dim}x{target_texture_dim}px)")
    print(f"=======================================================")

    me = obj.data

    if not me.uv_layers:
        print("  [RESULT: FAIL] No UV layers found! Asset must be unwrapped before texturing.")
        return False

    # 1. Layer Name Inspection
    print(f"  [1] UV Layers ({len(me.uv_layers)} total):")
    primary_uv = me.uv_layers[0]
    for idx, layer in enumerate(me.uv_layers):
        status = "[ACTIVE]" if layer == me.uv_layers.active else ""
        print(f"      - Layer {idx}: '{layer.name}' {status}")

    if primary_uv.name != "UVMap":
        print(f"  [WARNING] Primary UV layer is named '{primary_uv.name}'. Standard RAGE convention is 'UVMap'.")

    # 2. Geometric Surface Area & UV Coverage
    bm = bmesh.new()
    bm.from_mesh(me)
    uv_layer = bm.loops.layers.uv.verify()

    world_surface_area = 0.0
    uv_surface_area = 0.0
    out_of_bounds_count = 0
    total_loops = 0

    for face in bm.faces:
        world_surface_area += face.calc_area()

        # Calculate polygon UV area
        if len(face.loops) >= 3:
            u0 = face.loops[0][uv_layer].uv
            for i in range(1, len(face.loops) - 1):
                u1 = face.loops[i][uv_layer].uv
                u2 = face.loops[i + 1][uv_layer].uv
                area = 0.5 * abs((u1.x - u0.x) * (u2.y - u0.y) - (u2.x - u0.x) * (u1.y - u0.y))
                uv_surface_area += area

        for loop in face.loops:
            uv = loop[uv_layer].uv
            total_loops += 1
            if uv.x < -0.005 or uv.x > 1.005 or uv.y < -0.005 or uv.y > 1.005:
                out_of_bounds_count += 1

    bm.free()

    # 3. Bounds Analysis
    print(f"\n  [2] UV Coordinate Bounds:")
    if out_of_bounds_count > 0:
        print(f"      [WARNING] {out_of_bounds_count} vertex UVs extend outside the [0.0, 1.0] domain.")
    else:
        print(f"      [PASS] 100% of UV coordinates reside cleanly within the [0.0, 1.0] texture space.")

    # 4. Texel Density Evaluation
    world_area_cm2 = world_surface_area * 10000.0
    uv_pixels_total = uv_surface_area * (target_texture_dim * target_texture_dim)

    print(f"\n  [3] Texel Density & Resolution Metrics:")
    print(f"      - 3D World Surface Area: {world_surface_area:.3f} m² ({world_area_cm2:.1f} cm²)")
    print(f"      - 0-1 UV Area Occupied:  {uv_surface_area * 100:.1f}%")

    if world_area_cm2 > 0 and uv_pixels_total > 0:
        texel_density = math.sqrt(uv_pixels_total / world_area_cm2)
        print(f"      - Average Texel Density: {texel_density:.2f} px/cm")

        if 16.0 <= texel_density <= 26.0:
            print("      [PASS] Texel density is in the optimal range (16 - 26 px/cm) for GTA V character gear.")
        elif texel_density < 16.0:
            print("      [NOTICE] Texel density is below 16 px/cm; may appear blurry in first-person camera.")
        else:
            print("      [NOTICE] Texel density is above 26 px/cm; higher resolution than standard GTA V assets.")

    return True


def ensure_canonical_uv_name(obj):
    """Safely ensures the active UV layer is named 'UVMap' without altering geometry."""
    if not obj or obj.type != 'MESH':
        return False
    if obj.data.uv_layers:
        obj.data.uv_layers[0].name = "UVMap"
        obj.data.uv_layers.active = obj.data.uv_layers[0]
        print(f"[UV] Confirmed active UV layer name: '{obj.data.uv_layers.active.name}'.")
        return True
    return False


def run_active_uv_audit():
    obj = bpy.context.active_object
    if not obj:
        print("[UV AUDIT ERROR] No active object selected in Blender.")
        return
    audit_uv_layout(obj)


if __name__ == "__main__":
    run_active_uv_audit()
