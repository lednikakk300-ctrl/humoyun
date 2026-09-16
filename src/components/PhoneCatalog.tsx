import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Smartphone, 
  Filter, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Calendar, 
  Layers, 
  X, 
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PhoneSeries, SamsungPhone } from '../types';

export const PhoneCatalog: React.FC = () => {
  const { 
    phones, 
    navigateTo, 
    selectedPhoneId, 
    setSelectedPhoneId 
  } = useApp();

  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const seriesList: { id: string; label: string }[] = [
    { id: 'all', label: 'Barcha Seriyalar' },
    { id: 'Galaxy S', label: 'Galaxy S' },
    { id: 'Galaxy A', label: 'Galaxy A' },
    { id: 'Galaxy M', label: 'Galaxy M' },
    { id: 'Galaxy Note', label: 'Galaxy Note' },
    { id: 'Galaxy Z', label: 'Galaxy Z' },
    { id: 'Galaxy F', label: 'Galaxy F' },
    { id: 'Galaxy J', label: 'Galaxy J' },
    { id: 'Galaxy XCover', label: 'Galaxy XCover' },
  ];

  // Filtered phones
  const filteredPhones = useMemo(() => {
    return phones.filter((phone) => {
      // Series filter
      if (selectedSeries !== 'all' && phone.series !== selectedSeries) {
        return false;
      }
      // Status filter
      if (statusFilter !== 'all' && phone.supportStatus !== statusFilter) {
        return false;
      }
      // Search query (name, model codes, chipset)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = phone.name.toLowerCase().includes(query);
        const matchesCode = phone.modelCodes.some(c => c.toLowerCase().includes(query));
        const matchesChip = phone.chipset.toLowerCase().includes(query);
        if (!matchesName && !matchesCode && !matchesChip) {
          return false;
        }
      }
      return true;
    });
  }, [phones, selectedSeries, statusFilter, searchQuery]);

  // Selected phone modal object
  const activeDetailPhone = selectedPhoneId 
    ? phones.find(p => p.id === selectedPhoneId) || null 
    : null;

  return (
    <div className="space-y-8 pb-16 text-left">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Samsung Telefonlar Katalogi
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1 max-w-3xl">
          Barcha Samsung Galaxy modellarining zavod va maksimal rasmiy One UI/Android 
          versiyalari, model kodlari hamda yangilanish holati.
        </p>
      </div>

      {/* Series Filter Tabs (Horizontal Scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {seriesList.map((tab) => {
          const isSelected = selectedSeries === tab.id;
          return (
            <button
              key={tab.id}
              id={`series-filter-${tab.id.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedSeries(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search & Status Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search input */}
        <div className="sm:col-span-8 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="phone-catalog-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Model nomi yoki kodini qidiring... (masalan: A50, SM-A505F, S24, Note 20)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>

        {/* Status Dropdown */}
        <div className="sm:col-span-4">
          <select
            id="phone-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-600"
          >
            <option value="all">Barcha Holatlar</option>
            <option value="active">Faol Yangilanuvchi (Active)</option>
            <option value="security_only">Faqat Xavfsizlik (Security Only)</option>
            <option value="discontinued">Yangilanish Yakunlangan (Discontinued)</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>{filteredPhones.length} ta model topildi</span>
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Qidiruvni tozalash
          </button>
        )}
      </div>

      {/* Grid of Phone Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPhones.map((phone) => {
          const isA50 = phone.id === 'galaxy-a50';
          return (
            <div
              key={phone.id}
              id={`phone-card-${phone.id}`}
              onClick={() => {
                if (isA50) {
                  navigateTo('a50');
                } else {
                  setSelectedPhoneId(phone.id);
                }
              }}
              className={`group p-5 rounded-2xl bg-white dark:bg-slate-800 border transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between text-left ${
                isA50 
                  ? 'border-amber-400/80 dark:border-amber-500/80 hover:border-amber-500 ring-1 ring-amber-400/30' 
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400'
              }`}
            >
              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {phone.series}
                  </span>

                  {isA50 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>Maxsus Bo‘lim</span>
                    </span>
                  )}

                  {!isA50 && phone.supportStatus === 'active' && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      Faol
                    </span>
                  )}
                  {!isA50 && phone.supportStatus === 'discontinued' && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                      Yakunlangan
                    </span>
                  )}
                </div>

                {/* Model Title */}
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {phone.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    {phone.modelCodes.join(', ')}
                  </p>
                </div>

                {/* Software specs */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Zavod versiyasi:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {phone.factoryOneUI} ({phone.factoryAndroid.split(' ')[0]})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">So‘nggi rasmiy versiya:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {phone.latestOneUI}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200 dark:border-slate-600/50">
                    <span className="text-slate-400">Chiqarilgan:</span>
                    <span className="text-slate-600 dark:text-slate-300">{phone.releaseDateFormatted.split('(')[0]}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                  {phone.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>{isA50 ? 'Maxsus sahifani ochish' : 'Batafsil ma’lumot va tarix'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Modal Drawer for Selected Non-A50 Phone */}
      {activeDetailPhone && activeDetailPhone.id !== 'galaxy-a50' && (
        <div 
          id="phone-detail-modal-overlay"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhoneId(null)}
        >
          <div 
            id="phone-detail-modal"
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {activeDetailPhone.series}
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {activeDetailPhone.name}
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Model kodlari: {activeDetailPhone.modelCodes.join(', ')}
                </p>
              </div>
              <button
                id="close-phone-modal-btn"
                onClick={() => setSelectedPhoneId(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Specs Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <span className="text-slate-400 block">Zavod One UI</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">
                  {activeDetailPhone.factoryOneUI}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <span className="text-slate-400 block">So‘nggi One UI</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 mt-0.5 block">
                  {activeDetailPhone.latestOneUI}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <span className="text-slate-400 block">Protsessor</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block truncate">
                  {activeDetailPhone.chipset.split('(')[0]}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <span className="text-slate-400 block">Chiqarilgan</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">
                  {activeDetailPhone.releaseDateFormatted.split('(')[0]}
                </span>
              </div>
            </div>

            {/* Support Info */}
            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <strong>Xavfsizlik va yangilanish siyosati:</strong> {activeDetailPhone.securityPatchStatus}
            </div>

            {/* Software Timeline */}
            <div className="space-y-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Dasturiy Ta’minot Tarixi</span>
              </h3>
              
              <div className="space-y-2">
                {activeDetailPhone.historyTimeline.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {item.oneUIVersion}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 ml-2">
                        ({item.androidVersion})
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 mt-1">
                        {item.notes}
                      </p>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px] shrink-0">
                      {item.releaseDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  setSelectedPhoneId(null);
                  navigateTo('checker');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors"
              >
                Ushbu Model Mosligini Tekshirish
              </button>
              <button
                onClick={() => {
                  setSelectedPhoneId(null);
                  navigateTo('firmware');
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
              >
                Firmware Yuklab Olish Ma’lumotlari
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
