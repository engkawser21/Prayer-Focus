/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Flame, 
  Clock, 
  ShieldAlert, 
  Quote 
} from 'lucide-react';
import { PrayerSchedule, PrayerLog, UserPreferences } from '../types';
import { translations, getPrayerName } from '../data/translations';

interface DashboardTabProps {
  schedules: PrayerSchedule[];
  logs: PrayerLog[];
  streak: number;
  onManualTriggerLock: (schedName: string, durationMin: number) => void;
  nextSchedule: PrayerSchedule | null;
  timeToNextStr: string;
  preferences: UserPreferences;
}

export default function DashboardTab({
  schedules,
  logs,
  streak,
  onManualTriggerLock,
  nextSchedule,
  timeToNextStr,
  preferences
}: DashboardTabProps) {
  const lang = preferences.language;
  const dict = translations[lang];
  
  // Calculate today's logs completion metrics
  const todayStr = new Date().toISOString().split('T')[0];
  const todayLogs = logs.filter(log => log.date === todayStr);
  const completedToday = todayLogs.filter(log => log.status === 'completed').length;
  const enabledCount = schedules.filter(s => s.enabled).length;

  const completionRatePercent = enabledCount > 0 
    ? Math.round((completedToday / enabledCount) * 100) 
    : 0;

  // Curated rapid quotes for the home block
  const fastQuotes = lang === 'bn' ? [
    { text: "সালাতে প্রশান্তি খুঁজুন। পুরো পৃথিবী অপেক্ষা করতে পারে, কিন্তু আপনার প্রতিপালক অপেক্ষা করছেন না।", source: "ইসলামিক প্রজ্ঞা" },
    { text: "নামাযে বিলম্ব করবেন না। আপনি যখন নামাযে দাঁড়ান, আপনি তখন পরম পরাক্রমশালী মহারাজের দরজায় করাঘাত করছেন।", source: "ইবনুল কাইয়্যিম" }
  ] : [
    { text: "Take rest in Salah. The world can wait, your Lord is waiting.", source: "Islamic Wisdom" },
    { text: "Do not delay prayer. When you stand to pray, you are knocking on the door of the Almighty King.", source: "Ibn al-Qayyim" }
  ];
  const homeQuote = fastQuotes[new Date().getMinutes() % fastQuotes.length];

  return (
    <div className="space-y-6">
      
      {/* Top Welcome / Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Banner with Greeting */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#122E22] to-[#0A1713] text-emerald-100 rounded-3xl p-6 md:p-8 border border-emerald-900/60 relative overflow-hidden flex flex-col justify-between min-h-[180px]">
          <div className="absolute top-0 right-0 p-8 text-6xl opacity-10 font-bold mix-blend-overlay">
            🕌
          </div>

          <div className="space-y-2">
            <span className="bg-[#1C3E30] text-[#D4AF37] font-semibold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-mono">
              {dict.currentFocusStatus}
            </span>
            <h1 className="font-display font-black text-2xl md:text-3xl tracking-tight text-white">
              {dict.assalamuAlaikum}
            </h1>
            <p className="text-sm text-zinc-300 max-w-md font-sans">
              {dict.greetingDesc}
            </p>
          </div>

          <p className="text-xs text-zinc-400 max-w-sm italic pt-4 flex gap-2">
            <Quote className="w-4 h-4 shrink-0 text-[#D4AF37]/50" />
            <span>"{homeQuote.text}" — <strong className="text-zinc-300">{homeQuote.source}</strong></span>
          </p>
        </div>

        {/* Streak / Motivation Card */}
        <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">{dict.prayerStreak}</span>
            <span className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
              <Flame className="w-5 h-5 fill-amber-500/35" />
            </span>
          </div>

          <div>
            <div className="font-display font-black text-4xl text-zinc-900 dark:text-white flex items-end gap-1 select-all">
              {streak} <span className="text-xs text-zinc-500 font-sans font-medium mb-1.5">{dict.streakDays}</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
              {streak > 0 
                ? dict.streakMotivationActive 
                : dict.streakMotivationEmpty}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-emerald-950/45 text-center">
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">🔥 {dict.streakFooter}</span>
          </div>
        </div>

      </div>

      {/* Main Core Visual Block: Next Prayer Clock & Direct Lock Activation Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Next Prayer Clock Widget */}
        <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display font-extrabold text-sm text-zinc-800 dark:text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#D4AF37]" /> {dict.upcomingSalahHeader}
            </h3>
            {nextSchedule ? (
              <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                {dict.scheduledToday}
              </span>
            ) : (
              <span className="text-[10px] bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                {dict.quietMode}
              </span>
            )}
          </div>

          {nextSchedule ? (
            <div className="py-2 text-center flex flex-col items-center">
              <span className="text-4xl">🕌</span>
              <h4 className="font-display font-black text-2xl text-zinc-800 dark:text-white mt-2 select-all">
                {getPrayerName(nextSchedule.name, lang)}
              </h4>
              <p className="text-xs text-zinc-500 font-sans font-medium mt-1">
                {dict.timeWindow}: {nextSchedule.startTime} — {nextSchedule.endTime}
              </p>

              {/* Dynamic timer count strip */}
              <div className="mt-4 text-2xl font-mono font-bold tracking-tight text-[#D4AF37] bg-zinc-50 dark:bg-[#13211B] border border-zinc-100 dark:border-emerald-900/30 px-6 py-2.5 rounded-2xl">
                ⏳ {timeToNextStr}
              </div>

              <p className="text-[10px] text-zinc-400 mt-2.5 max-w-[280px]">
                {dict.lockWarningText}
              </p>
            </div>
          ) : (
            <div className="py-8 text-center text-zinc-500 dark:text-zinc-400 space-y-2">
              <span className="text-4xl text-zinc-400 block pb-2">⏰</span>
              <strong className="text-sm block">{dict.noSchedulesConfigured}</strong>
              <p className="text-xs max-w-xs mx-auto">
                {dict.noSchedulesDesc}
              </p>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-emerald-950/45 text-center">
            <span className="text-[10px] text-zinc-400">{dict.lockFooterText}</span>
          </div>
        </div>

        {/* Demo Live Blocker widget */}
        <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-display font-extrabold text-[#D4AF37] text-sm uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {dict.liveBlockerHeader}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {dict.liveBlockerDesc}
            </p>
          </div>

          <div className="py-4 bg-zinc-50 dark:bg-[#111B17] border border-zinc-100 dark:border-emerald-950/50 p-4 rounded-2xl my-4">
            <h4 className="text-xs font-bold text-zinc-800 dark:text-white mb-2">{dict.testOverlaySection}</h4>
            
            <div className="grid grid-cols-2 gap-2">
              <button 
                id="test-lock-dhuhr"
                onClick={() => onManualTriggerLock('Dhuhr', 5)}
                className="p-3 bg-white dark:bg-[#15231E] border border-zinc-200 dark:border-emerald-900/40 rounded-xl hover:border-emerald-500 transition-all text-left flex flex-col justify-between"
              >
                <span className="text-[10px] text-[#D4AF37] font-bold">TEST OVERLAY</span>
                <span className="text-xs font-bold text-zinc-800 dark:text-white mt-1">{getPrayerName('Dhuhr', lang)}</span>
              </button>

              <button 
                id="test-lock-tahajjud"
                onClick={() => onManualTriggerLock('Tahajjud', 10)}
                className="p-3 bg-white dark:bg-[#15231E] border border-zinc-200 dark:border-emerald-900/40 rounded-xl hover:border-emerald-500 transition-all text-left flex flex-col justify-between"
              >
                <span className="text-[10px] text-[#D4AF37] font-bold">TEST OVERLAY</span>
                <span className="text-xs font-bold text-zinc-800 dark:text-white mt-1">{getPrayerName('Tahajjud', lang)}</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-100 dark:border-emerald-950/45 text-center">
            <span className="text-[10px] text-zinc-400 italic">🔒 {dict.testOverlaySubtext}</span>
          </div>
        </div>

      </div>

      {/* Progress & Stat strip */}
      <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">{dict.attendanceMetricsHeader}</h4>
          <h3 className="font-display font-black text-xl text-zinc-900 dark:text-white">
            {dict.todayCompletionGoal}
          </h3>
          <p className="text-xs text-zinc-500">
            {completedToday} of {enabledCount} {dict.loggedRatioLabel}.
          </p>
        </div>

        <div className="w-full sm:w-64 space-y-2">
          <div className="flex justify-between items-center text-xs text-zinc-600 dark:text-zinc-300 font-bold">
            <span>{dict.progressDone}</span>
            <span>{completionRatePercent}%</span>
          </div>

          <div className="h-3 bg-zinc-100 dark:bg-emerald-950/40 rounded-full overflow-hidden border border-zinc-200/40 dark:border-emerald-900/20">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all duration-800"
              style={{ width: `${completionRatePercent}%` }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
