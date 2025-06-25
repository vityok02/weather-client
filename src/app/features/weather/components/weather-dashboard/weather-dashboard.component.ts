import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';

import { WeatherApiResponse } from '../../models/weather/weather-api-response';
import { SearchLocation } from '../../models/weather/search-location';
import { HourlyWeather } from '../../models/weather/hourly-weather';
import { AstronomyResponse } from '../../models/astronomy/astronomy-response';
import { BackgroundService } from '../../services/background.service';
import { TranslateService } from '@ngx-translate/core';

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
      this.loadWeather();
      this.loadAstronomy();
    }
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
    return this.backgroundService
      .getBackgroundImagePath(this.astronomyResponse.astronomy.astro);
  }
}
