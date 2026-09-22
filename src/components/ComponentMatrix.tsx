import React, { useState } from 'react';
import { GHOST_COMPONENTS } from '../data/ghostOutfitData';
import { ModularComponentSpec } from '../types';
import { Shield, Layers, Box, Cpu, FileCheck, AlertTriangle, Sparkles, Filter } from 'lucide-react';

export const ComponentMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Head / Face', 'Torso / Base Layer', 'Torso / Tactical Vest', 'Legs / Lower Body', 'Feet / Footwear', 'Accessories'];

  const filteredComponents = selectedCategory === 'all'
    ? GHOST_COMPONENTS
    : GHOST_COMPONENTS.filter(c => c.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const totalTris = GHOST_COMPONENTS.reduce((acc, curr) => acc + curr.polyCountTris, 0);

  return (
    <div className="space-y-6">
      {/* Category Filter & Budget Summary */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-neutral-900/60 p-5 rounded-2xl border border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Phase 1 Prototype // 10 Modular Components</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            GTA V Modular Clothing Specification Matrix
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Every component is isolated into standard GTA V ped slots with individual textures, rigging envelopes, and clipping suppression rules.
          </p>
        </div>

        {/* Global Budget Counters */}
        <div className="flex items-center gap-3">
          <div className="bg-neutral-950 px-4 py-2 rounded-xl border border-neutral-800 text-center">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Total Polycount</span>
            <strong className="text-sm font-mono text-cyan-400">{totalTris.toLocaleString()} Tris</strong>
          </div>
          <div className="bg-neutral-950 px-4 py-2 rounded-xl border border-neutral-800 text-center">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Ped Slots Used</span>
            <strong className="text-sm font-mono text-purple-400">7 RAGE Slots</strong>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs text-neutral-500 font-medium flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-neutral-200 text-neutral-950 font-semibold'
                : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
            }`}
          >
            {cat === 'all' ? 'All 10 Components' : cat}
          </button>
        ))}
      </div>

      {/* Grid of Component Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredComponents.map((comp) => (
          <div
            key={comp.id}
            className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 flex flex-col justify-between hover:border-neutral-700 transition-all"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                  {comp.category}
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-400">
                  {comp.polyCountTris.toLocaleString()} Tris
                </span>
              </div>

              {/* Title & GTA Dictionary Code */}
              <h3 className="text-base font-bold text-white mb-1">{comp.name}</h3>
              <div className="text-xs font-mono text-purple-400 bg-purple-950/40 px-2.5 py-1 rounded-lg border border-purple-800/40 inline-block mb-3">
                GTA Slot: {comp.gtaSlot} // File: {comp.gtaDictionaryCode}
              </div>

              {/* Key Features */}
              <div className="space-y-1.5 mb-4">
                {comp.keyFeatures.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-neutral-950/70 p-3 rounded-xl border border-neutral-800/80 mb-4">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Texture Map Res</span>
                  <span className="font-mono text-neutral-200">{comp.textureRes}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Assigned Material</span>
                  <span className="font-mono text-neutral-200 truncate block">{comp.materialName}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-neutral-800">
                  <span className="text-[10px] text-neutral-500 uppercase block mb-0.5">Rigging Bones</span>
                  <div className="flex flex-wrap gap-1">
                    {comp.riggingBones.slice(0, 5).map((bone, bIdx) => (
                      <span key={bIdx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                        {bone}
                      </span>
                    ))}
                    {comp.riggingBones.length > 5 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-500">
                        +{comp.riggingBones.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Attachment & Clipping Strategy */}
              <div className="space-y-2 text-xs bg-neutral-900/80 p-3 rounded-xl border border-neutral-800">
                <div>
                  <span className="text-[10px] font-semibold text-neutral-400 uppercase block">
                    Attachment Method:
                  </span>
                  <p className="text-neutral-300 mt-0.5">{comp.attachmentMethod}</p>
                </div>
                <div className="pt-2 border-t border-neutral-800/80">
                  <span className="text-[10px] font-semibold text-amber-400 uppercase flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Clipping Mitigation Strategy:
                  </span>
                  <p className="text-neutral-300 mt-0.5">{comp.clippingStrategy}</p>
                </div>
              </div>
            </div>

            {/* Originality Note Footer */}
            <div className="mt-4 pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-400 flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>{comp.originalityNotes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
