import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';

import { WeatherApiResponse } from '../../models/weather/weather-api-response';
import { SearchLocation } from '../../models/weather/search-location';
import { HourlyWeather } from '../../models/weather/hourly-weather';
import { AstronomyResponse } from '../../models/astronomy/astronomy-response';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css']
})

export class WeatherDashboardComponent implements OnInit {
  weatherResponse!: WeatherApiResponse;
  astronomyResponse!: AstronomyResponse;
  hasError: boolean = false;
  location: SearchLocation | null = null;
  locationStr: string = '';

  get todayForecast() {
    return this.weatherResponse?.forecast?.forecastday?.[0]?.day;
  }

  get feelsLikeTemp() {
    return this.weatherResponse?.current?.feelslike_c;
  }

  constructor(private weatherService: WeatherService) { }

  onSearchLocation(location: SearchLocation) {
    this.location = location;
    this.loadWeather();
  }

  ngOnInit() {
    const saved = localStorage.getItem('location');
    if (saved) {
      this.location = JSON.parse(saved);
      this.loadWeather();
      this.loadAstronomy();
    }
  }

  loadWeather() {
    if (!this.location) {
      return;
    }

    this.weatherService.getWeather(this.location?.lat, this.location?.lon, 2).subscribe({
      next: (data) => {
        this.weatherResponse = data;
        this.hasError = false;
        localStorage.setItem('location', JSON.stringify(this.location));
      },
      error: (error) => {
        console.error('Error fetching weather data:', error);
        this.weatherResponse = null!;
        this.hasError = true;
      }
    });
  }

  loadAstronomy() {
    if (!this.location) {
      return;
    }

    this.weatherService.getAstronomy(this.location?.lat, this.location?.lon).subscribe({
      next: (data) => {
        this.astronomyResponse = data;
        this.hasError = false;
      },
      error: (error) => {
        console.error('Error fetching astronomy data:', error);
        this.astronomyResponse = null!;
        this.hasError = true;
      }
    });
  }

  getHours(): HourlyWeather[] {
    const hours: HourlyWeather[] = this.weatherResponse.forecast.forecastday[0].hour
      .filter(h => h.time_epoch > this.weatherResponse.current.last_updated_epoch)

    const nextDayHours = this.weatherResponse.forecast.forecastday[1].hour
      .slice(0, 24 - hours.length);

    hours.push(...nextDayHours);

    return hours;
  }

  getBackgroundImagePath(): string {
    const astronomy = this.astronomyResponse?.astronomy?.astro;
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
