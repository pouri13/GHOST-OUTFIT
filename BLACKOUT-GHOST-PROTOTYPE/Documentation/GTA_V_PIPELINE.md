# GTA V END-TO-END MODDING PIPELINE SPECIFICATION
## Project: FRANKLIN — BLACKOUT ULTIMATE PACK
## Asset Set: Ghost Tactical Operator Outfit
## Target Character: Franklin Clinton (`player_one` / Single Player PC)

---

### PIPELINE STATUS CLASSIFICATION

| Phase | Description | Status | Tools Required |
| :--- | :--- | :--- | :--- |
| **PHASE A** | Blender 3D Modeling & Fit | **[REQUIRES BLENDER]** | Blender 3.6 LTS |
| **PHASE B** | UV Layout & PBR Texturing | **[REQUIRES BLENDER]** | Blender 3.6 LTS / Substance Painter |
| **PHASE C** | Rigging & Weight Transfer | **[REQUIRES BLENDER]** | Blender 3.6 LTS + Franklin Base Body |
| **PHASE D** | Sollumz Packaging & RAGE Shaders | **[REQUIRES SOLLUMZ]** | Blender 3.6 LTS + Sollumz Addon |
| **PHASE E** | GTA V Export (.ydd / .ytd) | **[REQUIRES SOLLUMZ]** | Sollumz Exporter |
| **PHASE F** | OpenIV Mod Installation | **[REQUIRES GTA V]** | OpenIV 4.1+ |
| **PHASE G** | Live In-Game Dynamic Testing | **[REQUIRES GTA V]** | GTA V PC + ScriptHookV + Trainer |

---

### REALITY CHECK: WHAT CREATES A WORKING GTA V ASSET?
> **CRITICAL PIPELINE RULE:**
> Exporting an `.obj` or `.fbx` file from Blender **DOES NOT** create a working GTA V clothing mod.
> A functional GTA V clothing asset requires:
> 1. Rigged mesh data bound to an authentic GTA V ped armature.
> 2. Max 4 bone influences per vertex encoded in RAGE vertex buffers.
> 3. Native Sollumz Drawable Model compilation into a **`.ydd` (Y-Drawable Dictionary)** file.
> 4. DDS-encoded textures packed into a **`.ytd` (Y-Texture Dictionary)** file.
> 5. Correct slot-specific ped archive naming (e.g., `jbib_001_u.ydd`).

---

### THE 7-PHASE PRODUCTION SEQUENCE

#### PHASE A: Blender Modeling & Anatomical Fit
* **Action**: Model tactical gear directly over Franklin's extracted base body (`01_REFERENCE/REF_Franklin_Body_player_one`).
* **Checks**: Zero unapplied transforms, check polygon budgets (8k - 18k tris per piece), ensure clean edge loop flow along anatomical bend lines.
* **Script**: Run `05_asset_preparation.py` (Audit Mode).

#### PHASE B: UV Layout & Material Setup
* **Action**: Unwrap mesh onto a single UV layer named `UVMap`.
* **Checks**: 100% of islands within $[0.0, 1.0]$ bounds; texel density between 18 and 24 px/cm.
* **Script**: Run `06_uv_preparation.py`.
* **Preview**: Assign corresponding `MAT_*` preview material from `04_material_creation.py`.

#### PHASE C: Rigging & Skinning Weight Transfer
* **Action**: Transfer vertex weights from Franklin's actual extracted mesh (`uppr_000_u.ydd`) onto the apparel mesh.
* **Checks**: Prune residual weights $< 0.01$, clamp maximum influences to 4 per vertex, normalize weights to sum 1.0.
* **Script**: Run `08_weight_transfer_prep.py`.
* **Blender Verification**: Rotate bones in Pose Mode to inspect creasing at joints.

#### PHASE D: Sollumz Preparation & Shader Binding
* **Action**: With Sollumz installed, convert mesh to a **Sollumz Drawable Model**.
* **Materials**: Replace Blender Principled BSDF with Sollumz RAGE shader (`gta_normal_specular.sps` or `gta_glass.sps`).
* **Texture Links**: Bind embedded texture slots to `_D` (Albedo), `_N` (Normal + Spec Alpha), and `_S` (Specular).

#### PHASE E: GTA V Export (.ydd / .ytd)
* **Action**: Export through Sollumz export dialog to:
  * `.ydd`: Drawable geometry containing embedded armature and bone tags.
  * `.ytd`: Texture dictionary containing DXT1/DXT5 compressed DDS files with mipmaps.
* **Destination**: Stored in `GTA_V/Export/`.

#### PHASE F: Installation via OpenIV
* **Target Directory in OpenIV**:
  `mods/x64v.rpf/models/cdimages/streamedpeds_players.rpf/player_one/`
* **File Slot Mapping for Franklin**:
  * `jbib_001_u.ydd` & `.ytd` -> Ghost Combat Shirt (Jacket/Shirt slot)
  * `lowr_001_u.ydd` & `.ytd` -> Ghost Tactical Pants (Legs slot)
  * `accs_001_u.ydd` & `.ytd` -> Ghost Tactical Vest (Accessory 1 slot)
  * `berd_001_u.ydd` & `.ytd` -> Ghost Skull Mask (Beard/Facial slot)
  * `p_head_001.ydd` & `.ytd` -> Ghost Tactical Hood (Head Prop slot)
  * `feet_001_u.ydd` & `.ytd` -> Ghost Combat Boots (Feet slot)
  * `hand_001_u.ydd` & `.ytd` -> Ghost Tactical Gloves (Hands slot)
  * `accs_002_u.ydd` & `.ytd` -> Ghost Heavy Duty Belt (Accessory 2 slot)
  * `p_eyes_001.ydd` & `.ytd` -> Ghost Ballistic Goggles (Eyes Prop slot)
  * `p_ears_001.ydd` & `.ytd` -> Ghost Tactical Headset (Ears Prop slot)

#### PHASE G: Live In-Game Testing
* **Tools**: GTA V PC, ScriptHookV, MenuV or Enhanced Native Trainer.
* **Execution**:
  1. Boot GTA V in Single Player.
  2. Open Trainer menu -> Player Appearance -> Model Components.
  3. Cycle to slot index `001` to equip the Blackout Ghost assets.
  4. Perform test protocol: Idle, Sprint, Jump, Aim Down Sights (Rifle/Pistol), Drive Vehicle, Ragdoll fall.
  5. Inspect under varied in-game weathers (Extra Sunny, Foggy, Rain, Thunderstorm) to verify normal and specular response.
