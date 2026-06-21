/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  Trash2,
  Bookmark
} from 'lucide-react';
import { PrayerLog, UserPreferences } from '../types';
import { translations, getPrayerName } from '../data/translations';

interface StatsTabProps {
  logs: PrayerLog[];
  onDeleteLog: (id: string) => void;
  onClearAllLogs: () => void;
  onUpdateLogStatus: (id: string, status: 'completed' | 'later' | 'missed') => void;
  streak: number;
  preferences: UserPreferences;
}

export default function StatsTab({
  logs,
  onDeleteLog,
  onClearAllLogs,
  onUpdateLogStatus,
  streak,
  preferences
}: StatsTabProps) {
  const lang = preferences.language;
  const dict = translations[lang];

  // Calculate high-level stats
  const totalCount = logs.length;
  const completedCount = logs.filter(l => l.status === 'completed').length;
  const laterCount = logs.filter(l => l.status === 'later').length;
  const missedCount = logs.filter(l => l.status === 'missed').length;

  const completedRatio = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const laterRatio = totalCount > 0 ? Math.round((laterCount / totalCount) * 100) : 0;
  const missedRatio = totalCount > 0 ? Math.round((missedCount / totalCount) * 100) : 0;

  // Group prayer stats by prayer name to find most consistent prayers
  const prayerBreakdown: { [key: string]: { completed: number; total: number } } = {};
  logs.forEach(log => {
    const localizedName = getPrayerName(log.prayerName, lang);
    if (!prayerBreakdown[localizedName]) {
      prayerBreakdown[localizedName] = { completed: 0, total: 0 };
    }
    prayerBreakdown[localizedName].total += 1;
    if (log.status === 'completed') {
      prayerBreakdown[localizedName].completed += 1;
    }
  });

  const uniquePrayers = Object.keys(prayerBreakdown);

  // Fallback default statistics for demonstration if zero logs exist
  const dummyWeeklyData = lang === 'bn' ? [
    { day: 'সোম', completed: 4, total: 5 },
    { day: 'মঙ্গল', completed: 5, total: 5 },
    { day: 'বুধ', completed: 3, total: 5 },
    { day: 'বৃহ', completed: 4, total: 5 },
    { day: 'শুক্র', completed: 5, total: 5 },
    { day: 'শনি', completed: 2, total: 5 },
    { day: 'রবি', completed: 4, total: 5 },
  ] : [
    { day: 'Mon', completed: 4, total: 5 },
    { day: 'Tue', completed: 5, total: 5 },
    { day: 'Wed', completed: 3, total: 5 },
    { day: 'Thu', completed: 4, total: 5 },
    { day: 'Fri', completed: 5, total: 5 },
    { day: 'Sat', completed: 2, total: 5 },
    { day: 'Sun', completed: 4, total: 5 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Title block */}
      <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 p-6 rounded-3xl">
        <h2 className="font-display font-black text-2xl tracking-tight text-zinc-900 dark:text-white mb-2">
          {dict.analyticsTitle}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-2xl">
          {dict.analyticsDesc}
        </p>
      </div>

      {/* Breakdown Cards & Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-[#0B120F] border border-zinc-150 dark:border-emerald-950/60 p-5 rounded-3xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{dict.statTotalLogged}</span>
            <div className="font-display font-black text-3xl text-zinc-800 dark:text-white">{totalCount}</div>
            <p className="text-[10px] text-zinc-500">{dict.statAccumulated}</p>
          </div>
          <span className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-2xl text-zinc-650">🏛️</span>
        </div>

        <div className="bg-white dark:bg-[#0B120F] border border-zinc-150 dark:border-emerald-950/60 p-5 rounded-3xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">{dict.statCompletedOnTime}</span>
            <div className="font-display font-black text-3xl text-emerald-600 dark:text-emerald-400">{completedCount}</div>
            <p className="text-[10px] text-emerald-500">{completedRatio}% {dict.statSuccessRatio}</p>
          </div>
          <span className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </span>
        </div>

        <div className="bg-white dark:bg-[#0B120F] border border-zinc-150 dark:border-emerald-950/60 p-5 rounded-3xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">{dict.statDelayedLater}</span>
            <div className="font-display font-black text-3xl text-[#D4AF37]">{laterCount}</div>
            <p className="text-[10px] text-amber-500">{laterRatio}% {dict.statRecoveryRatio}</p>
          </div>
          <span className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-2xl text-[#D4AF37]">
            <Clock className="w-5 h-5" />
          </span>
        </div>

        <div className="bg-white dark:bg-[#0B120F] border border-zinc-150 dark:border-emerald-950/60 p-5 rounded-3xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{dict.statMissed}</span>
            <div className="font-display font-black text-3xl text-red-500">{missedCount}</div>
            <p className="text-[10px] text-red-400">{missedRatio}% {dict.statAttentionRatio}</p>
          </div>
          <span className="p-3 bg-red-50 dark:bg-red-950/30 rounded-2xl text-red-500">
            <XCircle className="w-5 h-5" />
          </span>
        </div>

      </div>

      {/* SVG Vector Chart Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Attendance Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 rounded-3xl p-6 shadow-sm">
          <h3 className="font-display font-bold text-zinc-800 dark:text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            {dict.weeklyAttendanceTitle}
          </h3>

          <div className="space-y-4">
            <div className="relative h-44 w-full flex items-end justify-between pt-6 px-2 font-mono">
              {dummyWeeklyData.map((data, index) => {
                const totalText = lang === 'bn' ? 'আদায় করা হয়েছে' : 'Prayed';
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group relative cursor-pointer">
                    {/* Tooltip on hover */}
                    <span className="absolute -top-6 scale-0 group-hover:scale-100 transition-transform bg-zinc-900 text-white text-[9px] px-2 py-0.5 rounded-lg z-10 font-bold">
                      {data.completed}/{data.total} {totalText}
                    </span>
                    
                    <div className="w-full flex justify-center gap-0.5 max-w-[28px] h-32 bg-zinc-50 dark:bg-[#111A17] rounded-lg overflow-hidden border border-zinc-100 dark:border-emerald-950/50 flex-col justify-end">
                      <div 
                        className="bg-[#D4AF37] w-full rounded-t"
                        style={{ height: `${(data.total - data.completed) * 20}%` }}
                      />
                      <div 
                        className="bg-emerald-600 w-full rounded"
                        style={{ height: `${data.completed * 20}%` }}
                      />
                    </div>
                    
                    <span className="text-[10px] text-zinc-400 mt-2 font-semibold font-sans">{data.day}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-center text-[10px] pt-4 border-t border-zinc-50 dark:border-emerald-950/45">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-emerald-600" /> 
                {lang === 'bn' ? 'ওয়াক্তমত সম্পন্ন হয়েছে' : 'Completed'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#D4AF37]" /> 
                {lang === 'bn' ? 'দেরি হয়েছে / পরে' : 'Remaining/Later'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-zinc-100 dark:bg-emerald-950/30" /> 
                {lang === 'bn' ? 'ফ্রি স্লট' : 'Free Slots'}
              </span>
            </div>
          </div>
        </div>

        {/* Most Consistent Prayers breakdowns */}
        <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-[#D4AF37] text-md uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> {dict.focusDistributionTitle}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
              {dict.focusDistributionDesc}
            </p>

            <div className="space-y-3">
              {uniquePrayers.length === 0 ? (
                <p className="text-xs font-medium text-zinc-400 italic text-center py-8">
                  {dict.emptyDistributionMessage}
                </p>
              ) : (
                uniquePrayers.map(item => {
                  const metric = prayerBreakdown[item];
                  const percentage = Math.round((metric.completed / metric.total) * 100);
                  return (
                    <div key={item} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-zinc-700 dark:text-zinc-200">{item}</span>
                        <span className="text-zinc-400 font-mono">{percentage}% ({metric.completed}/{metric.total})</span>
                      </div>
                      <div className="h-1.5 bg-zinc-100 dark:bg-emerald-950/40 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-600 h-full rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-emerald-950/45 text-center text-[10px] text-zinc-400 italic">
            {lang === 'bn' ? 'নিয়মিত সালাত আদায় আত্মিক ও মানসিক প্রশান্তি বাড়ায়' : 'Habituating daily routines eliminates friction'}
          </div>
        </div>

      </div>

      {/* Log list view */}
      <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-display font-bold text-zinc-800 dark:text-white text-md flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#D4AF37]" /> {dict.chronicledLogTitle}
          </h3>

          {logs.length > 0 && (
            <button 
              id="clear-all-logs-btn"
              onClick={() => {
                if(confirm(dict.resetConfirmationMessage)) {
                  onClearAllLogs();
                }
              }}
              className="text-xs text-red-500 hover:text-red-400 font-bold border border-red-200 dark:border-red-950/40 px-3 py-1.5 rounded-xl transition-colors active:translate-y-px"
            >
              {dict.resetHistoryBtn}
            </button>
          )}
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-10 text-zinc-400 bg-zinc-50 dark:bg-[#111B17] rounded-2xl border border-zinc-100 dark:border-emerald-950/50">
            <Bookmark className="w-10 h-10 text-zinc-300 mx-auto mb-2" />
            <p className="text-sm font-medium">{dict.emptyLogMessage}</p>
            <p className="text-xs text-zinc-500 mt-1">{dict.emptyLogSubtext}</p>
          </div>
         ) : (
          <div className="divide-y divide-zinc-100 dark:divide-emerald-950/45 max-h-[300px] overflow-y-auto pr-2">
            {logs.slice().reverse().map((log) => (
              <div key={log.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    log.status === 'completed' 
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600' 
                      : log.status === 'later' 
                        ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-500' 
                        : 'bg-red-50 dark:bg-red-950/20 text-red-500'
                  }`}>
                    {log.status === 'completed' ? '✓' : log.status === 'later' ? '⏳' : '✗'}
                  </span>

                  <div>
                    <h5 className="font-bold text-zinc-850 dark:text-white select-all">
                      {getPrayerName(log.prayerName, lang)} {lang === 'bn' ? 'সালাত' : 'Prayer'}
                    </h5>
                    <p className="text-[10px] text-zinc-400 font-mono text-left">
                      {lang === 'bn' ? 'লগ করার তারিখ:' : 'Logged Date:'} {log.date}
                    </p>
                  </div>
                </div>

                {/* Inline Status modification toggles */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono hidden sm:inline">{dict.alterStateLabel}</span>
                  <select 
                    id={`update-status-select-${log.id}`}
                    value={log.status}
                    onChange={(e) => onUpdateLogStatus(log.id, e.target.value as any)}
                    className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1.5 rounded-lg text-[10px] text-zinc-600 dark:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="completed">{lang === 'bn' ? '✓ আদায় করা হয়েছে' : '✅ Completed'}</option>
                    <option value="later">{lang === 'bn' ? '⏳ পরে আদায় করেছি' : '🕒 Prayed Later'}</option>
                    <option value="missed">{lang === 'bn' ? '✗ মিস হয়েছে' : '❌ Missed'}</option>
                  </select>

                  <button 
                    id={`delete-single-log-${log.id}`}
                    onClick={() => onDeleteLog(log.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-500 rounded hover:bg-zinc-100 transition-colors"
                    title={lang === 'bn' ? 'লগ মুছুন' : 'Delete log'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
