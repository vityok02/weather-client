import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchLocation } from '../../models/weather/search-location';
import { WeatherService } from '../../services/weather.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})

export class WeatherSearchComponent {
  @Input() location!: SearchLocation | null;
  @Output() searchLocation = new EventEmitter<SearchLocation>();
  suggestions: SearchLocation[] = [];

  constructor(private weatherService: WeatherService) { }

  search(event: AutoCompleteCompleteEvent) {
    this.weatherService.getSuggestions(event.query).subscribe({
      next: suggestions => {
        this.suggestions = suggestions.map(s => ({
          ...s,
          fullName: `${s.name}, ${s.region}, ${s.country}`
        }));
      }
    })
  }

  onSubmit() {
    if (this.location) {
      this.searchLocation.emit(this.location);
    }
  }
}
