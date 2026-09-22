import React, { useState } from 'react';
import { Header } from './components/Header';
import { Viewport3D } from './components/Viewport3D';
import { TurnaroundDossier } from './components/TurnaroundDossier';
import { ComponentMatrix } from './components/ComponentMatrix';
import { PipelineGuide } from './components/PipelineGuide';
import { MaterialsAndTextures } from './components/MaterialsAndTextures';
import { BlenderAutomation } from './components/BlenderAutomation';
import { QCChecklist } from './components/QCChecklist';
import { OriginalityStatement } from './components/OriginalityStatement';
import { QC_CHECKLIST } from './data/ghostOutfitData';
import { CameraViewMode, ShadingMode, LightingPreset, QCCheckItem } from './types';
import { Shield, Sparkles, Terminal, Download, FileCheck, Layers, BookOpen, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('viewport');
  const [currentView, setCurrentView] = useState<CameraViewMode>('perspective');
  const [shadingMode, setShadingMode] = useState<ShadingMode>('pbr');
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>('night-ops');
  const [qcItems, setQcItems] = useState<QCCheckItem[]>(QC_CHECKLIST);

  const handleToggleQcItem = (id: string) => {
    setQcItems(prev => prev.map(item => item.id === id ? { ...item, passed: !item.passed } : item));
  };

  const handleSelectViewFromDossier = (view: CameraViewMode) => {
    setCurrentView(view);
    setActiveTab('viewport');
    // Scroll viewport into view
    const el = document.getElementById('viewport-3d-container');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const passedQcCount = qcItems.filter(i => i.passed).length;
  const totalQcCount = qcItems.length;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-neutral-800 selection:text-white">
      {/* Top Navigation & Project Status Header */}
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        passedQcCount={passedQcCount}
        totalQcCount={totalQcCount}
      />

      {/* Main Studio Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* TAB 1: 3D VIEWPORT & TURNAROUND DOSSIER */}
        {activeTab === 'viewport' && (
          <div className="space-y-8 animate-fadeIn">
            {/* 3D Interactive Viewport with Real-Time Shading & Camera Rig */}
            <section aria-label="3D Interactive Viewport">
              <Viewport3D
                currentView={currentView}
                onViewChange={setCurrentView}
                shadingMode={shadingMode}
                onShadingModeChange={setShadingMode}
                lightingPreset={lightingPreset}
                onLightingPresetChange={setLightingPreset}
              />
            </section>

            {/* Deliverables 1 to 7: Front, Back, Left, Right & Macro Studies */}
            <section aria-label="Orthographic Turnaround Dossier">
              <TurnaroundDossier onSelectView={handleSelectViewFromDossier} />
            </section>
          </div>
        )}

        {/* TAB 2: MODULAR COMPONENT SPECIFICATION MATRIX */}
        {activeTab === 'components' && (
          <div className="animate-fadeIn">
            <ComponentMatrix />
          </div>
        )}

        {/* TAB 3: GTA V TECHNICAL PIPELINE & ENGINEERING PLAN */}
        {activeTab === 'pipeline' && (
          <div className="animate-fadeIn">
            <PipelineGuide />
          </div>
        )}

        {/* TAB 4: MATERIALS & RAGE SHADERS */}
        {activeTab === 'materials' && (
          <div className="animate-fadeIn">
            <MaterialsAndTextures />
          </div>
        )}

        {/* TAB 5: BLENDER PYTHON AUTOMATION SUITE */}
        {activeTab === 'scripts' && (
          <div className="animate-fadeIn">
            <BlenderAutomation />
          </div>
        )}

        {/* TAB 6: QUALITY CONTROL AUDIT CHECKLIST */}
        {activeTab === 'qc' && (
          <div className="animate-fadeIn">
            <QCChecklist items={qcItems} onToggleItem={handleToggleQcItem} />
          </div>
        )}

        {/* TAB 7: ORIGINALITY CLEARANCE & COPYRIGHT DEFENSE */}
        {activeTab === 'legal' && (
          <div className="animate-fadeIn">
            <OriginalityStatement />
          </div>
        )}
      </main>

      {/* Studio Footer */}
      <footer className="border-t border-neutral-800/80 bg-neutral-950 py-6 mt-12 text-neutral-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-neutral-400" />
            <span>FRANKLIN — BLACKOUT ULTIMATE PACK // PHASE 1 TECHNICAL PROTOTYPE</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Engine: Rockstar RAGE</span>
            <span>•</span>
            <span>Target: GTA V PC (player_one)</span>
            <span>•</span>
            <span>Tooling: Blender 3.6 LTS + Sollumz</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
