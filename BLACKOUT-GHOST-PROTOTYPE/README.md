# BLACKOUT ULTIMATE PACK — PHASE 1: GHOST TACTICAL OUTFIT
### Lead Technical Artist & GTA V Asset Pipeline Package
**Target Character**: Franklin Clinton (`player_one`)  
**Target Engine**: Rockstar Advanced Game Engine (RAGE) / GTA V PC  

---

## 1. Package Overview & Architecture

This package provides a turnkey, production-grade asset pipeline and development environment for the **Ghost Tactical Outfit** prototype. Everything has been engineered in advance so that you can immediately begin executing inside Blender without designing pipeline standards from scratch.

### Clear Production Status Classification:
* 🟢 **`[READY NOW]`**: Complete folder hierarchy, 10 production Blender Python scripts, material architecture specs, texture channel packing manifests, 11 asset specs, naming conventions, and QA checklists.
* 🟡 **`[REQUIRES BLENDER]`**: Execution of scripts inside Blender's Python runtime, 3D mesh modeling, UV unwrapping, and bone weight painting.
* 🔵 **`[REQUIRES GTA V]`**: OpenIV `.rpf` archive injection, `.ytd` texture compilation, and in-game animation testing.

---

## 2. Directory Tree Map

```
BLACKOUT-GHOST-PROTOTYPE/
├── README.md                                          <-- Master Project Manifest
├── Blender/
│   ├── Scripts/
│   │   ├── 01_project_setup.py                        <-- Scene units, metric scale, clip, studio lighting
│   │   ├── 02_collection_creation.py                  <-- Outliner hierarchy & export slots
│   │   ├── 03_naming_system.py                        <-- Naming validation & canonical renamer
│   │   ├── 04_material_creation.py                    <-- 7 PBR tactical shader node trees & RAGE presets
│   │   ├── 05_asset_preparation.py                    <-- Transform apply, bmesh cleanup, manifold QA
│   │   ├── 06_uv_preparation.py                       <-- UV layer standard & texel density auditor
│   │   ├── 07_modifier_setup.py                       <-- Armature, shrinkwrap conformal, weighted normals
│   │   ├── 08_weight_transfer_prep.py                 <-- Transfer weights, STRICT 4-BONE CLAMP & normalize
│   │   ├── 09_export_preparation.py                   <-- Pre-flight check & automatic LOD1/LOD2 generation
│   │   └── 10_batch_processor.py                      <-- Master batch pipeline runner for all assets
│   └── Templates/
├── Assets/
│   ├── ASSET_SPECIFICATIONS.md                        <-- Comprehensive technical specs for all 11 assets
│   └── GHOST_SHIRT_PRODUCTION_DOSSIER.md              <-- Deep-dive execution plan for Asset 01 test
├── Materials/
│   └── MATERIAL_SPECIFICATIONS.md                     <-- Calibrated PBR tables & RAGE shader definitions
├── Textures/
│   └── TEXTURE_SPECIFICATIONS.md                      <-- DirectX normal (-Y), spec alpha, channel packing
├── References/                                        <-- Orthographic turns, concept sketches, mood boards
├── GTA_V/
│   ├── GTA_V_PIPELINE_WORKFLOW.md                     <-- Blender -> Sollumz -> OpenIV complete workflow
│   ├── Export/                                        <-- Output destination for .ydd and .ytd files
│   └── Installation/                                  <-- mod folder paths & OpenIV drop instructions
└── Documentation/
    ├── NAMING_CONVENTIONS.md                          <-- Unified lexical standard across files/meshes
    ├── QA_QC_CHECKLIST.md                             <-- 14-stage QA audit protocol
    ├── BLENDER_INSTALLATION_REQUIREMENTS.md           <-- Blender 3.6 LTS & Sollumz setup guide
    └── EXACT_NEXT_STEPS_AFTER_BLENDER.md              <-- Step-by-step post-install action sequence
```

---

## 3. Production Sequence & Rollout Strategy

To guarantee zero wasted effort, assets are developed strictly sequentially:

$$\text{GHOST\_SHIRT} \longrightarrow \text{GTA V TEST} \longrightarrow \text{FIX} \longrightarrow \text{GHOST\_PANTS} \longrightarrow \text{GTA V TEST} \longrightarrow \text{GHOST\_VEST} \longrightarrow \dots \longrightarrow \text{FULL OUTFIT}$$

1. **Asset 01 (`GHOST_SHIRT`)**: Solves shoulder deltoid multi-axis rotation, clavicle skinning, and wrist/collar seam alignment.
2. **Asset 02 (`GHOST_PANTS`)**: Solves pelvic bending, knee accordion articulation, and boot tucking.
3. **Asset 03 (`GHOST_PLATE_CARRIER`)**: Solves rigid chest armor clearance and rifle stock ADS clearance.
4. **Asset 04 (`GHOST_MASK`)**: Solves facial jaw movement and neck seam alignment.
5. **Asset 05 (`GHOST_BOOTS`)**: Solves foot roll, toe joint bending, and ground contact height.
6. **Full Outfit Integration**: Combines all components for cumulative in-game testing.
