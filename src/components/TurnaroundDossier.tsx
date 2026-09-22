import React from 'react';
import { ORTHOGRAPHIC_VIEWS } from '../data/ghostOutfitData';
import { CameraViewMode } from '../types';
import { Eye, Ruler, Shield, Sparkles, Check, ArrowRight } from 'lucide-react';

interface TurnaroundDossierProps {
  onSelectView: (view: CameraViewMode) => void;
}

export const TurnaroundDossier: React.FC<TurnaroundDossierProps> = ({ onSelectView }) => {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900/60 p-5 rounded-2xl border border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>Deliverable Items 1 to 7 // Orthographic Reference Suite</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Ghost Operator Technical Turnaround & Macro Studies
          </h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
            Clean 3D orthographic reference breakdowns designed to guide Blender sub-d modeling, symmetry validation, and exact alignment to Franklin Clinton’s default GTA V skeleton.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-950 px-3.5 py-2 rounded-xl border border-neutral-800">
          <Ruler className="w-4 h-4 text-amber-400" />
          <span>Scale Benchmark:</span>
          <strong className="text-neutral-200">1.83m (Franklin Ped Height)</strong>
        </div>
      </div>

      {/* Grid of 7 Reference Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ORTHOGRAPHIC_VIEWS.map((view, idx) => {
          const isCloseUp = view.id.includes('close');
          return (
            <div
              key={view.id}
              className={`flex flex-col justify-between rounded-2xl border bg-neutral-900/50 p-5 transition-all hover:border-neutral-700 ${
                isCloseUp 
                  ? 'border-amber-900/40 bg-gradient-to-b from-neutral-900/80 to-amber-950/10' 
                  : 'border-neutral-800'
              }`}
            >
              <div>
                {/* Card Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                    isCloseUp 
                      ? 'bg-amber-950 text-amber-300 border border-amber-800/60' 
                      : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                  }`}>
                    VIEW 0{idx + 1} // {isCloseUp ? 'MACRO DETAIL' : 'ORTHOGRAPHIC'}
                  </span>

                  <button
                    onClick={() => onSelectView(view.id as CameraViewMode)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium group"
                  >
                    <span>Focus in 3D</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>

                <h3 className="text-base font-bold text-white mb-1.5">{view.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">{view.description}</p>

                {/* Technical Callout Bullet Points */}
                <div className="space-y-2 border-t border-neutral-800/80 pt-3">
                  <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider block">
                    Key Alignment Landmarks:
                  </span>
                  {view.callouts.map((callout, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{callout}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Action Trigger */}
              <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 font-mono">
                  Preset: CAM_{view.id.toUpperCase()}
                </span>
                <button
                  onClick={() => onSelectView(view.id as CameraViewMode)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                >
                  Inspect Camera View
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
