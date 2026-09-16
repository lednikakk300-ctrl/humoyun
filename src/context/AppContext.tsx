import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  SamsungPhone, 
  OneUIVersionData, 
  AndroidVersionData, 
  FirmwareItem, 
  NavTab,
  CompatibilityCheckResult
} from '../types';
import { 
  INITIAL_PHONES, 
  INITIAL_ONE_UI_VERSIONS, 
  INITIAL_ANDROID_VERSIONS, 
  INITIAL_FIRMWARE_DATABASE 
} from '../data/initialData';

interface AppContextType {
  phones: SamsungPhone[];
  oneUIVersions: OneUIVersionData[];
  androidVersions: AndroidVersionData[];
  firmwares: FirmwareItem[];
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedPhoneId: string | null;
  setSelectedPhoneId: (id: string | null) => void;
  selectedOneUIId: string | null;
  setSelectedOneUIId: (id: string | null) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  
  // Navigation
  navigateTo: (tab: NavTab, phoneId?: string, oneUIId?: string) => void;
  
  // Verifier
  checkCompatibility: (phoneId: string, currentVersion: string, targetVersion: string) => CompatibilityCheckResult;
  checkAvailableUpdate: (phoneId: string, currentVersion: string) => { hasUpdate: boolean; latestVersion: string; message: string; build?: string };
  
  // Admin Operations
  addPhone: (phone: SamsungPhone) => void;
  updatePhone: (phone: SamsungPhone) => void;
  deletePhone: (id: string) => void;
  
  addOneUIVersion: (version: OneUIVersionData) => void;
  updateOneUIVersion: (version: OneUIVersionData) => void;
  deleteOneUIVersion: (id: string) => void;
  
  addFirmware: (firmware: FirmwareItem) => void;
  updateFirmware: (firmware: FirmwareItem) => void;
  deleteFirmware: (id: string) => void;
  
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  PHONES: 'samsung_oneui_phones_v1',
  ONE_UI: 'samsung_oneui_versions_v1',
  FIRMWARE: 'samsung_oneui_firmware_v1',
  THEME: 'samsung_oneui_theme_mode',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME);
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Data states with persistence
  const [phones, setPhones] = useState<SamsungPhone[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PHONES);
      return saved ? JSON.parse(saved) : INITIAL_PHONES;
    } catch {
      return INITIAL_PHONES;
    }
  });

  const [oneUIVersions, setOneUIVersions] = useState<OneUIVersionData[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ONE_UI);
      return saved ? JSON.parse(saved) : INITIAL_ONE_UI_VERSIONS;
    } catch {
      return INITIAL_ONE_UI_VERSIONS;
    }
  });

  const [firmwares, setFirmwares] = useState<FirmwareItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.FIRMWARE);
      return saved ? JSON.parse(saved) : INITIAL_FIRMWARE_DATABASE;
    } catch {
      return INITIAL_FIRMWARE_DATABASE;
    }
  });

  const androidVersions = INITIAL_ANDROID_VERSIONS;

  // Navigation and Selection
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedPhoneId, setSelectedPhoneId] = useState<string | null>(null);
  const [selectedOneUIId, setSelectedOneUIId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  // Sync theme with HTML class
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, isDarkMode ? 'dark' : 'light');
    } catch (e) {
      console.warn('LocalStorage access issue:', e);
    }
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Persist phones
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.PHONES, JSON.stringify(phones));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [phones]);

  // Persist One UI
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ONE_UI, JSON.stringify(oneUIVersions));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [oneUIVersions]);

  // Persist Firmware
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.FIRMWARE, JSON.stringify(firmwares));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [firmwares]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const navigateTo = (tab: NavTab, phoneId?: string, oneUIId?: string) => {
    setActiveTab(tab);
    if (phoneId !== undefined) {
      setSelectedPhoneId(phoneId);
    }
    if (oneUIId !== undefined) {
      setSelectedOneUIId(oneUIId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compatibility Checker logic
  const checkCompatibility = (
    phoneId: string, 
    currentVersion: string, 
    targetVersion: string
  ): CompatibilityCheckResult => {
    const phone = phones.find(p => p.id === phoneId);
    if (!phone) {
      return {
        status: 'insufficient_data',
        statusText: 'MA’LUMOT YETARLI EMAS',
        modelName: 'Noma’lum model',
        currentOneUI: currentVersion,
        targetOneUI: targetVersion,
        summary: 'Telefon modeli ma’lumotlar bazasidan topilmadi.',
        reasons: ['Iltimos, haqiqiy Samsung telefon modelini tanlang.'],
        recommendation: 'Modelni qayta tanlab tekshiring.'
      };
    }

    // Special exact case handling for Galaxy A50 and general phones
    const isSupported = phone.supportedOneUIVersions.some(
      v => v.toLowerCase().trim() === targetVersion.toLowerCase().trim()
    );

    // Parse target version number e.g. "One UI 8" -> 8, "One UI 3.1" -> 3.1
    const parseVersionNum = (str: string) => {
      const match = str.match(/(\d+(\.\d+)?)/);
      return match ? parseFloat(match[1]) : 0;
    };

    const targetNum = parseVersionNum(targetVersion);
    const maxSupportedNum = parseVersionNum(phone.latestOneUI);
    const currentNum = parseVersionNum(currentVersion);

    if (phone.id === 'galaxy-a50') {
      if (targetNum > 3.1) {
        return {
          status: 'incompatible',
          statusText: 'MOS EMAS',
          modelName: phone.name,
          currentOneUI: currentVersion,
          targetOneUI: targetVersion,
          summary: `Ushbu model uchun rasmiy ${targetVersion} qo‘llab-quvvatlanmaydi.`,
          reasons: [
            `Samsung Galaxy A50 (Exynos 9610) uchun rasmiy qo‘llab-quvvatlash One UI 3.1 (Android 11) da yakunlangan.`,
            `Samsung kompaniyasining 2019 yildagi siyosatiga ko‘ra, Galaxy A50 uchun 2 ta katta Android avlodi (Android 10 va Android 11) berilgan.`,
            `${targetVersion} yangi protsessor arxitekturasi va apparat quvvatini talab qiladi, A50 rasmiy ravishda bu yangilanishni ololmaydi.`,
            `Uchinchi tomon norasmiy (custom ROM) lari telefon barqarorligi va Knox xavfsizligini yo‘qotishi mumkin.`
          ],
          recommendation: `Galaxy A50 uchun eng barqaror va rasmiy yakuniy versiya: One UI 3.1 (Build: A505FDDU9CVD1).`
        };
      }
    }

    if (isSupported) {
      if (targetNum === currentNum) {
        return {
          status: 'compatible',
          statusText: 'MOS (HOZIRGI VERSIYA)',
          modelName: phone.name,
          currentOneUI: currentVersion,
          targetOneUI: targetVersion,
          summary: `${phone.name} ayni vaqtda ${targetVersion} bilan mos keladi va to‘liq qo‘llab-quvvatlanadi.`,
          reasons: [
            `Ushbu versiya ${phone.name} ning rasmiy dasturiy ta’minot ro‘yxatiga kiritilgan.`,
            `Barcha apparat drayverlari va tizim modullari to‘liq barqaror ishlaydi.`
          ],
          recommendation: `Siz allaqachon ushbu mos versiyadan foydalanmoqdasiz.`
        };
      } else if (targetNum > currentNum) {
        return {
          status: 'compatible',
          statusText: 'MOS (YANGILASH MUMKIN)',
          modelName: phone.name,
          currentOneUI: currentVersion,
          targetOneUI: targetVersion,
          summary: `${phone.name} uchun ${targetVersion} rasmiy ravishda mos va o‘rnatish mumkin!`,
          reasons: [
            `${targetVersion} ushbu model uchun Samsung tomonidan rasman chiqarilgan.`,
            `Hozirgi ${currentVersion} versiyangizdan ${targetVersion} ga OTA (Sozlamalar) yoki Smart Switch orqali rasmiy yangilashingiz mumkin.`
          ],
          recommendation: `Telefon sozlamalari > Dasturiy ta’minot yangilanishi bo‘limiga kiring va yangilanishni yuklab oling.`
        };
      } else {
        return {
          status: 'compatible',
          statusText: 'MOS (ESKI RASMIY VERSIYA)',
          modelName: phone.name,
          currentOneUI: currentVersion,
          targetOneUI: targetVersion,
          summary: `${targetVersion} ushbu model uchun o‘tmishda rasmiy chiqarilgan versiya bo‘lgan.`,
          reasons: [
            `Ushbu versiya telefon tarixida mavjud, biroq xavfsizlik nuqtai nazaridan yangiroq rasmiy versiyada qolish tavsiya etiladi.`
          ],
          recommendation: `Xavfsizlik va yangi funksiyalar uchun ${phone.latestOneUI} versiyasida qolishingiz ma’qul.`
        };
      }
    }

    // If target is in the future / planned
    if (targetVersion.includes('One UI 8') || targetVersion.includes('One UI 8.5') || targetVersion.includes('One UI 7')) {
      if (phone.supportStatus === 'active' && maxSupportedNum >= 6.1) {
        return {
          status: 'insufficient_data',
          statusText: 'MA’LUMOT YETARLI EMAS',
          modelName: phone.name,
          currentOneUI: currentVersion,
          targetOneUI: targetVersion,
          summary: `${targetVersion} hozirda ishlab chiqilmoqda yoki rasmiy tarqatish bosqichida.`,
          reasons: [
            `${phone.name} faol qo‘llab-quvvatlanuvchi flagman/zamonaviy model bo‘lsa-da, ${targetVersion} barcha mintaqalarda to‘liq rasmiy chiqarilmagan.`,
            `Samsung rasmiy reliz jadvali va xalqaro tarqatish sanalariga bog‘liq.`
          ],
          recommendation: `Rasmiy yangilanishlar e’lonini kuzatib boring yoki Sozlamalar orqali yangilanish mavjudligini tekshiring.`
        };
      }
    }

    // Otherwise, target is higher than max supported
    if (targetNum > maxSupportedNum || !isSupported) {
      return {
        status: 'incompatible',
        statusText: 'MOS EMAS',
        modelName: phone.name,
        currentOneUI: currentVersion,
        targetOneUI: targetVersion,
        summary: `Ushbu model uchun rasmiy ${targetVersion} qo‘llab-quvvatlanmaydi.`,
        reasons: [
          `${phone.name} uchun Samsung tomonidan tasdiqlangan eng so‘nggi rasmiy versiya: ${phone.latestOneUI} (${phone.latestAndroid}).`,
          `${targetVersion} ushbu telefon apparat ta’minotining texnik imkoniyatlari va Samsung rasmiy yangilanish siyosati doirasidan tashqarida.`,
          `Ushbu versiyani rasmiy yo‘llar (OTA yoki Smart Switch) orqali yuklab olishning imkoni yo‘q.`
        ],
        recommendation: `${phone.name} uchun maksimal barqaror rasmiy versiya — ${phone.latestOneUI}.`
      };
    }

    return {
      status: 'insufficient_data',
      statusText: 'MA’LUMOT YETARLI EMAS',
      modelName: phone.name,
      currentOneUI: currentVersion,
      targetOneUI: targetVersion,
      summary: `Tanlangan versiyalar bo‘yicha aniq rasmiy ma’lumot yetarli emas.`,
      reasons: ['Ushbu mintaqa yoki model kodi uchun maxsus reliz jadvali aniqlanmoqda.'],
      recommendation: `Model kodi (masalan, SM-...) bo‘yicha aniqlashtiring.`
    };
  };

  // Check available update logic
  const checkAvailableUpdate = (phoneId: string, currentVersion: string) => {
    const phone = phones.find(p => p.id === phoneId);
    if (!phone) {
      return {
        hasUpdate: false,
        latestVersion: '',
        message: 'Model tanlanmagan.'
      };
    }

    const parseVersionNum = (str: string) => {
      const match = str.match(/(\d+(\.\d+)?)/);
      return match ? parseFloat(match[1]) : 0;
    };

    const currentNum = parseVersionNum(currentVersion);
    const latestNum = parseVersionNum(phone.latestOneUI);

    if (currentNum < latestNum) {
      const fw = firmwares.find(f => f.model.toLowerCase().includes(phone.name.replace('Samsung ', '').toLowerCase()) || f.modelCode === phone.modelCodes[0]);
      return {
        hasUpdate: true,
        latestVersion: phone.latestOneUI,
        build: fw?.buildNumber || 'Rasmiy so‘nggi build',
        message: `Yangilanish mavjud! Sizning hozirgi versiyangiz: ${currentVersion}. ${phone.name} uchun mavjud eng so‘nggi rasmiy versiya: ${phone.latestOneUI} (${phone.latestAndroid}).`
      };
    } else {
      return {
        hasUpdate: false,
        latestVersion: phone.latestOneUI,
        message: `Ushbu model uchun yangi rasmiy yangilanish topilmadi. Siz ${phone.name} uchun chiqarilgan eng so‘nggi rasmiy versiyadasiz (${phone.latestOneUI}).`
      };
    }
  };

  // Admin CRUD
  const addPhone = (phone: SamsungPhone) => {
    setPhones(prev => [phone, ...prev]);
  };

  const updatePhone = (phone: SamsungPhone) => {
    setPhones(prev => prev.map(p => p.id === phone.id ? phone : p));
  };

  const deletePhone = (id: string) => {
    setPhones(prev => prev.filter(p => p.id !== id));
  };

  const addOneUIVersion = (version: OneUIVersionData) => {
    setOneUIVersions(prev => [version, ...prev]);
  };

  const updateOneUIVersion = (version: OneUIVersionData) => {
    setOneUIVersions(prev => prev.map(v => v.id === version.id ? version : v));
  };

  const deleteOneUIVersion = (id: string) => {
    setOneUIVersions(prev => prev.filter(v => v.id !== id));
  };

  const addFirmware = (firmware: FirmwareItem) => {
    setFirmwares(prev => [firmware, ...prev]);
  };

  const updateFirmware = (firmware: FirmwareItem) => {
    setFirmwares(prev => prev.map(f => f.id === firmware.id ? firmware : f));
  };

  const deleteFirmware = (id: string) => {
    setFirmwares(prev => prev.filter(f => f.id !== id));
  };

  const resetToDefaults = () => {
    setPhones(INITIAL_PHONES);
    setOneUIVersions(INITIAL_ONE_UI_VERSIONS);
    setFirmwares(INITIAL_FIRMWARE_DATABASE);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.PHONES);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.ONE_UI);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.FIRMWARE);
    } catch (e) {
      console.warn('Error clearing localStorage:', e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        phones,
        oneUIVersions,
        androidVersions,
        firmwares,
        activeTab,
        setActiveTab,
        selectedPhoneId,
        setSelectedPhoneId,
        selectedOneUIId,
        setSelectedOneUIId,
        isDarkMode,
        toggleDarkMode,
        searchQuery,
        setSearchQuery,
        isSearchModalOpen,
        setIsSearchModalOpen,
        navigateTo,
        checkCompatibility,
        checkAvailableUpdate,
        addPhone,
        updatePhone,
        deletePhone,
        addOneUIVersion,
        updateOneUIVersion,
        deleteOneUIVersion,
        addFirmware,
        updateFirmware,
        deleteFirmware,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
