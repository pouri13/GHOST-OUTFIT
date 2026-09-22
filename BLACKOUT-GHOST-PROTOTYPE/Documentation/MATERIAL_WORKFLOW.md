# MATERIAL SYSTEM & RAGE SHADER WORKFLOW
## Project: FRANKLIN — BLACKOUT ULTIMATE PACK
## Asset Set: Ghost Tactical Operator Outfit

---

### EXECUTION STATUS CLASSIFICATION

| Component | Status | Tool / Requirement |
| :--- | :--- | :--- |
| **Material Definitions & PBR Specs** | **[READY NOW]** | Defined in `Materials/` and Python scripts |
| **Blender Viewport PBR Generation** | **[REQUIRES BLENDER]** | Generated via `04_material_creation.py` |
| **Native Sollumz RAGE Shaders** | **[REQUIRES SOLLUMZ]** | Sollumz addon required in Phase D |
| **Texture Dictionary (.ytd) Compilation** | **[REQUIRES GTA V]** | OpenIV texture compiler & DDS import |

---

### 1. The Two-Stage Material Architecture
A common mistake in GTA V modding is assuming that standard Blender shader nodes can be read directly by the game engine.

Our pipeline strictly separates material handling into two distinct stages:

```
STAGE 1: BLENDER VIEWPORT PREVIEW (Active in Phases A - C)
Standard Principled BSDF nodes provide accurate real-time PBR lighting
and color response in Blender 3.6 LTS viewport while sculpting and texturing.
                     │
                     ▼
STAGE 2: SOLLUMZ RAGE SHADER COMPILATION (Executed in Phase D)
Materials are converted into native Sollumz Shader Materials
(sollumz_material_shader) and bound to GTA V .ytd texture dictionaries.
```

All materials in this repository are currently flagged with metadata: `VERIFY_IN_SOLLUMZ`.

---

### 2. The 7 Production Tactical Materials

| Material Name | Base Color (RGB) | Roughness | Specular | Target RAGE Shader | Application in Ghost Outfit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`MAT_Tactical_Ripstop_Black`** | `(0.078, 0.082, 0.090)` | 0.78 | 0.35 | `gta_normal_specular.sps` | Combat shirt body, sleeve panels, tactical pants, balaclava |
| **`MAT_Cordura_Black`** | `(0.094, 0.098, 0.110)` | 0.86 | 0.25 | `gta_normal_specular.sps` | Plate carrier vest, MOLLE webbing, magazine pouches, duty belt |
| **`MAT_Tactical_Polymer`** | `(0.102, 0.106, 0.114)` | 0.38 | 0.55 | `gta_normal_specular.sps` | Hard skull face-plate, quick-release buckles, tactical headset |
| **`MAT_Leather_Black`** | `(0.067, 0.071, 0.078)` | 0.44 | 0.50 | `gta_normal_specular.sps` | Combat gloves palm/fingers, tactical boot uppers |
| **`MAT_Rubber`** | `(0.047, 0.051, 0.055)` | 0.92 | 0.15 | `gta_normal_specular.sps` | Boot lugged outsoles, protective edge bumpers, cable sheath |
| **`MAT_Coated_Metal`** | `(0.145, 0.153, 0.165)` | 0.28 | 0.70 | `gta_normal_specular.sps` | Carabiners, steel zipper sliders, D-rings, radio antenna base |
| **`MAT_Glass_Dark`** | `(0.030, 0.035, 0.040)` | 0.08 | 0.95 | `gta_glass.sps` | Ballistic combat eye-protection lenses |

---

### 3. GTA V RAGE Engine Texture Channel Architecture
GTA V utilizes DirectX 11 / D3D texture formats. Textures must be packed into specific channel layouts before injecting into `.ytd` archives:

#### 1. Diffuse / Albedo (`_D`)
* **Format**: `.dds` (DXT1 / BC1 without alpha, or DXT5 / BC3 if alpha cutouts are needed).
* **Color Space**: sRGB.
* **Channels**: `RGB` = Base surface color.
* **Resolution**: $2048 \times 2048$ (Master pieces like Shirt, Pants, Vest).

#### 2. Normal Map (`_N`)
* **Format**: `.dds` (DXT5 / BC3 with Alpha Channel).
* **Color Space**: Linear / Non-Color.
* **Channel Packing**:
  * `R` = Tangent Normal X
  * `G` = Tangent Normal Y
  * `B` = Reserved / Engine calculated Z
  * `A` = **Specular Mask (Glossiness / Reflectance)**
* *Crucial Modding Rule*: In the RAGE engine, specular intensity is sampled directly from the **Alpha channel of the Normal map**. A standard normal map without an alpha channel will appear completely matte and flat in GTA V.

#### 3. Specular / Detail Map (`_S`)
* **Format**: `.dds` (DXT1 / BC1).
* **Color Space**: Linear / Non-Color.
* **Channels**:
  * `R` = Specular Color / Falloff
  * `G` = Subsurface / Detail multiplier
  * `B` = Ambient Occlusion shadow mask

---

### 4. Sollumz Shader Conversion Workflow (Phase D)
When the Sollumz addon is installed in Blender:
1. Select the apparel mesh.
2. In the Sollumz panel, convert the active material to **Sollumz Material**.
3. Select Shader: `gta_normal_specular.sps`.
4. Assign texture samplers:
   * `DiffuseSampler` -> Link to `GHOST_SHIRT_D`
   * `BumpSampler` -> Link to `GHOST_SHIRT_N`
   * `SpecSampler` -> Link to `GHOST_SHIRT_S`
5. Verify shader flags (`CastShadows = True`, `ReceiveShadows = True`).
