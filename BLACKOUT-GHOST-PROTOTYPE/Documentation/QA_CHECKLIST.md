# PRODUCTION QUALITY ASSURANCE & COMPLIANCE CHECKLIST
## Project: FRANKLIN — BLACKOUT ULTIMATE PACK
## Asset Set: Ghost Tactical Operator Outfit (Franklin Clinton - GTA V PC)

---

### STAGE-BY-STAGE COMPLIANCE VERIFICATION

#### STAGE 1: MESH GEOMETRY & TOPOLOGY
*Requirement: Executed in Blender 3.6 LTS via Script 05 & Script 10.*
*Status: **[REQUIRES BLENDER]***

- [ ] **Transforms Zeroed**: Location = $(0, 0, 0)$, Rotation = $(0, 0, 0)$, Scale = $(1.0, 1.0, 1.0)$.
- [ ] **World Origin**: Feet grounded at $Z = 0.000$, mesh centered along $X = 0.000$.
- [ ] **No Degenerate Faces**: Zero zero-area polygons, zero interior faces.
- [ ] **No Wire Edges**: All edges are connected to valid polygon faces.
- [ ] **Manifold Boundary Check**: Non-manifold geometry is strictly confined to natural anatomical openings (neck hole, cuffs, boot tops).
- [ ] **Triangle Budget Compliance**:
  - Combat Shirt: $\le 15,000$ Tris
  - Tactical Pants: $\le 14,000$ Tris
  - Plate Carrier Vest: $\le 18,000$ Tris
  - Skull Mask: $\le 8,000$ Tris
  - Combat Boots (Pair): $\le 12,000$ Tris
  - Tactical Gloves (Pair): $\le 8,000$ Tris
  - Tactical Belt & Pouches: $\le 10,000$ Tris
  - Tactical Hood: $\le 6,000$ Tris
  - Ballistic Goggles: $\le 5,000$ Tris
  - Headset & Radio: $\le 6,000$ Tris

---

#### STAGE 2: UV LAYOUT & TEXTURE MAPPING
*Requirement: Executed in Blender via Script 06.*
*Status: **[REQUIRES BLENDER]***

- [ ] **UV Layer Naming**: Primary active UV layer named exactly `UVMap`.
- [ ] **Single UV Channel**: Exactly 1 UV map present on clothing export candidate.
- [ ] **UV Domain Bounds**: 100% of UV islands contained strictly within $[0.0, 1.0]$ coordinate space.
- [ ] **Texel Density**: Uniform texel density maintained between $18.0\text{ px/cm}$ and $24.0\text{ px/cm}$ at $2048\times 2048$ resolution.
- [ ] **Seam Placement**: UV seams strategically hidden along natural fabric construction lines (inseams, armpit raglan lines, under-collar).

---

#### STAGE 3: MATERIALS & TEXTURE CHANNEL PACKING
*Requirement: Configured in Blender via Script 04 and compiled via OpenIV.*
*Status: **[REQUIRES SOLLUMZ & GTA V]***

- [ ] **Preview Material Assigned**: Assigned one of the 7 calibrated tactical PBR materials (`MAT_*`).
- [ ] **Sollumz Shader Bound**: Converted to native Sollumz RAGE shader (`gta_normal_specular.sps`).
- [ ] **Normal Map Specular Alpha**: Normal map (`_N`) exported as DXT5 with **Specular Reflection Mask packed in the Alpha Channel**.
- [ ] **DDS Mipmaps Generated**: All DDS files include a complete set of power-of-two mipmaps.
- [ ] **Resolution Budget**: Master textures at $2048\times 2048$; props and accessories at $1024\times 1024$.

---

#### STAGE 4: RIGGING, SKELETON & SKINNING WEIGHTS
*Requirement: Executed in Blender via Script 08.*
*Status: **[REQUIRES BLENDER & SOLLUMZ]***

- [ ] **Bound to Ped Armature**: Active Armature modifier linked to Franklin's extracted skeleton.
- [ ] **Source-Driven Weights**: Weights transferred from Franklin's authentic body mesh (`uppr_000_u.ydd`).
- [ ] **Maximum 4 Influences**: Zero vertices with $> 4$ bone influences (RAGE GPU hardware limit).
- [ ] **Normalized Weight Sum**: Every vertex influence sum equals $1.0000 \pm 0.0001$.
- [ ] **Zero Unweighted Vertices**: No unweighted vertices (prevents world-origin vertex spikes).
- [ ] **Pose Mode Stress Test**: Visually checked shoulder raises, elbow folds, and spine flexion in Blender.

---

#### STAGE 5: EXPORT PRE-FLIGHT & PACKAGING
*Requirement: Executed via Script 09 and Sollumz Exporter.*
*Status: **[REQUIRES SOLLUMZ]***

- [ ] **Pre-Flight Passed**: `09_export_preparation.py` returns 0 Failures.
- [ ] **Batch QA Passed**: `10_BATCH_QA.py` returns PASS on production assets.
- [ ] **Correct Archive Naming**: Follows canonical slot name (e.g., `jbib_001_u.ydd`).
- [ ] **Export Verification**: `.ydd` and `.ytd` files successfully written to `GTA_V/Export/`.

---

#### STAGE 6: IN-GAME PLAYTESTING & CERTIFICATION
*Requirement: Executed in GTA V PC with ScriptHookV & MenuV.*
*Status: **[REQUIRES GTA V]***

- [ ] **OpenIV Injection**: Mod successfully installed into `mods/.../player_one/` archive.
- [ ] **In-Game Spawn**: Item equips cleanly via trainer without crash or texture glitch.
- [ ] **Mesh Clipping Check**: No naked Franklin skin clips through clothing during combat sprint or crouch.
- [ ] **Joint Tearing Check**: Seams at wrists and neck remain connected to Franklin's hands and head.
- [ ] **Weapon Aiming Test**: Shoulder deltoids deform cleanly when aiming two-handed assault rifles and sidearms.
- [ ] **Vehicle Driving Test**: Torso folds naturally in sports car bucket seats.
- [ ] **Lighting & Shaders**: Normal map bumps and specular highlights render realistically in direct sunlight, night streetlamps, and rain.
