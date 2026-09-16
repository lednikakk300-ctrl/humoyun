import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Layers, 
  Smartphone, 
  Database, 
  RotateCcw, 
  CheckCircle2, 
  Trash2, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OneUIVersionData, SamsungPhone, FirmwareItem, PhoneSeries } from '../types';

export const AdminPanel: React.FC = () => {
  const { 
    oneUIVersions, 
    phones, 
    firmwares, 
    addOneUIVersion, 
    addPhone, 
    addFirmware, 
    resetToDefaults,
    navigateTo 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'oneui' | 'phone' | 'firmware'>('oneui');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // One UI Form State
  const [newVersion, setNewVersion] = useState('');
  const [newAndroidBase, setNewAndroidBase] = useState('Android 16');
  const [newReleaseDate, setNewReleaseDate] = useState('2026-yil kutilmoqda');
  const [newHeadline, setNewHeadline] = useState('');
  const [newFeatures, setNewFeatures] = useState('');
  const [newUIChanges, setNewUIChanges] = useState('');
  const [newDevices, setNewDevices] = useState('');

  // Phone Form State
  const [phoneName, setPhoneName] = useState('');
  const [phoneSeries, setPhoneSeries] = useState<PhoneSeries>('Galaxy S');
  const [modelCodes, setModelCodes] = useState('');
  const [factoryAndroid, setFactoryAndroid] = useState('Android 15');
  const [factoryOneUI, setFactoryOneUI] = useState('One UI 7.0');
  const [latestAndroid, setLatestAndroid] = useState('Android 16');
  const [latestOneUI, setLatestOneUI] = useState('One UI 8.0');
  const [chipset, setChipset] = useState('');
  const [releaseDateFormatted, setReleaseDateFormatted] = useState('2025-yil');
  const [description, setDescription] = useState('');

  // Firmware Form State
  const [fwModel, setFwModel] = useState('Galaxy S24 Ultra');
  const [fwCode, setFwCode] = useState('SM-S928B');
  const [fwCsc, setFwCsc] = useState('CAC');
  const [fwCountry, setFwCountry] = useState('O‘zbekiston');
  const [fwBuild, setFwBuild] = useState('S928BXXU3AXK4');
  const [fwOneUI, setFwOneUI] = useState('One UI 6.1.1');
  const [fwAndroid, setFwAndroid] = useState('Android 14');
  const [fwPatch, setFwPatch] = useState('2024-yil noyabr');

  const showFeedback = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  // Handle Add One UI
  const handleAddOneUI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVersion.trim() || !newHeadline.trim()) return;

    const newObj: OneUIVersionData = {
      id: `oneui-${newVersion.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      version: newVersion.trim(),
      androidBase: newAndroidBase.trim(),
      releaseDate: newReleaseDate.trim(),
      headline: newHeadline.trim(),
      newFeatures: newFeatures.split('\n').map(s => s.trim()).filter(Boolean),
      uiChanges: newUIChanges.split('\n').map(s => s.trim()).filter(Boolean),
      supportedDevicesSummary: newDevices.trim() || 'So‘nggi flagman va o‘rta toifadagi Galaxy modellar',
      detailedChangelog: newHeadline.trim(),
      status: 'released',
    };

    addOneUIVersion(newObj);
    showFeedback(`Yangi "${newVersion}" versiyasi muvaffaqiyatli katalogga qo‘shildi!`);
    setNewVersion('');
    setNewHeadline('');
    setNewFeatures('');
    setNewUIChanges('');
    setNewDevices('');
  };

  // Handle Add Phone
  const handleAddPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneName.trim()) return;

    const codes = modelCodes.split(',').map(c => c.trim()).filter(Boolean);
    const newPhone: SamsungPhone = {
      id: phoneName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: phoneName.trim(),
      series: phoneSeries,
      modelCodes: codes.length > 0 ? codes : ['SM-XXXX'],
      factoryAndroid: factoryAndroid.trim(),
      factoryOneUI: factoryOneUI.trim(),
      latestAndroid: latestAndroid.trim(),
      latestOneUI: latestOneUI.trim(),
      supportedOneUIVersions: [factoryOneUI, latestOneUI],
      chipset: chipset.trim() || 'Samsung Exynos / Snapdragon',
      releaseDate: '2025',
      releaseDateFormatted: releaseDateFormatted.trim(),
      securityPatchStatus: 'Muntazam oylik yangilanishlar jadvalida',
      supportStatus: 'active',
      description: description.trim() || `${phoneName} modeli rasmiy dasturiy ta’minot bilan.`,
      historyTimeline: [
        {
          androidVersion: factoryAndroid,
          oneUIVersion: factoryOneUI,
          releaseDate: releaseDateFormatted,
          isInitial: true,
          notes: 'Zavoddan chiqarilgan dasturiy ta’minot.'
        },
        {
          androidVersion: latestAndroid,
          oneUIVersion: latestOneUI,
          releaseDate: 'So‘nggi rasmiy',
          isFinal: true,
          notes: 'Maksimal qabul qilingan rasmiy reliz.'
        }
      ]
    };

    addPhone(newPhone);
    showFeedback(`"${phoneName}" modeli katalogga qo‘shildi!`);
    setPhoneName('');
    setModelCodes('');
    setChipset('');
    setDescription('');
  };

  // Handle Add Firmware
  const handleAddFirmware = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fwModel.trim() || !fwBuild.trim()) return;

    const newFw: FirmwareItem = {
      id: `fw-${Date.now()}`,
      model: fwModel.trim(),
      modelCode: fwCode.trim(),
      csc: fwCsc.trim().toUpperCase(),
      country: fwCountry.trim(),
      region: 'Rasmiy Mintaqa',
      androidVersion: fwAndroid.trim(),
      oneUIVersion: fwOneUI.trim(),
      buildNumber: fwBuild.trim(),
      securityPatch: fwPatch.trim(),
      releaseDate: 'Hozirgi sana',
      fileSize: '4.1 GB'
    };

    addFirmware(newFw);
    showFeedback(`Firmware (${fwBuild}) bazaga qo‘shildi!`);
    setFwBuild('');
  };

  return (
    <div className="space-y-8 pb-16 text-left max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>MA’MURIYAT (ADMIN PANEL)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Ma’lumotlarni Boshqarish Tizimi
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1">
            Yangi One UI versiyalari chiqqanda, yangi telefon modellari yoki rasmiy firmware buildlarini 
            shu yerdan to‘g‘ridan-to‘g‘ri portalga qo‘shishingiz mumkin.
          </p>
        </div>

        <button
          onClick={() => {
            if (confirm('Barcha ma’lumotlarni dastlabki rasmiy holatiga qaytarmoqchimisiz?')) {
              resetToDefaults();
              showFeedback('Barcha ma’lumotlar dastlabki holatga qaytarildi.');
            }
          }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Baza Reset</span>
        </button>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Tab Selector */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
        <button
          onClick={() => setActiveTab('oneui')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'oneui'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Yangi One UI Versiyasi Qo‘shish ({oneUIVersions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('phone')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'phone'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Yangi Telefon Qo‘shish ({phones.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('firmware')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'firmware'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Firmware Build Qo‘shish ({firmwares.length})</span>
        </button>
      </div>

      {/* TAB 1: ADD ONE UI VERSION */}
      {activeTab === 'oneui' && (
        <form onSubmit={handleAddOneUI} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Yangi One UI Versiyasi Ma’lumotlarini Kiritish
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Masalan, Samsung rasman e’lon qilgan yangi One UI 8.5, One UI 9 yoki patch versiyasi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Versiya Nomi</label>
              <input
                type="text"
                required
                value={newVersion}
                onChange={(e) => setNewVersion(e.target.value)}
                placeholder="masalan, One UI 9.0"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Android Bazasi</label>
              <input
                type="text"
                required
                value={newAndroidBase}
                onChange={(e) => setNewAndroidBase(e.target.value)}
                placeholder="masalan, Android 16"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Chiqarilish Vaqti</label>
              <input
                type="text"
                required
                value={newReleaseDate}
                onChange={(e) => setNewReleaseDate(e.target.value)}
                placeholder="masalan, 2026-yil kuz"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Asosiy Qisqacha Sarlavha</label>
            <input
              type="text"
              required
              value={newHeadline}
              onChange={(e) => setNewHeadline(e.target.value)}
              placeholder="masalan, Kengaytirilgan Galaxy AI va yangi animatsiya dvigateli"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Yangi Funksiyalar (har bir satrda bittadan)</label>
              <textarea
                rows={3}
                value={newFeatures}
                onChange={(e) => setNewFeatures(e.target.value)}
                placeholder="Yangi AI imkoniyatlari&#10;Yaxshilangan energiya tejamkorlik"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Interfeys O‘zgarishlari (har bir satrda bittadan)</label>
              <textarea
                rows={3}
                value={newUIChanges}
                onChange={(e) => setNewUIChanges(e.target.value)}
                placeholder="Yangi vidjetlar dizayni&#10;Silliq 120Hz surilishlar"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Qo‘llab-quvvatlanuvchi Modellar Xulosasi</label>
            <input
              type="text"
              value={newDevices}
              onChange={(e) => setNewDevices(e.target.value)}
              placeholder="masalan, Galaxy S26, S25, Z Fold 7 seriyalari"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>One UI Versiyasini Katalogga Saqlash</span>
          </button>
        </form>
      )}

      {/* TAB 2: ADD PHONE */}
      {activeTab === 'phone' && (
        <form onSubmit={handleAddPhone} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Yangi Samsung Telefon Modelini Ro‘yxatga Olish
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Yangi chiqqan yoki katalogda yetishmayotgan Galaxy modelini qo‘shing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Telefon Nomi</label>
              <input
                type="text"
                required
                value={phoneName}
                onChange={(e) => setPhoneName(e.target.value)}
                placeholder="masalan, Galaxy A56 5G"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Seriya</label>
              <select
                value={phoneSeries}
                onChange={(e) => setPhoneSeries(e.target.value as PhoneSeries)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:border-blue-600"
              >
                <option value="Galaxy S">Galaxy S</option>
                <option value="Galaxy A">Galaxy A</option>
                <option value="Galaxy M">Galaxy M</option>
                <option value="Galaxy Note">Galaxy Note</option>
                <option value="Galaxy Z">Galaxy Z</option>
                <option value="Galaxy F">Galaxy F</option>
                <option value="Galaxy J">Galaxy J</option>
                <option value="Galaxy XCover">Galaxy XCover</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Model Kodlari (vergul bilan)</label>
              <input
                type="text"
                value={modelCodes}
                onChange={(e) => setModelCodes(e.target.value)}
                placeholder="SM-A566B, SM-A566E"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Zavod One UI</label>
              <input
                type="text"
                value={factoryOneUI}
                onChange={(e) => setFactoryOneUI(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Zavod Android</label>
              <input
                type="text"
                value={factoryAndroid}
                onChange={(e) => setFactoryAndroid(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">So‘nggi One UI</label>
              <input
                type="text"
                value={latestOneUI}
                onChange={(e) => setLatestOneUI(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">So‘nggi Android</label>
              <input
                type="text"
                value={latestAndroid}
                onChange={(e) => setLatestAndroid(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Chipset (Protsessor)</label>
              <input
                type="text"
                value={chipset}
                onChange={(e) => setChipset(e.target.value)}
                placeholder="Exynos 1580"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Chiqarilgan Sana</label>
              <input
                type="text"
                value={releaseDateFormatted}
                onChange={(e) => setReleaseDateFormatted(e.target.value)}
                placeholder="2025-yil mart"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Telefon Modelini Saqlash</span>
          </button>
        </form>
      )}

      {/* TAB 3: ADD FIRMWARE */}
      {activeTab === 'firmware' && (
        <form onSubmit={handleAddFirmware} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Rasmiy Firmware Build Kiritish
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Rasmiy CSC, Build raqami va xavfsizlik patchi ma’lumotlari.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Model Nomi</label>
              <input
                type="text"
                required
                value={fwModel}
                onChange={(e) => setFwModel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Model Kodi</label>
              <input
                type="text"
                required
                value={fwCode}
                onChange={(e) => setFwCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">CSC (3 ta harf)</label>
              <input
                type="text"
                required
                value={fwCsc}
                onChange={(e) => setFwCsc(e.target.value.toUpperCase())}
                placeholder="CAC"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-mono font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Mamlakat</label>
              <input
                type="text"
                required
                value={fwCountry}
                onChange={(e) => setFwCountry(e.target.value)}
                placeholder="O‘zbekiston"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Build Raqami</label>
              <input
                type="text"
                required
                value={fwBuild}
                onChange={(e) => setFwBuild(e.target.value)}
                placeholder="A505FDDU9CVD1"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">One UI Versiyasi</label>
              <input
                type="text"
                value={fwOneUI}
                onChange={(e) => setFwOneUI(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Security Patch</label>
              <input
                type="text"
                value={fwPatch}
                onChange={(e) => setFwPatch(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Firmware Buildni Saqlash</span>
          </button>
        </form>
      )}

    </div>
  );
};
