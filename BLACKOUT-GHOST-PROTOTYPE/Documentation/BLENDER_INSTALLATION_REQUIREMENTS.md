# BLENDER INSTALLATION & ENVIRONMENT REQUIREMENTS
## Project: FRANKLIN — BLACKOUT ULTIMATE PACK
## Target Host Platform: Windows 10 / 11 64-bit

---

### Execution Status Classification
* **[READY NOW]**: Verified version specifications, addon dependencies, and installation directives.
* **[REQUIRES BLENDER]**: The user downloading and executing the installer on their local workstation.

---

## 1. Recommended Blender Version
* **Primary Recommendation**: **Blender 3.6 LTS (Long Term Support)**
  * *Reasoning*: Blender 3.6 LTS is the gold standard for the GTA V modding community. The Sollumz plugin and CodeWalker format converters have years of battle-tested stability on 3.6.
  * Direct Download Source: [Blender 3.6 LTS Archive](https://www.blender.org/download/lts/3-6/)
* **Secondary Supported**: Blender 4.2 LTS / 4.x
  * Note: While our scripts in `Blender/Scripts/` are dual-compatible with Blender 3.6 and 4.x (using dynamic property fallbacks for Principled BSDF inputs and auto-smooth), third-party community plugins such as Sollumz may require specific release branches for 4.x.

---

## 2. Essential Blender Addons to Install

### Addon 1: Sollumz (Mandatory)
* **What it does**: Provides native import and export for GTA V RAGE formats (`.ydd`, `.ydr`, `.ytd`, `.ybn`, `.ynv`).
* **Source**: Official GitHub Repository (`Sollumz/Sollumz`).
* **Installation**:
  1. Download the latest `.zip` release from the repository.
  2. In Blender: `Edit` -> `Preferences` -> `Add-ons` -> `Install...`
  3. Select the downloaded `.zip` file.
  4. Enable the checkbox for **"Import-Export: Sollumz"**.

### Addon 2: LoopTools (Built-in)
* **What it does**: Vital for circularizing armhole sleeves, evening edge loop spacing, and relaxing cloth folds.
* **Installation**: Built into Blender. In `Add-ons`, search for `LoopTools` and check the box to enable.

### Addon 3: Node Wrangler (Built-in)
* **What it does**: Fast shader previewing (`Ctrl+Shift+Click`) and instant PBR texture set linking (`Ctrl+Shift+T`).
* **Installation**: Built into Blender. In `Add-ons`, search for `Node Wrangler` and enable.

---

## 3. Recommended Blender Preferences Configuration

1. **System / GPU Compute**:
   * `Edit` -> `Preferences` -> `System` -> Under `Cycles Render Devices`, select **OptiX** (NVIDIA RTX) or **HIP** (AMD) to accelerate normal/AO baking.
2. **Interface**:
   * Set `Status Bar` to display **Scene Statistics** (shows real-time Triangles, Vertices, and VRAM usage).
3. **Save & Load**:
   * Enable `Auto Save` every 5 minutes.
