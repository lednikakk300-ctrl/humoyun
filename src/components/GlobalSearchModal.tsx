import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Smartphone, 
  Layers, 
  Database, 
  ChevronRight, 
  Star,
  ExternalLink 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchModalOpen, 
    setIsSearchModalOpen, 
    phones, 
    oneUIVersions, 
    firmwares, 
    navigateTo 
  } = useApp();

  const [query, setQuery] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchModalOpen(!isSearchModalOpen);
      }
      if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedPhones = q
    ? phones.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.modelCodes.some(c => c.toLowerCase().includes(q))
      ).slice(0, 5)
    : phones.slice(0, 4);

  const matchedVersions = q
    ? oneUIVersions.filter(v => 
        v.version.toLowerCase().includes(q) || 
        v.androidBase.toLowerCase().includes(q) || 
        v.headline.toLowerCase().includes(q)
      ).slice(0, 4)
    : oneUIVersions.slice(0, 3);

  const matchedFirmwares = q
    ? firmwares.filter(f => 
        f.model.toLowerCase().includes(q) || 
        f.modelCode.toLowerCase().includes(q) || 
        f.csc.toLowerCase().includes(q) || 
        f.buildNumber.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const handleSelectPhone = (phoneId: string) => {
    setIsSearchModalOpen(false);
    if (phoneId === 'galaxy-a50') {
      navigateTo('a50');
    } else {
      navigateTo('phones', phoneId);
    }
  };

  const handleSelectVersion = (versionId: string) => {
    setIsSearchModalOpen(false);
    navigateTo('oneui');
  };

  const handleSelectFirmware = () => {
    setIsSearchModalOpen(false);
    navigateTo('firmware');
  };

  return (
    <div 
      id="global-search-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
      onClick={() => setIsSearchModalOpen(false)}
    >
      <div 
        id="global-search-modal"
        className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-left flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            id="global-search-modal-input"
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Qidirish: Model (A50, S24), One UI (3.1, 6.1), CSC (CAC, SER)..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1"
            >
              Tozalash
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Body */}
        <div className="overflow-y-auto p-4 space-y-5">
          
          {/* Section: Phones */}
          {matchedPhones.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center justify-between">
                <span>Samsung Modellar</span>
                <span className="text-[10px] text-slate-500">Telefonlar bo‘limi</span>
              </div>
              <div className="space-y-1">
                {matchedPhones.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPhone(p.id)}
                    className="w-full p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 flex items-center justify-between text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{p.name}</span>
                          {p.id === 'galaxy-a50' && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold">
                              A50 Maxsus
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          {p.modelCodes.join(', ')} • {p.latestOneUI}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section: One UI Versions */}
          {matchedVersions.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center justify-between">
                <span>One UI Versiyalari</span>
                <span className="text-[10px] text-slate-500">Katalog</span>
              </div>
              <div className="space-y-1">
                {matchedVersions.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => handleSelectVersion(v.id)}
                    className="w-full p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800 flex items-center justify-between text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          {v.version} ({v.androidBase})
                        </div>
                        <div className="text-xs text-slate-400 line-clamp-1">
                          {v.headline}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section: Firmware */}
          {matchedFirmwares.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center justify-between">
                <span>Firmware Buildlar</span>
                <span className="text-[10px] text-slate-500">Baza</span>
              </div>
              <div className="space-y-1">
                {matchedFirmwares.map((f) => (
                  <button
                    key={f.id}
                    onClick={handleSelectFirmware}
                    className="w-full p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 flex items-center justify-between text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                        {f.csc}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          {f.model} ({f.buildNumber})
                        </div>
                        <div className="text-xs text-slate-400">
                          {f.country} • {f.oneUIVersion} ({f.androidVersion})
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {q && matchedPhones.length === 0 && matchedVersions.length === 0 && matchedFirmwares.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-sm">
              "{query}" so‘rovi bo‘yicha natijalar topilmadi.
            </div>
          )}

        </div>

        {/* Footer shortcuts hint */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 px-4">
          <span>Yopish uchun <strong>Esc</strong> tugmasini bosing</span>
          <span>Samsung One UI Center</span>
        </div>
      </div>
    </div>
  );
};
