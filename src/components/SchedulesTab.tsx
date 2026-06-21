/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  MapPin, 
  Sparkles, 
  ToggleLeft, 
  ToggleRight, 
  Clock, 
  AlertCircle
} from 'lucide-react';
import { PrayerSchedule, CityPreset, UserPreferences } from '../types';
import { cityPresets } from '../data/prayerCalculation';
import { translations, getPrayerName } from '../data/translations';

interface SchedulesTabProps {
  schedules: PrayerSchedule[];
  onAddSchedule: (newSched: PrayerSchedule) => void;
  onToggleSchedule: (id: string) => void;
  onDeleteSchedule: (id: string) => void;
  onUpdateDays: (id: string, days: number[]) => void;
  onLoadCityPreset: (preset: CityPreset) => void;
  preferences: UserPreferences;
}

export default function SchedulesTab({
  schedules,
  onAddSchedule,
  onToggleSchedule,
  onDeleteSchedule,
  onUpdateDays,
  onLoadCityPreset,
  preferences
}: SchedulesTabProps) {
  const lang = preferences.language;
  const dict = translations[lang];

  // Manual adding state
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('Fajr');
  const [startTime, setStartTime] = useState<string>('05:00');
  const [endTime, setEndTime] = useState<string>('05:20');
  const [activeDays, setActiveDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [formError, setFormError] = useState<string>('');

  const daysOfWeek = [
    { label: dict.daySun, val: 0 },
    { label: dict.dayMon, val: 1 },
    { label: dict.dayTue, val: 2 },
    { label: dict.dayWed, val: 3 },
    { label: dict.dayThu, val: 4 },
    { label: dict.dayFri, val: 5 },
    { label: dict.daySat, val: 6 },
  ];

  const handleDayToggle = (dayVal: number) => {
    if (activeDays.includes(dayVal)) {
      setActiveDays(activeDays.filter(d => d !== dayVal));
    } else {
      setActiveDays([...activeDays, dayVal].sort());
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!newName.trim()) {
      setFormError(dict.errorPrayerName);
      return;
    }

    if (!startTime || !endTime) {
      setFormError(dict.errorTimesRequired);
      return;
    }

    // Convert to minutes for comparison
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const startMins = startH * 60 + startM;
    const endMins = endH * 60 + endM;

    if (endMins <= startMins) {
      setFormError(dict.errorEndTimeLower);
      return;
    }

    if (activeDays.length === 0) {
      setFormError(dict.errorActiveDayRequired);
      return;
    }

    const newSched: PrayerSchedule = {
      id: `p-${Date.now()}`,
      name: newName,
      startTime,
      endTime,
      enabled: true,
      activeDays,
      isCustom: true
    };

    onAddSchedule(newSched);
    setShowAddForm(false);
    // Reset form defaults 
    setNewName('Fajr');
  };

  // Preset loading handler
  const handlePresetSelect = (presetName: string) => {
    const preset = cityPresets.find(c => c.name === presetName);
    if (preset) {
      onLoadCityPreset(preset);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Visual description header */}
      <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 p-6 rounded-3xl">
        <h2 className="font-display font-black text-2xl tracking-tight text-zinc-900 dark:text-white mb-2">
          {dict.schedulesTabHeader}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-2xl">
          {dict.schedulesTabDesc}
        </p>
      </div>

      {/* Grid of presets and schedules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Presets Card Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 p-6 rounded-3xl shadow-sm">
            <h3 className="font-display font-bold text-[#D4AF37] text-md uppercase tracking-wider mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600/10" />
              {dict.automaticPresetHeader}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
              {dict.automaticPresetDesc}
            </p>

            <div className="space-y-2">
              <label htmlFor="city-preset-select" className="text-xs font-bold text-zinc-600 dark:text-zinc-300 block">{dict.selectClosestCity}</label>
              <select 
                id="city-preset-select"
                onChange={(e) => handlePresetSelect(e.target.value)}
                defaultValue=""
                className="w-full text-xs bg-zinc-50 dark:bg-[#14221C] border border-zinc-200 dark:border-emerald-900/40 p-2.5 rounded-xl font-sans text-zinc-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="" disabled>{dict.cityDropdownPlaceholder}</option>
                {cityPresets.map(preset => (
                  <option key={preset.name} value={preset.name}>
                    🕌 {preset.name} ({lang === 'bn' && preset.name === 'Dhaka' ? 'বাংলাদেশ' : preset.country})
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-emerald-950/45 text-center">
              <button 
                id="gps-mock-activator"
                onClick={() => {
                  const randomPreset = cityPresets[Math.floor(Math.random() * cityPresets.length)];
                  onLoadCityPreset(randomPreset);
                  const countryLabel = lang === 'bn' && randomPreset.name === 'Dhaka' ? 'বাংলাদেশ' : randomPreset.country;
                  const alertMsg = dict.alertGpsFinished
                    .replace('{city}', randomPreset.name)
                    .replace('{country}', countryLabel);
                  alert(alertMsg);
                }}
                className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 font-bold flex items-center gap-1.5 justify-center mx-auto"
              >
                🛰️ {dict.gpsLookupBtn}
              </button>
            </div>
          </div>
        </div>

        {/* Master list control column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 p-4 rounded-3xl shadow-sm">
            <span className="font-display font-extrabold text-sm text-zinc-900 dark:text-white">
              {dict.activeSchedulesCount} ({schedules.length})
            </span>
            <button 
              id="show-add-form-btn"
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 hover:scale-103 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-4 h-4" /> {dict.createCustomBtn}
            </button>
          </div>

          {/* New Custom Appener Form */}
          {showAddForm && (
            <motion.div 
              id="add-schedule-form-container"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#0B120F] border border-emerald-500/30 rounded-3xl p-6 shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display font-extrabold text-sm text-zinc-800 dark:text-white flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" /> {dict.defineCustomTitle}
                </h3>
                <button 
                  id="close-add-form-btn"
                  onClick={() => setShowAddForm(false)} 
                  className="text-xs text-zinc-500 hover:text-red-500"
                >
                  {dict.cancelBtn}
                </button>
              </div>

              {formError && (
                <div id="schedule-form-error" className="bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-950/40 p-3 rounded-lg text-xs flex items-center gap-2 mb-4">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="custom-prayer-name" className="text-xs font-bold text-zinc-600 dark:text-zinc-300">{dict.prayerNameLabel}</label>
                    <select 
                      id="custom-prayer-name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full text-xs bg-zinc-50 dark:bg-[#14221C] border border-zinc-200 dark:border-emerald-900/40 p-2.5 rounded-xl text-zinc-800 dark:text-white mt-1 focus:outline-none"
                    >
                      <option value="Fajr">{dict.prayerFajr} {dict.descFajr}</option>
                      <option value="Dhuhr">{dict.prayerDhuhr} {dict.descDhuhr}</option>
                      <option value="Asr">{dict.prayerAsr} {dict.descAsr}</option>
                      <option value="Maghrib">{dict.prayerMaghrib} {dict.descMaghrib}</option>
                      <option value="Isha">{dict.prayerIsha} {dict.descIsha}</option>
                      <option value="Tahajjud">{dict.prayerTahajjud} {dict.descTahajjud}</option>
                      <option value="Duha">{dict.prayerDuha} {dict.descDuha}</option>
                      <option value="Focus Session">{dict.prayerCustomFocus}</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="custom-prayer-start" className="text-xs font-bold text-zinc-600 dark:text-zinc-300">{dict.lockStartsLabel}</label>
                    <input 
                      id="custom-prayer-start"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full text-xs bg-zinc-50 dark:bg-[#14221C] border border-zinc-200 dark:border-emerald-900/40 p-2 rounded-xl text-zinc-800 dark:text-white mt-1 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="custom-prayer-end" className="text-xs font-bold text-zinc-600 dark:text-zinc-300">{dict.lockEndsLabel}</label>
                    <input 
                      id="custom-prayer-end"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full text-xs bg-zinc-50 dark:bg-[#14221C] border border-zinc-200 dark:border-emerald-900/40 p-2 rounded-xl text-zinc-800 dark:text-white mt-1 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-300 block">{dict.repeatLabel}</label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map((day) => {
                      const isActive = activeDays.includes(day.val);
                      return (
                        <button
                          key={day.val}
                          type="button"
                          id={`select-day-${day.val}`}
                          onClick={() => handleDayToggle(day.val)}
                          className={`w-11 h-11 rounded-full text-xs font-bold transition-all border ${
                            isActive 
                              ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm' 
                              : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100'
                          }`}
                        >
                          {day.label[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button 
                  id="submit-add-schedule"
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-xs rounded-xl shadow-lg mt-4"
                >
                  {dict.saveScheduleBtn}
                </button>
              </form>
            </motion.div>
          )}

          {/* List of active schedules */}
          <div className="space-y-3">
            {schedules.length === 0 ? (
              <div className="bg-white dark:bg-[#0B120F] border border-dashed border-zinc-200 dark:border-emerald-950 p-12 rounded-3xl text-center space-y-2">
                <span className="text-3xl">🕌</span>
                <p className="font-display font-medium text-sm text-zinc-500 dark:text-zinc-400">{dict.noSchedulesSeeded}</p>
                <p className="text-xs text-zinc-400">{dict.noSchedulesSeededDesc}</p>
              </div>
            ) : (
              schedules.map((schedule) => {
                const iconMap: Record<string, string> = {
                  'Fajr': '🌅',
                  'Dhuhr': '☀️',
                  'Asr': '🌤️',
                  'Maghrib': '🌆',
                  'Isha': '🌌',
                  'Tahajjud': '🌌',
                  'Duha': '☀️'
                };
                const visualIcon = iconMap[schedule.name] || '🤲';
                
                return (
                  <div 
                    key={schedule.id}
                    className={`p-4 rounded-3xl bg-white dark:bg-[#0B120F] border transition-all shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 ${
                      schedule.enabled 
                        ? 'border-zinc-150 dark:border-emerald-950/60' 
                        : 'border-zinc-100 dark:border-zinc-900 opacity-65'
                    }`}
                  >
                    {/* Left: Metadata descriptor */}
                    <div className="flex items-center gap-3.5 w-full sm:w-auto">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-[#D4AF37] border border-emerald-100 dark:border-emerald-900/60 flex items-center justify-center font-bold relative shrink-0">
                        {visualIcon}
                      </div>
                      
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-sm text-zinc-900 dark:text-white">
                            {getPrayerName(schedule.name, lang)}
                          </h4>
                          {schedule.isCustom && (
                            <span className="text-[9px] bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/40 text-sky-700 dark:text-sky-400 px-1.5 py-0.5 rounded">
                              {dict.customBadge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{schedule.startTime} — {schedule.endTime}</span>
                          <span className="text-stone-300 dark:text-stone-800">|</span>
                          <span className="font-mono text-[10px] tracking-widest uppercase">
                            {schedule.activeDays.length === 7 ? dict.everyday : `${schedule.activeDays.length} ${dict.daysCount}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Weekday Indicators */}
                    <div className="flex gap-1">
                      {daysOfWeek.map((day) => {
                        const isScheduled = schedule.activeDays.includes(day.val);
                        return (
                          <span 
                            key={day.val}
                            className={`text-[9.5px] w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                              isScheduled 
                                ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30' 
                                : 'text-zinc-300 dark:text-zinc-700 bg-transparent'
                            }`}
                            title={day.label}
                          >
                            {day.label[0]}
                          </span>
                        );
                      })}
                    </div>

                    {/* Right: Toggle & Delete Actions */}
                    <div className="flex items-center gap-3.5 w-full sm:w-auto justify-end border-t sm:border-0 pt-3 sm:pt-0">
                      <button 
                        id={`toggle-item-${schedule.id}`}
                        onClick={() => onToggleSchedule(schedule.id)}
                        className={`transition-colors focus:outline-none`}
                        title={dict.standbyTooltip}
                      >
                        {schedule.enabled ? (
                          <ToggleRight className="w-9 h-9 text-emerald-600 dark:text-emerald-400 cursor-pointer" />
                        ) : (
                          <ToggleLeft className="w-9 h-9 text-zinc-300 dark:text-zinc-600 cursor-pointer" />
                        )}
                      </button>

                      <button 
                        id={`delete-item-${schedule.id}`}
                        onClick={() => onDeleteSchedule(schedule.id)}
                        className="p-2 border border-zinc-100 dark:border-zinc-800 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                        title={dict.deleteTooltip}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
