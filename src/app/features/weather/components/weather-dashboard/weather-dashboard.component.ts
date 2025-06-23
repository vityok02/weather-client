import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';

import { WeatherApiResponse } from '../../models/weather/weather-api-response';
import { SearchLocation } from '../../models/weather/search-location';
import { HourlyWeather } from '../../models/weather/hourly-weather';

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

        const hours = this.getHours();
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
}
