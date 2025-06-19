import { Current } from '../../models/current';
import { WeatherApiResponse } from '../../models/weather-api-response';
import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css']
})

export class WeatherDashboardComponent implements OnInit {
  weather!: WeatherApiResponse;
  hasError: boolean = false;
  location: string = '';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.loadWeather();
  }

  loadWeather() {
    this.weatherService.getCurrentWeather(this.location).subscribe({
      next: (data) => {
        this.weather = data;
        this.hasError = false;
      },
      error: (error) => {
        console.error('Error fetching weather data:', error);
        this.hasError = true;
      }
    });
  }
}
