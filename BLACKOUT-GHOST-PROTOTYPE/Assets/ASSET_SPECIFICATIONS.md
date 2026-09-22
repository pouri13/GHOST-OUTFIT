# ASSET SPECIFICATIONS DOSSIER: 11 MODULAR COMPONENTS
## Project: FRANKLIN — BLACKOUT ULTIMATE PACK
## Asset Set: GHOST TACTICAL OUTFIT
## Target Engine: Rockstar Advanced Game Engine (RAGE) / GTA V PC (`player_one`)

---

### Execution Status Classification
* **[READY NOW]**: Complete structural dimensions, polygon budgets, rigging envelopes, UV channel layouts, and deformation rules.
* **[REQUIRES BLENDER]**: Actual vertex extrusion, Sub-D sculpting, shrinkwrap modeling, and bone weight painting.
* **[REQUIRES GTA V]**: Sollumz `.ydd` export and testing against Franklin's default walk, run, combat roll, and weapon aim animations.

---

## Master Budget Overview

| Asset Identifier | Ped Slot | Target File | Poly Budget (Tris) | Texture Res | Assigned Materials | Primary Rigging Bones |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`GHOST_SHIRT`** | `jbib` | `jbib_001_u.ydd` | 6,500 – 7,200 | $2048\times 2048$ | `MAT_Tactical_Ripstop_Black`, `MAT_Coated_Metal` | `SKEL_Spine0-3`, Clavicles, Arms |
| **`GHOST_PANTS`** | `lowr` | `lowr_001_u.ydd` | 5,800 – 6,400 | $2048\times 2048$ | `MAT_Tactical_Ripstop_Black`, `MAT_Tactical_Polymer` | `SKEL_Pelvis`, Thighs, Calves |
| **`GHOST_PLATE_CARRIER`** | `accs` | `accs_001_u.ydd` | 4,800 – 5,400 | $2048\times 2048$ | `MAT_Cordura_Black`, `MAT_Coated_Metal` | `SKEL_Spine1-3`, Clavicles |
| **`GHOST_CHEST_RIG`** | `accs` | `accs_002_u.ydd` | 3,200 – 3,800 | $1024\times 1024$ | `MAT_Cordura_Black`, `MAT_Coated_Metal` | `SKEL_Spine2-3` |
| **`GHOST_MASK`** | `berd` | `berd_001_u.ydd` | 3,200 – 3,600 | $1024\times 1024$ | `MAT_Tactical_Polymer`, `MAT_Tactical_Ripstop_Black` | `SKEL_Head`, `SKEL_Neck_1`, `FACIAL_jaw` |
| **`GHOST_HOOD`** | `p_head` | `p_head_001.ydd` | 2,000 – 2,400 | $1024\times 1024$ | `MAT_Tactical_Ripstop_Black` | `SKEL_Head`, `SKEL_Neck_1`, `SKEL_Spine3` |
| **`GHOST_BOOTS`** | `feet` | `feet_001_u.ydd` | 4,400 – 5,000 | $1024\times 1024$ | `MAT_Leather_Black`, `MAT_Rubber`, `MAT_Cordura_Black` | `SKEL_Foot`, `SKEL_Toe0`, `SKEL_Calf` |
| **`GHOST_GLOVES`** | `hand` | `hand_001_u.ydd` | 3,000 – 3,400 | $1024\times 1024$ | `MAT_Leather_Black`, `MAT_Tactical_Polymer` | `SKEL_Hand`, 10 Finger Joint Bones |
| **`GHOST_BELT`** | `accs` | `accs_003_u.ydd` | 2,600 – 3,000 | $1024\times 1024$ | `MAT_Cordura_Black`, `MAT_Coated_Metal` | `SKEL_Pelvis`, Upper Thighs |
| **`GHOST_GOGGLES`** | `p_eyes` | `p_eyes_001.ydd` | 1,200 – 1,500 | $512\times 512$ | `MAT_Tactical_Polymer`, `MAT_Glass_Dark`, `MAT_Rubber` | `SKEL_Head` (100% rigid) |
| **`GHOST_HEADSET`** | `p_ears` | `p_ears_001.ydd` | 1,500 – 1,800 | $512\times 512$ | `MAT_Tactical_Polymer`, `MAT_Coated_Metal` | `SKEL_Head` (100% rigid) |

**Total Cumulative Triangles:** ~34,500 Triangles (Full Outfit combined with all accessories).

---

## Detailed Asset Specifications

### 1. `GHOST_SHIRT` (Primary Test Asset)
* **Purpose**: Base tactical combat shirt covering upper torso, collar, shoulders, biceps, and forearms.
* **Approx. Polygon Budget**: 6,850 Triangles (LOD0).
* **Dimensions / Proportions**: Modeled directly around Franklin's torso mesh. Chest width: $44\text{ cm}$; Sleeve length: $62\text{ cm}$; Collar stand: $4.5\text{ cm}$.
* **Topology Strategy**: Quad-dominant edge flow with circular loop rings around the shoulder deltoid, armpit flexion creases, and elbow articulation points. Inseams follow authentic tactical combat shirt tailoring lines.
* **Materials**: `MAT_Tactical_Ripstop_Black` (body/sleeves) and `MAT_Coated_Metal` (zipper hardware).
* **UV Strategy**: Split along internal sleeve seam, raglan shoulder lines, and spine center. Mirrored symmetric UVs for forearm cuffs to maximize texel density.
* **Texture Resolution**: $2048\times 2048$ pixels.
* **Deformation Requirements**: Full skinning across `SKEL_Spine0`, `SKEL_Spine1`, `SKEL_Spine2`, `SKEL_Spine3`, `SKEL_L_Clavicle`, `SKEL_L_UpperArm`, `SKEL_L_Forearm`, `SKEL_R_Clavicle`, `SKEL_R_UpperArm`, `SKEL_R_Forearm`.
* **Attachment Method**: Conformal garment mesh replacing default Franklin naked upper body.
* **Likely Clipping Areas**: Armpit crevices during extreme two-handed rifle aiming; waistband line where shirt meets combat pants; neck seam where collar meets balaclava.
* **GTA V Considerations**: Ensure Franklin's default bare chest geometry is suppressed by replacing the `jbib` slot. Wrist cuff vertex rings must align exactly with `hand_001_u.ydd` vertices.

### 2. `GHOST_PANTS`
* **Purpose**: Tactical combat trousers with integrated Crye-style articulated external knee armor.
* **Approx. Polygon Budget**: 6,120 Triangles (LOD0).
* **Dimensions / Proportions**: Waist: $88\text{ cm}$; Inseam: $84\text{ cm}$; Knee cap width: $14\text{ cm}$.
* **Topology Strategy**: Radial quad rings surrounding the patella; horizontal accordion stretch loops above the knee for crouching deformations.
* **Materials**: `MAT_Tactical_Ripstop_Black` (main fabric) and `MAT_Tactical_Polymer` (knee cap plates).
* **UV Strategy**: Split along inner leg inseam and outer thigh seam. Knee armor mapped as dedicated planar islands.
* **Texture Resolution**: $2048\times 2048$ pixels.
* **Deformation Requirements**: Rigged to `SKEL_Pelvis`, `SKEL_L_Thigh`, `SKEL_L_Calf`, `SKEL_R_Thigh`, `SKEL_R_Calf`. Hard polymer knee caps are weighted $100\%$ to the Calf bone with $0\%$ thigh influence to prevent rubbery stretching.
* **Attachment Method**: Replaces default `lowr` slot.
* **Likely Clipping Areas**: Crotch seam during sprint animations; back of knee during deep crouching; lower cuff inside boot shaft.
* **GTA V Considerations**: Lower cuff geometry ends at mid-shin with an inward taper, designed to tuck cleanly inside `feet_001_u.ydd` without intersecting the outer boot leather.

### 3. `GHOST_PLATE_CARRIER`
* **Purpose**: Low-profile ballistic armor carrier with laser-cut MOLLE webbing, triple kangaroo magazine pouches, and admin chest compartment.
* **Approx. Polygon Budget**: 5,240 Triangles (LOD0).
* **Dimensions / Proportions**: Plate size: $25\text{ cm}\times 30\text{ cm}$ (Shooter's Cut ceramic strike face); Cummerbund depth: $12\text{ cm}$; Shoulder strap width: $5.0\text{ cm}$.
* **Topology Strategy**: Chamfered hard-surface outer borders with planar front and back bags. Straps contour tightly over the shoulder deltoid.
* **Materials**: `MAT_Cordura_Black` (carrier chassis and pouches) and `MAT_Coated_Metal` (quick-detach hardware).
* **UV Strategy**: Front bag, rear bag, cummerbund sides, and shoulder pads unwrapped with $4\text{px}$ gutter margin to prevent MIP map bleeding.
* **Texture Resolution**: $2048\times 2048$ pixels.
* **Deformation Requirements**: Rigged primarily to `SKEL_Spine1`, `SKEL_Spine2`, and `SKEL_Spine3`. Shoulder straps blend into `SKEL_L_Clavicle` and `SKEL_R_Clavicle` with smooth falloff.
* **Attachment Method**: Assigned to `accs` slot (accessory/vest overlay).
* **Likely Clipping Areas**: Pouch tops when Franklin brings his weapon up to aim down sights (ADS); shoulder strap undersides clipping through combat shirt fabric.
* **GTA V Considerations**: Must hover $3.5\text{ mm}$ to $4.0\text{ mm}$ proud of the `GHOST_SHIRT` outer surface. The right cummerbund is left clean of pouches to prevent weapon stock clipping.

### 4. `GHOST_CHEST_RIG` (Alternative Low-Profile Rig)
* **Purpose**: Lightweight micro chest harness for covert operations without heavy ballistic armor plates.
* **Approx. Polygon Budget**: 3,450 Triangles.
* **Dimensions / Proportions**: Chest panel: $30\text{ cm}\times 15\text{ cm}$; X-harness back strap width: $3.8\text{ cm}$.
* **Topology Strategy**: Flat webbing strips with modeled side-release buckles.
* **Materials**: `MAT_Cordura_Black` and `MAT_Coated_Metal`.
* **UV Strategy**: Packed efficiently into $1024\times 1024$ space.
* **Deformation Requirements**: Weighted to `SKEL_Spine2` and `SKEL_Spine3`.
* **Attachment Method**: Alternative `accs` slot drawable variation.
* **Likely Clipping Areas**: Torso spine bending during vehicle driving animations.
* **GTA V Considerations**: Can be swapped with `GHOST_PLATE_CARRIER` in wardrobe.

### 5. `GHOST_MASK`
* **Purpose**: Original tactical mandible skull armor plate over a breathable dark contour-printed balaclava.
* **Approx. Polygon Budget**: 3,420 Triangles.
* **Dimensions / Proportions**: Covers from bridge of nose to beneath chin ($16\text{ cm}$ vertical); cheek width: $17\text{ cm}$.
* **Topology Strategy**: Angular multi-planar faceted surface modeling for the jawplate. Distinct from Call of Duty’s organic rounded skull scan. Micro-mesh intake ports modeled as chamfered recesses.
* **Materials**: `MAT_Tactical_Polymer` (mandible plate) and `MAT_Tactical_Ripstop_Black` (balaclava underlayer).
* **UV Strategy**: Symmetrical face layout with dedicated high-density island for the front jawplate.
* **Texture Resolution**: $1024\times 1024$ pixels.
* **Deformation Requirements**: Rigged to `SKEL_Head` ($90\%$) and `SKEL_Neck_1` ($10\%$). Minor weighting to `FACIAL_jaw` so the mask moves naturally if Franklin speaks during story cutscenes.
* **Attachment Method**: Assigned to `berd` (beard/mask) or `teef` slot.
* **Likely Clipping Areas**: Jaw corners when head rotates fully left or right; nose bridge intersecting high-stand collars.
* **GTA V Considerations**: Must replace Franklin's default facial hair/beard slots to avoid clipping through facial mesh.

### 6. `GHOST_HOOD`
* **Purpose**: Combat hood cowl draped around the neck and over the head/balaclava.
* **Approx. Polygon Budget**: 2,180 Triangles.
* **Dimensions / Proportions**: Hood arch height: $28\text{ cm}$; Neck drape circumference: $52\text{ cm}$.
* **Topology Strategy**: Double-sided cloth shell with clean rolled edge loops at the face opening.
* **Materials**: `MAT_Tactical_Ripstop_Black`.
* **UV Strategy**: Unwrapped with seams along the crown center and lower neck rim.
* **Texture Resolution**: $1024\times 1024$ pixels.
* **Deformation Requirements**: Rigged to `SKEL_Head`, `SKEL_Neck_1`, and `SKEL_Spine3`.
* **Attachment Method**: Assigned to `p_head` prop slot or `hair` slot.
* **Likely Clipping Areas**: Back of the neck during upward head pitch; shoulder collar drape during shoulder shrugs.
* **GTA V Considerations**: Auto-hides Franklin's default hair geometry to prevent scalp poke-through.

### 7. `GHOST_BOOTS`
* **Purpose**: High-traction tactical combat boots with aggressive Vibram-style lugged outsoles and speed-lacing eyelets.
* **Approx. Polygon Budget**: 4,680 Triangles (pair combined).
* **Dimensions / Proportions**: Boot height: $22\text{ cm}$; Sole thickness: $2.8\text{ cm}$; Lug depth: $6\text{ mm}$.
* **Topology Strategy**: Outsole modeled with distinct deep perimeter lugs. Upper leather constructed with ankle crease flow loops. Paracord laces simplified to clean low-poly cross-straps tucked into the tongue pocket.
* **Materials**: `MAT_Leather_Black` (uppers), `MAT_Rubber` (outsole and toe scuff bumper), `MAT_Cordura_Black` (ankle panels).
* **UV Strategy**: Left and right boots share mirrored UV space for symmetrical sole lugs, but feature unique UV islands for outer branding/wear patches.
* **Texture Resolution**: $1024\times 1024$ pixels.
* **Deformation Requirements**: Rigged to `SKEL_L_Foot`, `SKEL_L_Toe0`, `SKEL_L_Calf`, and right-side equivalents. The sole under the heel is weighted $100\%$ to `SKEL_Foot` to prevent rubber warping.
* **Attachment Method**: Replaces `feet` slot (`feet_001_u.ydd`).
* **Likely Clipping Areas**: Ground plane penetration during steep slope walks; internal shaft intersecting pant cuffs.
* **GTA V Considerations**: Foot root elevation must exactly match Franklin's default bare heel height to prevent floating feet or ground sinking.

### 8. `GHOST_GLOVES`
* **Purpose**: Tactical assault gloves with molded polymer knuckle protectors and reinforced leather grip palms.
* **Approx. Polygon Budget**: 3,180 Triangles (pair combined).
* **Dimensions / Proportions**: Glove length: $24\text{ cm}$; Knuckle plate span: $9.5\text{ cm}$.
* **Topology Strategy**: Finger joints feature 3 concentric edge loops per knuckle for crisp curling deformations.
* **Materials**: `MAT_Leather_Black` (palm) and `MAT_Tactical_Polymer` (knuckle bar).
* **UV Strategy**: Unwrapped with seams along the side seam of each finger.
* **Texture Resolution**: $1024\times 1024$ pixels.
* **Deformation Requirements**: Rigged to `SKEL_L_Hand`, `SKEL_L_Finger00-42`, and right-side equivalents.
* **Attachment Method**: Replaces `hand` slot (`hand_001_u.ydd`).
* **Likely Clipping Areas**: Finger interpenetration during tight fist or trigger pull animations.
* **GTA V Considerations**: Franklin's default fingers must be completely substituted by the glove mesh to eliminate double mesh overhead.

### 9. `GHOST_BELT`
* **Purpose**: Rigid 1.75-inch two-piece tactical operator duty belt with quick-release metal Cobra buckle and rear IFAK pouch.
* **Approx. Polygon Budget**: 2,890 Triangles.
* **Dimensions / Proportions**: Belt width: $4.5\text{ cm}$; Buckle width: $6.0\text{ cm}$; IFAK pouch: $18\times 10\times 6\text{ cm}$.
* **Topology Strategy**: Extruded rectangular ribbon conforming to the pelvic rim. Metal buckle modeled with chamfered alloy plates.
* **Materials**: `MAT_Cordura_Black`, `MAT_Coated_Metal`.
* **UV Strategy**: Packed into $1024\times 1024$ space.
* **Deformation Requirements**: Rigged to `SKEL_Pelvis` ($85\%$) and upper thigh tops ($15\%$).
* **Attachment Method**: Secondary accessory slot (`accs_002_u.ydd`).
* **Likely Clipping Areas**: Rear IFAK pouch intersecting car seat cushions during vehicle entry.
* **GTA V Considerations**: Rests strictly between the bottom of `GHOST_PLATE_CARRIER` and the waistband loops of `GHOST_PANTS`.

### 10. `GHOST_GOGGLES`
* **Purpose**: Low-profile ballistic tactical eye protection with dark polycarbonate lens and silicone strap.
* **Approx. Polygon Budget**: 1,320 Triangles.
* **Dimensions / Proportions**: Frame width: $16\text{ cm}$; Lens height: $5.2\text{ cm}$.
* **Topology Strategy**: Rigid frame with curved cylindrical lens face.
* **Materials**: `MAT_Tactical_Polymer` (frame), `MAT_Glass_Dark` (lens), `MAT_Rubber` (strap).
* **UV Strategy**: Packed into $512\times 512$ space.
* **Deformation Requirements**: Weighted $100\%$ rigid to `SKEL_Head`.
* **Attachment Method**: Prop eyewear slot (`p_eyes_001.ydd`).
* **Likely Clipping Areas**: Lens touching eyebrow ridges if head geometry morphs.
* **GTA V Considerations**: Set lens shader with subtle alpha transparency ($70\%$).

### 11. `GHOST_HEADSET`
* **Purpose**: Low-profile tactical communications headset with ear cups, headband, and boom microphone.
* **Approx. Polygon Budget**: 1,650 Triangles.
* **Dimensions / Proportions**: Ear cup height: $10\text{ cm}$; Boom mic length: $12\text{ cm}$.
* **Topology Strategy**: Hard-surface modeled cups with ribbed headband cushion.
* **Materials**: `MAT_Tactical_Polymer`, `MAT_Coated_Metal`.
* **UV Strategy**: Packed into $512\times 512$ space.
* **Deformation Requirements**: Weighted $100\%$ rigid to `SKEL_Head`.
* **Attachment Method**: Prop ear accessory slot (`p_ears_001.ydd`).
* **Likely Clipping Areas**: Headband clipping through thick hood folds.
* **GTA V Considerations**: Must fit comfortably over the balaclava underlayer.
