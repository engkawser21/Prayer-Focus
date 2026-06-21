/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Flame, 
  ShieldAlert, 
  VolumeX,
} from 'lucide-react';

import { PrayerSchedule, PrayerLog, UserPreferences, CityPreset } from './types';
import DashboardTab from './components/DashboardTab';
import SchedulesTab from './components/SchedulesTab';
import StatsTab from './components/StatsTab';
import SettingsTab from './components/SettingsTab';
import DistractionSimulator from './components/DistractionSimulator';
import ActivePrayerOverlay from './components/ActivePrayerOverlay';
import { translations, getPrayerName } from './data/translations';

// Pre-seeded initial prayer schedules matching the product prompt
const DEFAULT_SCHEDULES: PrayerSchedule[] = [
  {
    id: 'fajr-default',
    name: 'Fajr',
    startTime: '05:00',
    endTime: '05:20',
    enabled: true,
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    isCustom: false
  },
  {
    id: 'dhuhr-default',
    name: 'Dhuhr',
    startTime: '13:25',
    endTime: '13:40',
    enabled: true,
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    isCustom: false
  },
  {
    id: 'asr-default',
    name: 'Asr',
    startTime: '16:45',
    endTime: '17:00',
    enabled: true,
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    isCustom: false
  },
  {
    id: 'maghrib-default',
    name: 'Maghrib',
    startTime: '18:35',
    endTime: '18:50',
    enabled: true,
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    isCustom: false
  },
  {
    id: 'isha-default',
    name: 'Isha',
    startTime: '20:15',
    endTime: '20:35',
    enabled: true,
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    isCustom: false
  }
];

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'dark',
  language: 'en',
  translation: 'en',
  allowedEmergencyTools: ['flashlight', 'emergencyCall', 'alarmDismiss', 'camera'],
  strictBlockerEnabled: true,
  preventCasualBypass: true
};

export default function App() {
  const [schedules, setSchedules] = useState<PrayerSchedule[]>([]);
  const [logs, setLogs] = useState<PrayerLog[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'schedules' | 'simulator' | 'stats' | 'settings'>('dashboard');
  
  // Onboarding Wizard triggers (Starts at 1 - Choose Your Language)
  const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [userName, setUserName] = useState<string>('');
  
  // Active Overlay control States
  const [activeLockMode, setActiveLockMode] = useState<{
    name: string;
    endTime: string;
    id: string;
    isSimulated: boolean;
  } | null>(null);

  // Completion Form modal state
  const [showCompletionForm, setShowCompletionForm] = useState<{
    prayerName: string;
    prayerId: string;
  } | null>(null);

  // Real-time calculation helpers
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');
  const [nextSchedule, setNextSchedule] = useState<PrayerSchedule | null>(null);
  const [timeToNextStr, setTimeToNextStr] = useState<string>('');

  // Localized dictionary handler
  const lang = preferences.language;
  const dict = translations[lang];

  // Loaded state tracking
  useEffect(() => {
    // Schedules
    const savedSchedules = localStorage.getItem('prayer_focus_schedules');
    if (savedSchedules) {
      setSchedules(JSON.parse(savedSchedules));
    } else {
      setSchedules(DEFAULT_SCHEDULES);
      localStorage.setItem('prayer_focus_schedules', JSON.stringify(DEFAULT_SCHEDULES));
    }

    // Logs
    const savedLogs = localStorage.getItem('prayer_focus_logs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    } else {
      // Pre-seed some mock historical logs to showcase statistics beautifully immediately on first load
      const todayStr = new Date().toISOString().split('T')[0];
      const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const seededLogs: PrayerLog[] = [
        { id: '1', date: yesterdayStr, prayerId: 'fajr-default', prayerName: 'Fajr', status: 'completed', timestamp: Date.now() - 95000000 },
        { id: '2', date: yesterdayStr, prayerId: 'dhuhr-default', prayerName: 'Dhuhr', status: 'completed', timestamp: Date.now() - 75000000 },
        { id: '3', date: yesterdayStr, prayerId: 'maghrib-default', prayerName: 'Maghrib', status: 'later', timestamp: Date.now() - 55000000 },
        { id: '4', date: todayStr, prayerId: 'fajr-default', prayerName: 'Fajr', status: 'completed', timestamp: Date.now() - 15000000 },
      ];
      setLogs(seededLogs);
      localStorage.setItem('prayer_focus_logs', JSON.stringify(seededLogs));
    }

    // Preferences: Default language logic
    // When the app is installed: If the device language is Bangla → Default to Bangla. Otherwise → Default to English.
    const savedPrefs = localStorage.getItem('prayer_focus_preferences');
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs));
    } else {
      const browserLang = navigator.language || '';
      const isBnDevice = browserLang.toLowerCase().includes('bn');
      const initialPrefs: UserPreferences = {
        ...DEFAULT_PREFERENCES,
        language: isBnDevice ? 'bn' : 'en',
        translation: isBnDevice ? 'bn' : 'en'
      };
      setPreferences(initialPrefs);
      localStorage.setItem('prayer_focus_preferences', JSON.stringify(initialPrefs));
    }

    // Onboarding checklist
    const hasLaunched = localStorage.getItem('prayer_focus_launched');
    if (hasLaunched) {
      setIsOnboarding(false);
    }
  }, []);

  // Sync to database local
  const saveSchedulesToStorage = (updated: PrayerSchedule[]) => {
    setSchedules(updated);
    localStorage.setItem('prayer_focus_schedules', JSON.stringify(updated));
  };

  const saveLogsToStorage = (updated: PrayerLog[]) => {
    setLogs(updated);
    localStorage.setItem('prayer_focus_logs', JSON.stringify(updated));
  };

  const handleUpdatePreferences = (updated: Partial<UserPreferences>) => {
    const next = { ...preferences, ...updated };
    setPreferences(next);
    localStorage.setItem('prayer_focus_preferences', JSON.stringify(next));
  };

  // Clock monitors active lock triggers & dynamic countdown details
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const currentH = now.getHours();
      const currentM = now.getMinutes();
      const currentS = now.getSeconds();
      const currentDay = now.getDay();

      const checkTimeStr = `${String(currentH).padStart(2, '0')}:${String(currentM).padStart(2, '0')}`;
      setCurrentTimeStr(`${checkTimeStr}:${String(currentS).padStart(2, '0')}`);

      // 1. Accessibility Block monitoring: Check for automatic active schedule matching the clock
      if (preferences.strictBlockerEnabled && !activeLockMode) {
        const foundActive = schedules.find(s => {
          if (!s.enabled || !s.activeDays.includes(currentDay)) return false;
          
          // Verify time boundary
          const [startH, startM] = s.startTime.split(':').map(Number);
          const [endH, endM] = s.endTime.split(':').map(Number);
          
          const startSum = startH * 60 + startM;
          const endSum = endH * 60 + endM;
          const currentSum = currentH * 60 + currentM;
          
          return currentSum >= startSum && currentSum < endSum;
        });

        if (foundActive) {
          // Automatic system trigger!
          setActiveLockMode({
            name: foundActive.name,
            endTime: foundActive.endTime,
            id: foundActive.id,
            isSimulated: false
          });
        }
      }

      // 2. Calculate next prayer and precise countdown
      let minDiff = Infinity;
      let targetSched: PrayerSchedule | null = null;
      let isTomorrow = false;

      schedules.forEach(s => {
        if (!s.enabled) return;
        const [sh, sm] = s.startTime.split(':').map(Number);
        const schedSum = sh * 60 + sm;
        const currentSum = currentH * 60 + currentM;

        let diff = schedSum - currentSum;
        if (diff < 0) {
          diff += 1440; // wrap around day (tomorrow)
        }

        if (diff < minDiff) {
          minDiff = diff;
          targetSched = s;
          isTomorrow = schedSum <= currentSum;
        }
      });

      setNextSchedule(targetSched);

      if (targetSched) {
        const [th, tm] = (targetSched as PrayerSchedule).startTime.split(':').map(Number);
        const targetDateTime = new Date();
        targetDateTime.setHours(th, tm, 0, 0);
        if (isTomorrow) {
          targetDateTime.setDate(targetDateTime.getDate() + 1);
        }

        const secsToGo = Math.max(0, Math.floor((targetDateTime.getTime() - now.getTime()) / 1000));
        const hours = Math.floor(secsToGo / 3600);
        const mins = Math.floor((secsToGo % 3600) / 60);
        const secs = secsToGo % 60;

        setTimeToNextStr(
          `${hours > 0 ? `${hours}h ` : ''}${mins}m ${secs}s`
        );
      } else {
        setTimeToNextStr('--:--:--');
      }
    };

    tick();
    const inv = setInterval(tick, 1000);
    return () => clearInterval(inv);
  }, [schedules, activeLockMode, preferences]);

  // Handle adding custom items
  const handleAddSchedule = (ns: PrayerSchedule) => {
    saveSchedulesToStorage([...schedules, ns]);
  };

  const handleToggleSchedule = (id: string) => {
    saveSchedulesToStorage(
      schedules.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s)
    );
  };

  const handleDeleteSchedule = (id: string) => {
    saveSchedulesToStorage(schedules.filter(s => s.id !== id));
  };

  const handleUpdateDays = (id: string, days: number[]) => {
    saveSchedulesToStorage(
      schedules.map(s => s.id === id ? { ...s, activeDays: days } : s)
    );
  };

  // Automated city selector
  const handleLoadCityPreset = (preset: CityPreset) => {
    const updated = DEFAULT_SCHEDULES.map(def => {
      const pTime = preset.prayerOffsets[def.name as keyof typeof preset.prayerOffsets];
      if (pTime) {
        const [h, m] = pTime.split(':').map(Number);
        const edH = Math.floor((h * 60 + m + 15) / 60) % 24;
        const edM = (h * 60 + m + 15) % 65;
        return {
          ...def,
          startTime: pTime,
          endTime: `${String(edH).padStart(2, '0')}:${String(edM).padStart(2, '0')}`,
          enabled: true
        };
      }
      return def;
    });
    saveSchedulesToStorage(updated);
  };

  // Log handlers
  const handleDeleteLog = (id: string) => {
    saveLogsToStorage(logs.filter(l => l.id !== id));
  };

  const handleClearAllLogs = () => {
    saveLogsToStorage([]);
  };

  const handleUpdateLogStatus = (id: string, status: 'completed' | 'later' | 'missed') => {
    saveLogsToStorage(
      logs.map(l => l.id === id ? { ...l, status } : l)
    );
  };

  // Calculation of streak
  const calculateStreak = () => {
    if (logs.length === 0) return 0;
    const dates = Array.from(new Set(logs.map(l => l.date))).sort().reverse();
    if (dates.length === 0) return 0;

    let streakCount = 0;
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (dates[0] !== todayStr && dates[0] !== yesterdayStr) {
      return 0;
    }

    let checkDate = new Date(dates[0]);
    for (let i = 0; i < dates.length; i++) {
      const currentLogDate = dates[i];
      const checkDateStr = checkDate.toISOString().split('T')[0];

      if (currentLogDate === checkDateStr) {
        streakCount++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streakCount;
  };

  const activeStreak = calculateStreak();

  // Triggering simulated locks
  const handleManualTriggerLock = (schedName: string, durationMin: number) => {
    const now = new Date();
    const endDateTime = new Date(now.getTime() + durationMin * 60000);
    const endH = endDateTime.getHours();
    const endM = endDateTime.getMinutes();
    const endTimeStr = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;

    setActiveLockMode({
      name: schedName,
      endTime: endTimeStr,
      id: `sim-${Date.now()}`,
      isSimulated: true
    });
  };

  // Close Prayer Complete Feedback choices
  const handlePrayerCompleteChoice = (status: 'completed' | 'later' | 'missed') => {
    if (activeLockMode) {
      setShowCompletionForm({
        prayerName: activeLockMode.name,
        prayerId: activeLockMode.id
      });
      setActiveLockMode(null);
    }
  };

  // Save the logged status
  const handleRecordCompletion = (status: 'completed' | 'later' | 'missed') => {
    if (showCompletionForm) {
      const newLog: PrayerLog = {
        id: `log-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        prayerId: showCompletionForm.prayerId,
        prayerName: showCompletionForm.prayerName,
        status,
        timestamp: Date.now()
      };
      saveLogsToStorage([...logs, newLog]);
      setShowCompletionForm(null);
    }
  };

  // Settings Backups simulations
  const handleSimulateBackup = () => {
    const payload = JSON.stringify({ schedules, logs, preferences }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(payload);
    
    const link = document.createElement('a');
    link.href = dataUri;
    link.download = `prayer-focus-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(lang === 'bn' 
      ? '📥 এক্সপোর্ট সফল! আপনার সেটিংস এবং লগ ডেটা JSON ফাইলে সেভ করা হয়েছে।' 
      : '📥 Export Successful! Simulated a secure client-side database backup file.'
    );
  };

  const handleSimulateRestore = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const prevDays = Array.from({ length: 6 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (i + 1));
      return d.toISOString().split('T')[0];
    });

    const mockLogs: PrayerLog[] = [
      { id: 'm1', date: prevDays[4], prayerId: 'fajr-default', prayerName: 'Fajr', status: 'completed', timestamp: Date.now() },
      { id: 'm2', date: prevDays[4], prayerId: 'dhuhr-default', prayerName: 'Dhuhr', status: 'completed', timestamp: Date.now() },
      { id: 'm3', date: prevDays[4], prayerId: 'maghrib-default', prayerName: 'Maghrib', status: 'missed', timestamp: Date.now() },
      { id: 'm4', date: prevDays[3], prayerId: 'fajr-default', prayerName: 'Fajr', status: 'completed', timestamp: Date.now() },
      { id: 'm5', date: prevDays[3], prayerId: 'dhuhr-default', prayerName: 'Dhuhr', status: 'later', timestamp: Date.now() },
      { id: 'm6', date: prevDays[2], prayerId: 'maghrib-default', prayerName: 'Maghrib', status: 'completed', timestamp: Date.now() },
      { id: 'm7', date: prevDays[1], prayerId: 'isha-default', prayerName: 'Isha', status: 'completed', timestamp: Date.now() },
      { id: 'm8', date: todayStr, prayerId: 'fajr-default', prayerName: 'Fajr', status: 'completed', timestamp: Date.now() },
    ];

    saveLogsToStorage(mockLogs);
    alert(lang === 'bn' 
      ? '📤 ডেমো ডেটা সফলভাবে রিস্টোর হয়েছে! সুদৃশ্য গ্রাফ প্রদর্শনের জন্য আগের ইতিহাস যুক্ত করা হয়েছে।' 
      : '📤 Restore Successful! Instantly populated dummy history trends to enrich dashboard analytics.'
    );
  };

  const handleResetSettings = () => {
    setSchedules(DEFAULT_SCHEDULES);
    setLogs([]);
    setPreferences(DEFAULT_PREFERENCES);
    localStorage.removeItem('prayer_focus_schedules');
    localStorage.removeItem('prayer_focus_logs');
    localStorage.removeItem('prayer_focus_preferences');
    localStorage.removeItem('prayer_focus_launched');
    setIsOnboarding(true);
    setOnboardingStep(1);
    
    alert(lang === 'bn' 
      ? '🚨 সমস্ত লোকাল মেমোরি খালি করা হয়েছে! অ্যাপের সকল সেটিংস ফ্যাক্টরি Standards মোডে ফিরিয়ে নেওয়া হয়েছে।' 
      : '🚨 Local Storage wiped! Reverted configuration variables to factory standards.'
    );
  };

  const completeOnboarding = () => {
    setIsOnboarding(false);
    localStorage.setItem('prayer_focus_launched', 'true');
  };

  const selectOnboardingLanguage = (selected: 'en' | 'bn') => {
    handleUpdatePreferences({
      language: selected,
      translation: selected
    });
    // Set a matching default nickname based on language choice if username is blank
    if (!userName.trim()) {
      setUserName(selected === 'bn' ? 'শ্রদ্ধাশীল মুমিন' : 'Faithful Believer');
    }
    setOnboardingStep(2); // Progress to nickname welcome step
  };

  return (
    <div className={`min-h-screen text-slate-800 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200 ${
      preferences.theme === 'dark' ? 'dark bg-[#060B08]' : 'bg-[#FAFCFB]'
    }`}>
      
      {/* 1. Immersive Fullscreen Active lock mode overlay */}
      <AnimatePresence>
        {activeLockMode && (
          <ActivePrayerOverlay 
            activeSchedule={{
              ...activeLockMode,
              name: activeLockMode.name,
              startTime: '',
              endTime: activeLockMode.endTime,
              enabled: true,
              activeDays: [],
              isCustom: false
            }}
            onCompleted={handlePrayerCompleteChoice}
            allowedTools={preferences.allowedEmergencyTools}
            preferences={preferences}
          />
        )}
      </AnimatePresence>

      {/* 2. Onboarding Setup Wizard Dialog */}
      <AnimatePresence>
        {isOnboarding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#060E0A]/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-[#0B1511] border border-zinc-150 dark:border-emerald-950 max-w-lg w-full rounded-[32px] overflow-hidden p-8 shadow-2xl relative">
              
              {/* Language Selection Screen - First Launch as requested */}
              {onboardingStep === 1 && (
                <div id="onboarding-step-language" className="space-y-6 text-center py-4">
                  <div className="text-center mb-6">
                    <span className="text-5xl block animate-pulse">🕌</span>
                    <h2 className="font-display font-black text-2xl text-zinc-900 dark:text-white mt-4">
                      Choose Your Language
                    </h2>
                    <p className="text-emerald-700 dark:text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest mt-1">
                      আপনার পছন্দের ভাষা নির্বাচন করুন
                    </p>
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm mx-auto">
                    Choose a native localized UI translation to start your self-commitment Salah focus workspace immediately.
                  </p>

                  <div className="flex flex-col gap-3 max-w-xs mx-auto pt-2">
                    <button 
                      id="onboarding-lang-bn"
                      onClick={() => selectOnboardingLanguage('bn')}
                      className="w-full py-4 bg-emerald-700 hover:bg-emerald-600 font-bold text-white rounded-2xl flex items-center justify-center gap-3 shadow-md hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer"
                    >
                      <span className="text-2xl leading-none">🇧🇩</span>
                      <span className="text-sm font-semibold tracking-wide">বাংলা (Bangla)</span>
                    </button>

                    <button 
                      id="onboarding-lang-en"
                      onClick={() => selectOnboardingLanguage('en')}
                      className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-[#D4AF37] border border-[#D4AF37]/20 font-bold rounded-2xl flex items-center justify-center gap-3 shadow-md hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer"
                    >
                      <span className="text-2xl leading-none">🇬🇧</span>
                      <span className="text-sm font-semibold tracking-wide">English</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Welcome Information & Nickname (fully localized) */}
              {onboardingStep === 2 && (
                <div id="onboarding-step-1" className="space-y-4">
                  <div className="text-center mb-4">
                    <span className="text-4xl">🤲</span>
                    <h2 className="font-display font-black text-xl text-zinc-900 dark:text-white mt-2">{dict.welcomeTitle}</h2>
                    <p className="text-[#D4AF37] font-mono text-[10px] font-bold uppercase tracking-widest mt-0.5">{dict.tagline}</p>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed text-center">
                    {dict.setupExplainText}
                  </p>
                  
                  <div className="p-4 bg-emerald-50 dark:bg-[#12241D] rounded-2xl border border-emerald-100 dark:border-emerald-900/60">
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                      {dict.setupExplainCard}
                    </p>
                  </div>

                  <div className="pt-2 text-left">
                    <label htmlFor="user-name-input" className="text-xs font-bold text-zinc-600 dark:text-zinc-300 block mb-1">
                      {dict.setupNameLabel}
                    </label>
                    <input 
                      id="user-name-input"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder={dict.setupNamePlaceholder}
                      className="w-full bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-emerald-900 p-2.5 rounded-xl text-xs focus:outline-none text-zinc-800 dark:text-white"
                    />
                  </div>

                  <div className="flex gap-2 pt-3">
                    <button 
                      id="onboarding-back-to-lang"
                      onClick={() => setOnboardingStep(1)}
                      className="w-1/3 py-2.5 bg-zinc-50 dark:bg-zinc-900/40 text-zinc-500 text-xs font-bold rounded-xl border border-zinc-200 dark:border-zinc-850"
                    >
                      {dict.backBtn}
                    </button>
                    <button 
                      id="onboarding-next-1"
                      onClick={() => setOnboardingStep(3)}
                      className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-xs rounded-xl shadow-md transition-colors"
                    >
                      {dict.proceedBtn}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Permissions Explanation Screen */}
              {onboardingStep === 3 && (
                <div id="onboarding-step-2" className="space-y-4">
                  <div className="text-center mb-2">
                    <h3 className="font-display font-black text-lg text-zinc-850 dark:text-white">{dict.permissionsTitle}</h3>
                    <p className="text-xs text-zinc-400 mt-1">{dict.permissionsSubtitle}</p>
                  </div>

                  <div className="space-y-2.5 text-left">
                    
                    <div className="p-3 bg-zinc-50 dark:bg-[#14231E] rounded-xl border border-zinc-200/50 dark:border-emerald-900/30 flex items-start gap-3">
                      <span className="p-2 bg-emerald-100 text-emerald-700 rounded-lg text-xs leading-none shrink-0">🧠</span>
                      <div>
                        <h4 className="text-xs font-bold font-display text-zinc-900 dark:text-white">{dict.permAccessTitle}</h4>
                        <p className="text-[10px] text-zinc-500 mt-0.5 leading-snug">{dict.permAccessDesc}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-zinc-50 dark:bg-[#14231E] rounded-xl border border-zinc-200/50 dark:border-emerald-900/30 flex items-start gap-3">
                      <span className="p-2 bg-emerald-100 text-emerald-700 rounded-lg text-xs leading-none shrink-0">🔔</span>
                      <div>
                        <h4 className="text-xs font-bold font-display text-zinc-900 dark:text-white">{dict.permAlarmTitle}</h4>
                        <p className="text-[10px] text-zinc-500 mt-0.5 leading-snug">{dict.permAlarmDesc}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-zinc-50 dark:bg-[#14231E] rounded-xl border border-zinc-200/50 dark:border-emerald-900/30 flex items-start gap-3">
                      <span className="p-2 bg-emerald-100 text-emerald-700 rounded-lg text-xs leading-none shrink-0">⚡</span>
                      <div>
                        <h4 className="text-xs font-bold font-display text-zinc-900 dark:text-white">{dict.permBatteryTitle}</h4>
                        <p className="text-[10px] text-zinc-500 mt-0.5 leading-snug">{dict.permBatteryDesc}</p>
                      </div>
                    </div>

                  </div>

                  <div className="flex gap-2 pt-2">
                    <button 
                      id="onboarding-back-1"
                      onClick={() => setOnboardingStep(2)}
                      className="w-1/3 py-2.5 text-zinc-500 hover:text-zinc-700 text-xs font-semibold"
                    >
                      {dict.backBtn}
                    </button>
                    <button 
                      id="onboarding-next-2"
                      onClick={() => setOnboardingStep(4)}
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-xs rounded-xl"
                    >
                      {dict.grantAllBtn}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Initial recommended schedule commitments */}
              {onboardingStep === 4 && (
                <div id="onboarding-step-3" className="space-y-4">
                  <h3 className="font-display font-bold text-base text-zinc-850 dark:text-white">{dict.initialCommitTitle}</h3>
                  <p className="text-xs text-zinc-500 leading-normal text-center">
                    {dict.initialCommitSubtitle}
                  </p>

                  <div className="bg-[#12241D] border border-emerald-900/60 p-4 rounded-2xl text-xs space-y-2 select-text">
                    <div className="flex justify-between font-mono text-emerald-300">
                      <span>🌅 {dict.prayerFajr}:</span> <span>05:00 — 05:20 AM</span>
                    </div>
                    <div className="flex justify-between font-mono text-emerald-300">
                      <span>☀️ {dict.prayerDhuhr}:</span> <span>01:25 — 01:40 PM</span>
                    </div>
                    <div className="flex justify-between font-mono text-emerald-300">
                      <span>🌤️ {dict.prayerAsr}:</span> <span>04:45 — 05:00 PM</span>
                    </div>
                    <div className="flex justify-between font-mono text-emerald-300">
                      <span>🌆 {dict.prayerMaghrib}:</span> <span>06:35 — 06:50 PM</span>
                    </div>
                    <div className="flex justify-between font-mono text-emerald-300">
                      <span>🌌 {dict.prayerIsha}:</span> <span>08:15 — 08:35 PM</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-4">
                    <button 
                      id="onboarding-finalize-preset"
                      onClick={() => {
                        setSchedules(DEFAULT_SCHEDULES);
                        completeOnboarding();
                      }}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-xs rounded-xl shadow"
                    >
                      {dict.useRecommendedBtn}
                    </button>

                    <button 
                      id="onboarding-finalize-empty"
                      onClick={() => {
                        setSchedules([]);
                        completeOnboarding();
                      }}
                      className="w-full py-2.5 bg-transparent border border-zinc-200 dark:border-emerald-950 font-medium text-zinc-600 dark:text-zinc-400 text-xs rounded-xl hover:bg-zinc-100/10"
                    >
                      {dict.preferCustomBtn}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Global Completion Feedback Overlay */}
      <AnimatePresence>
        {showCompletionForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 font-sans select-none"
          >
            <div className="bg-white dark:bg-[#0B1511] border border-zinc-150 dark:border-emerald-900 max-w-sm w-full rounded-2xl p-6 text-center shadow-xl space-y-4">
              <span className="text-5xl block">🤲</span>
              <h3 className="font-display font-black text-lg text-zinc-900 dark:text-white">
                {dict.completionFormTitle}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {dict.completionFormDesc} (<strong>{getPrayerName(showCompletionForm.prayerName, lang)}</strong>)
              </p>

              <div className="flex flex-col gap-2 pt-2">
                
                <button 
                  id="record-completed"
                  onClick={() => handleRecordCompletion('completed')}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {dict.optionYes}
                </button>

                <button 
                  id="record-later"
                  onClick={() => handleRecordCompletion('later')}
                  className="w-full py-2.5 bg-amber-500/10 hover:bg-amber-500/25 border border-amber-900/30 text-[#D4AF37] font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  {dict.optionLater}
                </button>

                <button 
                  id="record-missed"
                  onClick={() => handleRecordCompletion('missed')}
                  className="w-full py-2.5 bg-red-500/15 hover:bg-red-500/25 border border-red-900/30 text-red-500 font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  {dict.optionMissed}
                </button>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Navigation & Body Header Container */}
      <header className="border-b border-zinc-100 dark:border-emerald-950/45 shrink-0 bg-white dark:bg-[#080F0C] sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo brand */}
          <div className="flex items-center gap-2">
            <span className="text-2xl leading-none">🕌</span>
            <div className="text-left">
              <h1 className="font-display font-black text-md text-zinc-900 dark:text-white leading-none">
                {dict.appName}
              </h1>
              <p className="text-[10px] text-[#D4AF37] tracking-widest font-mono uppercase mt-1 leading-none">
                {dict.focusTagline}
              </p>
            </div>
          </div>

          {/* Navigation Tab Elements */}
          <nav className="flex items-center gap-1.5 bg-zinc-50 dark:bg-black/40 border border-zinc-200/50 dark:border-emerald-950/60 p-1 rounded-2xl overflow-x-auto max-w-full">
            <button 
              id="tab-btn-dashboard"
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all shrink-0 ${
                activeTab === 'dashboard' 
                  ? 'bg-emerald-600 dark:bg-emerald-950/45 text-white dark:text-emerald-300 border border-emerald-500/10' 
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-white'
              }`}
            >
              {dict.tabOverview}
            </button>

            <button 
              id="tab-btn-schedules"
              onClick={() => setActiveTab('schedules')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all shrink-0 ${
                activeTab === 'schedules' 
                  ? 'bg-emerald-600 dark:bg-emerald-950/45 text-white dark:text-emerald-300 border border-emerald-500/10' 
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-white'
              }`}
            >
              {dict.tabSchedules}
            </button>

            <button 
              id="tab-btn-simulator"
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all shrink-0 ${
                activeTab === 'simulator' 
                  ? 'bg-emerald-600 dark:bg-emerald-950/45 text-white dark:text-emerald-300 border border-emerald-500/10' 
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-white'
              }`}
            >
              {dict.tabAccessibility}
            </button>

            <button 
              id="tab-btn-stats"
              onClick={() => setActiveTab('stats')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all shrink-0 ${
                activeTab === 'stats' 
                  ? 'bg-emerald-600 dark:bg-emerald-950/45 text-white dark:text-emerald-300 border border-emerald-500/10' 
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-white'
              }`}
            >
              {dict.tabAnalytics}
            </button>

            <button 
              id="tab-btn-settings"
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all shrink-0 ${
                activeTab === 'settings' 
                  ? 'bg-emerald-600 dark:bg-emerald-950/45 text-white dark:text-emerald-300 border border-emerald-500/10' 
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-white'
              }`}
            >
              {dict.tabSettings}
            </button>
          </nav>

        </div>
      </header>

      {/* Main Container Layout Body */}
      <main id="main-content-layout" className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        {activeTab === 'dashboard' && (
          <DashboardTab 
            schedules={schedules}
            logs={logs}
            streak={activeStreak}
            onManualTriggerLock={handleManualTriggerLock}
            nextSchedule={nextSchedule}
            timeToNextStr={timeToNextStr}
            preferences={preferences}
          />
        )}

        {activeTab === 'schedules' && (
          <SchedulesTab 
            schedules={schedules}
            onAddSchedule={handleAddSchedule}
            onToggleSchedule={handleToggleSchedule}
            onDeleteSchedule={handleDeleteSchedule}
            onUpdateDays={handleUpdateDays}
            onLoadCityPreset={handleLoadCityPreset}
            preferences={preferences}
          />
        )}

        {activeTab === 'simulator' && (
          <DistractionSimulator 
            activeSchedule={activeLockMode ? { id: activeLockMode.id, name: activeLockMode.name, startTime: '', endTime: activeLockMode.endTime, enabled: true, activeDays: [], isCustom: false } : schedules.find(s => {
              const currentDay = new Date().getDay();
              const [sh, sm] = s.startTime.split(':').map(Number);
              const [eh, em] = s.endTime.split(':').map(Number);
              const nowSum = new Date().getHours() * 60 + new Date().getMinutes();
              return s.enabled && s.activeDays.includes(currentDay) && nowSum >= (sh * 60 + sm) && nowSum < (eh * 60 + em);
            }) || null}
            onTriggerSimulatedLock={() => handleManualTriggerLock('Simulated Feed Block', 5)}
            preferences={preferences}
          />
        )}

        {activeTab === 'stats' && (
          <StatsTab 
            logs={logs}
            onDeleteLog={handleDeleteLog}
            onClearAllLogs={handleClearAllLogs}
            onUpdateLogStatus={handleUpdateLogStatus}
            streak={activeStreak}
            preferences={preferences}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsTab 
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
            onResetAllSettings={handleResetSettings}
            onSimulateBackup={handleSimulateBackup}
            onSimulateRestore={handleSimulateRestore}
          />
        )}
      </main>

      {/* Footer copyright */}
      <footer className="border-t border-zinc-100 dark:border-emerald-950/45 py-6 shrink-0 bg-white dark:bg-[#070F0C] text-center text-xs text-zinc-400 select-none">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>{dict.copyrightText}</p>
          <div className="flex gap-4 font-mono text-[10px]">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">● {dict.offlineSecureBadge}</span>
            <span>{dict.systemVersionBadge}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
