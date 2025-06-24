import { Injectable } from '@angular/core';
import { Astro } from '../models/astronomy/astro';

@Injectable({
  providedIn: 'root'
})

export class BackgroundService {
  getBackgroundImagePath(astronomy: Astro): string {
    const now = new Date();

    const parseTime = (timeStr: string) => {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (modifier === 'PM' && hours !== 12) {
        hours += 12;
      }
      if (modifier === 'AM' && hours === 12) {
        hours = 0;
      }
      return { hours, minutes };
    }

    const sunrise = parseTime(astronomy.sunrise);
    const sunset = parseTime(astronomy.sunset);

    const sunriseDate = new Date(now);
    sunriseDate.setHours(sunrise.hours, sunrise.minutes, 0);

    const sunsetDate = new Date(now);
    sunsetDate.setHours(sunset.hours, sunset.minutes, 0);

    const sunsetStart = new Date(sunsetDate);
    sunsetStart.setHours(sunsetStart.getHours() - 1);
    const sunsetEnd = new Date(sunsetDate);
    sunsetEnd.setHours(sunsetEnd.getHours() + 1);

    const isSunset = now >= sunsetStart && now <= sunsetEnd;
    const isDaytime = now >= sunriseDate && now < sunsetDate && !isSunset;

    switch (true) {
      case isSunset:
        return "assets/images/sunset.jpg";
      case !isDaytime:
        return "assets/images/night.jpg";
      case isDaytime:
        return "assets/images/day.jpg";
      default:
        return "assets/images/day.jpg";
    }
  }
}
