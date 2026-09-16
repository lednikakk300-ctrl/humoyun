import React from 'react';
import { 
  BookOpen, 
  Settings, 
  Smartphone, 
  Monitor, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Info, 
  Download, 
  Cpu, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export const InstallationGuide: React.FC = () => {
  return (
    <div className="space-y-10 pb-16 text-left max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          One UI va Rasmiy Dasturiy Ta’minotni O‘rnatish Qo‘llanmasi
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1 leading-relaxed">
          Samsung smartfonlarida dasturiy ta’minotni yangilashning faqat rasmiy, xavfsiz va 
          ishlab chiqaruvchi tomonidan tasdiqlangan usullari bo‘yicha bosqichma-bosqich ko‘rsatmalar.
        </p>
      </div>

      {/* CRITICAL TECHNICAL NOTICE: Truth & Safety Notice */}
      <section 
        id="technical-safety-notice"
        className="p-6 sm:p-7 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-800 space-y-3"
      >
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-2xl bg-amber-600 text-white shrink-0 shadow-xs">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-1.5 text-left">
            <h3 className="text-base sm:text-lg font-black text-amber-950 dark:text-amber-200">
              Texnik va Huquqiy Ochiqlik (Muhim Eslatma):
            </h3>
            <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
              Oddiy veb-brauzer orqali ishlaydigan veb-saytlar telefon apparatining xavfsiz tizim qismini 
              (<em>system partition</em>) o‘zgartira olmaydi. Bizning portal foydalanuvchini aldamaydi:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
              <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-semibold bg-white/60 dark:bg-black/30 p-2 rounded-xl">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>Soxta "Installing..." animatsiyasi yo‘q</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-semibold bg-white/60 dark:bg-black/30 p-2 rounded-xl">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>"One UI o‘rnatildi" yolg‘oni yo‘q</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-semibold bg-white/60 dark:bg-black/30 p-2 rounded-xl">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>Mos bo‘lmagan faylni o‘rnatish xavfi yo‘q</span>
              </div>
            </div>
            <p className="text-xs text-amber-800 dark:text-amber-400 pt-1">
              Quyida Samsung kompaniyasi taqdim etgan ikkita rasmiy usul batafsil yoritilgan.
            </p>
          </div>
        </div>
      </section>

      {/* METHOD 1: OFFICIAL OTA UPDATE (SETTINGS) */}
      <section 
        id="method-ota"
        className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6"
      >
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
          <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              1-Usul: Eng Oson va Xavfsiz
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              To‘g‘ridan-to‘g‘ri Telefon Sozlamalari (OTA) Orqali Yangilash
            </h2>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300">
          Ushbu usulda telefoningiz Wi-Fi orqali Samsung rasmiy serverlariga ulanadi va 
          fayllar avtomatik yuklab olinib tekshiriladi.
        </p>

        {/* Steps Flowchart */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 text-left space-y-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              1
            </div>
            <div className="font-bold text-sm text-slate-900 dark:text-white">
              Settings (Sozlamalar)
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Telefon bosh menyusidan asosiy Sozlamalar ilovasiga kiring.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 text-left space-y-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              2
            </div>
            <div className="font-bold text-sm text-slate-900 dark:text-white">
              Software update (Dasturiy ta’minot yangilanishi)
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pastga tushib, "Software update" (Dasturiy ta’minot yangilanishi) bo‘limini tanlang.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 text-left space-y-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              3
            </div>
            <div className="font-bold text-sm text-slate-900 dark:text-white">
              Download and install (Yuklab olish va o‘rnatish)
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              "Download and install" tugmasini bosing. Agar yangilanish bo‘lsa, u yuklanadi va telefon qayta yuklanadi.
            </p>
          </div>

        </div>

        {/* Preparation checklist */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Yangilashdan oldin majburiy tavsiyalar:
          </div>
          <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Telefon zaryadi kamida 50% dan yuqori bo‘lishi yoki quvvatlagichga ulangan bo‘lishi shart.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Barqaror Wi-Fi tarmog‘iga ulaning (yirik OS yangilanishlari 2 GB dan 5 GB gacha hajmga ega bo‘ladi).</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Telefonda kamida 6-10 GB bo‘sh xotira maydoni bo‘lishi tavsiya etiladi.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* METHOD 2: SAMSUNG SMART SWITCH (PC / MAC) */}
      <section 
        id="method-smartswitch"
        className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6"
      >
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
          <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <Monitor className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              2-Usul: Kompyuter Orqali Rasmiy Yangilash
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Samsung Smart Switch (Windows va Mac)
            </h2>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Agar telefoningizda Wi-Fi sekin bo‘lsa yoki havo orqali yangilanish kechikayotgan bo‘lsa, 
          Samsungning rasmiy <strong>Samsung Smart Switch</strong> kompyuter dasturidan foydalanishingiz mumkin.
        </p>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-mono text-xs flex items-center justify-center">1</span>
              <span>Smart Switch dasturini kompyuterga yuklab oling</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pl-7">
              Samsung rasmiy saytidan (samsung.com/smartswitch) dasturni o‘rnating.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-mono text-xs flex items-center justify-center">2</span>
              <span>Telefonni original USB kabel bilan kompyuterga ulang</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pl-7">
              Telefon ekranida "Ulanishga ruxsat berish" so‘rovi chiqsa, "Ruxsat berish" tugmasini bosing.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-mono text-xs flex items-center justify-center">3</span>
              <span>Dasturda "Yangilash" (Update) tugmasini bosing</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pl-7">
              Smart Switch qurilmangiz modelini avtomatik aniqlaydi. Agar yangi dastur bo‘lsa, ekranda katta ko‘k "Update" tugmasi chiqadi.
            </p>
          </div>
        </div>

      </section>

      {/* FAQ on Unofficial ROMs */}
      <section className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-slate-500" />
          <span>Nega eski modellarga (masalan Galaxy A50 ga) One UI 6 yoki One UI 8 o‘rnatib bo‘lmaydi?</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Samsung har bir model uchun protsessor drayverlari (Board Support Package), kamera sensorlari va Knox xavfsizlik chipi bilan integratsiyalashgan dastur tuzadi. 
          Galaxy A50 apparat ta’minoti Android 11 (One UI 3.1) gacha moslangan. Internetda tarqalgan norasmiy (custom port) dasturlar ko‘pincha barmoq izi skaneri, kamera stabilizatsiyasi va bank ilovalarini (Payme, Click, Samsung Wallet) ishdan chiqarishi va Knox flagini (0x1) qaytarib bo‘lmas darajada buzishi mumkin.
        </p>
      </section>

    </div>
  );
};
