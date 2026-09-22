# BLACKOUT ULTIMATE PACK — PHASE 2.1: GHOST TACTICAL OUTFIT
### Lead Technical Artist & GTA V Asset Pipeline Package
**Target Character**: Franklin Clinton (`player_one` / GTA V PC)  
**Target Engine**: Rockstar Advanced Game Engine (RAGE)  
**Package Version**: Phase 2.1 (Audited, Repaired & Non-Destructive Pre-Blender Foundation)

---

## 1. Package Overview & Architecture

This package provides a turnkey, production-grade asset pipeline and development environment for the **Ghost Tactical Outfit** prototype. Everything has been engineered, audited, and hardened in advance so that the moment Blender 3.6 LTS is installed, production begins without guesswork, broken scripts, or unverified claims.

### Rigorous Operational Status Classification:
* 🟢 **`[READY NOW]`**: Complete folder hierarchy, 12 verified Blender Python scripts, material architecture specs, texture channel packing manifests, asset specifications, naming conventions, and QA audit checklists.
* 🟡 **`[REQUIRES BLENDER]`**: Execution of scripts inside Blender's Python runtime, 3D mesh sculpting/retopology, UV unwrapping, and bone weight painting.
* 🟠 **`[REQUIRES SOLLUMZ]`**: Conversion of Blender preview materials into native GTA V RAGE shaders (`gta_normal_specular.sps`), Drawable Model compiling, and `.ydd` / `.ytd` export.
* 🔵 **`[REQUIRES GTA V]`**: Extraction of Franklin's base body via OpenIV, `.rpf` archive injection, and live in-game dynamic animation testing.

---

## 2. Directory Tree Map

```
BLACKOUT-GHOST-PROTOTYPE/
├── README.md                                          <-- Master Project Manifest (Phase 2.1)
├── Blender/
│   ├── Scripts/
│   │   ├── 00_MASTER_SETUP.py                         <-- Safe idempotent master setup & calibration
│   │   ├── 01_project_setup.py                        <-- Scene units (1.0m), clip, studio lighting (non-destructive)
│   │   ├── 02_collection_creation.py                  <-- 9-collection production structure (01_REFERENCE - 09_TEST)
│   │   ├── 03_naming_system.py                        <-- Canonical naming validation & safe renamer
│   │   ├── 04_material_creation.py                    <-- 7 calibrated PBR preview materials & RAGE metadata
│   │   ├── 05_asset_preparation.py                    <-- Topology audit & controlled non-destructive sanitizer
│   │   ├── 06_uv_preparation.py                       <-- UV layer standard & texel density auditor
│   │   ├── 07_modifier_setup.py                       <-- Armature, shrinkwrap conformal, weighted normals
│   │   ├── 08_weight_transfer_prep.py                 <-- Source-mesh driven transfer, 4-bone limit clamp & local QA
│   │   ├── 09_export_preparation.py                   <-- Pre-flight audit (transforms, UVs, materials, weights)
│   │   ├── 10_BATCH_QA.py                             <-- Read-only batch QA reporting PASS/WARN/FAIL
│   │   └── 11_LOD_PREPARATION.py                      <-- Controlled, optional LOD generation workflow
│   └── Templates/
├── Assets/
│   ├── ASSET_SPECIFICATIONS.md                        <-- Comprehensive technical specs for all 10 assets
│   └── GHOST_SHIRT_PRODUCTION_DOSSIER.md              <-- Deep-dive execution plan for Asset 01 test
├── Materials/
│   └── MATERIAL_SPECIFICATIONS.md                     <-- Calibrated PBR tables & RAGE shader definitions
├── Textures/
│   └── TEXTURE_SPECIFICATIONS.md                      <-- DirectX normal (-Y), spec alpha, channel packing
├── References/                                        <-- Orthographic turns, concept sketches, mood boards
├── GTA_V/
│   ├── GTA_V_PIPELINE_WORKFLOW.md                     <-- End-to-end workflow documentation
│   ├── Export/                                        <-- Output destination for .ydd and .ytd files
│   └── Installation/                                  <-- Mod folder paths & OpenIV drop instructions
└── Documentation/
    ├── PHASE_2_AUDIT.md                               <-- 10-point comprehensive audit of Phase 2
    ├── PHASE_2_1_CHANGELOG.md                         <-- Complete repair log and improvements
    ├── PHASE_3_EXECUTION_PLAN.md                      <-- 14-step single-asset benchmark execution plan (GHOST_SHIRT)
    ├── BLENDER_SETUP.md                               <-- Blender 3.6 LTS & Sollumz configuration guide
    ├── WEIGHT_WORKFLOW.md                             <-- Source-driven skinning & 4-bone limit enforcement
    ├── MATERIAL_WORKFLOW.md                           <-- Preview vs Sollumz RAGE shaders & texture channels
    ├── GTA_V_PIPELINE.md                              <-- 7-phase conversion from Blender to GTA V in-game
    ├── QA_CHECKLIST.md                                <-- 6-stage compliance and verification checklist
    ├── NAMING_CONVENTIONS.md                          <-- Unified lexical standard across files/meshes
    ├── QA_QC_CHECKLIST.md                             <-- 14-stage QA audit protocol
    ├── BLENDER_INSTALLATION_REQUIREMENTS.md           <-- Installation requirements
    └── EXACT_NEXT_STEPS_AFTER_BLENDER.md              <-- Action sequence post-installation
```

---

## 3. Production Sequence & Rollout Strategy (Phase 3 Benchmark)

To guarantee zero wasted effort, assets are developed strictly sequentially around the single-asset benchmark:

$$\text{GHOST\_SHIRT} \longrightarrow \text{GTA V TEST} \longrightarrow \text{FIX} \longrightarrow \text{GHOST\_PANTS} \longrightarrow \text{GTA V TEST} \longrightarrow \text{GHOST\_VEST} \longrightarrow \dots \longrightarrow \text{FULL OUTFIT}$$

1. **Asset 01 (`GHOST_SHIRT`)**: Solves shoulder deltoid multi-axis rotation, clavicle skinning, and wrist/collar seam alignment.
2. **Asset 02 (`GHOST_PANTS`)**: Solves pelvic bending, knee accordion articulation, and boot tucking.
3. **Asset 03 (`GHOST_VEST`)**: Solves rigid chest armor clearance and rifle stock ADS clearance.
4. **Asset 04 (`GHOST_MASK`)**: Solves facial jaw movement and neck seam alignment.
5. **Asset 05 (`GHOST_BOOTS`)**: Solves foot roll, toe joint bending, and ground contact height.
6. **Full Outfit Integration**: Combines all components for cumulative in-game testing.
