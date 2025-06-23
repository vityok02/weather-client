import { HourlyWeather } from './../../models/weather/hourly-weather';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.css']
})

export class HourlyForecastComponent {
  @Input() hourlyWeather: HourlyWeather[] = [];
}
