import { HttpClient } from '@angular/common/http';
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

  getWeather(latitude: number, longitude: number, days: number = 1): Observable<WeatherApiResponse> {
    const path = `${environment.weatherApiUrl}/forecast.json?key=${environment.apiKey}&q=${latitude},${longitude}&days=${days}&aqi=no&alerts=no`;

    return this.httpClient.get<WeatherApiResponse>(path)
  }

  getSuggestions(query: string): Observable<SearchLocation[]> {
    const path = `${environment.weatherApiUrl}/search.json?key=${environment.apiKey}&q=${query}`;

    return this.httpClient.get<SearchLocation[]>(path)
  }
}
