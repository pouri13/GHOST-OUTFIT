# MATERIAL SYSTEM ARCHITECTURE & SPECIFICATIONS
## Project: FRANKLIN — BLACKOUT ULTIMATE PACK
## Asset Set: GHOST TACTICAL OUTFIT
## Target Engine: Rockstar Advanced Game Engine (RAGE) / GTA V PC (`player_one`)

---

### Execution Status Classification
* **[READY NOW]**: Complete mathematical PBR parameter tables, shader channel packing assignments, and Blender node configuration definitions.
* **[REQUIRES BLENDER]**: Shader node compilation and real-time viewport material evaluation in EEVEE/Cycles.
* **[REQUIRES GTA V]**: OpenIV `.ytd` (Texture Dictionary) compression and in-game shader rendering under Los Santos dynamic weather/lighting.

---

## 1. RAGE Engine Shader Architecture & Channel Packing Standard

GTA V does not use modern metallic-roughness PBR textures natively. Instead, the RAGE engine utilizes specialized shader presets with custom-packed texture channels. The standard apparel shader is **`gta_normal_specular.sps`**.

### Map 1: Diffuse / Albedo (`_d`)
* **Format**: DXT1 / BC1 (RGB, 24-bit, No Alpha) or DXT5 / BC3 if transparency is needed.
* **Color Space**: sRGB.
* **Rules**: 
  * Contains pure calibrated albedo without baked directional highlights.
  * Ambient Occlusion (AO) is multiplied subtly ($10\% - 15\%$ maximum) to avoid crushed pitch-black shadows under sunlight.
  * For blackout fabrics, the base color must never drop below RGB $(15, 15, 15)$ to avoid digital black-crush in game.

### Map 2: Normal Map + Specular Alpha (`_n`)
* **Format**: DXT5 / BC3 (RGBA, 32-bit).
* **Color Space**: Linear / Non-Color.
* **Channel Packing**:
  * **Red (R)**: Tangent Space Normal X.
  * **Green (G)**: Tangent Space Normal Y (**DirectX Inverted-Y format**; green channel must point downward).
  * **Blue (B)**: Tangent Space Normal Z.
  * **Alpha (A)**: **Specular Intensity Mask**. Governs how intensely sunlight, street lamps, and vehicle headlights reflect off the fabric or armor surface.

### Map 3: Specular / Roughness / Tint Mask (`_s`)
* **Format**: DXT1 / BC1 (RGB, 24-bit).
* **Color Space**: Linear / Non-Color.
* **Channel Packing**:
  * **Red (R)**: Specular Falloff / Micro-Roughness.
  * **Green (G)**: Tint Palette Color Mask (allows optional wardrobe recoloring via ped variation XML).
  * **Blue (B)**: Fresnel Factor / Grazing Angle Sheen.

---

## 2. Master Material Specification Table

| Material Name | Base Color Hex | sRGB Linear (R,G,B) | Roughness | Metallic | Specular | AO Int. | Alpha | Assigned Mesh Components |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`MAT_Tactical_Ripstop_Black`** | `#141517` | `(0.078, 0.082, 0.090)` | `0.78` | `0.02` | `0.35` | `0.85` | `1.0` | `GHOST_SHIRT`, `GHOST_HOOD`, `GHOST_PANTS` |
| **`MAT_Cordura_Black`** | `#18191c` | `(0.094, 0.098, 0.110)` | `0.86` | `0.00` | `0.25` | `0.90` | `1.0` | `GHOST_PLATE_CARRIER`, `GHOST_CHEST_RIG`, `GHOST_BELT` |
| **`MAT_Tactical_Polymer`** | `#1a1b1d` | `(0.102, 0.106, 0.114)` | `0.38` | `0.08` | `0.55` | `0.75` | `1.0` | `GHOST_MASK` (Jawplate), Knee Guards, Buckles |
| **`MAT_Leather_Black`** | `#111214` | `(0.067, 0.071, 0.078)` | `0.44` | `0.04` | `0.50` | `0.80` | `1.0` | `GHOST_BOOTS` (Upper), `GHOST_GLOVES` (Palms) |
| **`MAT_Rubber`** | `#0c0d0e` | `(0.047, 0.051, 0.055)` | `0.92` | `0.00` | `0.15` | `0.95` | `1.0` | `GHOST_BOOTS` (Lugged Outsoles), Bumpers |
| **`MAT_Coated_Metal`** | `#25272a` | `(0.145, 0.153, 0.165)` | `0.28` | `0.88` | `0.70` | `0.60` | `1.0` | Cobra Belt Buckle, Zipper Pulls, D-Rings |
| **`MAT_Glass_Dark`** | `#08090a` | `(0.030, 0.035, 0.040)` | `0.08` | `0.10` | `0.95` | `0.20` | `0.70` | `GHOST_GOGGLES` (Ballistic Polycarbonate Lens) |

---

## 3. Individual Material Architectural Profiles

### Material 01: `MAT_Tactical_Ripstop_Black`
* **Purpose**: Primary flexible combat textile for sleeves, torso side panels, combat pants, and hooded balaclava.
* **Visual Identity**: Fine $1\text{ mm}\times 1\text{ mm}$ grid-reinforced micro-weave preventing tears. Very soft anisotropic fabric sheen without shiny synthetic plastic appearance.
* **Micro-Normal Profile**: High-frequency procedural crosshatch normal baked into the normal map.
* **RAGE Preset**: `gta_normal_specular.sps`

### Material 02: `MAT_Cordura_Black`
* **Purpose**: Rigid 500D ballistic nylon weave for plate carrier chassis, kangaroo magazine pouches, and duty belt platform.
* **Visual Identity**: Heavy, non-reflective, rugged tactical weave designed for heavy friction and abrasion resistance.
* **Micro-Normal Profile**: Coarse 500-Denier double-ply twill weave with deep valleys between fiber bundles.
* **RAGE Preset**: `gta_normal_specular.sps`

### Material 03: `MAT_Tactical_Polymer`
* **Purpose**: Angular faceted mandible skull plate, Crye-style external knee caps, Cobra buckle frames, and radio casing.
* **Visual Identity**: Matte injection-molded polymer with subtle spark-erosion EDM stippling. Crisp edge highlights.
* **Micro-Normal Profile**: Fine isotropic pebble texture with chamfered hard-surface bevel normal bake.
* **RAGE Preset**: `gta_normal_specular.sps`

### Material 04: `MAT_Leather_Black`
* **Purpose**: Tactical combat boot uppers, tongue gussets, and high-wear glove palm reinforcements.
* **Visual Identity**: Oiled full-grain cowhide leather with natural organic micro-wrinkles and directional creasing around the ankle flex zones.
* **Micro-Normal Profile**: Organic pore structure with smooth worn abrasion patches on the toes.
* **RAGE Preset**: `gta_normal_specular.sps`

### Material 05: `MAT_Rubber`
* **Purpose**: Deep multi-directional boot lug outsole, toe scuff cap, cable routing grommets, and goggle eye seals.
* **Visual Identity**: Ultra-matte, vulcanized heavy black rubber with high surface friction.
* **Micro-Normal Profile**: Smooth matte surface with sharp $90^\circ$ lug cuts.
* **RAGE Preset**: `gta_normal_specular.sps`

### Material 06: `MAT_Coated_Metal`
* **Purpose**: Heavy-duty quick-release Cobra buckle hardware, D-rings, eyelets, zipper teeth, and radio antenna base.
* **Visual Identity**: Hard-anodized gunmetal grey coating over aircraft aluminum with subtle micro-edge silver wear.
* **Micro-Normal Profile**: Fine directional machining grain with crisp chamfers.
* **RAGE Preset**: `gta_normal_specular.sps`

### Material 07: `MAT_Glass_Dark`
* **Purpose**: Ballistic tactical goggles lens and communication status indicator windows.
* **Visual Identity**: Smoke-tinted polycarbonate with 70% opacity, high specular refraction, and subtle anti-glare chromatic sheen.
* **RAGE Preset**: `gta_glass.sps` (or `gta_normal_specular.sps` with alpha blending enabled).
