# PHASE 3 EXECUTION PLAN: FIRST PRODUCTION ASSET (`GHOST_SHIRT`)
## Project: FRANKLIN — BLACKOUT ULTIMATE PACK
## Primary Asset: Ghost Tactical Combat Shirt (`LP_GHOST_SHIRT`)
## GTA V Target Slot: `jbib` (Upper Body Outerwear / `jbib_001_u.ydd`)

---

### STRATEGIC MANDATE: SINGLE ASSET BENCHMARKING
Phase 3 does NOT attempt to model all 10 outfit items simultaneously.
Instead, we execute the first REAL production asset: **`GHOST_SHIRT`**.
Only after `GHOST_SHIRT` completes all 14 sequential pipeline milestones and achieves in-game approval will production expand to the combat pants, tactical plate carrier, skull mask, and combat footwear.

---

### THE 14-STEP PRODUCTION SEQUENCE

```
[STEP 01] Franklin Reference Extraction (OpenIV)
    │
    ▼
[STEP 02] Workspace Initialization (00_MASTER_SETUP.py)
    │
    ▼
[STEP 03] High-Poly Sculpt & Micro-Weave Detailing
    │
    ▼
[STEP 04] Low-Poly Retopology (LP_GHOST_SHIRT)
    │
    ▼
[STEP 05] Seam Placement & UV Unwrapping (UVMap)
    │
    ▼
[STEP 06] Texture Baking & Material Assignment
    │
    ▼
[STEP 07] Armature Binding & Weight Transfer
    │
    ▼
[STEP 08] Weight QA & 4-Bone Limit Clamp (Script 08)
    │
    ▼
[STEP 09] Export Pre-Flight Audit (Script 09)
    │
    ▼
[STEP 10] Sollumz Drawable Packaging & RAGE Shaders
    │
    ▼
[STEP 11] YDD / YTD Export to GTA V Format
    │
    ▼
[STEP 12] OpenIV Injection into player_one.rpf
    │
    ▼
[STEP 13] In-Game Live Animation & Clipping Verification
    │
    ▼
[STEP 14] Iterative Polish & Final Milestone Sign-Off
```

---

### DETAILED MILESTONE SPECIFICATIONS

#### Milestone 1: Franklin Reference Target Extraction
* **Tools**: OpenIV 4.1+.
* **Archive Path**: `mods/x64v.rpf/models/cdimages/streamedpeds_players.rpf/player_one/`
* **Target Files**:
  * `uppr_000_u.ydd` (Franklin's naked chest, arms, neck reference)
  * `player_one.skel` / ped armature
* **Blender Placement**: Place under `01_REFERENCE/REF_Franklin_Body_player_one`.

#### Milestone 2: Workspace Initialization
* **Script**: Run `00_MASTER_SETUP.py` in Blender 3.6 LTS.
* **Verification**: Verify 9 collections generated, units set to 1.0m, and `MAT_Tactical_Ripstop_Black` initialized.

#### Milestone 3: High-Poly Sculpt & Fabric Wrinkles
* **Geometry**: High-poly sculpt (`HP_GHOST_SHIRT`) in collection `02_HIGH_POLY`.
* **Details**: Raglan sleeve cut, 210D ripstop micro-weave, elbow reinforcement pads, dual upper-arm zipper utility pockets with loop velcro patches.
* **Proportions**: Built directly over Franklin's extracted torso geometry to prevent anatomical disproportion.

#### Milestone 4: Low-Poly Retopology
* **Geometry**: Low-poly production mesh (`LP_GHOST_SHIRT`) placed in `04_CLOTHING/CLOTH_GHOST_SHIRT`.
* **Budget Target**: 12,000 - 15,000 Triangles.
* **Topology Rules**: Clean edge loops matching shoulder flexion, elbow creasing, and collar ring. No 5+ edge poles at active joint hinges.

#### Milestone 5: UV Layout & Texel Density
* **UV Layer**: Single layer named strictly `UVMap`.
* **Verification**: Run `06_uv_preparation.py`.
* **Acceptance Criteria**: 100% UV islands packed within $[0.0, 1.0]$ bounds; average texel density between 18.0 and 22.0 px/cm.

#### Milestone 6: Texturing & Preview Materials
* **Baking**: 16-bit Normal map, Ambient Occlusion, and Curvature baked from `HP_GHOST_SHIRT`.
* **Textures**:
  * `GHOST_SHIRT_D.dds` (Albedo, 2048x2048, DXT1/BC1)
  * `GHOST_SHIRT_N.dds` (Normal Map + Specular Alpha, 2048x2048, DXT5/BC3)
  * `GHOST_SHIRT_S.dds` (Specular Reflectance / Roughness)
* **Material**: Assign `MAT_Tactical_Ripstop_Black`.

#### Milestone 7: Armature Binding & Weight Transfer
* **Armature**: Bind to Franklin's imported ped skeleton (`06_SKELETON`).
* **Modifier**: Armature modifier with `use_deform_preserve_volume = False`.
* **Transfer**: Transfer vertex weights from Franklin's extracted `uppr_000_u` mesh onto `LP_GHOST_SHIRT` using `08_weight_transfer_prep.py`.

#### Milestone 8: Weight QA & 4-Bone Limit Clamp
* **Execution**: Run `08_weight_transfer_prep.py`.
* **Automated Enforcement**:
  * Prune weights $< 0.01$.
  * Clamp influences to maximum 4 bones per vertex (GPU buffer compliance).
  * Normalize vertex weights to sum = 1.0.
* **Verification**: Verify 0 unweighted vertices and 0 vertices with $> 4$ influences.

#### Milestone 9: Export Pre-Flight Audit
* **Execution**: Run `09_export_preparation.py`.
* **Checklist**:
  * Transforms zeroed (`Loc=0`, `Rot=0`, `Scale=1.0`).
  * Armature modifier active.
  * UVMap confirmed.
  * Material assigned.
* **Pass Condition**: Zero pre-flight failures.

#### Milestone 10: Sollumz RAGE Shader Configuration
* **Environment**: Blender with Sollumz addon enabled.
* **Conversion**: Convert mesh to Sollumz Drawable Model.
* **Shader**: Assign Sollumz `gta_normal_specular.sps` shader.
* **Texture Linking**: Link embedded texture slots to `GHOST_SHIRT_D`, `GHOST_SHIRT_N`, and `GHOST_SHIRT_S`.

#### Milestone 11: Export to GTA V Format
* **Export Action**: Export via Sollumz to `jbib_001_u.ydd` and `jbib_001_u.ytd`.
* **Destination**: Saved into `GTA_V/Export/`.

#### Milestone 12: OpenIV Installation
* **Target Archive**:
  `mods/x64v.rpf/models/cdimages/streamedpeds_players.rpf/player_one/`
* **Injection**: Import `jbib_001_u.ydd` and `jbib_001_u.ytd` in OpenIV Edit Mode.

#### Milestone 13: In-Game Dynamic Testing
* **Test Platform**: GTA V PC running ScriptHookV + MenuV.
* **In-Game Checks**:
  1. *Idle Stance*: Inspect collar and wrist seam alignment with Franklin's neck and hands.
  2. *Combat Walk / Sprint*: Check armpit and elbow deformation for weight spikes or jagged stretching.
  3. *Weapon Aiming (Rifle & Pistol)*: Inspect shoulder deltoid skinning during raised two-handed aiming.
  4. *In-Vehicle Driving*: Verify back and waist creasing inside car seats.
  5. *Lighting Shifts*: Test in midday sun, streetlamp shadows, and rain puddles to verify specular gloss.

#### Milestone 14: Final Sign-Off & Expansion Gate
* **Approval Criteria**: Zero visual clipping through Franklin's skin, no mesh tearing, no texture stretching, zero crashes.
* **Expansion Authorization**: Upon approval, replicate workflow for `GHOST_PANTS`, `GHOST_VEST`, and `GHOST_MASK`.
