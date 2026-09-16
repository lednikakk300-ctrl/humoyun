import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Sparkles, 
  Calendar, 
  Cpu, 
  Smartphone, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Sliders, 
  Info,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OneUIVersionData } from '../types';

export const OneUICatalog: React.FC = () => {
  const { oneUIVersions, navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedVersionId, setExpandedVersionId] = useState<string | null>('oneui-31'); // default expanded One UI 3.1 or 6.1

  const filteredVersions = oneUIVersions.filter((ver) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      ver.version.toLowerCase().includes(q) ||
      ver.androidBase.toLowerCase().includes(q) ||
      ver.headline.toLowerCase().includes(q) ||
      ver.newFeatures.some(f => f.toLowerCase().includes(q))
    );
  });

  const toggleExpand = (id: string) => {
    setExpandedVersionId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-8 pb-16 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            One UI Versiyalari Katalogi
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1 max-w-3xl">
            Samsungning barcha One UI avlodlari (One UI 1.x dan One UI 8.5 gacha): 
            Android bazasi, kiritilgan asosiy funksiyalar va qo‘llab-quvvatlanuvchi modellar.
          </p>
        </div>

        <button
          onClick={() => navigateTo('admin')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Versiya Qo‘shish (Admin)</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          id="oneui-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Versiya yoki funksiya qidiring... (masalan: One UI 3.1, Circle to Search, Android 11)"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-600 transition-colors"
        />
      </div>

      {/* Version List */}
      <div className="space-y-4">
        {filteredVersions.map((item) => {
          const isExpanded = expandedVersionId === item.id;
          const isPlanned = item.status === 'planned';
          const isA50Supported = item.supportedDevicesSummary.includes('Galaxy A50');

          return (
            <div
              key={item.id}
              id={`oneui-card-${item.id}`}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white dark:bg-slate-800 ${
                isExpanded
                  ? 'border-blue-500 shadow-md ring-1 ring-blue-500/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {/* Header clickable row */}
              <div
                onClick={() => toggleExpand(item.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors"
              >
                <div className="space-y-1 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {item.version}
                    </span>

                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800">
                      Bazasi: {item.androidBase}
                    </span>

                    {isPlanned ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                        Kutilmoqda / Kelajak versiya
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        Rasmiy Chiqarilgan
                      </span>
                    )}

                    {isA50Supported && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                        Galaxy A50 bilan mos
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-1 sm:line-clamp-none">
                    {item.headline}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-500 dark:text-slate-400 shrink-0">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.releaseDate}</span>
                  </div>

                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Detail Panel */}
              {isExpanded && (
                <div className="p-5 sm:p-6 border-t border-slate-100 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/40 space-y-6 text-sm">
                  
                  {/* Detailed changelog overview */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Umumiy Sharh va Yangilanish Ma’lumotlari
                    </h4>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      {item.detailedChangelog}
                    </p>
                  </div>

                  {/* Two Columns: New Features & UI Changes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* New features */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Yangi Funksiyalar</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {item.newFeatures.map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* UI Changes */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs uppercase tracking-wider">
                        <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span>Interfeys O‘zgarishlari</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {item.uiChanges.map((u, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                            <span>{u}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Supported Devices Summary */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs uppercase tracking-wider">
                      <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Qo‘llab-quvvatlanadigan Modellar</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      {item.supportedDevicesSummary}
                    </p>
                  </div>

                  {/* Quick Action to Check Compatibility with this version */}
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">
                      Telefoningiz ushbu versiyaga mosligini bilmoqchimisiz?
                    </span>
                    <button
                      onClick={() => navigateTo('checker')}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                    >
                      Moslikni Tekshirish
                    </button>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
