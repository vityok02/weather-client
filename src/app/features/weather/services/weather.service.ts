import { AstronomyResponse } from './../models/astronomy/astronomy-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { WeatherApiResponse } from '../models/weather/weather-api-response';
import { SearchLocation } from '../models/weather/search-location';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getWeather(latitude: number, longitude: number, days: number = 1, language?: string): Observable<WeatherApiResponse> {
    let params = new HttpParams()
      .set('key', environment.apiKey)
      .set('q', `${latitude},${longitude}`)
      .set('days', '7')
      .set('aqi', 'no')
      .set('alerts', 'no');

    if (language) {
      params = params.set('lang', language);
    }

    const url = `${environment.weatherApiUrl}/forecast.json`;

    return this.httpClient.get<WeatherApiResponse>(url, { params });
  }

  getSuggestions(query: string): Observable<SearchLocation[]> {
    let params = new HttpParams()
      .set('key', environment.apiKey)
      .set('q', query);

    const url = `${environment.weatherApiUrl}/search.json`;

    return this.httpClient.get<SearchLocation[]>(url, { params });
  }

  getAstronomy(latitude: number, longitude: number): Observable<AstronomyResponse> {
    const path = `${environment.weatherApiUrl}/astronomy.json?key=${environment.apiKey}&q=${latitude},${longitude}`;

    return this.httpClient.get<AstronomyResponse>(path);
  }
}
