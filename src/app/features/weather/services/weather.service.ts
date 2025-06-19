import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Current } from '../models/current';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { WeatherApiResponse } from '../models/weather-api-response';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(city: string): Observable<WeatherApiResponse>{
    const path = `${environment.weatherApiUrl}/current.json?key=${environment.apiKey}&q=${city}`;

    return this.httpClient.get<WeatherApiResponse>(path);
  }
}
