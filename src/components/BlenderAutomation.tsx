import React, { useState } from 'react';
import { BLENDER_SCRIPTS } from '../data/blenderScripts';
import { Terminal, Copy, Check, Download, FileCode, Play, Sparkles, BookOpen } from 'lucide-react';

export const BlenderAutomation: React.FC = () => {
  const [activeScriptId, setActiveScriptId] = useState<string>(BLENDER_SCRIPTS[0].id);
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  const activeScript = BLENDER_SCRIPTS.find(s => s.id === activeScriptId) || BLENDER_SCRIPTS[0];

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedScriptId(id);
    setTimeout(() => setCopiedScriptId(null), 2000);
  };

  const handleDownload = (filename: string, code: string) => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/x-python;charset=utf-8;' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-neutral-900/60 p-5 rounded-2xl border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
            <Terminal className="w-4 h-4" />
            <span>Items H & I // Blender Python Automation Suite</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Production Python Automation Scripts
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Standardized Blender Python automation to eliminate human error across units, collection hierarchy, weight constraints (max 4 bones), and LOD generation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDownload(activeScript.filename, activeScript.pythonCode)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-950 text-cyan-300 hover:bg-cyan-900 border border-cyan-800/60 text-xs font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download {activeScript.filename}</span>
          </button>
        </div>
      </div>

      {/* Script Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {BLENDER_SCRIPTS.map((script) => (
          <button
            key={script.id}
            onClick={() => setActiveScriptId(script.id)}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
              activeScriptId === script.id
                ? 'bg-neutral-100 text-neutral-950 font-semibold shadow'
                : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>{script.filename}</span>
          </button>
        ))}
      </div>

      {/* Active Script Details & Code Box */}
      <div className="bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl">
        {/* Script Top Bar */}
        <div className="bg-neutral-900/80 px-5 py-3.5 border-b border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">{activeScript.filename}</span>
              <span className="text-neutral-500 font-normal">//</span>
              <span className="text-neutral-300 font-normal">{activeScript.title}</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">{activeScript.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(activeScript.pythonCode, activeScript.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-white transition-colors"
            >
              {copiedScriptId === activeScript.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleDownload(activeScript.filename, activeScript.pythonCode)}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
              title="Download Python File"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Execution Instructions Box */}
        <div className="bg-neutral-900/40 p-4 border-b border-neutral-800/80 text-xs">
          <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Play className="w-3 h-3" /> Step-by-Step Blender Execution Guide:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-neutral-300">
            {activeScript.instructions.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-neutral-950/60 p-2 rounded-lg border border-neutral-800/60">
                <span className="w-4 h-4 rounded bg-neutral-800 text-neutral-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-[11px] leading-tight">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Python Code Viewer */}
        <div className="p-4 font-mono text-xs overflow-x-auto text-neutral-300 bg-neutral-950/90 max-h-[460px] scrollbar-thin">
          <pre className="leading-relaxed">
            <code>{activeScript.pythonCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
