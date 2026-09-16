import React, { useState, useMemo } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  Globe, 
  Smartphone, 
  ShieldCheck, 
  Calendar, 
  Layers, 
  Info,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FirmwareSection: React.FC = () => {
  const { firmwares, navigateTo } = useApp();

  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique regions
  const regions = useMemo(() => {
    const list = Array.from(new Set(firmwares.map(f => f.country)));
    return ['all', ...list];
  }, [firmwares]);

  // Filter firmwares
  const filteredFirmwares = useMemo(() => {
    return firmwares.filter((fw) => {
      // Region filter
      if (selectedRegion !== 'all' && fw.country !== selectedRegion) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesModel = fw.model.toLowerCase().includes(q);
        const matchesCode = fw.modelCode.toLowerCase().includes(q);
        const matchesCsc = fw.csc.toLowerCase().includes(q);
        const matchesBuild = fw.buildNumber.toLowerCase().includes(q);
        if (!matchesModel && !matchesCode && !matchesCsc && !matchesBuild) {
          return false;
        }
      }
      return true;
    });
  }, [firmwares, selectedRegion, searchQuery]);

  return (
    <div className="space-y-8 pb-16 text-left">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Samsung Rasmiy Firmware Baza
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1 max-w-3xl">
          Samsung qurilmalari uchun rasmiy firmware ma’lumotlari: CSC kodlari, Build raqamlari, 
          Android va One UI versiyalari hamda xavfsizlik patch sanalari.
        </p>
      </div>

      {/* Info Notice about CSC */}
      <div className="p-4 sm:p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
        <div className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>CSC (Consumer Software Customization) Nima?</span>
        </div>
        <p className="leading-relaxed">
          CSC — Samsung dasturiy ta’minotining mintaqaviy kodi hisoblanadi (masalan, <strong>CAC</strong> — O‘zbekiston, <strong>SER</strong> — Rossiya, <strong>DBT</strong> — Germaniya, <strong>INS</strong> — Hindiston). CSC qaysi mintaqaga tegishli bo‘lsa, o‘sha mintaqaga mos tarmoq xususiyatlari (VoLTE, Wi-Fi Calling) va rasmiy yangilanishlar birinchi bo‘lib yuboriladi.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search */}
        <div className="sm:col-span-8 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="firmware-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Model, kod yoki CSC bo‘yicha qidiring... (masalan: A50, SM-A505F, CAC, S24)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>

        {/* Region Filter */}
        <div className="sm:col-span-4">
          <select
            id="firmware-region-filter"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-600 font-medium"
          >
            <option value="all">Barcha Mintaqalar (All Regions)</option>
            {regions.filter(r => r !== 'all').map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>{filteredFirmwares.length} ta rasmiy build topildi</span>
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Filtrni tozalash
          </button>
        )}
      </div>

      {/* Firmware Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xs">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-4">Model & Kod</th>
              <th className="p-4">CSC / Mintaqa</th>
              <th className="p-4">One UI / Android</th>
              <th className="p-4">Build Number</th>
              <th className="p-4">Security Patch</th>
              <th className="p-4">Chiqarilgan Sana</th>
              <th className="p-4 text-right">Hajmi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200 font-medium">
            {filteredFirmwares.map((fw) => {
              const isA50 = fw.model.toLowerCase().includes('a50');

              return (
                <tr 
                  key={fw.id}
                  className={`hover:bg-slate-50/70 dark:hover:bg-slate-700/30 transition-colors ${
                    isA50 ? 'bg-amber-50/20 dark:bg-amber-950/10' : ''
                  }`}
                >
                  {/* Model */}
                  <td className="p-4">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{fw.model}</span>
                      {isA50 && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold">
                          A50
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-xs text-slate-400">
                      {fw.modelCode}
                    </div>
                  </td>

                  {/* CSC & Region */}
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-mono text-xs">
                        {fw.csc}
                      </span>
                      <span className="text-xs text-slate-700 dark:text-slate-300">
                        {fw.country}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {fw.region}
                    </div>
                  </td>

                  {/* One UI / Android */}
                  <td className="p-4">
                    <div className="font-bold text-blue-600 dark:text-blue-400">
                      {fw.oneUIVersion}
                    </div>
                    <div className="text-xs text-slate-400">
                      {fw.androidVersion}
                    </div>
                  </td>

                  {/* Build Number */}
                  <td className="p-4 font-mono font-semibold text-xs text-slate-900 dark:text-white">
                    {fw.buildNumber}
                  </td>

                  {/* Security Patch */}
                  <td className="p-4 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{fw.securityPatch}</span>
                    </div>
                  </td>

                  {/* Release Date */}
                  <td className="p-4 text-xs text-slate-500 dark:text-slate-400">
                    {fw.releaseDate}
                  </td>

                  {/* Size */}
                  <td className="p-4 text-right font-mono text-xs text-slate-400">
                    {fw.fileSize || '3.9 GB'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Guide link banner */}
      <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
            Ushbu dasturiy ta’minotni qanday o‘rnatish kerak?
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Rasmiy OTA va kompyuter orqali Smart Switch bilan xavfsiz o‘rnatish bosqichlari.
          </p>
        </div>
        <button
          onClick={() => navigateTo('install')}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5"
        >
          <BookOpen className="w-4 h-4" />
          <span>O‘rnatish qo‘llanmasini o‘qish</span>
        </button>
      </div>

    </div>
  );
};
