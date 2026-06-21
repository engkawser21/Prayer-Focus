/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Shield, 
  Book, 
  Database, 
  Sun, 
  Moon,
  Globe
} from 'lucide-react';
import { UserPreferences } from '../types';
import { translations } from '../data/translations';

interface SettingsTabProps {
  preferences: UserPreferences;
  onUpdatePreferences: (updated: Partial<UserPreferences>) => void;
  onResetAllSettings: () => void;
  onSimulateBackup: () => void;
  onSimulateRestore: () => void;
}

export default function SettingsTab({
  preferences,
  onUpdatePreferences,
  onResetAllSettings,
  onSimulateBackup,
  onSimulateRestore
}: SettingsTabProps) {
  const lang = preferences.language;
  const dict = translations[lang];

  const toggleEmergencyTool = (tool: 'flashlight' | 'emergencyCall' | 'alarmDismiss' | 'camera') => {
    const list = [...preferences.allowedEmergencyTools];
    if (list.includes(tool)) {
      onUpdatePreferences({
        allowedEmergencyTools: list.filter(t => t !== tool)
      });
    } else {
      onUpdatePreferences({
        allowedEmergencyTools: [...list, tool]
      });
    }
  };

  const setAppLanguage = (languageSelected: 'en' | 'bn') => {
    // When language changes:
    // Apply lang immediately, auto-select a compatible quran translation format defaults to avoid mismatched styles
    onUpdatePreferences({
      language: languageSelected,
      translation: languageSelected
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Visual description header */}
      <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 p-6 rounded-3xl">
        <h2 className="font-display font-black text-2xl tracking-tight text-zinc-900 dark:text-white mb-2">
          {dict.settingsTitle}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-2xl">
          {dict.settingsDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Language Selection & Security Config */}
        <div className="space-y-6">
          {/* Dedicated Language Selection Section as requested */}
          <div className="bg-white dark:bg-[#0B120F] border border-[#0000000d] dark:border-emerald-950/60 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-[#D4AF37] text-sm uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600" />
              {dict.languageLabel}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {dict.chooseLanguage}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button 
                id="lang-select-bn"
                onClick={() => setAppLanguage('bn')}
                className={`p-3 border rounded-2xl flex items-center gap-2.5 justify-center transition-all ${
                  preferences.language === 'bn' 
                    ? 'border-emerald-500 bg-[#0E1B16] text-[#D4AF37] font-bold' 
                    : 'border-zinc-200/60 dark:border-[#14231E] bg-zinc-50 dark:bg-[#13201B] text-zinc-600 dark:text-zinc-400 font-medium'
                }`}
              >
                <span className="text-lg">🇧🇩</span>
                <span className="text-xs">বাংলা (Bangla)</span>
              </button>

              <button 
                id="lang-select-en"
                onClick={() => setAppLanguage('en')}
                className={`p-3 border rounded-2xl flex items-center gap-2.5 justify-center transition-all ${
                  preferences.language === 'en' 
                    ? 'border-emerald-500 bg-[#0E1B16] text-[#D4AF37] font-bold' 
                    : 'border-zinc-200/60 dark:border-[#14231E] bg-zinc-50 dark:bg-[#13201B] text-zinc-600 dark:text-zinc-400 font-medium'
                }`}
              >
                <span className="text-lg">🇬🇧</span>
                <span className="text-xs">English</span>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0B120F] border border-[#0000000d] dark:border-emerald-950/60 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-[#D4AF37] text-sm uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              {dict.preferencesHeader}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-zinc-800 dark:text-white">{dict.enableStrictBlocker}</p>
                  <p className="text-[10px] text-zinc-400">{dict.enableStrictBlockerDesc}</p>
                </div>
                <button 
                  id="toggle-strict-blocker"
                  onClick={() => onUpdatePreferences({ strictBlockerEnabled: !preferences.strictBlockerEnabled })}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none flex ${
                    preferences.strictBlockerEnabled ? 'bg-emerald-600 justify-end' : 'bg-zinc-200 dark:bg-zinc-800 justify-start'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-sm inline-block" />
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 pt-4 border-t border-zinc-50 dark:border-emerald-950/45">
                <div>
                  <p className="text-xs font-bold text-zinc-800 dark:text-white">{dict.preventCasualBypass}</p>
                  <p className="text-[10px] text-zinc-400">{dict.preventCasualBypassDesc}</p>
                </div>
                <button 
                  id="toggle-prevent-bypass"
                  onClick={() => onUpdatePreferences({ preventCasualBypass: !preferences.preventCasualBypass })}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none flex ${
                    preferences.preventCasualBypass ? 'bg-emerald-600 justify-end' : 'bg-zinc-200 dark:bg-zinc-800 justify-start'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-sm inline-block" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-zinc-800 dark:text-white text-sm uppercase tracking-wider">
              {dict.emergencyToolsHeader}
            </h3>
            <p className="text-xs text-zinc-500 leading-normal">
              {dict.emergencyToolsSubtext}
            </p>

            <div className="space-y-2.5">
              
              <label id="rule-flashlight" className="flex items-center gap-3 bg-zinc-50 dark:bg-[#111A17] hover:bg-zinc-100/50 p-3 rounded-2xl border border-zinc-150/40 dark:border-emerald-950/45 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={preferences.allowedEmergencyTools.includes('flashlight')}
                  onChange={() => toggleEmergencyTool('flashlight')}
                  className="rounded text-emerald-600 focus:ring-emerald-500 bg-transparent border-zinc-300 w-4 h-4"
                />
                <div>
                  <p className="text-xs font-bold text-zinc-800 dark:text-white">{dict.flashlightRuleLabel}</p>
                  <p className="text-[9px] text-zinc-400">{dict.flashlightRuleDesc}</p>
                </div>
              </label>

              <label id="rule-emergencyCall" className="flex items-center gap-3 bg-zinc-50 dark:bg-[#111A17] hover:bg-zinc-100/50 p-3 rounded-2xl border border-zinc-150/40 dark:border-emerald-950/45 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={preferences.allowedEmergencyTools.includes('emergencyCall')}
                  onChange={() => toggleEmergencyTool('emergencyCall')}
                  className="rounded text-emerald-600 focus:ring-emerald-500 bg-transparent border-zinc-300 w-4 h-4"
                />
                <div>
                  <p className="text-xs font-bold text-zinc-800 dark:text-white">{dict.dialerRuleLabel}</p>
                  <p className="text-[9px] text-zinc-400">{dict.dialerRuleDesc}</p>
                </div>
              </label>

              <label id="rule-alarmDismiss" className="flex items-center gap-3 bg-zinc-50 dark:bg-[#111A17] hover:bg-zinc-100/50 p-3 rounded-2xl border border-zinc-150/40 dark:border-emerald-950/45 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={preferences.allowedEmergencyTools.includes('alarmDismiss')}
                  onChange={() => toggleEmergencyTool('alarmDismiss')}
                  className="rounded text-emerald-600 focus:ring-emerald-500 bg-transparent border-zinc-300 w-4 h-4"
                />
                <div>
                  <p className="text-xs font-bold text-zinc-800 dark:text-white">{dict.alarmRuleLabel}</p>
                  <p className="text-[9px] text-zinc-400">{dict.alarmRuleDesc}</p>
                </div>
              </label>

              <label id="rule-camera" className="flex items-center gap-3 bg-zinc-50 dark:bg-[#111A17] hover:bg-zinc-100/50 p-3 rounded-2xl border border-zinc-150/40 dark:border-emerald-950/45 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={preferences.allowedEmergencyTools.includes('camera')}
                  onChange={() => toggleEmergencyTool('camera')}
                  className="rounded text-emerald-600 focus:ring-emerald-500 bg-transparent border-zinc-300 w-4 h-4"
                />
                <div>
                  <p className="text-xs font-bold text-zinc-800 dark:text-white">{dict.cameraRuleLabel}</p>
                  <p className="text-[9px] text-zinc-400">{dict.cameraRuleDesc}</p>
                </div>
              </label>

            </div>
          </div>

        </div>

        {/* Right Column: Style presetting, Quran Options, Backup */}
        <div className="space-y-6">
          
          {/* Aesthetic theme preset card */}
          <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-[#D4AF37] text-sm uppercase tracking-wider flex items-center gap-2">
              <Sun className="w-4 h-4" />
              {dict.aestheticLayoutHeader}
            </h3>
            
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
              {dict.aestheticLayoutDesc}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                id="preset-theme-light"
                onClick={() => onUpdatePreferences({ theme: 'light' })}
                className={`p-4 border rounded-2xl flex flex-col items-center gap-2 justify-center transition-all ${
                  preferences.theme === 'light' 
                    ? 'border-emerald-600 bg-emerald-50/20 text-[#15241E] font-bold' 
                    : 'border-zinc-200/60 dark:border-[#14231E] bg-zinc-50 dark:bg-[#13201B] hover:bg-zinc-100/50 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                <Sun className="w-5 h-5 text-amber-500" />
                <span className="text-xs">{dict.lightThemeLabel}</span>
              </button>

              <button 
                id="preset-theme-dark"
                onClick={() => onUpdatePreferences({ theme: 'dark' })}
                className={`p-4 border rounded-2xl flex flex-col items-center gap-2 justify-center transition-all ${
                  preferences.theme === 'dark' 
                    ? 'border-emerald-500 bg-[#0E1B16] text-[#D4AF37] font-bold' 
                    : 'border-zinc-200/60 dark:border-[#14231E] bg-zinc-50 dark:bg-[#13201B] hover:bg-zinc-100/50 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                <Moon className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-xs font-semibold">{dict.darkThemeLabel}</span>
              </button>
            </div>
          </div>

          {/* Book translation preset: 3 distinct options as requested */}
          <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-zinc-800 dark:text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <Book className="w-4 h-4 text-emerald-600" />
              {dict.quranConfigHeader}
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-700 dark:text-zinc-300 font-bold">{dict.quranFormatLabel}</span>
                <span className="text-xs font-mono text-[#D4AF37] font-bold">{dict.quranFormatValue}</span>
              </div>

              <div className="pt-3 border-t border-zinc-50 dark:border-emerald-950/45 space-y-2">
                <label className="text-xs font-bold text-zinc-800 dark:text-white block">
                  {dict.quranTransFormatLabel}
                </label>
                
                <div className="space-y-1.5 pt-1">
                  <label className="flex items-center gap-2.5 p-2 bg-zinc-50 dark:bg-[#111A17] rounded-xl border border-zinc-100 dark:border-emerald-950 cursor-pointer">
                    <input 
                      type="radio"
                      name="quran-trans-opt"
                      checked={preferences.translation === 'none'}
                      onChange={() => onUpdatePreferences({ translation: 'none' })}
                      className="text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span className="text-xs text-zinc-700 dark:text-zinc-200 font-medium">
                      {dict.quranFormatArabicOnly}
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2 bg-zinc-50 dark:bg-[#111A17] rounded-xl border border-zinc-100 dark:border-emerald-950 cursor-pointer">
                    <input 
                      type="radio"
                      name="quran-trans-opt"
                      checked={preferences.translation === 'bn'}
                      onChange={() => onUpdatePreferences({ translation: 'bn' })}
                      className="text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span className="text-xs text-zinc-700 dark:text-zinc-200 font-medium font-sans">
                      {dict.quranFormatArabicBangla}
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2 bg-zinc-50 dark:bg-[#111A17] rounded-xl border border-zinc-100 dark:border-emerald-950 cursor-pointer">
                    <input 
                      type="radio"
                      name="quran-trans-opt"
                      checked={preferences.translation === 'en'}
                      onChange={() => onUpdatePreferences({ translation: 'en' })}
                      className="text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span className="text-xs text-zinc-700 dark:text-zinc-200 font-medium">
                      {dict.quranFormatArabicEnglish}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Backup & Database Administration */}
          <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-zinc-800 dark:text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-[#D4AF37]" />
              {dict.backupSectionHeader}
            </h3>
            
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
              {dict.backupSectionDesc}
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button 
                id="backup-btn"
                onClick={onSimulateBackup}
                className="p-2.5 border border-zinc-200 dark:border-emerald-900/40 text-[11px] text-zinc-800 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/60 rounded-xl transition-all font-semibold font-sans active:translate-y-px"
              >
                {dict.exportBackupBtn}
              </button>

              <button 
                id="restore-btn"
                onClick={onSimulateRestore}
                className="p-2.5 border border-zinc-200 dark:border-emerald-900/40 text-[11px] text-zinc-800 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/60 rounded-xl transition-all font-semibold font-sans active:translate-y-px"
              >
                {dict.importBackupBtn}
              </button>
            </div>

            <div className="pt-2">
              <button 
                id="factory-reset-btn"
                onClick={() => {
                  if(confirm(dict.factoryResetConfirm)) {
                    onResetAllSettings();
                  }
                }}
                className="w-full py-2 bg-red-950/20 border border-red-900/30 text-red-500 text-xs font-bold hover:bg-red-900/10 rounded-xl transition-colors active:translate-y-px"
              >
                🚨 {dict.factoryResetBtn}
              </button>
            </div>
          </div>

          {/* Contact & Support Section */}
          <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-zinc-800 dark:text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="text-emerald-600">✉️</span>
              {dict.contactHeader}
            </h3>
            
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
              {dict.contactDesc}
            </p>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#111B17] border border-zinc-100 dark:border-emerald-950/50 space-y-3">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 rounded-xl text-lg leading-none shrink-0 font-mono">👨‍💻</span>
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">{dict.developerLabel}</p>
                  <p className="text-xs font-bold text-zinc-800 dark:text-white">{dict.devName}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-zinc-200/40 dark:border-emerald-950/40 pt-2.5">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 rounded-xl text-lg leading-none shrink-0 font-mono">📧</span>
                  <div>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">{dict.emailAddressLabel}</p>
                    <p className="text-xs font-mono font-bold text-zinc-800 dark:text-white select-all">{dict.devEmail}</p>
                  </div>
                </div>
                <a 
                  href={`mailto:${dict.devEmail}`}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-[10px] transition-colors"
                >
                  {dict.emailActionBtn}
                </a>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-zinc-200/40 dark:border-emerald-950/40 pt-2.5">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 rounded-xl text-lg leading-none shrink-0 font-mono">🌐</span>
                  <div>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Facebook</p>
                    <a 
                      href={dict.devFacebookUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-600 dark:text-[#D4AF37] hover:underline break-all"
                    >
                      {dict.devFacebook}
                    </a>
                  </div>
                </div>
                <a 
                  href={dict.devFacebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-[#D4AF37] border border-[#D4AF37]/20 font-bold rounded-lg text-[10px] transition-colors"
                >
                  {dict.visitActionBtn}
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
