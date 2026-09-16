import React, { useState } from 'react';
import { 
  Search, 
  Smartphone, 
  Layers, 
  Cpu, 
  RefreshCw, 
  BookOpen, 
  Star, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  Database
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavTab } from '../types';

export const HomeHero: React.FC = () => {
  const { 
    phones, 
    oneUIVersions, 
    firmwares, 
    navigateTo 
  } = useApp();

  const [heroSearch, setHeroSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filtered suggestions for the hero search input
  const suggestions = heroSearch.trim().length > 0
    ? phones.filter(p => 
        p.name.toLowerCase().includes(heroSearch.toLowerCase()) ||
        p.modelCodes.some(c => c.toLowerCase().includes(heroSearch.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSelectModel = (phoneId: string) => {
    if (phoneId === 'galaxy-a50') {
      navigateTo('a50');
    } else {
      navigateTo('phones', phoneId);
    }
    setHeroSearch('');
    setShowSuggestions(false);
  };

  const quickButtons: { id: NavTab; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'phones', label: 'Telefonlar', icon: <Smartphone className="w-5 h-5" />, color: 'bg-blue-600 hover:bg-blue-700 text-white' },
    { id: 'oneui', label: 'One UI versiyalari', icon: <Layers className="w-5 h-5" />, color: 'bg-indigo-600 hover:bg-indigo-700 text-white' },
    { id: 'android', label: 'Android versiyalari', icon: <Cpu className="w-5 h-5" />, color: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
    { id: 'checker', label: 'Yangilanishlar', icon: <RefreshCw className="w-5 h-5" />, color: 'bg-amber-600 hover:bg-amber-700 text-white' },
    { id: 'install', label: 'O‘rnatish qo‘llanmasi', icon: <BookOpen className="w-5 h-5" />, color: 'bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white' },
  ];

  return (
    <div className="space-y-10 pb-12">
      
      {/* Hero Banner with Samsung-inspired aesthetic */}
      <section 
        id="hero-section"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-50/80 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 px-6 py-12 sm:px-12 sm:py-16 text-center shadow-xs"
      >
        {/* Subtle background glow accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-500/10 dark:bg-blue-500/15 blur-3xl pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Samsung Dasturiy Ta’minot va One UI Bilimlar Markazi</span>
          </div>

          {/* Main Title */}
          <h1 
            id="main-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Samsung One UI Center
          </h1>

          {/* Subtitle */}
          <p 
            id="sub-heading"
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Samsung telefoningiz uchun One UI va Android versiyalarini o‘rganing
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto pt-2">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                id="hero-search-input"
                type="text"
                value={heroSearch}
                onChange={(e) => {
                  setHeroSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Samsung modelingizni qidiring... (masalan, A50, SM-A505F, S24 Ultra)"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-lg shadow-blue-500/5 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 text-sm sm:text-base transition-all"
              />
              {heroSearch && (
                <button
                  onClick={() => setHeroSearch('')}
                  className="absolute right-3 px-2 py-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Tozalash
                </button>
              )}
            </div>

            {/* Live Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div 
                id="hero-suggestions-dropdown"
                className="absolute left-0 right-0 top-full mt-2 z-30 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden text-left"
              >
                <div className="p-2 border-b border-slate-100 dark:border-slate-700 text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3">
                  Topilgan modellar
                </div>
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectModel(item.id)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-blue-50 dark:hover:bg-slate-700/60 transition-colors text-left border-b last:border-0 border-slate-100 dark:border-slate-700/50"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                        {item.name}
                        {item.id === 'galaxy-a50' && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold">
                            Maxsus bo‘lim
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Kodlar: {item.modelCodes.join(', ')} • {item.latestOneUI} ({item.latestAndroid})
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Tezkor Bo‘limlar
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {quickButtons.map((btn) => (
                <button
                  key={btn.id}
                  id={`quick-action-${btn.id}`}
                  onClick={() => navigateTo(btn.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm shadow-xs transition-all duration-150 transform active:scale-95 ${btn.color}`}
                >
                  {btn.icon}
                  <span>{btn.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Galaxy A50 Spotlight Section Banner */}
      <section 
        id="a50-spotlight-banner"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 md:p-10 border border-blue-700/40 shadow-xl"
      >
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Maxsus Bag‘ishlangan Bo‘lim</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Samsung Galaxy A50: To‘liq Dasturiy Ta’minot Tarixi
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              2019-yilning afsonaviy xiti. Zavoddan Android 9 (One UI 1.1) bilan boshlanib, 
              Android 10 (One UI 2.0, 2.1, 2.5) va yakuniy Android 11 (One UI 3.1) gacha 
              bosib o‘tilgan yo‘l, barcha model kodlari (SM-A505F/FN/FM/GN/GT) va rasmiy firmware ma’lumotlari.
            </p>

            {/* Quick Specs Pill Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-xs font-medium text-slate-200">
                Zavod: Android 9 / One UI 1.1
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-xs font-medium text-emerald-300">
                Maksimal Rasmiy: Android 11 / One UI 3.1
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-400/30 text-xs font-medium text-rose-300">
                One UI 4/5/6/8: Rasmiy qo‘llab-quvvatlanmaydi
              </span>
            </div>

            <div className="pt-2">
              <button
                id="btn-open-a50-hub"
                onClick={() => navigateTo('a50')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 hover:bg-blue-50 font-bold text-sm shadow-md hover:scale-102 transition-all"
              >
                <span>Galaxy A50 Maxsus Sahifasiga O‘tish</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Device Preview */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div 
              onClick={() => navigateTo('a50')}
              className="cursor-pointer group relative w-48 sm:w-56 p-3 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all hover:scale-105 shadow-2xl"
            >
              {/* Mockup Frame */}
              <div className="w-full aspect-[9/18] rounded-2xl bg-slate-950 p-2.5 flex flex-col justify-between relative overflow-hidden border border-slate-700">
                {/* Infinity-U Waterdrop Notch */}
                <div className="mx-auto w-12 h-3.5 bg-slate-950 rounded-b-xl flex items-center justify-center -mt-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
                </div>
                
                {/* Screen content */}
                <div className="text-center my-auto space-y-1 p-2">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                    A50
                  </div>
                  <div className="text-xs font-bold text-white tracking-wide">Galaxy A50</div>
                  <div className="text-[10px] text-blue-300 font-mono">SM-A505F</div>
                  <div className="text-[9px] text-emerald-400 bg-emerald-950/70 py-0.5 px-2 rounded-full inline-block">
                    One UI 3.1 Yakuniy
                  </div>
                </div>

                {/* Bottom navigation bar indicator */}
                <div className="mx-auto w-16 h-1 bg-white/30 rounded-full mb-1" />
              </div>
              <div className="text-center text-xs font-semibold text-white/80 mt-2">
                Batafsil ko‘rish →
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Key Stats Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Modellar</span>
            <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">{phones.length}+ ta</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">8 ta turkum (S, A, M, Note, Z, F, J, XCover)</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">One UI Versiyalari</span>
            <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">{oneUIVersions.length} ta</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">One UI 1.x dan One UI 8.5 gacha</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Firmware Baza</span>
            <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">{firmwares.length}+ ta</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">CAC, SER, DBT, INS va boshqa CSC lar</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Ishonchlilik</span>
            <ShieldCheck className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">100%</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Faqat rasmiy Samsung ma’lumotlari</p>
        </div>
      </section>

      {/* Quick Navigation Cards: Explore Modules */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Asosiy Imkoniyatlar
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Interaktiv dasturlar to‘plami
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Card 1: Moslikni Tekshirish */}
          <div 
            id="feature-card-checker"
            onClick={() => navigateTo('checker')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer group shadow-xs hover:shadow-md text-left flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                One UI Mosligini Tekshirish
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Telefoningiz va hozirgi versiyangizni tanlang, maqsadli One UI versiyasi bilan mosligini rasmiy tushuntirish bilan tekshiring.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span>Tekshirishni boshlash</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: One UI Katalogi */}
          <div 
            id="feature-card-oneui"
            onClick={() => navigateTo('oneui')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all cursor-pointer group shadow-xs hover:shadow-md text-left flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                One UI Versiyalar Katalogi
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                One UI 1.x dan tortib One UI 8.5 gacha: barcha versiyalarning Android bazasi, yangi funksiyalari va dizayn o‘zgarishlari.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>Versiyalar ro‘yxatini ko‘rish</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: O'rnatish Qo'llanmasi */}
          <div 
            id="feature-card-install"
            onClick={() => navigateTo('install')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer group shadow-xs hover:shadow-md text-left flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Rasmiy O‘rnatish Qo‘llanmasi
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Sozlamalar (OTA) va Samsung Smart Switch orqali xavfsiz yangilash bosqichlari. Soxta animatsiyalarsiz toza haqiqat.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Qo‘llanmani o‘qish</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
