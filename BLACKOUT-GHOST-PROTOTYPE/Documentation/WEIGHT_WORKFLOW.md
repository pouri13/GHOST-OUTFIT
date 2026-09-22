# WEIGHT TRANSFER & RIGGING WORKFLOW
## Project: FRANKLIN — BLACKOUT ULTIMATE PACK
## Asset Set: Ghost Tactical Operator Outfit
## Target Character: Franklin Clinton (`player_one`)

---

### EXECUTION STATUS CLASSIFICATION

| Stage | Status | Tool / Requirement |
| :--- | :--- | :--- |
| **Weight Transfer Script (`08_weight_transfer_prep.py`)** | **[READY NOW]** | Tested Python logic in repository |
| **DataTransfer Operator Execution** | **[REQUIRES BLENDER]** | Executed in Blender Python environment |
| **Franklin Ped Skeleton Extraction** | **[REQUIRES GTA V]** | OpenIV extraction from `player_one.rpf` |
| **Sollumz Bone Index Binding** | **[REQUIRES SOLLUMZ]** | Sollumz drawable compilation |
| **Live Dynamic In-Game Animation Test** | **[REQUIRES GTA V]** | GTA V running ScriptHookV |

---

### 1. The Core Rigging Principles
In GTA V, clothing is not simulated dynamically in real-time. Instead, clothing meshes deform as **rigged skinned meshes** driven by the character's skeletal hierarchy (`player_one.skel`).

#### Strict Architectural Constraints:
1. **Source Mesh Driven**: Skinning weights must be transferred directly from Franklin's **actual extracted body mesh** (`uppr_000_u.ydd`). Never guess weights or rely on generic human armatures.
2. **Maximum 4 Influences Per Vertex**: The RAGE vertex buffer format allocates a maximum of 4 bone indices and 4 byte weights per vertex. Any vertex with 5 or more influences causes GPU buffer overflow, rendering bugs, or crash-to-desktop.
3. **Normalized Weight Sum**: The sum of weights influencing any single vertex must equal exactly $1.0000$.
4. **No Spikes / Unweighted Vertices**: Every single vertex in the clothing mesh must have at least 1 valid bone weight. Vertices with 0 weights remain locked at the world origin $(0,0,0)$, creating jagged visual spikes during movement.

---

### 2. Step-by-Step Weight Transfer Workflow

```
[STEP 1] Import Franklin Body Mesh (uppr_000_u) & Ped Armature into 01_REFERENCE.
    │
    ▼
[STEP 2] Position & Conform Clothing Mesh (LP_GHOST_SHIRT) over Franklin's body.
    │
    ▼
[STEP 3] Add Armature Modifier on Clothing Mesh -> Link to Franklin Skeleton.
    │
    ▼
[STEP 4] Run Script 08 (Weight Transfer):
         - Interpolates weights from Franklin body via Poly Nearest Face.
         - Prunes residual weights < 0.01.
         - Clamps maximum influences to 4 per vertex.
         - Normalizes all vertex weights to sum = 1.0.
    │
    ▼
[STEP 5] Run Script 08 Local QA:
         - Inspects for unweighted vertices.
         - Verifies 0 vertices have > 4 influences.
    │
    ▼
[STEP 6] Manual Pose Mode Stress Test in Blender:
         - Rotate shoulders, raise arms, bend elbows, twist spine.
         - Weight paint smooth transitions across high-stress creasing zones.
```

---

### 3. High-Stress Deform Zones & Corrective Actions

| Anatomical Zone | Common Deform Defect | Corrective Weight Action in Blender |
| :--- | :--- | :--- |
| **Armpits / Deltoids** | Crushing or folding into the torso during arm drop | Blend weights between `SKEL_Spine3` and `SKEL_L_UpperArm`; smooth transition gradient. |
| **Elbow Hinges** | Sharp pinching or volume loss during 90° bend | Ensure elbow loop vertices are weighted 50/50 between UpperArm and Forearm. |
| **Collar / Neck Ring** | Collar tearing away from Franklin's neck | Copy exact weights from Franklin's `SKEL_Neck_1` boundary loop vertices. |
| **Crotch / Pelvis** | Pants tearing or stretching when sprinting | Ensure symmetric weighting across `SKEL_Pelvis`, `SKEL_L_Thigh`, and `SKEL_R_Thigh`. |
| **Knees** | Knee-pad distortion | Weight front knee topology predominantly to `SKEL_Calf` to preserve armor plate rigidity. |

---

### 4. Mandatory Pipeline Truth & Disclaimer
> **CRITICAL PIPELINE RULE:**
> Passing local Blender checks (`08_weight_transfer_prep.py`) verifies mathematical compliance with the 4-bone vertex limit.
> **It does NOT guarantee GTA V in-game deformation quality.**
> Final validation requires inspecting the mesh inside **CodeWalker** and conducting dynamic live movement tests inside **GTA V**.
