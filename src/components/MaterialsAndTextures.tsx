import React from 'react';
import { GHOST_MATERIALS } from '../data/ghostOutfitData';
import { Sparkles, Palette, Layers, Box, Cpu } from 'lucide-react';

export const MaterialsAndTextures: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-neutral-900/60 p-5 rounded-2xl border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Palette className="w-4 h-4" />
            <span>Deliverable Item 8 // Physical Material Specifications</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Tactical PBR & GTA V RAGE Shader Palette
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Carefully calibrated roughness and microscopic normal surface profiles designed to avoid the flat plastic look common in novice GTA V clothing mods.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-neutral-950 px-3.5 py-2 rounded-xl border border-neutral-800 text-xs text-neutral-400">
          <Cpu className="w-4 h-4 text-purple-400" />
          <span>Primary RAGE Shader:</span>
          <strong className="text-neutral-200">gta_normal_specular.sps</strong>
        </div>
      </div>

      {/* Grid of Materials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {GHOST_MATERIALS.map((mat) => (
          <div
            key={mat.id}
            className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 flex flex-col justify-between hover:border-neutral-700 transition-all"
          >
            <div>
              {/* Color Swatch & Title */}
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-xl border border-neutral-700 shadow-inner flex items-center justify-center shrink-0"
                  style={{ backgroundColor: mat.baseColorHex }}
                >
                  <span className="text-[9px] font-mono text-neutral-400 opacity-60">HEX</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-snug">{mat.name}</h3>
                  <span className="text-[11px] text-neutral-400 block">{mat.type}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
                {mat.description}
              </p>

              {/* PBR Physical Values */}
              <div className="space-y-2 bg-neutral-950/80 p-3 rounded-xl border border-neutral-800/80 text-xs mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Roughness:</span>
                  <span className="font-mono text-amber-400 font-bold">{mat.roughness.toFixed(2)}</span>
                </div>
                <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-400 h-full rounded-full" 
                    style={{ width: `${mat.roughness * 100}%` }} 
                  />
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="text-neutral-400">Metallic:</span>
                  <span className="font-mono text-cyan-400 font-bold">{mat.metalness.toFixed(2)}</span>
                </div>
                <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-cyan-400 h-full rounded-full" 
                    style={{ width: `${mat.metalness * 100}%` }} 
                  />
                </div>
              </div>

              {/* Micro-Normal Map Detail */}
              <div className="text-xs text-neutral-400 bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800">
                <span className="text-[10px] uppercase font-semibold text-neutral-500 block mb-0.5">
                  Normal Detail Map:
                </span>
                <span className="text-neutral-300 text-[11px]">{mat.normalDetail}</span>
              </div>
            </div>

            {/* GTA Shader Footer */}
            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] font-mono text-purple-400 flex items-center justify-between">
              <span>Sollumz Shader:</span>
              <span className="bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40 text-[10px]">
                {mat.gtaShader.split(' ')[0]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
