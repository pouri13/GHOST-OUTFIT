# QUALITY ASSURANCE & QUALITY CONTROL (QA/QC) MASTER AUDIT
## Project: FRANKLIN — BLACKOUT ULTIMATE PACK
## Asset Set: GHOST TACTICAL OUTFIT
## Target Engine: Rockstar Advanced Game Engine (RAGE) / GTA V PC (`player_one`)

---

### Execution Status Classification
* **[READY NOW]**: Complete 14-stage QA protocol with explicit pass/fail tolerances and remediation procedures.
* **[REQUIRES BLENDER]**: Execution of geometry, UV, skinning, and normal checks via Scripts 03, 05, 06, 08, 09.
* **[REQUIRES GTA V]**: OpenIV model inspection and live in-game dynamic deformation tests.

---

## Master 14-Stage Verification Protocol

### Stage 01: Geometry & Topology
* [ ] **Polygon Budget Compliance**: Asset polycount sits strictly within specified triangle budget (e.g. `GHOST_SHIRT` $\le 7,200$ tris).
* [ ] **Zero Non-Manifold Wire Edges**: Script 05 reports zero wire edges and zero zero-area degenerate polygons.
* [ ] **Quad-Dominant Articulation**: Elbows, knees, and armpits utilize minimum 3 edge-loop bands to support joint bending.
* [ ] **Transform Standardization**: Location = $(0,0,0)$, Rotation = $(0^\circ, 0^\circ, 0^\circ)$, Scale = $(1.0, 1.0, 1.0)$.
* [ ] **No Hidden Duplicate Vertices**: BMesh distance merge ($0.0001\text{ m}$) run cleanly.

### Stage 02: UV Mapping & Layout
* [ ] **Normalized Coordinates**: 100% of UV islands sit strictly within $[0.0, 1.0]$ bounds (unless intentional repeating trim).
* [ ] **Gutter Margin**: Minimum $4\text{ px}$ spacing between UV islands to prevent mipmap texture bleed.
* [ ] **Single UV Channel**: Exactly one UV map present, strictly named `'UVMap'`.
* [ ] **Texel Density Uniformity**: Texel density is verified between $16 - 24\text{ px/cm}$ across main torso/legs.
* [ ] **No Zero-Area Overlaps**: Mirrored UV islands are offset or cleanly aligned without inverted face conflicts.

### Stage 03: Materials & Shaders
* [ ] **Calibrated PBR Baseline**: Albedo base color values stay strictly above RGB $(15, 15, 15)$ to prevent engine black-crush.
* [ ] **Shader Assignment**: Material custom property assigned to correct RAGE shader preset (`gta_normal_specular.sps` or `gta_glass.sps`).
* [ ] **Single Material per Drawable**: Where possible, asset is consolidated to 1 material slot to minimize engine draw calls.

### Stage 04: Textures & Channel Packing
* [ ] **Resolution Budgeting**: Main clothing at $2048\times 2048$, accessories at $1024\times 1024$, props at $512\times 512$.
* [ ] **DirectX Normal Map Orientation**: Normal map Green channel is inverted ($-Y$) as required by RAGE.
* [ ] **Specular Alpha Embedded**: Normal map alpha channel contains calibrated specular intensity mask.
* [ ] **Mipmaps Generated**: Mipmaps created down to $1\times 1$ using Mitchell/Kaiser filter in OpenIV.
* [ ] **Texture Compression**: Saved as DXT1 (RGB) or DXT5 (RGBA).

### Stage 05: Normals & Shading
* [ ] **Recalculated Face Normals**: All polygon normals point outward.
* [ ] **Auto-Smooth / Custom Split Normals**: Shading is free from ugly black shading pinching or terminator artifacts.
* [ ] **Weighted Normal Applied**: Flat hard-surface elements (buckles, armor plates) have weighted normal modifier applied.

### Stage 06: Rigging & Armature
* [ ] **Valid Ped Armature**: Asset is bound to Franklin's canonical skeleton via an Armature modifier.
* [ ] **Canonical Bone Group Names**: 100% of vertex groups match canonical GTA V ped bone names (`SKEL_Pelvis`, `SKEL_Spine1`, etc.).
* [ ] **Preserve Volume Disabled**: Dual-quaternion volume preservation is unchecked (not supported by RAGE).

### Stage 07: Weight Painting (Hard Constraint)
* [ ] **Strict 4-Bone Limit Clamp**: Audited via Script 08; ZERO vertices possess $> 4$ bone influences.
* [ ] **Normalized Vertex Weights**: Every vertex has total weight sum strictly equal to $1.0$ ($100\%$).
* [ ] **No Unweighted Vertices**: Zero orphaned vertices (which causes geometry spikes stretching to origin).
* [ ] **Rigid Armor Isolation**: Rigid polymer plates (knee armor, buckles) are weighted $100\%$ to single rigid bones to prevent rubbery stretching.

### Stage 08: Clipping & Fitting
* [ ] **Franklin Base Fit**: Conformal clothing maintains $2.5 - 4.0\text{ mm}$ clearance over Franklin's body mesh.
* [ ] **Layer Hierarchy Clearance**: Plate carrier sits $3.5\text{ mm}$ above combat shirt without interpenetration.
* [ ] **Neck & Wrist Seams**: Shirt cuffs align with glove boundaries; collar aligns with balaclava rim.

### Stage 09: World Scale & Alignment
* [ ] **Real-World Metric Units**: Scene scale is $1.0\text{ unit} = 1.0\text{ meter}$.
* [ ] **Footwear Ground Alignment**: Soles of tactical boots sit exactly at $Z = 0.0$ plane matching Franklin's vanilla heel height.

### Stage 10: Naming Convention Compliance
* [ ] **Objects**: `LP_GHOST_<ASSET>` verified via Script 03.
* [ ] **Materials**: `MAT_GHOST_<ASSET>` verified.
* [ ] **Textures**: `GHOST_<ASSET>_D`, `_N`, `_S` verified.
* [ ] **Export Targets**: Target ped slot files accurately designated (`jbib_001_u.ydd`, `lowr_001_u.ydd`, etc.).

### Stage 11: Export Packaging (Sollumz)
* [ ] **Sollumz Drawable Conversion**: Mesh converted to Sollumz Drawable Model with embedded LOD0.
* [ ] **LOD1 & LOD2 Generated**: Script 09 decimation meshes linked to Sollumz LOD hierarchy.
* [ ] **Export Cleanliness**: Export completes with zero unhandled exceptions in Blender console.

### Stage 12: OpenIV Installation
* [ ] **Installed to mods Folder**: Files placed inside `mods/x64v.rpf/...` preserving original vanilla archives.
* [ ] **OpenIV 3D Viewport Audit**: Model opens in OpenIV 3D Viewer with correct diffuse textures and normal mapping visible.

### Stage 13: In-Game Animation Tests (CodeWalker / GTA V)
* [ ] **Idle Standing**: Inspect seams under daylight and night street lighting.
* [ ] **Full Sprint & Jog**: Check crotch, knee, and armpit deformation.
* [ ] **Combat Roll & Crouch**: Check lower back and knee armor flex.
* [ ] **Two-Handed Weapon Aim (Rifle ADS)**: Check shoulder deltoid and collar stretch.
* [ ] **Vehicle Entry & Seated Position**: Check waistband and plate carrier clipping through lap.

### Stage 14: Final Sign-Off
* [ ] Lead Technical Artist Sign-Off
* [ ] GTA V Modding Specialist Sign-Off
* [ ] Ready for Phase 2 Pack Integration
