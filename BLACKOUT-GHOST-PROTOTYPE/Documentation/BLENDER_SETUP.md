# BLENDER WORKSPACE SETUP & ENVIRONMENT GUIDE
## Project: FRANKLIN — BLACKOUT ULTIMATE PACK
## Asset Set: Ghost Tactical Operator Outfit
## Target Host Platform: Windows 10 / 11 64-bit

---

### PIPELINE STATUS CLASSIFICATION

| Component | Status | Requirement |
| :--- | :--- | :--- |
| **Python Pipeline Scripts** | **[READY NOW]** | Pre-written, verified syntax in `Blender/Scripts/` |
| **Folder Architecture & Specs** | **[READY NOW]** | 100% defined in project root |
| **Blender 3.6 LTS Installation** | **[REQUIRES BLENDER]** | Host machine must download and install Blender |
| **Sollumz Addon Installation** | **[REQUIRES SOLLUMZ]** | Host machine must install Sollumz addon in Blender |
| **Franklin Ped Extraction** | **[REQUIRES GTA V]** | OpenIV extraction from legal GTA V PC installation |

---

## 1. Recommended Blender Version
* **Primary Recommendation**: **Blender 3.6 LTS (Long Term Support)**
  * *Reasoning*: Blender 3.6 LTS is the established gold standard in the GTA V modding community. The Sollumz plugin and CodeWalker format converters have years of proven stability on 3.6 LTS.
  * Download: [Blender 3.6 LTS Official Download](https://www.blender.org/download/lts/3-6/)
* **Secondary Compatible**: Blender 4.2 LTS / 4.x
  * *Note*: All Python automation scripts in this repository have been written with dynamic version fallbacks (supporting both Blender 3.6 and 4.x). However, community addons like Sollumz may require specific release branches for 4.x.

---

## 2. Essential Addons Checklist

### Addon 1: Sollumz (Required for GTA V Export)
* **Status**: **[REQUIRES SOLLUMZ]**
* **Purpose**: Converts Blender meshes, armatures, and materials directly into GTA V RAGE engine containers (`.ydd`, `.ydr`, `.ytd`, `.ybn`).
* **Installation**:
  1. Download the latest release from the official repository (`Sollumz/Sollumz`).
  2. In Blender: `Edit` -> `Preferences` -> `Add-ons` -> `Install...`
  3. Select the downloaded `.zip` file.
  4. Enable the checkbox for **"Import-Export: Sollumz"**.

### Addon 2: LoopTools (Built-in)
* **Status**: **[READY NOW in Blender]**
* **Purpose**: Provides circularization of armholes/collars and relaxes cloth edge loops.
* **Installation**: In `Add-ons`, search for `LoopTools` and check to enable.

### Addon 3: Node Wrangler (Built-in)
* **Status**: **[READY NOW in Blender]**
* **Purpose**: Rapid PBR texture previewing and node inspection.
* **Installation**: In `Add-ons`, search for `Node Wrangler` and check to enable.

---

## 3. Recommended Preferences Configuration

1. **System & GPU Compute**:
   * Navigate to: `Edit` -> `Preferences` -> `System`
   * Under `Cycles Render Devices`, select **OptiX** (NVIDIA RTX) or **HIP** (AMD) to accelerate normal/AO baking.
2. **Interface**:
   * Enable `Status Bar` -> `Scene Statistics` (displays real-time Triangles, Vertices, and VRAM usage).
3. **Save & Auto-Save**:
   * Set Auto Save interval to 5 minutes to safeguard high-poly sculpts.

---

## 4. One-Click Project Setup Execution
Once Blender is launched:
1. Switch to the **Scripting** tab.
2. Click **Open** and select:
   `Blender/Scripts/00_MASTER_SETUP.py`
3. Press `Alt + P` (Run Script).
4. The console will display:
   ```
   ==================================================================
   BLACKOUT MASTER SETUP COMPLETE
   NEXT STEP:
   IMPORT / PREPARE ACTUAL FRANKLIN TARGET
   ==================================================================
   ```
This completes project initialization without altering or deleting any user assets.
