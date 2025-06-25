import { Component, OnInit } from '@angular/core';

import { WeatherService } from './../../services/weather.service';
import { WeatherApiResponse } from '../../models/weather/weather-api-response';
import { SearchLocation } from '../../models/weather/search-location';
import { HourlyWeather } from '../../models/weather/hourly-weather';
import { BackgroundService } from '../../services/background.service';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css']
})

export class WeatherDashboardComponent implements OnInit {
  weatherResponse!: WeatherApiResponse;
  hasError: boolean = false;
  location: SearchLocation | null = null;
  locationStr: string = '';
  currentLanguage: string = 'en';

  get todayForecast() {
    return this.weatherResponse?.forecast?.forecastday?.[0]?.day;
  }

  constructor(
    private weatherService: WeatherService,
    private backgroundService: BackgroundService) { }

  switchLanguage(language: string) {
    this.currentLanguage = language;
    this.loadWeather();
  }

  onSearchLocation(location: SearchLocation) {
    this.location = location;
    this.loadWeather();
  }

  ngOnInit() {
    const saved = localStorage.getItem('location');
    if (saved) {
    this.location = JSON.parse(saved);
    } else {
      this.location = { lat: 50.45, lon: 30.52, name: 'Kyiv' } as SearchLocation;
    }
    this.loadWeather();
  }

  loadWeather() {
    if (!this.location) {
      return;
    }

    this.weatherService.getWeather(this.location?.lat, this.location?.lon, 7, this.currentLanguage).subscribe({
      next: (data) => {
        console.log('Weather data loaded:', data);

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

  getHours(): HourlyWeather[] {
    const hours: HourlyWeather[] = this.weatherResponse.forecast.forecastday[0].hour
      .filter(h => h.time_epoch > this.weatherResponse.current.last_updated_epoch)

    const nextDayHours = this.weatherResponse.forecast.forecastday[1].hour
      .slice(0, 24 - hours.length);

    hours.push(...nextDayHours);

    return hours;
  }

  getBackgroundImagePath(): string {
    return this.backgroundService
      .getBackgroundImagePath(this.weatherResponse.forecast.forecastday[0].astro);
  }
}
