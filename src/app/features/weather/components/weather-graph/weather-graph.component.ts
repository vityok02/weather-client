import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { HourlyWeather } from '../../models/weather/hourly-weather';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { BaseChartDirective } from 'ng2-charts';
import { TranslateService } from '@ngx-translate/core';
import { GraphOptions } from '../../models/graph-options';

@Component({
  selector: 'app-weather-graph',
  templateUrl: './weather-graph.component.html',
  styleUrls: ['./weather-graph.component.css']
})
export class WeatherGraphComponent implements OnInit {
  private _hourlyWeather: HourlyWeather[] = [];

  @Input() set hourlyWeather(value: HourlyWeather[]) {
    this._hourlyWeather = value;
  }

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  get hourlyWeather(): HourlyWeather[] {
    return this._hourlyWeather;
  }

  parameters: Option[] | undefined;
  selectedParameter: Option | undefined;

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

  ngOnInit() {
    this.loadParameters();
    this.translateService.onLangChange.subscribe(() => this.loadParameters());
  }

  private loadParameters() {
    this.translateService.get([
      'weather.hourly_forecast.chart.parameters.temperature',
      'weather.hourly_forecast.chart.parameters.wind_speed'
    ]).subscribe(translations => {
      this.parameters = [
        { label: translations['weather.hourly_forecast.chart.parameters.temperature'], value: GraphOptions.Temperature },
        { label: translations['weather.hourly_forecast.chart.parameters.wind_speed'], value: GraphOptions.WindSpeed }
      ];

      // Якщо selectedParameter вже вибраний — оновлюємо label
      if (this.selectedParameter) {
        const updated = this.parameters.find(p => p.value === this.selectedParameter!.value);
        if (updated) this.selectedParameter = updated;
      } else {
        this.selectedParameter = this.parameters[0];
      }

      this.updateChart();
    });
  }

  setChartParameter(event: DropdownChangeEvent) {
    this.selectedParameter = this.parameters!.find(p => p.value === event.value.value) || this.parameters![0];
    this.updateChart();
  }

  private updateChart() {
    this.chartData.labels = this.hourlyWeather.map(h => h.time.split(' ')[1]);

    if (this.selectedParameter?.value === GraphOptions.Temperature) {
      this.chartData.datasets[0].data = this.hourlyWeather.map(h => h.temp_c);
      this.chartData.datasets[0].label = this.translateService.instant('weather.hourly_forecast.chart.parameters.temperature') + ' °C';
      this.chartData.datasets[0].backgroundColor = 'rgba(255, 251, 0, 0.51)';
    } else if (this.selectedParameter?.value === GraphOptions.WindSpeed) {
      this.chartData.datasets[0].data = this.hourlyWeather.map(h => h.wind_kph);
      this.chartData.datasets[0].label = this.translateService.instant('weather.hourly_forecast.chart.parameters.wind_speed') + ' kph';
      this.chartData.datasets[0].backgroundColor = 'rgba(0, 132, 255, 0.5)';
    }

    this.chart?.update();
  }
}

interface Option {
  label: string;
  value: string;
}
