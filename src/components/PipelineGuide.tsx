import React, { useState } from 'react';
import { 
  Cpu, 
  Workflow, 
  FolderTree, 
  Layers, 
  CheckCircle2, 
  AlertOctagon, 
  FileCode, 
  HardDrive, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const PipelineGuide: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'modeling' | 'textures' | 'conversion'>('modeling');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-neutral-900/60 p-5 rounded-2xl border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <Workflow className="w-4 h-4" />
            <span>Deliverables 10, 11 & 12 // Engineering Blueprint</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Complete Production & GTA V Conversion Pipeline
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Step-by-step technical standard from initial Blender reference fitting to Sollumz export and in-game installation for Franklin Clinton.
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
          <button
            onClick={() => setActiveSubTab('modeling')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeSubTab === 'modeling' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            10. Modeling Plan
          </button>
          <button
            onClick={() => setActiveSubTab('textures')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeSubTab === 'textures' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            11. Texture Plan
          </button>
          <button
            onClick={() => setActiveSubTab('conversion')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeSubTab === 'conversion' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            12. GTA V Conversion
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: 10-STEP BLENDER MODELING PLAN */}
      {activeSubTab === 'modeling' && (
        <div className="space-y-4">
          <div className="bg-neutral-900/40 p-5 rounded-2xl border border-neutral-800">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60 text-xs flex items-center justify-center font-mono">
                10
              </span>
              10-Phase Blender Modeling Blueprint (Franklin Base Mesh Fitting)
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Constructed directly over Franklin's extracted GTA V body (<code className="text-cyan-300">player_one.ydd</code>) to guarantee 100% anatomical fidelity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  step: '01',
                  title: 'Anatomical Calibration & Reference Setup',
                  desc: 'Import Franklin player_one base mesh and ped skeleton into collection "Franklin_Reference_Rig". Lock transforms. Scale confirmed at 1.83m. Place reference turnaround sheets on background cameras.'
                },
                {
                  step: '02',
                  title: 'Torso Combat Shirt Blockout & Shrinkwrap',
                  desc: 'Duplicate Franklin upper chest and arm polygons. Apply Shrinkwrap modifier with 2.5mm offset. Extrude collar, sleeves, and front zipper seam. Sculpt anatomical wrinkles along armpit and elbow flexion lines.'
                },
                {
                  step: '03',
                  title: 'Plate Carrier & Hard Armor Geometry',
                  desc: 'Box-model low-profile ballistic plate carrier. Extrude laser-cut MOLLE webbing slots with clean chamfered normals. Model triple kangaroo 5.56 magazine pouches, admin chest pouch, and radio holster with antenna.'
                },
                {
                  step: '04',
                  title: 'Original Ghost Mandible Skull Mask & Cowl',
                  desc: 'Hard-surface model angular faceted jaw plate (non-CoD original silhouette). Add micro-mesh breathing ports. Retopologize tactical balaclava tightly over Franklin facial geometry and tuck beneath hood cowl.'
                },
                {
                  step: '05',
                  title: 'Combat Pants & Crye Knee Articulation',
                  desc: 'Construct tapered combat pants around Franklin leg volume. Model accordion stretch panels above the knee. Embed hardened external polymer knee cap protectors with shock-absorbing liner rim.'
                },
                {
                  step: '06',
                  title: 'High-Traction Tactical Combat Boots',
                  desc: 'Model Vibram-inspired lugged rubber outsole with 6mm aggressive tread bite. Extrude full-grain leather upper, padded collar, and speed-lacing eyelets with paracord lace tension tucked into tongue garage.'
                },
                {
                  step: '07',
                  title: 'Modular Accessories & Duty Belt Kit',
                  desc: 'Assemble two-piece rigid operator duty belt with metal Cobra buckle. Mount tactical Kydex knife sheath (sheath only, zero weapon geometry), rear IFAK blowout pouch, and comms headset wire routing.'
                },
                {
                  step: '08',
                  title: 'Retopology & Polygon Budget Enforcement',
                  desc: 'Bake high-poly sculpted cloth tension into mid-poly game geometry. Target 28,000 tris across complete full outfit. Enforce quad-dominant edge flow along shoulder, elbow, hip, and knee deformation rings.'
                },
                {
                  step: '09',
                  title: 'UV Seam Placement & Texel Density Matching',
                  desc: 'Cut UV seams along natural textile tailoring lines (inseams, shoulder seams, boot welt). Pack UV islands into 0-1 UV space with 4px margin. Maintain uniform 18 px/cm texel density across clothing layers.'
                },
                {
                  step: '10',
                  title: 'Data Transfer Skinning & 4-Bone Constraint',
                  desc: 'Transfer vertex weights from Franklin player_one skeleton via Nearest Face Interpolated. Run script blackout_weight_transfer_helper.py to prune stray weights and enforce GTA V max 4 bone limit per vertex.'
                },
              ].map((item) => (
                <div key={item.step} className="p-3.5 bg-neutral-950/60 rounded-xl border border-neutral-800/80">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                      STEP {item.step}
                    </span>
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: TEXTURE PLAN & RAGE SHADER ARCHITECTURE */}
      {activeSubTab === 'textures' && (
        <div className="space-y-4">
          <div className="bg-neutral-900/40 p-5 rounded-2xl border border-neutral-800">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-950 text-amber-400 border border-amber-800/60 text-xs flex items-center justify-center font-mono">
                11
              </span>
              GTA V Texture Specification & Channel Packing Guide
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              GTA V uses proprietary RAGE texture formats embedded within <code className="text-amber-300">.ytd</code> texture dictionaries. Shaders require exact channel packing.
            </p>

            {/* Channel Packing Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
                  1. DIFFUSE / ALBEDO (_d)
                </span>
                <span className="text-[11px] text-neutral-500 block mb-2">Format: DXT1 / BC1 (RGB, no alpha)</span>
                <p className="text-xs text-neutral-400 leading-snug">
                  Contains pure calibrated base color without directional lighting or pre-baked shadows. Ambient Occlusion multiplied subtly at 15% opacity to avoid crushed blacks in game.
                </p>
              </div>

              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-xs font-mono text-purple-400 font-bold block mb-1">
                  2. NORMAL + SPECULAR ALPHA (_n)
                </span>
                <span className="text-[11px] text-neutral-500 block mb-2">Format: DXT5 / BC3 (RGBA)</span>
                <p className="text-xs text-neutral-400 leading-snug">
                  <strong className="text-neutral-200">RGB Channels:</strong> Tangent space normal map (DirectX inverted Y format).<br />
                  <strong className="text-neutral-200">Alpha Channel:</strong> Specular intensity mask governing sunlight and streetlamp sheen.
                </p>
              </div>

              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-xs font-mono text-amber-400 font-bold block mb-1">
                  3. SPECULAR / TINT MASK (_s)
                </span>
                <span className="text-[11px] text-neutral-500 block mb-2">Format: DXT1 / BC1 (RGB)</span>
                <p className="text-xs text-neutral-400 leading-snug">
                  <strong className="text-neutral-200">Red:</strong> Surface roughness / falloff.<br />
                  <strong className="text-neutral-200">Green:</strong> Tint palette mask (allows optional camo/grey color variations in wardrobe).<br />
                  <strong className="text-neutral-200">Blue:</strong> Fresnel reflection factor.
                </p>
              </div>
            </div>

            {/* Resolution Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300 border border-neutral-800 rounded-xl overflow-hidden">
                <thead className="bg-neutral-950 text-neutral-400 uppercase text-[10px] font-mono">
                  <tr>
                    <th className="p-3">Component / Slot</th>
                    <th className="p-3">Texture Resolution</th>
                    <th className="p-3">Mipmaps</th>
                    <th className="p-3">Memory Footprint</th>
                    <th className="p-3">Shader Template</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80 bg-neutral-900/30">
                  <tr>
                    <td className="p-3 font-semibold text-white">Torso Combat Shirt (jbib)</td>
                    <td className="p-3 font-mono">2048 x 2048 px</td>
                    <td className="p-3 text-emerald-400">Yes (Full Chain)</td>
                    <td className="p-3 font-mono">2.7 MB (.dds)</td>
                    <td className="p-3 font-mono text-cyan-300">gta_normal_specular.sps</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Modular Plate Carrier (accs)</td>
                    <td className="p-3 font-mono">2048 x 2048 px</td>
                    <td className="p-3 text-emerald-400">Yes (Full Chain)</td>
                    <td className="p-3 font-mono">2.7 MB (.dds)</td>
                    <td className="p-3 font-mono text-cyan-300">gta_normal_specular.sps</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Combat Pants & Knee Armor (lowr)</td>
                    <td className="p-3 font-mono">2048 x 2048 px</td>
                    <td className="p-3 text-emerald-400">Yes (Full Chain)</td>
                    <td className="p-3 font-mono">2.7 MB (.dds)</td>
                    <td className="p-3 font-mono text-cyan-300">gta_normal_specular.sps</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Tactical Boots (feet)</td>
                    <td className="p-3 font-mono">1024 x 1024 px</td>
                    <td className="p-3 text-emerald-400">Yes (Full Chain)</td>
                    <td className="p-3 font-mono">0.68 MB (.dds)</td>
                    <td className="p-3 font-mono text-cyan-300">gta_normal_specular.sps</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Mandible Skull Mask & Hood</td>
                    <td className="p-3 font-mono">1024 x 1024 px</td>
                    <td className="p-3 text-emerald-400">Yes (Full Chain)</td>
                    <td className="p-3 font-mono">0.68 MB (.dds)</td>
                    <td className="p-3 font-mono text-cyan-300">gta_normal_specular.sps</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Headset & Tactical Goggles</td>
                    <td className="p-3 font-mono">512 x 512 px</td>
                    <td className="p-3 text-emerald-400">Yes (Full Chain)</td>
                    <td className="p-3 font-mono">0.17 MB (.dds)</td>
                    <td className="p-3 font-mono text-cyan-300">gta_normal_specular.sps</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: GTA V CONVERSION & EXPORT PLAN */}
      {activeSubTab === 'conversion' && (
        <div className="space-y-4">
          <div className="bg-neutral-900/40 p-5 rounded-2xl border border-neutral-800">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60 text-xs flex items-center justify-center font-mono">
                12
              </span>
              GTA V Export, Tooling & In-Game Installation Workflow
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Standard operating procedure to convert Blender 3D models into game-ready <code className="text-emerald-300">.ydd</code> and <code className="text-emerald-300">.ytd</code> archives using OpenIV and Sollumz.
            </p>

            {/* Required Software Stack */}
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 mb-5">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                Mandatory Industry Tools Required:
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div className="bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                  <strong className="text-white block">Blender 3.6 LTS</strong>
                  <span className="text-[11px] text-neutral-500">Geometry, UV & Skinning</span>
                </div>
                <div className="bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                  <strong className="text-white block">Sollumz Plugin</strong>
                  <span className="text-[11px] text-neutral-500">GTA V RAGE Importer/Exporter</span>
                </div>
                <div className="bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                  <strong className="text-white block">OpenIV 4.1</strong>
                  <span className="text-[11px] text-neutral-500">RPF Archive Extraction & Injection</span>
                </div>
                <div className="bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                  <strong className="text-white block">CodeWalker</strong>
                  <span className="text-[11px] text-neutral-500">In-Engine Realtime Ped Testing</span>
                </div>
              </div>
            </div>

            {/* Step-by-Step Installation Paths */}
            <div className="space-y-3">
              <div className="p-4 bg-neutral-950/80 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
                    STAGE A: SOLLUMZ EXPORT FROM BLENDER
                  </span>
                </div>
                <ol className="list-decimal list-inside text-xs text-neutral-300 space-y-1 pl-1">
                  <li>Select outfit component collection (e.g. <code className="text-cyan-300">Ghost_Torso</code>).</li>
                  <li>In Sollumz panel: Convert to Drawable Model (<code className="text-neutral-400">sollumz_drawable_model</code>).</li>
                  <li>Assign RAGE Shader Preset: <code className="text-neutral-200 font-mono">gta_normal_specular.sps</code>.</li>
                  <li>Link textures to Sollumz Embedded Texture Dictionary.</li>
                  <li>Click <strong className="text-white">Export Sollumz (.ydd / .ytd)</strong>.</li>
                </ol>
              </div>

              <div className="p-4 bg-neutral-950/80 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800/40">
                    STAGE B: OPENIV REPLACEMENT PATH (FRANKLIN SINGLE-PLAYER)
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mb-2">
                  To replace Franklin’s default wardrobe outfits in Single Player story mode:
                </p>
                <div className="bg-neutral-900 p-2.5 rounded-lg border border-neutral-800 text-[11px] font-mono text-amber-300 overflow-x-auto">
                  mods\x64v.rpf\models\cdimages\streamedpeds_players.rpf\player_one\
                </div>
                <p className="text-xs text-neutral-400 mt-2">
                  Drag and drop <code className="text-neutral-200">jbib_001_u.ydd</code>, <code className="text-neutral-200">lowr_001_u.ydd</code>, <code className="text-neutral-200">feet_001_u.ydd</code>, and their associated <code className="text-neutral-200">.ytd</code> files directly into the OpenIV archive in "Edit Mode".
                </p>
              </div>

              <div className="p-4 bg-neutral-950/80 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800/40">
                    STAGE C: FIVEM / ADD-ON DLC STREAMING PACK
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mb-2">
                  For server modding or standalone add-on clothing without overwriting original game files:
                </p>
                <div className="bg-neutral-900 p-2.5 rounded-lg border border-neutral-800 text-[11px] font-mono text-purple-300 overflow-x-auto">
                  [resources] / [blackout_ghost_pack] / stream /
                </div>
                <p className="text-xs text-neutral-400 mt-2">
                  Place exported files with <code className="text-neutral-200">fxmanifest.lua</code> configured with <code className="text-neutral-200">data_file 'SHOP_PED_APPAREL_META_FILE'</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
