import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayForecastComponent } from './today-forecast.component';

describe('TodayForecastComponent', () => {
  let component: TodayForecastComponent;
  let fixture: ComponentFixture<TodayForecastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodayForecastComponent]
    });
    fixture = TestBed.createComponent(TodayForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
