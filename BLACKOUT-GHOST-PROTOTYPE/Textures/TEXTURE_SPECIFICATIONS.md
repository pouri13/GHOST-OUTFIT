# TEXTURE SPECIFICATIONS & CHANNEL-PACKING MANIFEST
## Project: FRANKLIN — BLACKOUT ULTIMATE PACK
## Asset Set: GHOST TACTICAL OUTFIT
## Target Engine: Rockstar Advanced Game Engine (RAGE) / GTA V PC (`player_one`)

---

### Execution Status Classification
* **[READY NOW]**: Complete resolution budget allocations, channel assignments, map suffixes, and MIP map rules.
* **[REQUIRES BLENDER]**: UV baking (Bake Normal, Bake AO, Bake Cavity) from High-Poly to Low-Poly meshes.
* **[REQUIRES GTA V]**: Compilation into `.ytd` (Texture Dictionary) files via OpenIV with DXT/BC compression.

---

## 1. Texture Sizing Philosophy for GTA V
GTA V streams character textures dynamically into GPU VRAM based on ped LOD and screen distance. 
* Novice modders often allocate uncompressed 4K or 8K textures to every accessory, resulting in **Texture Loss (flickering gray world geometries, invisible roads, and Out-of-Memory crashes)**.
* **Our Standard**: We enforce strict, engine-proven texture budgets. Large body garments (`jbib`, `lowr`, `accs`) receive $2048\times 2048$, standard gear (`feet`, `hand`, `berd`, `p_head`) receives $1024\times 1024$, and small props (`p_eyes`, `p_ears`) receive $512\times 512$.
* Total texture VRAM footprint for the complete outfit is strictly under **$32\text{ MB}$ compressed**.

---

## 2. Master Texture Map Catalog

| Asset | Map Name | Dimensions | Format | Channel Usage | Material Assignment |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`GHOST_SHIRT`** | `GHOST_SHIRT_D` | $2048\times 2048$ | DXT1 / BC1 | RGB: Calibrated Albedo + 10% AO | `MAT_Tactical_Ripstop_Black` |
| | `GHOST_SHIRT_N` | $2048\times 2048$ | DXT5 / BC3 | RGB: Tangent Normal (DirectX -Y) \| A: Specular Mask | `MAT_Tactical_Ripstop_Black` |
| | `GHOST_SHIRT_S` | $2048\times 2048$ | DXT1 / BC1 | R: Roughness \| G: Tint Mask \| B: Fresnel | `MAT_Tactical_Ripstop_Black` |
| **`GHOST_PANTS`** | `GHOST_PANTS_D` | $2048\times 2048$ | DXT1 / BC1 | RGB: Calibrated Albedo + 10% AO | `MAT_Tactical_Ripstop_Black` |
| | `GHOST_PANTS_N` | $2048\times 2048$ | DXT5 / BC3 | RGB: Tangent Normal (DirectX -Y) \| A: Specular Mask | `MAT_Tactical_Ripstop_Black` |
| | `GHOST_PANTS_S` | $2048\times 2048$ | DXT1 / BC1 | R: Roughness \| G: Tint Mask \| B: Fresnel | `MAT_Tactical_Ripstop_Black` |
| **`GHOST_PLATE_CARRIER`** | `GHOST_VEST_D` | $2048\times 2048$ | DXT1 / BC1 | RGB: Albedo + 15% AO | `MAT_Cordura_Black` |
| | `GHOST_VEST_N` | $2048\times 2048$ | DXT5 / BC3 | RGB: Tangent Normal (DirectX -Y) \| A: Specular Mask | `MAT_Cordura_Black` |
| | `GHOST_VEST_S` | $2048\times 2048$ | DXT1 / BC1 | R: Roughness \| G: Tint Mask \| B: Fresnel | `MAT_Cordura_Black` |
| **`GHOST_MASK`** | `GHOST_MASK_D` | $1024\times 1024$ | DXT1 / BC1 | RGB: Albedo + Topo Pattern + AO | `MAT_Tactical_Polymer` |
| | `GHOST_MASK_N` | $1024\times 1024$ | DXT5 / BC3 | RGB: Tangent Normal (DirectX -Y) \| A: Specular Mask | `MAT_Tactical_Polymer` |
| | `GHOST_MASK_S` | $1024\times 1024$ | DXT1 / BC1 | R: Roughness \| G: Tint Mask \| B: Fresnel | `MAT_Tactical_Polymer` |
| **`GHOST_HOOD`** | `GHOST_HOOD_D` | $1024\times 1024$ | DXT1 / BC1 | RGB: Albedo + 12% AO | `MAT_Tactical_Ripstop_Black` |
| | `GHOST_HOOD_N` | $1024\times 1024$ | DXT5 / BC3 | RGB: Tangent Normal (DirectX -Y) \| A: Specular Mask | `MAT_Tactical_Ripstop_Black` |
| | `GHOST_HOOD_S` | $1024\times 1024$ | DXT1 / BC1 | R: Roughness \| G: Tint Mask \| B: Fresnel | `MAT_Tactical_Ripstop_Black` |
| **`GHOST_BOOTS`** | `GHOST_BOOTS_D` | $1024\times 1024$ | DXT1 / BC1 | RGB: Leather/Rubber Albedo + AO | `MAT_Leather_Black` / `MAT_Rubber` |
| | `GHOST_BOOTS_N` | $1024\times 1024$ | DXT5 / BC3 | RGB: Tangent Normal (DirectX -Y) \| A: Specular Mask | `MAT_Leather_Black` / `MAT_Rubber` |
| | `GHOST_BOOTS_S` | $1024\times 1024$ | DXT1 / BC1 | R: Roughness \| G: Tint Mask \| B: Fresnel | `MAT_Leather_Black` / `MAT_Rubber` |
| **`GHOST_GLOVES`** | `GHOST_GLOVES_D` | $1024\times 1024$ | DXT1 / BC1 | RGB: Albedo + AO | `MAT_Leather_Black` / `MAT_Polymer` |
| | `GHOST_GLOVES_N` | $1024\times 1024$ | DXT5 / BC3 | RGB: Tangent Normal (DirectX -Y) \| A: Specular Mask | `MAT_Leather_Black` / `MAT_Polymer` |
| | `GHOST_GLOVES_S` | $1024\times 1024$ | DXT1 / BC1 | R: Roughness \| G: Tint Mask \| B: Fresnel | `MAT_Leather_Black` / `MAT_Polymer` |
| **`GHOST_BELT`** | `GHOST_BELT_D` | $1024\times 1024$ | DXT1 / BC1 | RGB: Albedo + Hardware Color | `MAT_Cordura_Black` / `MAT_Metal` |
| | `GHOST_BELT_N` | $1024\times 1024$ | DXT5 / BC3 | RGB: Tangent Normal (DirectX -Y) \| A: Specular Mask | `MAT_Cordura_Black` / `MAT_Metal` |
| | `GHOST_BELT_S` | $1024\times 1024$ | DXT1 / BC1 | R: Roughness \| G: Tint Mask \| B: Fresnel | `MAT_Cordura_Black` / `MAT_Metal` |
| **`GHOST_GOGGLES`** | `GHOST_GOGGLES_D`| $512\times 512$ | DXT5 / BC3 | RGB: Frame Color \| A: Lens Opacity ($70\%$) | `MAT_Tactical_Polymer` / `MAT_Glass`|
| | `GHOST_GOGGLES_N`| $512\times 512$ | DXT5 / BC3 | RGB: Tangent Normal \| A: High Specular Mask | `MAT_Tactical_Polymer` / `MAT_Glass`|
| | `GHOST_GOGGLES_S`| $512\times 512$ | DXT1 / BC1 | R: Sharp Specular Falloff \| B: High Fresnel | `MAT_Tactical_Polymer` / `MAT_Glass`|
| **`GHOST_HEADSET`** | `GHOST_HEADSET_D`| $512\times 512$ | DXT1 / BC1 | RGB: Matte Polymer Albedo | `MAT_Tactical_Polymer` |
| | `GHOST_HEADSET_N`| $512\times 512$ | DXT5 / BC3 | RGB: Tangent Normal \| A: Specular Mask | `MAT_Tactical_Polymer` |
| | `GHOST_HEADSET_S`| $512\times 512$ | DXT1 / BC1 | R: Roughness \| B: Fresnel | `MAT_Tactical_Polymer` |

---

## 3. Detailed Channel Breakdown for Each Map Type

### A. Diffuse Map (`_D`)
* **Red Channel**: 8-bit Linear Red albedo.
* **Green Channel**: 8-bit Linear Green albedo.
* **Blue Channel**: 8-bit Linear Blue albedo.
* **Alpha Channel**: Reserved. Only used for `GHOST_GOGGLES` lens cutout or fringe transparency. For all other opaque clothing items, no alpha channel is exported (saving 50% file size via BC1 compression).

### B. Normal Map (`_N`)
* **Red Channel**: Tangent Vector X (horizontal surface inclination).
* **Green Channel**: Tangent Vector Y (**Inverted Y / DirectX orientation**). 
  * *CRITICAL RULE*: In Blender, green points up (+Y). When exporting for GTA V RAGE, the green channel **must be inverted (-Y)**. If not inverted, clothing creases will look inverted (shadows on top of wrinkles).
* **Blue Channel**: Tangent Vector Z (surface normal perpendicular).
* **Alpha Channel**: **Specular Highlight Intensity Mask**.
  * Fabric areas: Greyscale value $25 - 45$ (subtle, non-shiny reflection).
  * Polymer / Knee Armor: Greyscale value $110 - 140$ (crisp specular gleam).
  * Polished Metal Buckles: Greyscale value $190 - 230$ (intense pinpoint highlight).

### C. Specular Map (`_S`)
* **Red Channel**: Surface Roughness / Specular Exponent. Controls the spread or tightness of the reflection lobe.
* **Green Channel**: GTA V Ped Tint Palette Mask. A value of $0$ (black) means the texture retains its authored color. A value of $255$ (white) allows the in-game wardrobe color tint system to tint that specific zone.
* **Blue Channel**: Fresnel / Grazing Angle Reflection Factor. Controls how reflective the surface becomes when viewed at glancing angles.
