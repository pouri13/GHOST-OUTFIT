# EXACT OPERATIONAL NEXT STEPS (POST-BLENDER INSTALLATION)
## Project: FRANKLIN — BLACKOUT ULTIMATE PACK
## Asset Set: GHOST TACTICAL OUTFIT

---

When you have installed **Blender 3.6 LTS**, you will NOT have to invent workflows or guess settings. You can immediately execute these exact operational steps:

---

### Step 1: Open Blender & Load Project Setup
1. Launch Blender 3.6 LTS.
2. In the top header, switch to the **Scripting** workspace tab.
3. Click **Open** in the text editor pane, navigate to:
   `BLACKOUT-GHOST-PROTOTYPE/Blender/Scripts/01_project_setup.py`
4. Click **Run Script** (or press `Alt + P`).
   * *Outcome*: Scene units switch to Metric ($1.0\text{ unit} = 1.0\text{ meter}$), viewport clipping is calibrated, and the calibrated studio lighting rig is spawned.

---

### Step 2: Build Collection Hierarchy
1. In the Scripting text editor, open:
   `BLACKOUT-GHOST-PROTOTYPE/Blender/Scripts/02_collection_creation.py`
2. Click **Run Script** (`Alt + P`).
   * *Outcome*: The complete Outliner tree (`00_REFERENCES`, `01_HIGH_POLY`, `02_LOW_POLY_PRODUCTION`, `03_ARMATURE_RIGS`, `04_SOLLUMZ_EXPORT`, `05_LODS`) is built instantly.

---

### Step 3: Populate Material Suite
1. In the Scripting text editor, open:
   `BLACKOUT-GHOST-PROTOTYPE/Blender/Scripts/04_material_creation.py`
2. Click **Run Script** (`Alt + P`).
   * *Outcome*: All 7 tactical materials (`MAT_Tactical_Ripstop_Black`, `MAT_Cordura_Black`, `MAT_Tactical_Polymer`, `MAT_Leather_Black`, `MAT_Rubber`, `MAT_Coated_Metal`, `MAT_Glass_Dark`) are generated with PBR values and RAGE shader properties.

---

### Step 4: Extract & Import Franklin Reference Body
1. Launch **OpenIV**, enable **Edit Mode**.
2. Navigate to:
   `x64v.rpf/models/cdimages/streamedpeds_players.rpf/player_one/`
3. Locate Franklin's naked torso reference: `uppr_000_u.ydd` and the base character skeleton.
4. Export as OpenFormats (`.ydr.xml` or `.ydd.xml`) or import directly into Blender via the **Sollumz** importer.
5. Move Franklin's mesh to `00_REFERENCES/REF_Franklin_Body_player_one` and his skeleton to `03_ARMATURE_RIGS/RIG_Deform_Skel_Ped`.

---

### Step 5: Execute Asset 01 (`GHOST_SHIRT`)
1. Create or link your low-poly shirt mesh under `02_LOW_POLY_PRODUCTION/LP_GHOST_SHIRT`.
2. Follow the detailed step-by-step milestones in:
   `BLACKOUT-GHOST-PROTOTYPE/Assets/GHOST_SHIRT_PRODUCTION_DOSSIER.md`
3. Run the automated pipeline scripts in sequence:
   * Run `05_asset_preparation.py` -> Cleans geometry and zeroes transforms.
   * Run `06_uv_preparation.py` -> Validates UV bounds and texel density.
   * Run `07_modifier_setup.py` -> Binds Armature modifier to Franklin skeleton.
   * Run `08_weight_transfer_prep.py` -> Interpolates Franklin weights and clamps to max 4 bones per vertex.
   * Run `09_export_preparation.py` -> Runs pre-flight audit and generates LOD1/LOD2.

---

### Step 6: Export via Sollumz & Inject into GTA V
1. In Sollumz panel, select `LP_GHOST_SHIRT`, click **Create Drawable Model**, assign `gta_normal_specular.sps`.
2. Export as `jbib_001_u.ydd` and `jbib_001_u.ytd` to:
   `BLACKOUT-GHOST-PROTOTYPE/GTA_V/Export/`
3. In OpenIV, drag and drop into:
   `mods/x64v.rpf/models/cdimages/streamedpeds_players.rpf/player_one/`
4. Launch GTA V, open your trainer, equip Franklin Shirt 001, and verify shoulder motion.
5. Sign off QA checklist item by item!
