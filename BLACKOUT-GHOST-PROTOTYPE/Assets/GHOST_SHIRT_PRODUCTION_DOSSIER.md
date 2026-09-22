# FIRST PRODUCTION ASSET DOSSIER: GHOST_SHIRT
## Role: Technical Test Asset #1 (Proof-of-Concept Baseline)
## Target Slot: `jbib_001_u.ydd` / `jbib_001_u.ytd`
## Target Character: Franklin Clinton (`player_one`)

---

### Execution Status Classification
* **[READY NOW]**: Geometric blueprint, edge flow layout, vertex weight distribution, and automation scripts.
* **[REQUIRES BLENDER]**: 3D mesh extrusion over Franklin base body, UV seam cutting, and normal map baking.
* **[REQUIRES GTA V]**: In-game test in Los Santos to evaluate shoulder deformation during weapon aiming.

---

## 1. Why `GHOST_SHIRT` is the First Technical Asset
In GTA V character modding, the upper torso combat shirt (`jbib`) represents the most complex biomechanical deformation challenge:
1. **Multi-Axis Articulation**: The shoulders (`SKEL_L_Clavicle`, `SKEL_L_UpperArm`) rotate across 3 rotational degrees of freedom during gunplay and driving.
2. **Torso Twist**: Spine bones (`SKEL_Spine0` through `SKEL_Spine3`) twist dramatically when Franklin aims behind himself while driving or takes cover against walls.
3. **Seam Alignment**: The shirt cuffs must align with Franklin's wrist seam (`hand`), and the collar must align with the neck seam (`berd`/`head`).
*Once `GHOST_SHIRT` is modeled, weighted, exported via Sollumz, injected into OpenIV, and validated in-game, the entire pipeline is proven and ready for rapid rollout to pants, vest, mask, and boots.*

---

## 2. Complete Technical Specifications for `GHOST_SHIRT`

### Geometric Parameters:
* **Object Name**: `LP_GHOST_SHIRT`
* **Mesh Data Name**: `MESH_GHOST_SHIRT`
* **Target Triangle Count**: 6,850 Triangles ($\pm 5\%$).
* **Vertex Count**: ~3,600 Vertices.
* **Dimensions**:
  * Chest Circumference: $104\text{ cm}$
  * Arm Length (Shoulder to Wrist Cuff): $62\text{ cm}$
  * Torso Hem Drop (Collar to Waist): $68\text{ cm}$
  * Quarter-Zip Stand Collar Height: $4.5\text{ cm}$
  * Conformal Offset over Franklin Body: $2.5\text{ mm}$

### Topology Strategy & Edge Flow:
* **Raglan Shoulder Construction**: Seam lines curve diagonally from the collar to the armpit, following the natural pectoralis major and trapezius muscle boundaries.
* **Bicep Articulation Rings**: Minimum 4 concentric edge loops surrounding the elbow joint to prevent collapsed arm pinching when Franklin bends his arms to hold a rifle.
* **Underarm Gusset**: Diamond-shaped quad patch in the axilla (armpit) to distribute strain when Franklin raises his arms overhead.
* **Bicep Zipper Pouches**: Low-profile zippered shoulder patch pockets modeled on both sleeves with Velcro loop panels for insignia.

---

## 3. UV & Texel Density Plan

* **UV Map Name**: Strictly `UVMap`.
* **Resolution**: $2048\times 2048$ pixels.
* **Average Texel Density**: $20.4\text{ px/cm}$.
* **UV Seam Layout**:
  * Seam A: Along the underside of each sleeve, running from armpit to wrist.
  * Seam B: Vertical spine centerline down the back.
  * Seam C: Perimeter boundary around collar stand.
  * Seam D: Zipper patch borders.
* **Texture Channel Packing**:
  * `GHOST_SHIRT_D`: Diffuse Albedo (Base Hex `#141517` Ripstop Black) + $10\%$ multiplied AO.
  * `GHOST_SHIRT_N`: DirectX Normal (Green Inverted) + Specular Alpha ($18\%$ grey value for fabric; $75\%$ for metal zipper).
  * `GHOST_SHIRT_S`: Specular falloff (Red) + Tint mask (Green = 0, no tint) + Fresnel (Blue).

---

## 4. Skinning & Bone Weight Distribution

Target Bone Set:
* `SKEL_Spine0`: $5\%$ influence at waistband hem.
* `SKEL_Spine1`: $15\%$ influence across lower ribs.
* `SKEL_Spine2`: $35\%$ influence across mid-chest.
* `SKEL_Spine3`: $45\%$ influence across upper chest and scapula.
* `SKEL_Neck_1`: $60\%$ influence at base of collar.
* `SKEL_L_Clavicle` / `SKEL_R_Clavicle`: $40\%$ influence across shoulder cap.
* `SKEL_L_UpperArm` / `SKEL_R_UpperArm`: Primary deltoid and bicep envelope.
* `SKEL_L_Forearm` / `SKEL_R_Forearm`: Forearm and wrist cuff envelope.

**Enforced Constraint**: Every vertex clamped to a maximum of 4 bone influences via `08_weight_transfer_prep.py`.

---

## 5. Exact Step-by-Step Execution Plan for Asset 01

```
PHASE A: INITIALIZATION (Inside Blender)
  1. Open Blender 3.6 LTS.
  2. Open Blender Scripting workspace.
  3. Load and execute '01_project_setup.py' (Metric scale, lighting).
  4. Load and execute '02_collection_creation.py' (Hierarchy).
  5. Import extracted Franklin body reference into '00_REFERENCES'.

PHASE B: MESH MODELING
  1. Extrude base silhouette conforming to Franklin's upper body.
  2. Apply 2.5mm Shrinkwrap offset helper ('07_modifier_setup.py').
  3. Model raglan seams, elbows, collar stand, and quarter-zip.
  4. Run '05_asset_preparation.py' to sanitize geometry (Apply transforms, merge duplicates).

PHASE C: UV UNWRAPPING & TEXTURING
  1. Mark seams along inner sleeves and back spine.
  2. Unwrap into UV space; name layer 'UVMap'.
  3. Run '06_uv_preparation.py' to verify texel density (~20 px/cm).
  4. Bake normal map and ambient occlusion; generate 'GHOST_SHIRT_D', 'GHOST_SHIRT_N', 'GHOST_SHIRT_S'.

PHASE D: RIGGING & WEIGHT TRANSFER
  1. Add Armature modifier pointing to Franklin ped skeleton.
  2. Run '08_weight_transfer_prep.py':
     - Transfers baseline weights from Franklin torso.
     - Clamps to 4 bones max per vertex.
     - Normalizes weights to 1.0.
  3. Test shoulder poses in Pose Mode to confirm zero spike artifacts.

PHASE E: SOLLUMZ PACKAGING & EXPORT
  1. Run '04_material_creation.py' to assign 'MAT_Tactical_Ripstop_Black'.
  2. Run '09_export_preparation.py' (Generates LOD1 and LOD2).
  3. In Sollumz tool panel, convert to Drawable Model.
  4. Export 'jbib_001_u.ydd' and 'jbib_001_u.ytd' to 'GTA_V/Export/'.

PHASE F: OPENIV INJECTION & GAMEPLAY AUDIT
  1. Inject both files into 'mods/x64v.rpf/.../player_one/'.
  2. Launch GTA V -> Equip Franklin's Shirt 001.
  3. Perform combat animations: Idle, Sprint, Rifle ADS, Cover, Car Entry.
  4. Confirm zero mesh clipping or vertex stretching.
  5. SIGN OFF ASSET 01 -> Proceed immediately to GHOST_PANTS.
```
