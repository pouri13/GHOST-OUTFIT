import React from 'react';
import { Shield, Sparkles, Terminal, Download, CheckCircle2, GitBranch, Cpu } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  passedQcCount: number;
  totalQcCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  passedQcCount,
  totalQcCount
}) => {
  const tabs = [
    { id: 'viewport', label: '3D Turnaround & Views' },
    { id: 'components', label: 'Modular Components (10)' },
    { id: 'pipeline', label: 'GTA V Pipeline & Plan' },
    { id: 'materials', label: 'Materials & Shaders' },
    { id: 'scripts', label: 'Blender Python Suite (4)' },
    { id: 'qc', label: `QC Checklist (${passedQcCount}/${totalQcCount})` },
    { id: 'legal', label: 'Originality Clearance' },
  ];

  return (
    <header className="border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 gap-4">
          
          {/* Brand & Project Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 flex items-center justify-center shadow-inner">
              <Shield className="w-5 h-5 text-neutral-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/60">
                  PHASE 1: PROTOTYPE
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  GTA V // Franklin Clinton (player_one)
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                FRANKLIN — BLACKOUT ULTIMATE PACK
                <span className="text-xs font-normal text-neutral-400 border-l border-neutral-700 pl-2">
                  Ghost Operator Design System
                </span>
              </h1>
            </div>
          </div>

          {/* Metrics & Badges */}
          <div className="flex items-center gap-2.5">
            <div className="bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-800 flex items-center gap-2 text-xs text-neutral-300">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Target Engine:</span>
              <strong className="text-white">RAGE (PC)</strong>
            </div>

            <div className="bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-800 flex items-center gap-2 text-xs text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>QC Audit:</span>
              <strong className="text-emerald-400">{Math.round((passedQcCount / totalQcCount) * 100)}% Pass</strong>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-neutral-100 text-neutral-950 font-semibold shadow'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
