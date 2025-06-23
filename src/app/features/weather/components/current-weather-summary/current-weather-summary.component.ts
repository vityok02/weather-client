import { Current } from '../../models/weather/current';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-current-weather-summary',
  templateUrl: './current-weather-summary.component.html',
  styleUrls: ['./current-weather-summary.component.css']
})

export class CurrentWeatherDetailsComponent {
  @Input() currentWeather!: Current;
}
