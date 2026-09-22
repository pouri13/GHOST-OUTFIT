# EXACT OPERATIONAL NEXT STEPS (POST-BLENDER INSTALLATION)
## Project: FRANKLIN — BLACKOUT ULTIMATE PACK
## Asset Set: Ghost Tactical Operator Outfit (Franklin Clinton - GTA V PC)
## Baseline: Phase 2.1 Standardized Workflow

---

When you have installed **Blender 3.6 LTS** on your workstation, you will NOT have to guess settings or invent directory structures. You can immediately execute these exact operational steps:

---

### Step 1: Open Blender & Run Master Setup
1. Launch Blender 3.6 LTS.
2. In the top header, switch to the **Scripting** workspace tab.
3. Click **Open** in the text editor pane, navigate to:
   `BLACKOUT-GHOST-PROTOTYPE/Blender/Scripts/00_MASTER_SETUP.py`
4. Click **Run Script** (or press `Alt + P`).
   * *Outcome*: Idempotently builds the 9 production collections (`01_REFERENCE` through `09_TEST`), sets metric units to 1.0m, calibrates viewport clipping (5mm - 100m), and creates the 7 calibrated tactical PBR preview materials.
   * Console prints:
     ```
     ==================================================================
     BLACKOUT MASTER SETUP COMPLETE
     NEXT STEP:
     IMPORT / PREPARE ACTUAL FRANKLIN TARGET
     ==================================================================
     ```

---

### Step 2: Extract & Import Franklin Reference Body
1. Launch **OpenIV**, enable **Edit Mode**.
2. Navigate to:
   `mods/x64v.rpf/models/cdimages/streamedpeds_players.rpf/player_one/`
3. Locate Franklin's naked torso reference (`uppr_000_u.ydd`) and base skeleton.
4. Export as OpenFormats or import directly into Blender via the **Sollumz** importer.
5. Move Franklin's mesh to `01_REFERENCE/REF_Franklin_Body_player_one` and his skeleton to `06_SKELETON`.

---

### Step 3: Execute Asset 01 Benchmark (`GHOST_SHIRT`)
1. Create or link your low-poly shirt mesh under `04_CLOTHING/CLOTH_GHOST_SHIRT/LP_GHOST_SHIRT`.
2. Follow the detailed step-by-step milestones in:
   `Documentation/PHASE_3_EXECUTION_PLAN.md`
   and
   `Assets/GHOST_SHIRT_PRODUCTION_DOSSIER.md`

---

### Step 4: Run Audits & Automated Rigging Pipeline
Execute the audited Phase 2.1 scripts in sequence:
1. **Geometry Audit**: Run `05_asset_preparation.py` -> Non-destructively audits boundary edges, wire edges, and transforms.
2. **UV & Texel Density**: Run `06_uv_preparation.py` -> Validates $[0.0, 1.0]$ bounds and confirms $18 - 24\text{ px/cm}$ texel density.
3. **Armature & Modifiers**: Run `07_modifier_setup.py` -> Configures Armature modifier pointing to Franklin's skeleton.
4. **Weight Transfer**: Run `08_weight_transfer_prep.py` -> Select Franklin reference body and `LP_GHOST_SHIRT`. Interpolates skinning weights, cleans weights $< 0.01$, clamps to max 4 influences per vertex, and normalizes weights.
5. **Export Pre-Flight**: Run `09_export_preparation.py` -> Confirms zero failures across transforms, UVMap, materials, and armature binding.
6. **Batch QA**: Run `10_BATCH_QA.py` -> Generates the final audit report card.
7. **Optional LOD Generation**: Run `11_LOD_PREPARATION.py` -> Generates candidate LOD1 and LOD2 meshes when ready.

---

### Step 5: Export via Sollumz & Package
1. With Sollumz enabled in Blender, convert `LP_GHOST_SHIRT` to a **Sollumz Drawable Model**.
2. Assign Sollumz RAGE shader `gta_normal_specular.sps` and link diffuse (`_D`), normal (`_N`), and specular (`_S`) DDS textures.
3. Export as `jbib_001_u.ydd` and `jbib_001_u.ytd` to:
   `BLACKOUT-GHOST-PROTOTYPE/GTA_V/Export/`

---

### Step 6: Inject into GTA V & Live Test
1. In OpenIV, drag and drop `jbib_001_u.ydd` and `jbib_001_u.ytd` into:
   `mods/x64v.rpf/models/cdimages/streamedpeds_players.rpf/player_one/`
2. Launch GTA V in Single Player.
3. Open trainer (MenuV or Simple Trainer), navigate to Franklin's shirt slot, select item index `001`.
4. Live test: Idle, sprint, crouch, two-handed assault rifle aim, vehicle driving.
5. Complete `Documentation/QA_CHECKLIST.md` sign-off before proceeding to `GHOST_PANTS`.
