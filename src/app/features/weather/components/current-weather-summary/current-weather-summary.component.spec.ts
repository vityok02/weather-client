import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherDetailsComponent } from './current-weather-summary.component';

describe('CurrentWeatherDetailsComponent', () => {
  let component: CurrentWeatherDetailsComponent;
  let fixture: ComponentFixture<CurrentWeatherDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentWeatherDetailsComponent]
    });
    fixture = TestBed.createComponent(CurrentWeatherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
