/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Phone, 
  BellOff, 
  Camera, 
  BookOpen, 
  X, 
  ShieldAlert, 
  ChevronRight,
  Volume2,
  VolumeX
} from 'lucide-react';
import { PrayerSchedule, SpiritualItem, UserPreferences } from '../types';
import { spiritualContent } from '../data/spiritualContent';
import { translations, getPrayerName } from '../data/translations';

interface ActivePrayerOverlayProps {
  activeSchedule: PrayerSchedule | { name: string; endTime: string; id: string };
  onCompleted: (status: 'completed' | 'later' | 'missed') => void;
  allowedTools: string[];
  preferences: UserPreferences;
}

export default function ActivePrayerOverlay({ 
  activeSchedule, 
  onCompleted, 
  allowedTools,
  preferences
}: ActivePrayerOverlayProps) {
  const lang = preferences.language;
  const dict = translations[lang];

  const [currentTime, setCurrentTime] = useState<string>('');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(900); // Default 15 mins
  const [contentIndex, setContentIndex] = useState<number>(0);
  const [showExitWall, setShowExitWall] = useState<boolean>(false);
  const [reflectText, setReflectText] = useState<string>('');
  const [exitError, setExitError] = useState<string>('');
  const [muteSound, setMuteSound] = useState<boolean>(false);
  
  // Emergency simulator states
  const [flashlightActive, setFlashlightActive] = useState<boolean>(false);
  const [showEmergencyDialer, setShowEmergencyDialer] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [imageCaptured, setImageCaptured] = useState<string | null>(null);
  const [dialNumber, setDialNumber] = useState<string>('');
  const [activeCallSim, setActiveCallSim] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Parse time details
  useEffect(() => {
    const parseTime = () => {
      const now = new Date();
      const currentH = now.getHours();
      const currentM = now.getMinutes();
      const currentS = now.getSeconds();
      
      setCurrentTime(
        `${String(currentH).padStart(2, '0')}:${String(currentM).padStart(2, '0')}:${String(currentS).padStart(2, '0')}`
      );

      // Determine remaining seconds until end time
      try {
        const [endH, endM] = activeSchedule.endTime.split(':').map(Number);
        const endDateTime = new Date();
        endDateTime.setHours(endH, endM, 0, 0);

        // If end occurs tomorrow, add a day
        if (endDateTime.getTime() < now.getTime()) {
          endDateTime.setDate(endDateTime.getDate() + 1);
        }

        const diffSeconds = Math.max(0, Math.floor((endDateTime.getTime() - now.getTime()) / 1000));
        setSecondsRemaining(diffSeconds);
        
        if (diffSeconds <= 0) {
          // Time is up! Automatic completion flow
          setShowExitWall(true);
        }
      } catch (e) {
        setSecondsRemaining(600); // Fallback to 10 mins
      }
    };

    parseTime();
    const interval = setInterval(parseTime, 1000);
    return () => clearInterval(interval);
  }, [activeSchedule]);

  // Rotate spiritual content every 22 seconds
  useEffect(() => {
    const indexInterval = setInterval(() => {
      setContentIndex((prev) => (prev + 1) % spiritualContent.length);
    }, 22000);
    return () => clearInterval(indexInterval);
  }, []);

  // Format countdown
  const formatCountdown = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const activeContent: SpiritualItem = spiritualContent[contentIndex];

  // Camera handling
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (showCamera) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch((err) => {
          console.log("Webcam access restricted", err);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const s = videoRef.current.srcObject as MediaStream;
        s.getTracks().forEach(track => track.stop());
      }
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [showCamera]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setImageCaptured(canvas.toDataURL('image/png'));
      }
    }
  };

  const handleBypassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectText.trim()) {
      setExitError(dict.reflectionError);
      return;
    }
    if (reflectText.trim().length < 15) {
      setExitError(dict.reflectionError);
      return;
    }
    // Correct bypass allows marking later/missed or emergency exit
    onCompleted('later');
  };

  // Determine what translation string to show based on user's preference
  const renderSpiritualTranslation = () => {
    if (preferences.translation === 'none') {
      return null;
    }
    if (preferences.translation === 'bn') {
      return activeContent.translationBn || activeContent.translation;
    }
    return activeContent.translation;
  };

  return (
    <div id="active-prayer-overlay" className="fixed inset-0 bg-[#0B1511] text-emerald-50 font-sans z-50 flex flex-col md:flex-row h-screen w-screen overflow-hidden select-none">
      
      {/* Simulate Flashlight High Visibility Overlay */}
      <AnimatePresence>
        {flashlightActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            onClick={() => setFlashlightActive(false)}
            className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center text-[#0B1511]"
          >
            <div className="text-center p-8 pointer-events-none">
              <span className="inline-flex bg-emerald-100 p-6 rounded-full text-emerald-800 mb-4 animate-pulse">
                <Flame className="w-16 h-16 fill-[#10B981]" />
              </span>
              <h3 className="font-display font-bold text-3xl tracking-tight">{dict.flashlightSimActive}</h3>
              <p className="text-sm font-sans mt-2 text-zinc-500">{dict.flashlightSimDesc}</p>
              <p className="text-xs font-mono font-bold mt-8 uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded">{dict.flashlightSimClose}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emergency Dialer Dialog */}
      <AnimatePresence>
        {showEmergencyDialer && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/90 z-[55] flex items-center justify-center p-4"
          >
            <div className="bg-[#111C18] border border-emerald-900 rounded-2xl w-full max-w-sm overflow-hidden p-6 relative text-left">
              <button 
                id="close-dialer"
                onClick={() => {
                  setShowEmergencyDialer(false);
                  setActiveCallSim(null);
                }} 
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 text-zinc-400"
              >
                <X className="w-5 h-5"/>
              </button>

              <h3 className="font-display font-semibold text-lg text-emerald-400 mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-500 fill-red-500/25" />
                {dict.emergencyCommHeader}
              </h3>

              {activeCallSim ? (
                <div id="active-call" className="py-8 text-center animate-pulse">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <Phone className="w-8 h-8 text-white rotate-12" />
                  </div>
                  <h4 className="font-display font-medium text-lg text-white">{dict.callingSimulate} {activeCallSim}</h4>
                  <p className="text-white/60 text-sm mt-1">{dict.activeCallSimulating}</p>
                  <button 
                    id="end-call-sim"
                    onClick={() => setActiveCallSim(null)}
                    className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full text-xs transition-colors"
                  >
                    {dict.disconnectCallBtn}
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-white/50 mb-4 font-sans">
                    {dict.emergencyCommDesc}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <button 
                      id="dial-911"
                      onClick={() => setActiveCallSim(lang === 'bn' ? "৯১১ (জরুরি সেবা)" : "911 (Global Emergency)")}
                      className="p-3 bg-red-950/45 hover:bg-red-900/60 border border-red-900/40 rounded-xl text-xs font-semibold text-red-300 flex items-center gap-2 justify-center cursor-pointer"
                    >
                      🚒 {dict.emergencyCommDialerBtn}
                    </button>
                    <button 
                      id="dial-family"
                      onClick={() => setActiveCallSim(lang === 'bn' ? "পারিবারিক অভিভাবক" : "Family Guardian")}
                      className="p-3 bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700 rounded-xl text-xs font-semibold text-zinc-300 flex items-center gap-2 justify-center cursor-pointer"
                    >
                      👴 {dict.dialFamilyBtn}
                    </button>
                  </div>

                  <div className="mb-4">
                    <input 
                      id="dialer-input"
                      type="tel"
                      value={dialNumber}
                      onChange={(e) => setDialNumber(e.target.value.replace(/[^0-9+*#]/g, ''))}
                      placeholder={lang === 'bn' ? 'ফোন নাম্বার লিখুন...' : 'Enter phone number...'}
                      className="w-full bg-black/50 border border-emerald-900 px-4 py-3 rounded-lg text-white font-mono tracking-wider focus:outline-none focus:border-emerald-400 placeholder-white/30 text-center text-lg"
                    />
                  </div>

                  <button 
                    id="initiate-call"
                    onClick={() => dialNumber.trim() && setActiveCallSim(dialNumber)}
                    disabled={!dialNumber.trim()}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 fill-white/20" /> {dict.dialCallActionBtn}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emergency Camera Dialog */}
      <AnimatePresence>
        {showCamera && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[55] flex flex-col justify-between p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-emerald-400 text-sm font-semibold flex items-center gap-2 text-left">
                <Camera className="w-4 h-4" /> {lang === 'bn' ? 'জরুরি ক্যামেরা স্ন্যাপশট' : 'Camera Access Simulator'}
              </h3>
              <button 
                id="close-camera"
                onClick={() => {
                  setShowCamera(false);
                  setImageCaptured(null);
                }}
                className="p-2 text-white bg-zinc-800 rounded-full hover:bg-zinc-700"
              >
                <X className="w-5 h-5"/>
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center relative overflow-hidden my-4 max-w-lg mx-auto w-full bg-zinc-950 rounded-2xl border border-emerald-900">
              {imageCaptured ? (
                <img src={imageCaptured} alt="Snapshot" className="h-full object-contain" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full relative">
                  <video 
                    id="camera-video-stream"
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover transform scale-x-[-1]"
                  />
                  <div className="absolute inset-x-0 bottom-4 flex justify-center">
                    <button 
                      id="shoot-photo"
                      onClick={capturePhoto}
                      className="w-14 h-14 rounded-full border-4 border-white bg-red-600 flex items-center justify-center focus:outline-none transition-transform active:scale-95 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-white text-transparent">Tap</div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-2 text-center text-xs text-white/50">
              {imageCaptured ? (
                <button 
                  id="retake-photo"
                  onClick={() => setImageCaptured(null)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-medium rounded-lg text-xs cursor-pointer"
                >
                  {lang === 'bn' ? 'আবার ছবি তুলুন' : 'Take another snapshot'}
                </button>
              ) : (
                lang === 'bn' ? 'জরুরি প্রয়োজনে ছবি তোলার সুবিধার জন্য ক্যামেরা সচল।' : 'Essential camera tools allowed for general convenience/security during overlay.'
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Column 1: Prayer Banner, Clock, and Big Countdown Timer */}
      <div className="flex-1 flex flex-col justify-between p-6 md:p-12 border-b md:border-b-0 md:border-r border-emerald-950/70 h-full overflow-y-auto text-center md:text-left">
        
        {/* Header bar */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse shrink-0" />
            <span className="font-mono text-xs tracking-widest text-emerald-400 font-bold bg-[#11241C] border border-emerald-900/60 px-3 py-1 rounded-full uppercase leading-none text-left">
              {dict.lockActiveStatusBadge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              id="toggle-sound"
              onClick={() => setMuteSound(!muteSound)}
              className="p-2 text-emerald-400 bg-[#11241C] border border-emerald-900/60 rounded-lg hover:text-white shrink-0 cursor-pointer"
              title={muteSound ? "Unmute Salah Alert" : "Mute Salah Alert"}
            >
              {muteSound ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <div className="text-right font-mono text-sm tracking-widest text-[#D4AF37] font-semibold bg-[#11241C] px-3 py-1 rounded-lg border border-emerald-900/60 shrink-0">
              {currentTime || "00:00:00"}
            </div>
          </div>
        </div>

        {/* Center: Masjid Arch and Big Timer */}
        <div className="my-auto py-8 text-center flex flex-col items-center">
          
          <div className="relative mb-6">
            {/* Elegant Vector Mosque Dome Overlay */}
            <div className="w-32 h-32 rounded-t-full border-t-4 border-x-4 border-[#D4AF37]/50 flex items-end justify-center pb-2 bg-gradient-to-b from-[#11241C]/30 to-transparent">
              <div className="text-[#D4AF37] text-4xl animate-bounce">🕌</div>
            </div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </div>
          </div>

          <p className="font-display text-emerald-400 font-medium tracking-wide uppercase text-sm mb-1 leading-none">
            {dict.lockCurrentSessionLabel}
          </p>
          <h1 className="font-display font-black text-white text-3xl md:text-5xl tracking-tight mb-2 drop-shadow-md select-all">
            {getPrayerName(activeSchedule.name, lang)} {lang === 'bn' ? 'সালাত' : 'Salah'}
          </h1>

          <div className="font-mono text-5xl md:text-7xl font-bold tracking-tight text-[#D4AF37] my-4 tabular-nums select-all">
            {formatCountdown(secondsRemaining)}
          </div>

          <span className="inline-flex bg-[#122A1F] text-emerald-300 font-sans font-medium text-xs rounded-full px-4 py-1.5 border border-emerald-800/80 mb-4 text-center">
            🔒 {dict.lockUnproductiveWarning} {activeSchedule.endTime}
          </span>

          <p className="text-zinc-400 text-sm max-w-sm border-t border-emerald-950/50 pt-2 text-center">
            {dict.lockAestheticNotice}
          </p>
        </div>

        {/* Bottom Menu: Simulated Emergency Utilities */}
        <div className="mt-4 text-left">
          <h4 className="font-display text-xs text-white/40 uppercase tracking-widest mb-3 font-semibold text-center md:text-left">
            {dict.allowedSystemBypassHeader}
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            
            <button 
              id="emergency-tool-flashlight"
              disabled={!allowedTools.includes('flashlight')}
              onClick={() => setFlashlightActive(!flashlightActive)}
              className="group p-3 bg-[#11241C] border border-emerald-900/60 hover:bg-[#1C3B2E] transition-all rounded-xl text-left flex flex-col justify-between gap-4 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400 w-fit group-hover:bg-emerald-500/25">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{dict.flashlightTool}</p>
                <p className="text-[10px] text-zinc-400">{dict.flashlightDesc}</p>
              </div>
            </button>

            <button 
              id="emergency-tool-calls"
              disabled={!allowedTools.includes('emergencyCall')}
              onClick={() => setShowEmergencyDialer(true)}
              className="group p-3 bg-[#11241C] border border-emerald-900/60 hover:bg-[#1C3B2E] transition-all rounded-xl text-left flex flex-col justify-between gap-4 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <div className="bg-red-500/10 p-2 rounded-lg text-red-400 w-fit group-hover:bg-red-500/25">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{dict.emergencyCallTool}</p>
                <p className="text-[10px] text-zinc-400">{dict.emergencyCallDesc}</p>
              </div>
            </button>

            <button 
              id="emergency-tool-dismiss"
              disabled={!allowedTools.includes('alarmDismiss')}
              onClick={() => {
                alert(lang === 'bn' ? "অ্যালার্ম সাময়িকভাবে স্তব্ধ করা হয়েছে।" : "Simulated alarm has been silenced.");
              }}
              className="group p-3 bg-[#11241C] border border-emerald-900/60 hover:bg-[#1C3B2E] transition-all rounded-xl text-left flex flex-col justify-between gap-4 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <div className="bg-orange-500/10 p-2 rounded-lg text-orange-400 w-fit group-hover:bg-orange-500/25">
                <BellOff className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{dict.alarmDismissTool}</p>
                <p className="text-[10px] text-zinc-400">{dict.alarmDismissDesc}</p>
              </div>
            </button>

            <button 
              id="emergency-tool-camera"
              disabled={!allowedTools.includes('camera')}
              onClick={() => setShowCamera(true)}
              className="group p-3 bg-[#11241C] border border-emerald-900/60 hover:bg-[#1C3B2E] transition-all rounded-xl text-left flex flex-col justify-between gap-4 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <div className="bg-blue-500/10 p-2 rounded-lg text-blue-400 w-fit group-hover:bg-blue-500/25">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{dict.cameraCaptureTool}</p>
                <p className="text-[10px] text-zinc-400">{dict.cameraCaptureDesc}</p>
              </div>
            </button>

          </div>
        </div>

      </div>

      {/* Main Column 2: Spiritual Rotating Cards + Reflection Bypass Wall */}
      <div className="flex-1 p-6 md:p-12 flex flex-col justify-between h-full bg-[#08100D] overflow-y-auto">
        
        {/* Top: Beautiful spiritual rotating cards */}
        <div className="my-auto max-w-lg mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeContent.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="bg-emerald-950/15 border border-emerald-900/40 p-8 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <BookOpen className="w-32 h-32" />
              </div>

              <div className="flex items-center gap-2 mb-6">
                <span className="bg-[#122E22] px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                  {activeContent.type === 'quran' 
                    ? (lang === 'bn' ? '📖 কুরআনুল কারীম' : '📖 Noble Quran') 
                    : activeContent.type === 'hadith' 
                      ? (lang === 'bn' ? '🤲 সহীহ হাদীস' : '🤲 Authentic Hadith') 
                      : (lang === 'bn' ? '💡 আত্মিক বাণী' : '💡 Serene Reminder')
                  }
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs text-emerald-400 font-mono">{activeContent.source}</span>
              </div>

              {activeContent.text && (
                <p dir="rtl" className="text-right text-emerald-100 font-serif text-2xl leading-relaxed mb-6 font-bold tracking-wide select-all">
                  {activeContent.text}
                </p>
              )}

              {renderSpiritualTranslation() && (
                <p className="text-left text-zinc-300 font-sans text-sm leading-relaxed border-l-2 border-[#D4AF37] pl-3 italic select-all">
                  "{renderSpiritualTranslation()}"
                </p>
              )}

              <div className="flex justify-between items-center mt-8 pt-4 border-t border-emerald-950/80">
                <span className="text-[10px] text-emerald-500/70 font-mono">{dict.rotatesNotice}</span>
                <button 
                  id="browse-spiritual-next"
                  onClick={() => setContentIndex((prev) => (prev + 1) % spiritualContent.length)}
                  className="text-xs text-[#D4AF37] hover:text-[#f3cd57] font-semibold flex items-center gap-1 bg-[#102B1E] px-3 py-1 rounded-full transition-colors cursor-pointer"
                >
                  {dict.skipPassageBtn} <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom: Exit Reflection Bypass Mechanism (instead of simple bypass) */}
        <div className="mt-8 pt-6 border-t border-emerald-950/70 max-w-lg mx-auto w-full text-left">
          {!showExitWall ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-emerald-950/10 border border-emerald-950 px-4 py-3 rounded-xl">
              <div>
                <p className="text-xs text-white font-semibold">{lang === 'bn' ? 'জরুরি প্রস্থান প্রয়োজন?' : 'Emergency exit required?'}</p>
                <p className="text-[10px] text-zinc-400">{lang === 'bn' ? 'অর্গুলার লক ভাঙতে আত্ম-সচেতনতা ফিল্টার অতিক্রম করুন।' : 'Unrestricted system requires deep conscious action.'}</p>
              </div>
              <button 
                id="initiate-emergency-bypass"
                onClick={() => {
                  setShowExitWall(true);
                  setExitError('');
                }}
                className="text-xs text-red-400 hover:text-red-300 font-bold bg-red-950/20 border border-red-900/30 px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                {dict.confirmBypassBtn}
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#121E19] border border-red-950/50 p-6 rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-3 text-red-400">
                <ShieldAlert className="w-5 h-5 shrink-0 animate-pulse" />
                <h4 className="font-display font-bold text-sm">{dict.reflectionTitle}</h4>
              </div>
              
              <p className="text-xs text-zinc-300 mb-4 leading-relaxed">
                {dict.reflectionDesc}
              </p>

              <form onSubmit={handleBypassSubmit}>
                <div className="mb-3">
                  <textarea 
                    id="bypass-reflection-input"
                    value={reflectText}
                    onChange={(e) => {
                      setReflectText(e.target.value);
                      if (e.target.value.trim().length >= 15) {
                        setExitError('');
                      }
                    }}
                    placeholder={dict.reflectionPlaceholder}
                    className="w-full bg-black/60 border border-emerald-900/60 rounded-xl px-3 py-2 text-xs text-[#10B981] placeholder-white/20 h-20 focus:outline-none focus:border-red-900 leading-normal"
                  />
                  {exitError && (
                    <p id="bypass-reflection-error" className="text-[10px] text-red-400 font-semibold mt-1">⚠️ {exitError}</p>
                  )}
                </div>

                <div className="flex gap-2 justify-end">
                  <button 
                    id="cancel-bypass"
                    type="button"
                    onClick={() => setShowExitWall(false)}
                    className="px-3 py-1.5 text-zinc-400 hover:text-white text-xs font-semibold cursor-pointer"
                  >
                    {dict.returnToPrayerBtn}
                  </button>
                  <button 
                    id="confirm-bypass"
                    type="submit"
                    className="px-4 py-1.5 bg-red-800 text-white font-bold text-xs rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    {dict.confirmBypassBtn}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
