import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { GalaxyA50Section } from './components/GalaxyA50Section';
import { PhoneCatalog } from './components/PhoneCatalog';
import { OneUICatalog } from './components/OneUICatalog';
import { AndroidVersionsSection } from './components/AndroidVersionsSection';
import { CompatibilityChecker } from './components/CompatibilityChecker';
import { FirmwareSection } from './components/FirmwareSection';
import { InstallationGuide } from './components/InstallationGuide';
import { AdminPanel } from './components/AdminPanel';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Smartphone, Layers, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, navigateTo } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex-1">
      {activeTab === 'home' && <HomeHero />}
      {activeTab === 'a50' && <GalaxyA50Section />}
      {activeTab === 'phones' && <PhoneCatalog />}
      {activeTab === 'oneui' && <OneUICatalog />}
      {activeTab === 'android' && <AndroidVersionsSection />}
      {activeTab === 'checker' && <CompatibilityChecker />}
      {activeTab === 'firmware' && <FirmwareSection />}
      {activeTab === 'install' && <InstallationGuide />}
      {activeTab === 'admin' && <AdminPanel />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
        
        {/* Navigation Bar */}
        <Navbar />

        {/* Dynamic Page Views */}
        <MainContent />

        {/* Global Search Overlay Modal (Ctrl+K / Search icon) */}
        <GlobalSearchModal />

        {/* Modern Samsung-style Footer */}
        <footer 
          id="app-footer"
          className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 py-10 text-xs text-slate-500 dark:text-slate-400"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
                  S
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    Samsung One UI Center
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Samsung smartfonlari uchun dasturiy ta’minot va One UI ma’lumotlar bazasi
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-medium">
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-blue-600">
                  Yuqoriga qaytish
                </button>
                <span>•</span>
                <span>Faqat rasmiy texnik ma’lumotlar</span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Testlarsiz 100% amaliy portal
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
              <p>© {new Date().getFullYear()} Samsung One UI Center. Mustaqil axborot va tahlil platformasi.</p>
              <p>Samsung va One UI savdo belgilari Samsung Electronics Co., Ltd. ga tegishlidir.</p>
            </div>
          </div>
        </footer>

      </div>
    </AppProvider>
  );
}
