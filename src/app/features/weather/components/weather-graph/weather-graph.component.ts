import { Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { HourlyWeather } from '../../models/weather/hourly-weather';

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

  get hourlyWeather(): HourlyWeather[] {
    return this._hourlyWeather;
  }

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

  private updateChart() {
    this.chartData.labels = this.hourlyWeather.map(h => h.time.split(' ')[1]);
    this.chartData.datasets[0].data = this.hourlyWeather.map(h => h.temp_c);
  }
}
