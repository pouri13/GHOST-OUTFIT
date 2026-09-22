"""
=============================================================================
BLACKOUT ULTIMATE PACK — GHOST TACTICAL OUTFIT
SCRIPT 01: Project Setup & Calibration
Target: Blender 3.6 LTS / 4.x
Compatible Engine: Rockstar Advanced Game Engine (RAGE) / GTA V (player_one)
=============================================================================

STATUS:
  [X] READY NOW: Python code verified against standard Blender bpy API.
  [!] REQUIRES BLENDER: Must be executed inside Blender's Python runtime.
  [ ] REQUIRES GTA V: Calibration against game requires actual Franklin extraction.

PURPOSE:
  Configures a fresh Blender scene to the exact geometric, spatial, and unit
  requirements of the GTA V RAGE engine:
  - Metric system with 1.0 unit = 1.0 meter (no micro/macro unit scaling errors).
  - World origin centered at (0.0, 0.0, 0.0) corresponding to ground between heels.
  - Viewport clip distances set to avoid z-fighting on close gear inspects.
  - Grid subdivision configured for millimeter-accurate apparel detailing.
  - Neutral lighting setup for inspecting dark tactical fabrics without blowout.
"""

import bpy
import math

def configure_scene_units():
    """Sets metric units to 1 unit = 1 meter, matching GTA V engine scale."""
    scene = bpy.context.scene
    scene.unit_settings.system = 'METRIC'
    scene.unit_settings.scale_length = 1.0
    scene.unit_settings.length_unit = 'METERS'
    scene.unit_settings.mass_unit = 'KILOGRAMS'
    scene.unit_settings.time_unit = 'SECONDS'
    print("[PROJECT SETUP] Metric units configured: 1.0 unit = 1.0 meter.")

def configure_viewport_clip():
    """Sets 3D viewport clipping to prevent near-clipping on tactical seams."""
    for window in bpy.context.window_manager.windows:
        screen = window.screen
        for area in screen.areas:
            if area.type == 'VIEW_3D':
                for space in area.spaces:
                    if space.type == 'VIEW_3D':
                        space.clip_start = 0.005  # 5mm near clip
                        space.clip_end = 100.0    # 100m far clip
                        space.overlay.grid_scale = 0.1 # 10cm grid step
                        space.overlay.grid_subdivisions = 10
    print("[PROJECT SETUP] Viewport clipping set: 0.005m -> 100.0m.")

def clean_default_objects():
    """Removes standard default cube, light, and camera if present."""
    default_names = ["Cube", "Light", "Camera"]
    for obj_name in default_names:
        if obj_name in bpy.data.objects:
            obj = bpy.data.objects[obj_name]
            bpy.data.objects.remove(obj, do_unlink=True)
            print(f"[PROJECT SETUP] Removed default object: {obj_name}")

def setup_tactical_studio_lighting():
    """Creates a calibrated 3-point neutral grey studio light rig for dark materials."""
    light_col_name = "LIGHTING_STUDIO"
    if light_col_name not in bpy.data.collections:
        light_col = bpy.data.collections.new(light_col_name)
        bpy.context.scene.collection.children.link(light_col)
    else:
        light_col = bpy.data.collections[light_col_name]

    lights = [
        ("LIGHT_Key_FrontRight", 'SUN', (2.5, -2.5, 2.5), 3.0, (1.0, 0.98, 0.95)),
        ("LIGHT_Fill_FrontLeft", 'SUN', (-2.5, -2.0, 1.8), 1.2, (0.85, 0.90, 1.0)),
        ("LIGHT_Rim_Back", 'SUN', (0.0, 3.0, 2.8), 4.5, (0.95, 0.95, 1.0)),
    ]

    for name, light_type, loc, energy, color in lights:
        if name not in bpy.data.objects:
            light_data = bpy.data.lights.new(name=name, type=light_type)
            light_data.energy = energy
            light_data.color = color
            light_obj = bpy.data.objects.new(name=name, object_data=light_data)
            light_obj.location = loc
            dx = 0.0 - loc[0]
            dy = 0.0 - loc[1]
            dz = 1.0 - loc[2]
            dist = math.sqrt(dx*dx + dy*dy + dz*dz)
            pitch = math.asin(-dz / dist)
            yaw = math.atan2(dy, dx)
            light_obj.rotation_euler = (pitch, 0.0, yaw - math.pi/2)
            light_col.objects.link(light_obj)
            print(f"[PROJECT SETUP] Created studio light: {name}")

def run_project_setup():
    print("\n==========================================")
    print("BLACKOUT GHOST // RUNNING SCRIPT 01: SETUP")
    print("==========================================")
    clean_default_objects()
    configure_scene_units()
    configure_viewport_clip()
    setup_tactical_studio_lighting()
    print("[PROJECT SETUP] Scene calibration complete.\n")

if __name__ == "__main__":
    run_project_setup()
