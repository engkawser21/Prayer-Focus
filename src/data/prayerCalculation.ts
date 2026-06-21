/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CityPreset } from '../types';

export const cityPresets: CityPreset[] = [
  {
    name: "Mecca",
    country: "Saudi Arabia",
    latitude: 21.3891,
    longitude: 39.8579,
    prayerOffsets: {
      Fajr: "04:45",
      Dhuhr: "12:25",
      Asr: "15:45",
      Maghrib: "19:05",
      Isha: "20:35"
    }
  },
  {
    name: "Cairo",
    country: "Egypt",
    latitude: 30.0444,
    longitude: 31.2357,
    prayerOffsets: {
      Fajr: "04:15",
      Dhuhr: "12:00",
      Asr: "15:35",
      Maghrib: "18:55",
      Isha: "20:25"
    }
  },
  {
    name: "Jakarta",
    country: "Indonesia",
    latitude: -6.2088,
    longitude: 106.8456,
    prayerOffsets: {
      Fajr: "04:35",
      Dhuhr: "11:50",
      Asr: "15:15",
      Maghrib: "17:48",
      Isha: "19:02"
    }
  },
  {
    name: "London",
    country: "United Kingdom",
    latitude: 51.5074,
    longitude: -0.1278,
    prayerOffsets: {
      Fajr: "03:45",
      Dhuhr: "13:05",
      Asr: "17:15",
      Maghrib: "21:20",
      Isha: "22:45"
    }
  },
  {
    name: "New York",
    country: "United States",
    latitude: 40.7128,
    longitude: -74.0060,
    prayerOffsets: {
      Fajr: "04:30",
      Dhuhr: "12:58",
      Asr: "16:55",
      Maghrib: "20:30",
      Isha: "22:00"
    }
  },
  {
    name: "Kuala Lumpur",
    country: "Malaysia",
    latitude: 3.1390,
    longitude: 101.6869,
    prayerOffsets: {
      Fajr: "05:45",
      Dhuhr: "13:15",
      Asr: "16:40",
      Maghrib: "19:25",
      Isha: "20:40"
    }
  },
  {
    name: "Dhaka",
    country: "Bangladesh",
    latitude: 23.8103,
    longitude: 90.4125,
    prayerOffsets: {
      Fajr: "03:45",
      Dhuhr: "12:05",
      Asr: "15:35",
      Maghrib: "18:50",
      Isha: "20:15"
    }
  },
  {
    name: "Istanbul",
    country: "Turkey",
    latitude: 41.0082,
    longitude: 28.9784,
    prayerOffsets: {
      Fajr: "04:05",
      Dhuhr: "13:08",
      Asr: "17:02",
      Maghrib: "20:40",
      Isha: "22:15"
    }
  }
];

// Utility to shift prayer times slightly for simulated dynamic times or location shifts.
export function generateTimesWithOffset(baseCity: CityPreset, latShift: number, lonShift: number) {
  const diffInMinutes = Math.floor((latShift + lonShift) * 4); // roughly 4 min per degree longitude
  
  const addMinutes = (timeStr: string, minutesToAdd: number): string => {
    const [h, m] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m, 0);
    const newDate = new Date(date.getTime() + minutesToAdd * 60000);
    const nh = String(newDate.getHours()).padStart(2, '0');
    const nm = String(newDate.getMinutes()).padStart(2, '0');
    return `${nh}:${nm}`;
  };

  return {
    Fajr: addMinutes(baseCity.prayerOffsets.Fajr, diffInMinutes),
    Dhuhr: addMinutes(baseCity.prayerOffsets.Dhuhr, diffInMinutes),
    Asr: addMinutes(baseCity.prayerOffsets.Asr, diffInMinutes),
    Maghrib: addMinutes(baseCity.prayerOffsets.Maghrib, diffInMinutes),
    Isha: addMinutes(baseCity.prayerOffsets.Isha, diffInMinutes),
  };
}
