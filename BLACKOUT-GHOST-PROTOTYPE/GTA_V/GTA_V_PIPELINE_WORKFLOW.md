# GTA V MODDING ASSET PIPELINE & WORKFLOW GUIDE
## Pipeline: BLENDER → SOLLUMZ → RAGE ENGINE → OPENIV → IN-GAME TEST
## Project: FRANKLIN — BLACKOUT ULTIMATE PACK
## Character Target: Franklin Clinton (`player_one`)

---

### Execution Status Classification
* **[READY NOW]**: Documented step-by-step toolchain, folder mapping, directory paths, and command flows.
* **[REQUIRES BLENDER]**: Installation of Blender 3.6 LTS and the Sollumz Blender addon.
* **[REQUIRES GTA V]**: OpenIV, CodeWalker, and legal PC installation of Grand Theft Auto V.

---

## 1. Required Toolchain & Plugin Manifest

| Tool / Plugin | Version | Role in Pipeline | Status / Dependency |
| :--- | :--- | :--- | :--- |
| **Blender** | `3.6.x LTS` (Recommended) or `4.x` | 3D modeling, UV unwrapping, rigging, weight transfer, LOD generation | Requires user installation |
| **Sollumz Addon** | `v2.2.0+` (Open-source) | Native Blender importer/exporter for GTA V RAGE formats (`.ydr`, `.ydd`, `.ytd`, `.yft`) | Requires Blender installation |
| **OpenIV** | `v4.1+` | GTA V archive manager; decrypts, views, and injects `.rpf` archives | Requires Windows PC + GTA V |
| **CodeWalker** | `v30+` | Real-time RAGE engine model and skeleton inspector; tests weights without booting GTA V | Optional but strongly advised |
| **MenuV / Simple Trainer** | Latest | In-game mod menu to equip Franklin components dynamically | Requires ScriptHookV in GTA V |

---

## 2. File Formats Reference (Authentic GTA V RAGE Engine Formats)

* **`.ydd` (Y-Drawable Dictionary)**: Multi-model container storing rigged character clothing/body parts with embedded skeleton skinning, vertex buffers, and multiple LODs.
* **`.ytd` (Y-Texture Dictionary)**: Container storing DDS-compressed textures (`D3DFMT_DXT1`, `D3DFMT_DXT5`) with full mipmap chains.
* **`.ydr` (Y-Drawable)**: Single static or rigid prop model (used for detached props like weapons or static world objects).
* **`.yft` (Y-Fragment)**: Dynamic vehicle or destructible physics model (not used for clothing).
* **`.rpf` (RAGE Package File)**: Encrypted archive container holding all GTA V game assets.

---

## 3. End-to-End Production Phase Breakdown

```
[STEP 1: REFERENCE EXTRACTION]
Extract Franklin's player_one.rpf using OpenIV -> Export skeleton & base body to Blender via Sollumz.
                     │
                     ▼
[STEP 2: MODELING & FIT]
Conform tactical gear to Franklin's proportions in Blender -> Run Script 05 (Sanitization).
                     │
                     ▼
[STEP 3: UV & TEXTURING]
Run Script 06 (UV Verification) -> Bake normal & AO in Blender/Substance -> Pack channels.
                     │
                     ▼
[STEP 4: RIGGING & SKINNING]
Run Script 07 (Armature) -> Run Script 08 (Weight Transfer & Strict 4-Bone Limit Clamp).
                     │
                     ▼
[STEP 5: SOLLUMZ PACKAGING]
Convert to Sollumz Drawable Model -> Assign RAGE shaders -> Run Script 09 (Pre-flight & LODs).
                     │
                     ▼
[STEP 6: EXPORT TO .YDD / .YTD]
Sollumz Export -> Creates jbib_001_u.ydd and jbib_001_u.ytd.
                     │
                     ▼
[STEP 7: OPENIV INJECTION]
Inject into mods folder: mods/x64v.rpf/models/cdimages/streamedpeds_players.rpf/player_one/
                     │
                     ▼
[STEP 8: IN-GAME VERIFICATION]
Launch GTA V -> Open Trainer -> Equip Franklin Slot -> Audit deformation in combat animations.
```

---

## 4. OpenIV Installation Folder Hierarchy

To preserve vanilla game files, all assets MUST be installed inside the **`mods` folder** created by OpenIV:

### Target Path for Franklin Clinton (`player_one`):
```
[GTA V Root Directory]
└── mods/
    └── x64v.rpf/
        └── models/
            └── cdimages/
                └── streamedpeds_players.rpf/
                    └── player_one/
                        ├── jbib_001_u.ydd   <-- GHOST_SHIRT (Model)
                        ├── jbib_001_u.ytd   <-- GHOST_SHIRT (Textures)
                        ├── lowr_001_u.ydd   <-- GHOST_PANTS (Model)
                        ├── lowr_001_u.ytd   <-- GHOST_PANTS (Textures)
                        ├── accs_001_u.ydd   <-- GHOST_PLATE_CARRIER (Model)
                        ├── accs_001_u.ytd   <-- GHOST_PLATE_CARRIER (Textures)
                        ├── berd_001_u.ydd   <-- GHOST_MASK (Model)
                        ├── berd_001_u.ytd   <-- GHOST_MASK (Textures)
                        ├── feet_001_u.ydd   <-- GHOST_BOOTS (Model)
                        ├── feet_001_u.ytd   <-- GHOST_BOOTS (Textures)
                        └── hand_001_u.ydd   <-- GHOST_GLOVES (Model)
```

### Target Path for Head Props & Accessories:
```
[GTA V Root Directory]
└── mods/
    └── x64v.rpf/
        └── models/
            └── cdimages/
                └── streamedpedprops.rpf/
                    └── player_one_p/
                        ├── p_head_001.ydd   <-- GHOST_HOOD (Model)
                        ├── p_head_001.ytd   <-- GHOST_HOOD (Textures)
                        ├── p_eyes_001.ydd   <-- GHOST_GOGGLES (Model)
                        └── p_ears_001.ydd   <-- GHOST_HEADSET (Model)
```
