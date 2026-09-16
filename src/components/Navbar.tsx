import React, { useState } from 'react';
import { 
  Smartphone, 
  Layers, 
  CheckCircle2, 
  Download, 
  BookOpen, 
  ShieldCheck, 
  Moon, 
  Sun, 
  Search, 
  Menu, 
  X, 
  Star,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavTab } from '../types';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    navigateTo, 
    isDarkMode, 
    toggleDarkMode, 
    setIsSearchModalOpen 
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Bosh sahifa', icon: <Layers className="w-4 h-4" /> },
    { id: 'phones', label: 'Telefonlar', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'a50', label: 'Galaxy A50', icon: <Star className="w-4 h-4 text-amber-500 fill-amber-500" />, badge: 'Maxsus' },
    { id: 'oneui', label: 'One UI', icon: <Layers className="w-4 h-4" /> },
    { id: 'android', label: 'Android', icon: <Cpu className="w-4 h-4" /> },
    { id: 'checker', label: 'Moslik', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'firmware', label: 'Firmware', icon: <Download className="w-4 h-4" /> },
    { id: 'install', label: 'O‘rnatish', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'admin', label: 'Admin', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: NavTab) => {
    navigateTo(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            id="brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-extrabold text-lg tracking-tighter">UI</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white">
                  Samsung <span className="text-blue-600 dark:text-blue-400">One UI</span>
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  Center
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5 tracking-wide">
                Rasmiy Dasturiy Ta’minot Portali
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Global Search Button */}
            <button
              id="header-search-trigger"
              onClick={() => setIsSearchModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-800/70 text-xs sm:text-sm font-medium transition-all"
              title="Qidirish (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">Qidirish...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-slate-200 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Toggle */}
            <button
              id="theme-toggle-button"
              onClick={toggleDarkMode}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Rang rejimini almashtirish"
              title={isDarkMode ? 'Yorug‘ rejimga o‘tish' : 'Qorong‘i rejimga o‘tish'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Menyuni ochish"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-nav-panel"
          className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg px-4 pt-3 pb-5 space-y-1.5"
        >
          <div className="grid grid-cols-2 gap-1.5 pb-3">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-700 dark:text-slate-200 bg-slate-100/70 dark:bg-slate-800/70'
                  }`}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] ml-auto px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Samsung One UI Center v2.5</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Rasmiy Baza Faol
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
