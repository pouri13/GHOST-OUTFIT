import React from 'react';
import { ShieldAlert, CheckCircle2, XCircle, FileText, Sparkles, Scale } from 'lucide-react';

export const OriginalityStatement: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-neutral-900/60 p-5 rounded-2xl border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>Legal Compliance & Intellectual Property Protection</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Originality Clearance & IP Compliance Standard
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Verification matrix confirming 100% original modeling, zero ripped meshes, zero proprietary textures, and distinct architectural design lines.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/60 px-3.5 py-2 rounded-xl text-emerald-300 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Cleared for Public GTA V Modding Release</span>
        </div>
      </div>

      {/* Comparative Architecture Table */}
      <div className="bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden shadow-xl">
        <div className="p-4 bg-neutral-900/80 border-b border-neutral-800">
          <h3 className="text-sm font-bold text-white">
            Architectural Differentiation Matrix: Blackout Operator vs. Call of Duty Ghost
          </h3>
          <p className="text-xs text-neutral-400">
            How our prototype translates the aesthetic archetype while establishing complete design novelty.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-neutral-900/40 text-neutral-400 uppercase text-[10px] font-mono border-b border-neutral-800">
              <tr>
                <th className="p-3.5">Component</th>
                <th className="p-3.5 text-red-400">Call of Duty: MW (Restricted Proprietary IP)</th>
                <th className="p-3.5 text-emerald-400">Our Blackout Prototype (Original Artwork)</th>
                <th className="p-3.5">IP Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              <tr>
                <td className="p-3.5 font-semibold text-white">Skull Mask Geometry</td>
                <td className="p-3.5 text-neutral-400">
                  Curved human skull plate glued directly to neoprene balaclava (IW proprietary scan).
                </td>
                <td className="p-3.5 text-emerald-300">
                  Original faceted angular ballistic mandible plate with integrated hexagonal ventilation ports.
                </td>
                <td className="p-3.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                    CLEARED
                  </span>
                </td>
              </tr>

              <tr>
                <td className="p-3.5 font-semibold text-white">Balaclava Print</td>
                <td className="p-3.5 text-neutral-400">
                  Painted white human skull teeth and nasal cavity graphics.
                </td>
                <td className="p-3.5 text-emerald-300">
                  Subdued dark grey digitized topographic contour pattern screen-printed on moisture-wicking textile.
                </td>
                <td className="p-3.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                    CLEARED
                  </span>
                </td>
              </tr>

              <tr>
                <td className="p-3.5 font-semibold text-white">Plate Carrier & Vest</td>
                <td className="p-3.5 text-neutral-400">
                  Exact Crye AVS proprietary harness setup with game-ripped pouch positions.
                </td>
                <td className="p-3.5 text-emerald-300">
                  Custom low-profile laser-cut laminate MOLLE plate carrier with original kangaroo layout.
                </td>
                <td className="p-3.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                    CLEARED
                  </span>
                </td>
              </tr>

              <tr>
                <td className="p-3.5 font-semibold text-white">Combat Shirt & Sleeves</td>
                <td className="p-3.5 text-neutral-400">
                  Proprietary Call of Duty MW2 operator jacket geometry and fleece sleeve seams.
                </td>
                <td className="p-3.5 text-emerald-300">
                  Original athletic ripstop combat shirt patterned strictly to Franklin Clinton’s body proportions.
                </td>
                <td className="p-3.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                    CLEARED
                  </span>
                </td>
              </tr>

              <tr>
                <td className="p-3.5 font-semibold text-white">Logos & Insignia</td>
                <td className="p-3.5 text-neutral-400">
                  Task Force 141 copyrighted crest, Ghost skull shield trademarks.
                </td>
                <td className="p-3.5 text-emerald-300">
                  Subdued BLACKOUT project tactical typography and custom geometric low-visibility patches.
                </td>
                <td className="p-3.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                    CLEARED
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Legal Warranties */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-neutral-900/40 rounded-xl border border-neutral-800">
          <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            100% Scratch-Built Meshes
          </h4>
          <p className="text-neutral-400 leading-snug">
            All vertices, edge loops, and UV maps originate within Blender from basic primitives fitted to Franklin’s base mesh. Zero ripped game meshes.
          </p>
        </div>

        <div className="p-4 bg-neutral-900/40 rounded-xl border border-neutral-800">
          <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Original PBR Textures
          </h4>
          <p className="text-neutral-400 leading-snug">
            Normal maps and fabric weaves procedurally baked from Substance Painter / Blender nodes. Zero extraction of Infinity Ward .xpak or .iwd textures.
          </p>
        </div>

        <div className="p-4 bg-neutral-900/40 rounded-xl border border-neutral-800">
          <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Safe for FiveM & GTA5-Mods
          </h4>
          <p className="text-neutral-400 leading-snug">
            Complies with GTA5-Mods.com and FiveM modding guidelines regarding fair-use original derivative artwork and transformative parody protection.
          </p>
        </div>
      </div>
    </div>
  );
};
