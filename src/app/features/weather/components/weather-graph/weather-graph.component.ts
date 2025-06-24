import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { HourlyWeather } from '../../models/weather/hourly-weather';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { BaseChartDirective } from 'ng2-charts';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-weather-graph',
  templateUrl: './weather-graph.component.html',
  styleUrls: ['./weather-graph.component.css']
})
export class WeatherGraphComponent {
  private _hourlyWeather: HourlyWeather[] = [];

  @Input() set hourlyWeather(value: HourlyWeather[]) {
    this._hourlyWeather = value;
    this.updateChart();
  }

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  get hourlyWeather(): HourlyWeather[] {
    return this._hourlyWeather;
  }

  get parameters() {
    return [
      { label: this.translateService.instant('weather.hourly_forecast.chart.parameters.temperature'), value: 'Temperature' },
      { label: this.translateService.instant('weather.hourly_forecast.chart.parameters.wind_speed'), value: 'Wind Speed' },
    ];
  }

  selectedParameter: string = 'Temperature';

  chartData: ChartConfiguration<'line'>['data'] = {
    labels: this.hourlyWeather.map(h => h.time.split(' ')[1]),
    datasets: [
      {
        data: this.hourlyWeather.map(h => h.temp_c),
        label: 'Temperature °C',
        fill: true,
        tension: 0.4,
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66,165,245,0.3)',
      },
    ]
  };

  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(private translateService: TranslateService) { }

  setChartParameter(event: DropdownChangeEvent) {
    this.selectedParameter = event.value;
    this.updateChart();
  }

  private updateChart() {
    this.chartData.labels = this.hourlyWeather.map(h => h.time.split(' ')[1]);

    if (this.selectedParameter === 'Temperature') {
      this.chartData.datasets[0].data = this.hourlyWeather.map(h => h.temp_c);
      this.chartData.datasets[0].label = this.translateService.instant('weather.hourly_forecast.chart.parameters.temperature') + ' °C';
    } else if (this.selectedParameter === 'Wind Speed') {
      this.chartData.datasets[0].data = this.hourlyWeather.map(h => h.wind_kph);
      this.chartData.datasets[0].label = this.translateService.instant('weather.hourly_forecast.chart.parameters.wind_speed') + ' kph';
    }

    this.chart?.update();
  }
}
