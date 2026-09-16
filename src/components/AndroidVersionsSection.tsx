import React from 'react';
import { Cpu, Calendar, Layers, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AndroidVersionsSection: React.FC = () => {
  const { androidVersions, navigateTo } = useApp();

  return (
    <div className="space-y-8 pb-16 text-left">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Android Versiyalari va One UI Bog‘liqligi
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1 max-w-3xl">
          Samsung One UI har doim Google Android tizimining asosiy yadrosiga quriladi. 
          Quyida har bir Android avlodi, uning rasmiy API darajasi va unga mos Samsung One UI relizlari keltirilgan.
        </p>
      </div>

      {/* Grid of Android Versions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {androidVersions.map((ver) => {
          const isA50Factory = ver.version.includes('Android 9');
          const isA50Final = ver.version.includes('Android 11');

          return (
            <div
              key={ver.version}
              className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4 hover:border-emerald-500/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {ver.version}
                    </h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      API {ver.apiLevel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Kod nomi: {ver.codename} • Chiqarilgan yili: {ver.releaseYear}
                  </p>
                </div>

                {isA50Factory && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    A50 Zavod
                  </span>
                )}
                {isA50Final && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    A50 Yakuniy
                  </span>
                )}
              </div>

              {/* Samsung One UI Pairing */}
              <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-xs">
                <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider block text-[10px]">
                  Mos Samsung One UI versiyalari:
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold mt-0.5 block">
                  {ver.samsungOneUIPairing}
                </span>
              </div>

              {/* Major Features */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Asosiy Tizim Yangiliklari:
                </span>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  {ver.majorFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
