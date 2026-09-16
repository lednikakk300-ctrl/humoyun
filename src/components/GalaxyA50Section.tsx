import React, { useState } from 'react';
import { 
  Star, 
  Smartphone, 
  Calendar, 
  Cpu, 
  Layers, 
  ShieldAlert, 
  ShieldCheck, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Info, 
  ChevronDown, 
  ChevronUp,
  Clock,
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SoftwareMilestone } from '../types';

export const GalaxyA50Section: React.FC = () => {
  const { 
    phones, 
    firmwares, 
    navigateTo, 
    checkCompatibility,
    checkAvailableUpdate 
  } = useApp();

  const a50 = phones.find(p => p.id === 'galaxy-a50') || phones[0];
  const a50Firmwares = firmwares.filter(f => f.model.toLowerCase().includes('a50'));

  // Selected timeline milestone for detail inspection
  const [selectedMilestone, setSelectedMilestone] = useState<SoftwareMilestone>(
    a50.historyTimeline[a50.historyTimeline.length - 1] // Default to One UI 3.1
  );

  // Selected variant for inspector
  const [selectedVariantCode, setSelectedVariantCode] = useState<string>('SM-A505F');

  // Interactive A50 Compatibility test
  const [testTargetVersion, setTestTargetVersion] = useState<string>('One UI 8.0');
  const [testCurrentVersion, setTestCurrentVersion] = useState<string>('One UI 3.1');
  const [testResult, setTestResult] = useState<any>(null);

  const handleTestCompatibility = (target: string) => {
    setTestTargetVersion(target);
    const res = checkCompatibility('galaxy-a50', testCurrentVersion, target);
    setTestResult(res);
  };

  const currentVariant = a50.variants?.find(v => v.code === selectedVariantCode) || a50.variants?.[0];

  return (
    <div className="space-y-12 pb-16 text-left">
      
      {/* Header Banner */}
      <div 
        id="a50-hero-header"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 border border-blue-800 shadow-xl"
      >
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>MAXSUS TAHLILIY BO‘LIM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Samsung Galaxy A50
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            2019-yilning jahon bo‘ylab eng ko‘p sotilgan va ommabop Samsung smartfonlaridan biri. 
            Quyida A50 ning zavod dasturiy ta’minotidan boshlab, so‘nggi rasmiy One UI 3.1 versiyasigacha 
            bo‘lgan to‘liq evolyutsiyasi va rasmiy texnik xususiyatlari jamlangan.
          </p>
        </div>
      </div>

      {/* Main A50 Specifications & Visual Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Device Interactive Mockup */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="sticky top-24 w-full max-w-sm">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md text-center space-y-4">
              
              {/* Device Frame */}
              <div className="relative mx-auto w-64 h-[490px] rounded-[36px] bg-slate-950 p-3 shadow-2xl border-4 border-slate-700/80 flex flex-col justify-between overflow-hidden">
                
                {/* Subtle screen wallpaper & glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-700/30 to-slate-950 pointer-events-none" />

                {/* Top Notch: Infinity-U */}
                <div className="relative z-10 mx-auto w-16 h-4 bg-slate-950 rounded-b-2xl flex items-center justify-center -mt-3 shadow-inner">
                  <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800" />
                </div>

                {/* Simulated Screen Content */}
                <div className="relative z-10 my-auto text-center px-4 space-y-3">
                  <div className="text-[11px] font-medium text-slate-300 tracking-wider uppercase">
                    One UI 3.1
                  </div>
                  
                  <div className="text-4xl font-extrabold text-white tracking-tight">
                    12:45
                  </div>
                  <div className="text-xs text-slate-300">
                    Chorshanba, Mart 2021
                  </div>

                  <div className="pt-4 pb-2">
                    <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left space-y-1">
                      <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Rasmiy Yakuniy Versiya</span>
                      </div>
                      <div className="text-[10px] text-slate-300">
                        Android 11 • One UI 3.1
                      </div>
                      <div className="text-[9px] text-blue-300 font-mono">
                        Build: A505FDDU9CVD1
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 bg-black/40 py-1 px-2.5 rounded-full inline-block">
                    Super AMOLED 6.4" Infinity-U
                  </div>
                </div>

                {/* Bottom Bar indicator */}
                <div className="relative z-10 mx-auto w-24 h-1 bg-white/40 rounded-full mb-1" />
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Samsung Galaxy A50
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Model seriyasi: Galaxy A • Chiqarilgan: 2019-yil
                </p>
              </div>

              {/* Status Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 text-xs font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Rasmiy qo‘llab-quvvatlash yakunlangan (2023)</span>
              </div>

            </div>

          </div>
        </div>

        {/* Right: Detailed Specs & Information */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Core Specs Grid */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Zavod va Rasmiy Yangilanish Ko‘rsatkichlari</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700">
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>Chiqarilgan Sana</span>
                </div>
                <div className="font-semibold text-slate-900 dark:text-white mt-1">
                  {a50.releaseDateFormatted}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700">
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-indigo-500" />
                  <span>Protsessor (Chipset)</span>
                </div>
                <div className="font-semibold text-slate-900 dark:text-white mt-1">
                  Exynos 9610 (10 nm) Octa-Core
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900">
                <div className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" />
                  <span>Zavod Android Versiyasi</span>
                </div>
                <div className="font-bold text-blue-900 dark:text-blue-200 mt-1">
                  {a50.factoryAndroid}
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
                  Boshlang‘ich One UI: {a50.factoryOneUI}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900">
                <div className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Maksimal Rasmiy Versiya</span>
                </div>
                <div className="font-bold text-emerald-900 dark:text-emerald-200 mt-1">
                  {a50.latestAndroid}
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                  Rasmiy Yakuniy: {a50.latestOneUI}
                </div>
              </div>

            </div>

            {/* Security Patch Info */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Security Patch (Xavfsizlik Patchi Ma’lumoti):</span>
              </div>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                {a50.securityPatchStatus}. Ushbu model 4 yil davomida (2019-2023) muntazam xavfsizlik 
                yangilanishlarini qabul qilgan va Samsung rasmiy yangilanishlar jadvalidan muvaffaqiyatli chiqqan.
              </p>
            </div>
          </div>

          {/* Model Codes Variants Detail Section */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Galaxy A50 Model Kodlari va Variantlari
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Turli davlatlar va operatorlar uchun chiqarilgan rasmiy model kodlari:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {a50.modelCodes.map((code) => {
                const isSelected = selectedVariantCode === code;
                return (
                  <button
                    key={code}
                    id={`variant-btn-${code}`}
                    onClick={() => setSelectedVariantCode(code)}
                    className={`px-3 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-blue-400'
                    }`}
                  >
                    {code}
                  </button>
                );
              })}
            </div>

            {/* Selected Variant Inspector Card */}
            {currentVariant && (
              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 text-sm space-y-1.5">
                <div className="font-bold text-blue-900 dark:text-blue-300 flex items-center justify-between">
                  <span>Variant kodi: {currentVariant.code}</span>
                  <span className="text-[11px] font-normal px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                    {currentVariant.bandsOrSim}
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-xs">
                  <strong>Hudud/Mintaqa tavsifi:</strong> {currentVariant.regionDescription}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Galaxy A50 Software Evolution Timeline */}
      <section id="a50-timeline-section" className="space-y-6 pt-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>XRONOLOGIK DASTURIY TA’MINOT TARIXI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Galaxy A50 One UI Evolyutsiya Timeline’i
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-3xl">
            Har bir versiyani bosib, uning kiritgan yangiliklari, chiqarilgan sanasi va build ma’lumotlarini ko‘ring:
          </p>
        </div>

        {/* Interactive Timeline Rail */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {a50.historyTimeline.map((item, index) => {
              const isSelected = selectedMilestone.oneUIVersion === item.oneUIVersion;
              return (
                <div
                  key={item.oneUIVersion}
                  onClick={() => setSelectedMilestone(item)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all text-left relative ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-102'
                      : 'bg-slate-50 dark:bg-slate-700/40 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50/50'
                  }`}
                >
                  {/* Step index */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={`font-mono font-bold ${isSelected ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'}`}>
                      0{index + 1}
                    </span>
                    {item.isInitial && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                        Zavod
                      </span>
                    )}
                    {item.isFinal && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-emerald-400 text-slate-900' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'}`}>
                        Yakuniy
                      </span>
                    )}
                  </div>

                  <div className="font-extrabold text-base tracking-tight">
                    {item.oneUIVersion}
                  </div>
                  <div className={`text-xs ${isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'} mt-0.5`}>
                    {item.androidVersion}
                  </div>
                  <div className={`text-[11px] mt-2 font-medium ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                    {item.releaseDate}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Selected Milestone Card */}
          <div className="p-6 rounded-2xl bg-blue-50/50 dark:bg-slate-900/60 border border-blue-200 dark:border-slate-700 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-100 dark:border-slate-700 pb-3">
              <div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Tanlangan Versiya Tafsilotlari
                </span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
                  <span>{selectedMilestone.oneUIVersion}</span>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    ({selectedMilestone.androidVersion})
                  </span>
                </h4>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 dark:text-slate-400">Chiqarilgan:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                  {selectedMilestone.releaseDate}
                </span>
                {selectedMilestone.buildNumber && (
                  <span className="font-mono text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                    Build: {selectedMilestone.buildNumber}
                  </span>
                )}
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              {selectedMilestone.notes}
            </p>
          </div>

        </div>
      </section>

      {/* CRITICAL ACCURACY RULE: Strict Notice Regarding Non-Supported Versions */}
      <section 
        id="a50-compatibility-limit-alert"
        className="p-6 sm:p-8 rounded-3xl bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-300 dark:border-rose-900 space-y-4"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-rose-600 text-white shrink-0 shadow-md">
            <XCircle className="w-6 h-6" />
          </div>
          <div className="space-y-2 text-left">
            <h3 className="text-lg sm:text-xl font-black text-rose-900 dark:text-rose-200">
              Muhim: Rasmiy Qo‘llab-quvvatlanmaydigan Versiyalar Haqida Aniq Ma’lumot
            </h3>
            <p className="text-sm text-rose-800 dark:text-rose-300 leading-relaxed">
              Samsung Galaxy A50 uchun eng so‘nggi rasmiy versiya — <strong>One UI 3.1 (Android 11)</strong> hisoblanadi. 
              Keyingi chiqqan <strong>One UI 4.0, One UI 5.0, One UI 6.0, One UI 7.0 yoki One UI 8</strong> versiyalari 
              ushbu model uchun <u>hech qachon rasman chiqarilmagan</u> va qo‘llab-quvvatlanmaydi.
            </p>
            <p className="text-xs text-rose-700 dark:text-rose-400">
              Hech qanday rasmiy yangilanish (OTA yoki Smart Switch) A50 ni One UI 4 yoki undan yuqori versiyaga o‘tkazmaydi.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive A50 Version Compatibility Verifier */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Galaxy A50 uchun Versiya Mosligini Sinovdan O‘tkazish
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Quyidagi One UI versiyasini tanlang va A50 bilan mosligini tekshiring:
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['One UI 1.1', 'One UI 2.5', 'One UI 3.1', 'One UI 4.1', 'One UI 5.1', 'One UI 6.1', 'One UI 7.0', 'One UI 8.0'].map((ver) => (
            <button
              key={ver}
              id={`test-ver-${ver}`}
              onClick={() => handleTestCompatibility(ver)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                testTargetVersion === ver
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-blue-400'
              }`}
            >
              {ver} bilan tekshirish
            </button>
          ))}
        </div>

        {/* Test Result Display */}
        {testResult && (
          <div 
            id="a50-test-result-box"
            className={`p-5 rounded-2xl border text-sm space-y-3 transition-all ${
              testResult.status === 'incompatible'
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900 text-rose-900 dark:text-rose-200'
                : testResult.status === 'compatible'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900 text-amber-900 dark:text-amber-200'
            }`}
          >
            <div className="flex items-center gap-2 font-black text-base">
              {testResult.status === 'incompatible' && <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
              {testResult.status === 'compatible' && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
              {testResult.status === 'insufficient_data' && <Info className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
              <span>{testResult.statusText}</span>
            </div>

            <div className="font-semibold text-sm">
              {testResult.summary}
            </div>

            <ul className="list-disc list-inside space-y-1 text-xs opacity-90">
              {testResult.reasons.map((r: string, idx: number) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>

            <div className="pt-2 border-t border-current/10 text-xs font-semibold">
              Tavsiya: {testResult.recommendation}
            </div>
          </div>
        )}
      </section>

      {/* A50 Official Firmware Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Galaxy A50 Rasmiy Firmware Baza
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              O‘zbekiston (CAC), Rossiya (SER), Germaniya (DBT) va boshqa mintaqalar uchun rasmiy buildlar:
            </p>
          </div>
          <button
            onClick={() => navigateTo('firmware')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Barcha firmware'lar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3.5">Model Code</th>
                <th className="p-3.5">CSC / Region</th>
                <th className="p-3.5">OS / One UI</th>
                <th className="p-3.5">Build Number</th>
                <th className="p-3.5">Security Patch</th>
                <th className="p-3.5">Chiqarilgan Sana</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200 font-medium">
              {a50Firmwares.map((fw) => (
                <tr key={fw.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">
                    {fw.modelCode}
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold text-blue-600 dark:text-blue-400">{fw.csc}</span>
                    <span className="text-slate-400 ml-1">({fw.country})</span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                      {fw.oneUIVersion}
                    </span>
                    <span className="text-xs text-slate-400 ml-1.5">{fw.androidVersion}</span>
                  </td>
                  <td className="p-3.5 font-mono text-xs">
                    {fw.buildNumber}
                  </td>
                  <td className="p-3.5 text-xs text-slate-500 dark:text-slate-400">
                    {fw.securityPatch}
                  </td>
                  <td className="p-3.5 text-xs text-slate-500 dark:text-slate-400">
                    {fw.releaseDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};
