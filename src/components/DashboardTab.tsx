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

  // Curated quotes for the home block
  const fastQuotes = lang === 'bn' ? [
    { text: "সালাতে প্রশান্তি খুঁজুন। পুরো পৃথিবী অপেক্ষা করতে পারে, কিন্তু আপনার প্রতিপালক অপেক্ষা করছেন না।", source: "সালাতের গুরুত্ব" },
    { text: "নামাযে বিলম্ব করবেন না। আপনি যখন নামাযে দাঁড়ান, আপনি তখন পরম পরাক্রমশালী মহারাজের দরজায় করাঘাত করছেন।", source: "ইবনুল কাইয়্যিম" }
  ] : [
    { text: "Take rest in Salah. The world can wait, your Lord is waiting.", source: "Salah Guidance" },
    { text: "Do not delay prayer. When you stand to pray, you are knocking on the door of the Almighty King.", source: "Ibn al-Qayyim" }
  ];
  const homeQuote = fastQuotes[new Date().getMinutes() % fastQuotes.length];

  return (
    <div className="space-y-6 flex flex-col font-sans">
      
      {/* Top Welcome / Hero Grid (Adapts from 1-column mobile to multi-column desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Banner with Greeting (Spans 2 columns on desktop) */}
        <div className="md:col-span-2 bg-gradient-to-br from-[#122E22] to-[#0A1713] text-emerald-100 rounded-3xl p-6 border border-emerald-900/60 relative overflow-hidden flex flex-col justify-between min-h-[160px] shadow-sm">
          <div className="absolute top-0 right-0 p-8 text-6xl opacity-10 font-bold mix-blend-overlay">
            🕌
          </div>

          <div className="space-y-2">
            <span className="inline-block bg-[#1C3E30] text-[#D4AF37] font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-mono">
              {dict.currentFocusStatus}
            </span>
            <h1 className="font-display font-black text-xl md:text-2xl tracking-tight text-white select-none">
              {dict.assalamuAlaikum}
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 max-w-md leading-relaxed">
              {dict.greetingDesc}
            </p>
          </div>

          <div className="text-xs text-zinc-450 italic pt-4 flex gap-2 border-t border-emerald-950/40 mt-3">
            <Quote className="w-4 h-4 shrink-0 text-[#D4AF37]/40" />
            <span>"{homeQuote.text}" — <strong className="text-zinc-300 font-semibold">{homeQuote.source}</strong></span>
          </div>
        </div>

        {/* Streak / Motivation Card */}
        <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 p-5 rounded-3xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">{dict.prayerStreak}</span>
            <span className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500 shrink-0">
              <Flame className="w-5 h-5 fill-amber-500/35" />
            </span>
          </div>

          <div className="my-3">
            <div className="font-display font-black text-3xl md:text-4xl text-zinc-900 dark:text-white flex items-end gap-1.5 select-all leading-none">
              {streak} <span className="text-xs text-zinc-500 font-sans font-medium mb-1">{dict.streakDays}</span>
            </div>
            <p className="text-xs text-zinc-505 dark:text-zinc-450 mt-1.5 leading-relaxed">
              {streak > 0 
                ? dict.streakMotivationActive 
                : dict.streakMotivationEmpty}
            </p>
          </div>

          <div className="pt-2 border-t border-zinc-100 dark:border-emerald-950/45 text-center">
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">🔥 {dict.streakFooter}</span>
          </div>
        </div>

      </div>

      {/* Main Core Visual Block: Next Prayer Clock & Direct Lock Activation Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Next Prayer Clock Widget */}
        <div id="next-prayer-bento" className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 rounded-3xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-display font-extrabold text-xs text-zinc-800 dark:text-white flex items-center gap-1.5 uppercase tracking-wide">
              <Clock className="w-4 h-4 text-[#D4AF37]" /> {dict.upcomingSalahHeader}
            </h3>
            {nextSchedule ? (
              <span className="text-[9px] bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                {dict.scheduledToday}
              </span>
            ) : (
              <span className="text-[9px] bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                {dict.quietMode}
              </span>
            )}
          </div>

          {nextSchedule ? (
            <div className="py-2.5 text-center flex flex-col items-center">
              <span className="text-3xl">🕌</span>
              <h4 className="font-display font-black text-xl text-zinc-850 dark:text-white mt-1.5 select-all">
                {getPrayerName(nextSchedule.name, lang)} {lang === 'bn' ? 'সালাত' : 'Salah'}
              </h4>
              <p className="text-[11px] text-zinc-500 font-sans font-medium mt-1">
                {dict.timeWindow}: {nextSchedule.startTime} — {nextSchedule.endTime}
              </p>

              {/* Dynamic timer count strip - Highly Visible Countdown */}
              <div className="mt-3.5 text-2xl font-mono font-black tracking-tight text-[#D4AF37] bg-zinc-50 dark:bg-[#13211B] border border-zinc-150/80 dark:border-emerald-900/40 px-5 py-2 rounded-2xl min-w-[180px] text-center select-none animate-pulse">
                ⏳ {timeToNextStr}
              </div>

              <p className="text-[10px] text-zinc-450 mt-3 max-w-[280px] leading-relaxed">
                {dict.lockWarningText}
              </p>
            </div>
          ) : (
            <div className="py-6 text-center text-zinc-500 dark:text-zinc-400 space-y-2">
              <span className="text-3xl text-zinc-455 block pb-1">⏰</span>
              <strong className="text-xs block font-bold">{dict.noSchedulesConfigured}</strong>
              <p className="text-[11px] max-w-xs mx-auto text-zinc-400">
                {dict.noSchedulesDesc}
              </p>
            </div>
          )}

          <div className="mt-3 pt-2.5 border-t border-zinc-100 dark:border-emerald-950/45 text-center">
            <span className="text-[10px] text-zinc-400 leading-normal">{dict.lockFooterText}</span>
          </div>
        </div>

        {/* Live Blocker widget */}
        <div id="test-overlay-bento" className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 rounded-3xl p-5 shadow-sm flex flex-col justify-between">
          <div className="space-y-1.5">
            <h3 className="font-display font-extrabold text-[#D4AF37] text-xs uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400 font-bold" />
              {dict.liveBlockerHeader}
            </h3>
            <p className="text-[11px] text-zinc-650 dark:text-zinc-400 leading-relaxed">
              {dict.liveBlockerDesc}
            </p>
          </div>

          <div className="py-3.5 bg-zinc-50 dark:bg-[#111B17] border border-zinc-150/40 dark:border-emerald-950/50 p-3.5 rounded-2xl my-3">
            <h4 className="text-[11px] font-bold text-zinc-800 dark:text-white mb-2 uppercase tracking-wider">{dict.testOverlaySection}</h4>
            
            <div className="grid grid-cols-2 gap-2">
              <button 
                id="test-lock-dhuhr"
                onClick={() => onManualTriggerLock('Dhuhr', 1)}
                className="p-3 bg-white dark:bg-[#15231E] border border-zinc-200 dark:border-[#204033] rounded-xl hover:border-emerald-500 transition-all text-left flex flex-col justify-between min-h-[58px] cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <span className="text-[9px] text-[#D4AF37] font-extrabold pb-0.5">LAUNCH PRESET</span>
                <span className="text-xs font-extrabold text-zinc-850 dark:text-white mt-1 leading-none">{getPrayerName('Dhuhr', lang)}</span>
              </button>

              <button 
                id="test-lock-tahajjud"
                onClick={() => onManualTriggerLock('Tahajjud', 2)}
                className="p-3 bg-white dark:bg-[#15231E] border border-zinc-200 dark:border-[#204033] rounded-xl hover:border-emerald-500 transition-all text-left flex flex-col justify-between min-h-[58px] cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <span className="text-[9px] text-[#D4AF37] font-extrabold pb-0.5">LAUNCH PRESET</span>
                <span className="text-xs font-extrabold text-zinc-850 dark:text-white mt-1 leading-none">{getPrayerName('Tahajjud', lang)}</span>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-100 dark:border-emerald-950/45 text-center">
            <span className="text-[10px] text-zinc-400">🔒 {dict.testOverlaySubtext}</span>
          </div>
        </div>

      </div>

      {/* Progress & Stat strip */}
      <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 p-5 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 text-left">
        <div className="space-y-1 w-full sm:w-auto">
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37]">{dict.attendanceMetricsHeader}</h4>
          <h3 className="font-display font-black text-md md:text-lg text-zinc-900 dark:text-white leading-none">
            {dict.todayCompletionGoal}
          </h3>
          <p className="text-[11px] text-zinc-500 mt-1">
            {completedToday} of {enabledCount} {dict.loggedRatioLabel}.
          </p>
        </div>

        <div className="w-full sm:w-64 space-y-2 shrink-0">
          <div className="flex justify-between items-center text-xs text-zinc-600 dark:text-zinc-300 font-bold">
            <span>{dict.progressDone}</span>
            <span className="font-mono">{completionRatePercent}%</span>
          </div>

          <div className="h-3 bg-zinc-100 dark:bg-emerald-950/30 rounded-full overflow-hidden border border-zinc-200/10 dark:border-emerald-900/10">
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
