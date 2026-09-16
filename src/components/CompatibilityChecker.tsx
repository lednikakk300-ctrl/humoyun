import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Smartphone, 
  Layers, 
  ArrowRight, 
  Info, 
  BookOpen,
  Sparkles,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CompatibilityCheckResult } from '../types';

export const CompatibilityChecker: React.FC = () => {
  const { 
    phones, 
    oneUIVersions, 
    checkCompatibility, 
    checkAvailableUpdate,
    navigateTo 
  } = useApp();

  // Mode: Compatibility vs Update Check
  const [activeMode, setActiveMode] = useState<'compatibility' | 'update'>('compatibility');

  // Compatibility inputs
  const [selectedPhoneId, setSelectedPhoneId] = useState<string>('galaxy-a50');
  const [currentOneUI, setCurrentOneUI] = useState<string>('One UI 2.5');
  const [targetOneUI, setTargetOneUI] = useState<string>('One UI 3.1');
  const [compatResult, setCompatResult] = useState<CompatibilityCheckResult | null>(null);

  // Update check inputs
  const [updatePhoneId, setUpdatePhoneId] = useState<string>('galaxy-a50');
  const [updateCurrentVersion, setUpdateCurrentVersion] = useState<string>('One UI 2.5');
  const [updateResult, setUpdateResult] = useState<{ hasUpdate: boolean; latestVersion: string; message: string; build?: string } | null>(null);

  const selectedPhone = phones.find(p => p.id === selectedPhoneId);
  const selectedUpdatePhone = phones.find(p => p.id === updatePhoneId);

  // When selected phone changes, adjust default versions
  useEffect(() => {
    if (selectedPhone) {
      if (selectedPhone.supportedOneUIVersions.length > 0) {
        setCurrentOneUI(selectedPhone.supportedOneUIVersions[0]);
        setTargetOneUI(selectedPhone.latestOneUI);
      }
    }
  }, [selectedPhoneId]);

  useEffect(() => {
    if (selectedUpdatePhone) {
      if (selectedUpdatePhone.supportedOneUIVersions.length > 0) {
        setUpdateCurrentVersion(selectedUpdatePhone.supportedOneUIVersions[0]);
      }
    }
  }, [updatePhoneId]);

  const handleRunCompatibilityCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const res = checkCompatibility(selectedPhoneId, currentOneUI, targetOneUI);
    setCompatResult(res);
  };

  const handleRunUpdateCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const res = checkAvailableUpdate(updatePhoneId, updateCurrentVersion);
    setUpdateResult(res);
  };

  return (
    <div className="space-y-8 pb-16 text-left max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          One UI Versiya Mosligi va Yangilanish Tekshiruvi
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1">
          Telefon modelingiz va hozirgi versiyangizni kiriting. Tizim Samsungning rasmiy 
          ma’lumotlar bazasi asosida moslikni va yangi yangilanish mavjudligini aniqlab beradi.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-full sm:w-fit">
        <button
          id="tab-mode-compatibility"
          onClick={() => setActiveMode('compatibility')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeMode === 'compatibility'
              ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Versiya Mosligini Tekshirish</span>
        </button>

        <button
          id="tab-mode-update"
          onClick={() => setActiveMode('update')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeMode === 'update'
              ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Yangilanishni Tekshirish</span>
        </button>
      </div>

      {/* MODE 1: COMPATIBILITY CHECKER */}
      {activeMode === 'compatibility' && (
        <div className="space-y-6">
          <form 
            onSubmit={handleRunCompatibilityCheck}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6"
          >
            <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                1. Telefon va Versiyalarni Tanlang
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Qaysi telefon modelini qaysi One UI versiyasiga mosligini tekshirmoqchisiz?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Step 1: Model Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span>1. Samsung Modeli</span>
                </label>
                <select
                  id="compat-phone-select"
                  value={selectedPhoneId}
                  onChange={(e) => setSelectedPhoneId(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-600 font-medium"
                >
                  {phones.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.modelCodes[0]})
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Current One UI */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-slate-500" />
                  <span>2. Hozirgi One UI</span>
                </label>
                <select
                  id="compat-current-select"
                  value={currentOneUI}
                  onChange={(e) => setCurrentOneUI(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-600 font-medium"
                >
                  {oneUIVersions.map((ver) => (
                    <option key={ver.id} value={ver.version}>
                      {ver.version} ({ver.androidBase})
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 3: Target One UI */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>3. Kerakli One UI</span>
                </label>
                <select
                  id="compat-target-select"
                  value={targetOneUI}
                  onChange={(e) => setTargetOneUI(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-600 font-medium"
                >
                  {oneUIVersions.map((ver) => (
                    <option key={ver.id} value={ver.version}>
                      {ver.version} ({ver.androidBase})
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="btn-run-compatibility-check"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base shadow-md hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>TEKSHIRISH</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Result Banner */}
          {compatResult && (
            <div 
              id="compatibility-result-box"
              className={`p-6 sm:p-8 rounded-3xl border-2 transition-all space-y-4 ${
                compatResult.status === 'compatible'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                  : compatResult.status === 'incompatible'
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-800 text-rose-950 dark:text-rose-100'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 dark:border-amber-800 text-amber-950 dark:text-amber-100'
              }`}
            >
              {/* Status Header Badge */}
              <div className="flex items-center gap-3">
                {compatResult.status === 'compatible' && (
                  <div className="p-2.5 rounded-xl bg-emerald-600 text-white">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                )}
                {compatResult.status === 'incompatible' && (
                  <div className="p-2.5 rounded-xl bg-rose-600 text-white">
                    <XCircle className="w-7 h-7" />
                  </div>
                )}
                {compatResult.status === 'insufficient_data' && (
                  <div className="p-2.5 rounded-xl bg-amber-600 text-white">
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                )}

                <div>
                  <div className="text-xs uppercase font-extrabold tracking-widest opacity-75">
                    Natija Xulosasi
                  </div>
                  <div className="text-xl sm:text-2xl font-black tracking-tight">
                    {compatResult.statusText}
                  </div>
                </div>
              </div>

              {/* Main Summary */}
              <div className="text-base sm:text-lg font-bold">
                {compatResult.summary}
              </div>

              {/* Technical Justifications */}
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider opacity-80 block">
                  Nima sababdan shunday?
                </span>
                <ul className="space-y-1 text-xs sm:text-sm">
                  {compatResult.reasons.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendation */}
              <div className="pt-3 border-t border-current/15 text-xs sm:text-sm font-semibold flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span>Tavsiya: {compatResult.recommendation}</span>
                {compatResult.status === 'compatible' && (
                  <button
                    onClick={() => navigateTo('install')}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors shrink-0"
                  >
                    O‘rnatish qo‘llanmasi →
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      )}

      {/* MODE 2: UPDATE CHECKER */}
      {activeMode === 'update' && (
        <div className="space-y-6">
          <form 
            onSubmit={handleRunUpdateCheck}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6"
          >
            <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Mavjud Rasmiy Yangilanishni Tekshirish
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Telefon modelingiz va hozirgi One UI versiyasini ko‘rsating:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span>Samsung Modeli</span>
                </label>
                <select
                  id="update-phone-select"
                  value={updatePhoneId}
                  onChange={(e) => setUpdatePhoneId(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-600 font-medium"
                >
                  {phones.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-slate-500" />
                  <span>Hozirgi Versiyangiz</span>
                </label>
                <select
                  id="update-current-version-select"
                  value={updateCurrentVersion}
                  onChange={(e) => setUpdateCurrentVersion(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-600 font-medium"
                >
                  {oneUIVersions.map((ver) => (
                    <option key={ver.id} value={ver.version}>
                      {ver.version} ({ver.androidBase})
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <button
              type="submit"
              id="btn-run-update-check"
              className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base shadow-md hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Yangilanishni Tekshirish</span>
            </button>
          </form>

          {/* Update Result Display */}
          {updateResult && (
            <div 
              id="update-result-box"
              className={`p-6 sm:p-8 rounded-3xl border-2 transition-all space-y-4 ${
                updateResult.hasUpdate
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {updateResult.hasUpdate ? (
                  <div className="p-2.5 rounded-xl bg-emerald-600 text-white">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-slate-600 text-white">
                    <Info className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <div className="text-xl font-black">
                    {updateResult.hasUpdate ? '🟢 Yangilanish Mavjud' : '⚪ Yangi Rasmiy Yangilanish Topilmadi'}
                  </div>
                  {updateResult.hasUpdate && (
                    <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      Mavjud so‘nggi versiya: {updateResult.latestVersion}
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm leading-relaxed font-medium">
                {updateResult.message}
              </p>

              {updateResult.hasUpdate && (
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => navigateTo('install')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                  >
                    Qanday o‘rnatish kerak? →
                  </button>
                  <button
                    onClick={() => navigateTo('firmware')}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
                  >
                    Firmware ma’lumotlari
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
