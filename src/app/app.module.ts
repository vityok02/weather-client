import { WeatherGraphComponent } from './features/weather/components/weather-graph/weather-graph.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherDashboardComponent } from './features/weather/components/weather-dashboard/weather-dashboard.component';
import { WeatherSearchComponent } from './features/weather/components/weather-search/weather-search.component';
import { ButtonModule } from 'primeng/button';
import { CurrentWeatherDetailsComponent } from './features/weather/components/current-weather-summary/current-weather-summary.component';
import { TodayForecastComponent } from './features/weather/components/today-forecast/today-forecast.component';
import { ForecastSummaryComponent } from './features/weather/components/forecast-summary/forecast-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherDashboardComponent,
    WeatherSearchComponent,
    WeatherGraphComponent,
    CurrentWeatherDetailsComponent,
    TodayForecastComponent,
    ForecastSummaryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AutoCompleteModule,
    ButtonModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
