/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PrayerSchedule {
  id: string;
  name: string;
  startTime: string; // "HH:MM" (24-hour format)
  endTime: string;   // "HH:MM" (24-hour format)
  enabled: boolean;
  activeDays: number[]; // 0 for Sunday, 1 for Monday, etc.
  isCustom: boolean;
}

export interface PrayerLog {
  id: string;
  date: string; // "YYYY-MM-DD"
  prayerId: string;
  prayerName: string;
  status: 'completed' | 'later' | 'missed';
  timestamp: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'en' | 'bn';
  translation: 'en' | 'bn' | 'none';
  allowedEmergencyTools: ('flashlight' | 'emergencyCall' | 'alarmDismiss' | 'camera')[];
  strictBlockerEnabled: boolean;
  preventCasualBypass: boolean;
}

export interface SpiritualItem {
  id: string;
  text: string;
  translation?: string;
  translationBn?: string;
  source: string; // e.g., "Quran 29:45" or "Sahih al-Bukhari"
  type: 'quran' | 'hadith' | 'reminder';
}

export interface CityPreset {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  prayerOffsets: {
    Fajr: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  };
}
