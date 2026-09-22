# UNIFIED NAMING CONVENTIONS STANDARD
## Project: FRANKLIN — BLACKOUT ULTIMATE PACK
## Asset Set: GHOST TACTICAL OUTFIT
## Target Engine: Rockstar Advanced Game Engine (RAGE) / GTA V PC (`player_one`)

---

### Execution Status Classification
* **[READY NOW]**: Standardized lexical grammar, prefix definitions, and directory naming conventions across all project assets.
* **[REQUIRES BLENDER]**: Automatic validation and renaming via `03_naming_system.py`.
* **[REQUIRES GTA V]**: OpenIV dictionary lookup and ped variation XML indexing.

---

## 1. Naming Philosophy
In GTA V character modding, naming discrepancies between mesh names, material slots, texture dictionaries, and ped component slot identifiers cause invisible meshes, missing textures (checkerboard artifacts), or export crashes.
We employ a **strict 4-tier naming hierarchy**:
1. **Asset Core Token**: `GHOST_<COMPONENT>`
2. **Mesh Objects**: `LP_GHOST_<COMPONENT>` (Low Poly) / `HP_GHOST_<COMPONENT>` (High Poly)
3. **Materials**: `MAT_GHOST_<COMPONENT>` (or shared `MAT_<NAME>`)
4. **Textures**: `GHOST_<COMPONENT>_<MAPTYPE>`
5. **RAGE Engine Files**: `<slot>_<index>_<variation>.<ext>`

---

## 2. Component Core Tokens & File Mapping Matrix

| Component Core Token | Low-Poly Mesh Object | High-Poly Mesh Object | Primary Material | Texture Base Prefix | GTA V Ped Slot | Target RAGE File |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`GHOST_SHIRT`** | `LP_GHOST_SHIRT` | `HP_GHOST_SHIRT` | `MAT_GHOST_SHIRT` | `GHOST_SHIRT_` | `jbib` (Torso/Shirt) | `jbib_001_u.ydd` |
| **`GHOST_PANTS`** | `LP_GHOST_PANTS` | `HP_GHOST_PANTS` | `MAT_GHOST_PANTS` | `GHOST_PANTS_` | `lowr` (Legs/Pants) | `lowr_001_u.ydd` |
| **`GHOST_VEST`** | `LP_GHOST_VEST` | `HP_GHOST_VEST` | `MAT_GHOST_VEST` | `GHOST_VEST_` | `accs` (Armor Vest) | `accs_001_u.ydd` |
| **`GHOST_MASK`** | `LP_GHOST_MASK` | `HP_GHOST_MASK` | `MAT_GHOST_MASK` | `GHOST_MASK_` | `berd` (Mask/Beard) | `berd_001_u.ydd` |
| **`GHOST_HOOD`** | `LP_GHOST_HOOD` | `HP_GHOST_HOOD` | `MAT_GHOST_HOOD` | `GHOST_HOOD_` | `p_head` (Prop Head) | `p_head_001.ydd` |
| **`GHOST_BOOTS`** | `LP_GHOST_BOOTS` | `HP_GHOST_BOOTS` | `MAT_GHOST_BOOTS` | `GHOST_BOOTS_` | `feet` (Shoes/Boots) | `feet_001_u.ydd` |
| **`GHOST_GLOVES`** | `LP_GHOST_GLOVES` | `HP_GHOST_GLOVES` | `MAT_GHOST_GLOVES`| `GHOST_GLOVES_`| `hand` (Hands/Gloves)| `hand_001_u.ydd` |
| **`GHOST_BELT`** | `LP_GHOST_BELT` | `HP_GHOST_BELT` | `MAT_GHOST_BELT` | `GHOST_BELT_` | `accs` (Duty Belt) | `accs_002_u.ydd` |
| **`GHOST_GOGGLES`** | `LP_GHOST_GOGGLES`| `HP_GHOST_GOGGLES`| `MAT_GHOST_GOGGLES`| `GHOST_GOGGLES_`| `p_eyes` (Eyewear) | `p_eyes_001.ydd` |
| **`GHOST_HEADSET`** | `LP_GHOST_HEADSET`| `HP_GHOST_HEADSET`| `MAT_GHOST_HEADSET`| `GHOST_HEADSET_`| `p_ears` (Ears) | `p_ears_001.ydd` |

---

## 3. Texture Map Suffix Standards

All texture files follow a strict single-letter uppercase suffix:

* **`_D`**: **Diffuse / Albedo Map**
  * Example: `GHOST_SHIRT_D.png`, `GHOST_PANTS_D.png`
  * Contains pure base color with ambient occlusion baked at $10\% - 15\%$.
* **`_N`**: **Normal + Specular Alpha Map**
  * Example: `GHOST_SHIRT_N.png`, `GHOST_BOOTS_N.png`
  * RGB = Tangent space normal (DirectX inverted Y); Alpha = Specular intensity.
* **`_S`**: **Specular / Roughness / Tint Mask Map**
  * Example: `GHOST_SHIRT_S.png`, `GHOST_MASK_S.png`
  * R = Roughness / Falloff, G = Tint palette mask, B = Fresnel factor.
* **`_AO`**: **Raw Ambient Occlusion Bake**
  * Example: `GHOST_SHIRT_AO.png`
* **`_ID`**: **Material Color ID Map**
  * Example: `GHOST_SHIRT_ID.png`
