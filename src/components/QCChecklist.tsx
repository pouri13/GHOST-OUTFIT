import React, { useState } from 'react';
import { QC_CHECKLIST } from '../data/ghostOutfitData';
import { QCCheckItem } from '../types';
import { CheckCircle2, XCircle, AlertCircle, Download, Check, RefreshCw, ShieldCheck } from 'lucide-react';

interface QCChecklistProps {
  items: QCCheckItem[];
  onToggleItem: (id: string) => void;
}

export const QCChecklist: React.FC<QCChecklistProps> = ({ items, onToggleItem }) => {
  const [filter, setFilter] = useState<string>('all');

  const passedCount = items.filter(i => i.passed).length;
  const totalCount = items.length;
  const progressPercent = Math.round((passedCount / totalCount) * 100);

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(i => i.category === filter);

  const handleExportReport = () => {
    let report = `=====================================================\n`;
    report += `FRANKLIN — BLACKOUT ULTIMATE PACK // QC AUDIT REPORT\n`;
    report += `Asset: Ghost Tactical Operator Prototype\n`;
    report += `Date: ${new Date().toISOString()}\n`;
    report += `Status: ${passedCount}/${totalCount} Passed (${progressPercent}%)\n`;
    report += `=====================================================\n\n`;

    items.forEach((item, index) => {
      report += `[${item.passed ? 'PASS' : 'FAIL'}] ${index + 1}. ${item.title} (${item.category.toUpperCase()})\n`;
      report += `    Requirement: ${item.requirement}\n`;
      report += `    Verification: ${item.description}\n\n`;
    });

    const element = document.createElement('a');
    const file = new Blob([report], { type: 'text/plain;charset=utf-8;' });
    element.href = URL.createObjectURL(file);
    element.download = `Blackout_Ghost_QC_Report_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Header with Progress Bar */}
      <div className="bg-neutral-900/60 p-5 rounded-2xl border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Deliverable Item F // Technical Quality Control</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            14-Point GTA V Modding Quality Assurance Audit
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Zero-tolerance production checklist to prevent game crashes, vertex tearing, bone limit overflow, and visual glitches in GTA V.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-center min-w-[130px]">
            <div className="text-xs font-mono text-neutral-400">Audit Status</div>
            <div className={`text-lg font-bold font-mono ${passedCount === totalCount ? 'text-emerald-400' : 'text-amber-400'}`}>
              {passedCount} / {totalCount} Passed
            </div>
          </div>

          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
        <div className="flex justify-between items-center text-xs mb-1.5">
          <span className="text-neutral-400 font-medium">Compliance Readiness</span>
          <span className="font-mono text-emerald-400 font-bold">{progressPercent}% Compliant</span>
        </div>
        <div className="w-full bg-neutral-800 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {['all', 'geometry', 'rigging', 'materials', 'gtav', 'aesthetic'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
              filter === cat
                ? 'bg-neutral-200 text-neutral-950 font-semibold'
                : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Checklist Grid */}
      <div className="space-y-3">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => onToggleItem(item.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
              item.passed
                ? 'bg-neutral-900/50 border-neutral-800 hover:border-emerald-800/60'
                : 'bg-red-950/20 border-red-900/40 hover:border-red-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                type="button"
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  item.passed 
                    ? 'bg-emerald-500 text-neutral-950' 
                    : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                }`}
              >
                {item.passed && <Check className="w-4 h-4 stroke-[3]" />}
              </button>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                    {item.category}
                  </span>
                  <h3 className={`text-sm font-bold ${item.passed ? 'text-white' : 'text-neutral-300'}`}>
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-neutral-400 mb-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="text-xs font-mono text-emerald-400/90 bg-neutral-950/70 p-2 rounded-lg border border-neutral-800/80">
                  <strong className="text-[10px] text-neutral-500 uppercase block">Verification Standard:</strong>
                  {item.requirement}
                </div>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <span className={`text-xs font-bold font-mono px-2 py-1 rounded ${
                item.passed ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40' : 'bg-red-950 text-red-400 border border-red-800/40'
              }`}>
                {item.passed ? 'PASS' : 'FLAGGED'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
