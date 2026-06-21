/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Play, 
  AlertTriangle,
  Clock
} from 'lucide-react';
import { PrayerSchedule, UserPreferences } from '../types';
import { translations, getPrayerName } from '../data/translations';

interface DistractionSimulatorProps {
  activeSchedule: PrayerSchedule | null;
  onTriggerSimulatedLock: () => void;
  preferences: UserPreferences;
}

export default function DistractionSimulator({ 
  activeSchedule, 
  onTriggerSimulatedLock,
  preferences
}: DistractionSimulatorProps) {
  const lang = preferences.language;
  const dict = translations[lang];

  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [showIntercept, setShowIntercept] = useState<boolean>(false);
  const [socialScrollIndex, setSocialScrollIndex] = useState<number>(0);

  // Fake scrolling content presets for realistic apps
  const mockTikTokFeeds = lang === 'bn' ? [
    { creator: "@scrolling_infinite", caption: "নামাজ পড়ার আগে আর মাত্র ৫ মিনিট স্ক্রল করে নিই... 😅", likes: "১২৮k", hashtags: "#relatable #funny #reels" },
    { creator: "@gaming_pro", caption: "নতুন গেমের লেভেল পার করছি! কেউ ডিস্টার্ব করবেন না! 🎮🔥", likes: "৫২k", hashtags: "#gamer #rpg #trending" },
    { creator: "@foodie_snack", caption: "দুপুর ১ টায় একদম স্বাস্থ্যকর নয় এমন সব খাবার বানিয়ে ভাইরাল হওয়া...", likes: "১.২M", hashtags: "#delicious #cooking #reels #viral" }
  ] : [
    { creator: "@scrolling_infinite", caption: "Just 5 more minutes of endless scrolling before I pray... 😅", likes: "128k", hashtags: "#relatable #funny #reels" },
    { creator: "@gaming_pro", caption: "Leveling up in the latest dungeon! Don't disturb me! 🎮🔥", likes: "52k", hashtags: "#gamer #rpg #trending" },
    { creator: "@foodie_snack", caption: "Deep frying butter for absolutely no healthy reason at 1 PM...", likes: "1.2M", hashtags: "#delicious #cooking #reels #viral" }
  ];

  // Intercept trigger when they try to use it during an active prayer session
  const attemptLaunchApp = (appName: string) => {
    setSelectedApp(appName);
    if (activeSchedule && activeSchedule.enabled) {
      // Actively intercepting! Show the visual Accessibility alert, then lock
      setShowIntercept(true);
      setTimeout(() => {
        setShowIntercept(false);
        setSelectedApp(null);
        onTriggerSimulatedLock(); // Actively trigger the lock view
      }, 3500);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0B120F] border border-zinc-100 dark:border-emerald-950/60 rounded-3xl p-6 shadow-sm flex flex-col xl:flex-row gap-8">
      
      {/* Block Information explanation & controller */}
      <div className="flex-1 space-y-4">
        <div className="inline-flex bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400 font-sans text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
          💡 {lang === 'bn' ? 'অ্যাক্সেসিবিলিটি সার্ভিস কুঠুরি' : 'Accessibility Service Sandbox'}
        </div>

        <h2 className="font-display font-black text-2xl tracking-tight text-zinc-900 dark:text-white">
          {dict.accessibilityBoxTitle}
        </h2>

        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
          {dict.accessibilityBoxExplain1}
        </p>

        <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
          {dict.accessibilityBoxExplain2}
        </p>

        {/* Dynamic status card */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#111B17] border border-zinc-100 dark:border-emerald-950/50">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            {dict.accessibilityGuardStatus}
          </h4>
          
          {activeSchedule && activeSchedule.enabled ? (
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold text-sm">
                <AlertTriangle className="w-5 h-5 animate-pulse shrink-0" />
                <span>{dict.accessibilityGuardActive} ({getPrayerName(activeSchedule.name, lang)})</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {dict.accessibilityGuardActiveDesc}
              </p>
            </div>
          ) : (
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                <Clock className="w-5 h-5 font-bold shrink-0" />
                <span>{dict.accessibilityStandby}</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {dict.accessibilityStandbyDesc}
              </p>
            </div>
          )}
        </div>

        {/* Simulated Distraction Launchers */}
        <div>
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">
            {dict.simulateBypassTitle}
          </h4>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-2">
            
            <button 
              id="distractor-tiktok"
              onClick={() => attemptLaunchApp('TikTok')}
              className="p-3 border border-zinc-100 dark:border-emerald-950/50 hover:bg-zinc-50 dark:hover:bg-[#15231E] rounded-2xl flex items-center gap-3 transition-all text-left"
            >
              <span className="p-2.5 bg-black text-white rounded-lg text-xs font-bold">T</span>
              <div>
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-100">TikTok</p>
                <p className="text-[10px] text-zinc-400">{dict.tiktokTag}</p>
              </div>
            </button>

            <button 
              id="distractor-instagram"
              onClick={() => attemptLaunchApp('Instagram')}
              className="p-3 border border-zinc-100 dark:border-emerald-950/50 hover:bg-zinc-50 dark:hover:bg-[#15231E] rounded-2xl flex items-center gap-3 transition-all text-left"
            >
              <span className="p-2.5 bg-gradient-to-tr from-yellow-500 to-purple-600 text-white rounded-lg text-xs font-bold">📸</span>
              <div>
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-100">Instagram</p>
                <p className="text-[10px] text-zinc-400">{dict.instagramTag}</p>
              </div>
            </button>

            <button 
              id="distractor-youtube"
              onClick={() => attemptLaunchApp('YouTube')}
              className="p-3 border border-zinc-100 dark:border-emerald-950/50 hover:bg-zinc-50 dark:hover:bg-[#15231E] rounded-2xl flex items-center gap-3 transition-all text-left"
            >
              <span className="p-2.5 bg-red-600 text-white rounded-lg text-xs font-bold">🎬</span>
              <div>
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-100">YouTube</p>
                <p className="text-[10px] text-zinc-400">{dict.youtubeTag}</p>
              </div>
            </button>

            <button 
              id="distractor-games"
              onClick={() => attemptLaunchApp('Subway Surfers')}
              className="p-3 border border-zinc-100 dark:border-emerald-950/50 hover:bg-zinc-50 dark:hover:bg-[#15231E] rounded-2xl flex items-center gap-3 transition-all text-left"
            >
              <span className="p-2.5 bg-amber-500 text-zinc-950 rounded-lg text-xs font-bold">🎮</span>
              <div>
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-100">{lang === 'bn' ? 'ক্যান্ডি ক্রাশ' : 'Candy Crush'}</p>
                <p className="text-[10px] text-zinc-400">{dict.gamingTag}</p>
              </div>
            </button>

          </div>
        </div>
      </div>

      {/* Main smartphone visual simulation frame */}
      <div className="w-full max-w-[340px] mx-auto shrink-0 bg-zinc-950 rounded-[40px] border-8 border-zinc-800 dark:border-[#1D2622] p-4 relative aspect-[9/18] shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Dynamic Mobile Intercept Alert Popup */}
        <AnimatePresence>
          {showIntercept && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-0 bg-[#0B1511]/95 text-emerald-100 z-30 p-6 flex flex-col justify-center items-center text-center"
            >
              <div className="bg-red-500/10 p-3 rounded-full border border-red-500/30 text-red-500 mb-4 animate-bounce">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h4 className="font-display font-medium text-lg text-red-400 leading-snug">{dict.interceptTitle}</h4>
              <p className="text-xs text-white/70 font-sans mt-2 max-w-[200px]">
                <strong>{selectedApp}</strong> {dict.interceptDesc} <strong>{activeSchedule ? getPrayerName(activeSchedule.name, lang) : 'Salah'}</strong>
              </p>
              <div className="my-6 flex h-2 w-16 bg-red-950 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3.2 }}
                  className="bg-red-500 h-full"
                />
              </div>
              <p className="text-[10px] uppercase font-mono text-[#D4AF37] tracking-wider animate-pulse">
                {lang === 'bn' ? 'লক ওভারলে স্ক্রিন চালু হচ্ছে...' : 'Launching Prayer focus overlays...'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inside Simulated Screen Workspace */}
        {selectedApp ? (
          /* Simulated opened application workspace */
          <div className="flex-1 bg-black flex flex-col h-full rounded-2xl relative overflow-hidden text-white pt-2">
            
            {/* Top Bar inside mocked app */}
            <div className="px-3 flex justify-between items-center text-xs text-stone-400 shrink-0 font-mono">
              <span>{selectedApp} Feed</span>
              <button 
                id="quit-mock-app"
                onClick={() => setSelectedApp(null)}
                className="text-[10px] text-zinc-100 bg-zinc-800 hover:bg-zinc-700 px-2 py-0.5 rounded-full"
              >
                {dict.simCloseBtn}
              </button>
            </div>

            {selectedApp === 'TikTok' || selectedApp === 'Instagram' || selectedApp === 'YouTube' ? (
              /* Simulated Short Video Media Scroll */
              <div className="flex-1 flex flex-col justify-between py-4 relative bg-[#020202]">
                <div className="flex-1 flex flex-col justify-center p-4">
                  <div className="bg-[#141414] border border-zinc-800 rounded-xl aspect-[16/9] flex items-center justify-center relative overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 to-pink-950/20" />
                    <Play className="w-10 h-10 text-white opacity-40 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 left-2 text-[10px] bg-black/40 px-2 py-0.5 rounded text-[#D4AF37]">
                      🎬 {lang === 'bn' ? 'অটোপ্লে শর্টস চলছে...' : 'Auto-playing reels...'}
                    </div>
                  </div>
                </div>

                <div className="p-3 space-y-2 select-text">
                  <p className="text-xs font-bold text-[#E2E8F0] text-left">{mockTikTokFeeds[socialScrollIndex].creator}</p>
                  <p className="text-[11px] text-stone-300 leading-normal text-left">{mockTikTokFeeds[socialScrollIndex].caption}</p>
                  <span className="text-[10px] text-emerald-400 font-medium tracking-wide text-left block">{mockTikTokFeeds[socialScrollIndex].hashtags}</span>
                  
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-stone-900">
                    <button 
                      id="next-reel-sim"
                      onClick={() => setSocialScrollIndex((prev) => (prev + 1) % mockTikTokFeeds.length)}
                      className="text-[10px] text-[#D4AF37] hover:underline"
                    >
                      {dict.simScrollNext}
                    </button>
                    <span className="text-[10px] text-zinc-500 font-bold">{mockTikTokFeeds[socialScrollIndex].likes} {dict.simLikesCount}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Simulated Candy Game screen */
              <div className="flex-1 flex flex-col justify-between items-center p-4 bg-gradient-to-b from-indigo-900 to-purple-950">
                <div className="text-center py-4 space-y-1">
                  <p className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] font-bold">{lang === 'bn' ? 'ক্যান্ডি ক্রাশ ডোপামিন' : 'Candy Crush Surge'}</p>
                  <h5 className="font-display text-white text-md font-extrabold">{dict.candyLevel} 9,842</h5>
                </div>

                {/* Grid puzzle view mock */}
                <div className="grid grid-cols-4 gap-1 bg-black/40 p-2.5 rounded-xl border border-white/10">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${i % 3 === 0 ? 'bg-indigo-500 animate-pulse' : i % 2 === 0 ? 'bg-pink-500' : 'bg-amber-500'}`}>
                      🍭
                    </span>
                  ))}
                </div>

                <div className="text-center py-4">
                  <span className="text-[10px] font-mono text-white/50 block">{dict.candyScore}: 239,401</span>
                </div>
              </div>
            )}
            
          </div>
        ) : (
          /* Simulated Phone Launcher Workspace */
          <div className="flex-1 flex flex-col justify-between h-full bg-slate-900 rounded-2xl p-3 text-white relative">
            
            {/* Top Bar inside simulation */}
            <div className="flex justify-between items-center text-[10px] text-stone-300 font-mono">
              <span className="flex items-center gap-1 font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                PF Guard
              </span>
              <span>1:31 PM</span>
            </div>

            {/* Simulated Desktop Icon Selection Grid */}
            <div className="my-auto">
              <p className="text-[9.5px] text-zinc-400 font-mono text-center mb-6">{dict.tapToOpenNotice}</p>
              
              <div className="grid grid-cols-3 gap-y-6 gap-x-2">
                
                <button 
                  id="smartphone-tiktok-icon"
                  onClick={() => attemptLaunchApp('TikTok')}
                  className="flex flex-col items-center gap-1 group active:scale-95 transition-all focus:outline-none"
                >
                  <span className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center shadow-lg hover:ring-2 hover:ring-emerald-500 text-sm font-bold">
                    T
                  </span>
                  <span className="text-[9px] text-[#CBD5E1] truncate w-full text-center">TikTok</span>
                </button>

                <button 
                  id="smartphone-instagram-icon"
                  onClick={() => attemptLaunchApp('Instagram')}
                  className="flex flex-col items-center gap-1 group active:scale-95 transition-all focus:outline-none"
                >
                  <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-red-500 to-purple-600 flex items-center justify-center shadow-lg hover:ring-2 hover:ring-emerald-500 text-sm">
                    📸
                  </span>
                  <span className="text-[9px] text-[#CBD5E1] truncate w-full text-center">Instagram</span>
                </button>

                <button 
                  id="smartphone-youtube-icon"
                  onClick={() => attemptLaunchApp('YouTube')}
                  className="flex flex-col items-center gap-1 group active:scale-95 transition-all focus:outline-none"
                >
                  <span className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg hover:ring-2 hover:ring-emerald-500 text-xs text-center justify-center">
                    🎬
                  </span>
                  <span className="text-[9px] text-[#CBD5E1] truncate w-full text-center">YouTube</span>
                </button>

                <button 
                  id="smartphone-games-icon"
                  onClick={() => attemptLaunchApp('Games')}
                  className="flex flex-col items-center gap-1 group active:scale-95 transition-all focus:outline-none"
                >
                  <span className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg hover:ring-2 hover:ring-emerald-500 text-sm">
                    🎮
                  </span>
                  <span className="text-[9px] text-[#CBD5E1] truncate w-full text-center">Candy Surge</span>
                </button>

                <button 
                  id="smartphone-safari-icon"
                  onClick={() => attemptLaunchApp('Safari')}
                  className="flex flex-col items-center gap-1 group active:scale-95 transition-all focus:outline-none"
                >
                  <span className="w-10 h-10 rounded-2xl bg-[#0080FF] flex items-center justify-center shadow-lg hover:ring-2 hover:ring-emerald-500 text-sm">
                    🧭
                  </span>
                  <span className="text-[9px] text-[#CBD5E1] truncate w-full text-center">Safari</span>
                </button>

                <button 
                  id="smartphone-pf-icon"
                  onClick={onTriggerSimulatedLock}
                  className="flex flex-col items-center gap-1 group active:scale-95 transition-all focus:outline-none"
                >
                  <span className="w-10 h-10 rounded-2xl bg-[#11241C] border border-[#D4AF37]/50 flex items-center justify-center shadow-lg hover:ring-2 hover:ring-[#D4AF37] text-sm animate-pulse">
                    🕌
                  </span>
                  <span className="text-[9px] text-[#D4AF37] font-semibold truncate w-full text-center">P. Focus</span>
                </button>

              </div>
            </div>

            {/* Bottom Bar containing standard navigation buttons */}
            <div className="flex justify-around items-center pt-2 mt-4 border-t border-white/5 text-[9px] text-zinc-400">
              <span>{dict.simAppsMenu}</span>
              <span>● {dict.simHomeBtn}</span>
              <span>◀ {dict.simBackBtn}</span>
            </div>

          </div>
        )}
        
      </div>
    </div>
  );
}
