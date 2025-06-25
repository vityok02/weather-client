import { WeatherGraphComponent } from './features/weather/components/weather-graph/weather-graph.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherDashboardComponent } from './features/weather/components/weather-dashboard/weather-dashboard.component';
import { WeatherSearchComponent } from './features/weather/components/weather-search/weather-search.component';
import { ButtonModule } from 'primeng/button';
import { CurrentWeatherDetailsComponent } from './features/weather/components/current-weather-summary/current-weather-summary.component';
import { ForecastSummaryComponent } from './features/weather/components/forecast-summary/forecast-summary.component';
import { HourlyForecastComponent } from './features/weather/components/hourly-forecast/hourly-forecast.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppMissingTranslationHandler } from './core/services/missing-translation.handler.ts.service';
import { LanguageSwitcherComponent } from './features/weather/components/language-switcher/language-switcher.component';
import { WeeklyForecastComponent } from './features/weather/components/weekly-forecast/weekly-forecast.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    WeatherDashboardComponent,
    WeatherSearchComponent,
    WeatherGraphComponent,
    CurrentWeatherDetailsComponent,
    ForecastSummaryComponent,
    HourlyForecastComponent,
    LanguageSwitcherComponent,
    WeeklyForecastComponent
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
    DropdownModule,
    SelectButtonModule,
    ScrollPanelModule,
    TranslateModule.forRoot({
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: AppMissingTranslationHandler
      },
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
