import { Component, Input } from '@angular/core';
import { Forecast } from '../../models/weather/forecast';

@Component({
  selector: 'app-weekly-forecast',
  templateUrl: './weekly-forecast.component.html',
  styleUrls: ['./weekly-forecast.component.css']
})

export class WeeklyForecastComponent {
  @Input() forecast!: Forecast;
}
