import { Component, Input } from '@angular/core';
import { DaySummary } from '../../models/weather/day-summary';

@Component({
  selector: 'app-forecast-summary',
  templateUrl: './forecast-summary.component.html',
  styleUrls: ['./forecast-summary.component.css']
})

export class ForecastSummaryComponent {
  @Input() forecast!: DaySummary;
}
