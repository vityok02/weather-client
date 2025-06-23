import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastSummaryComponent } from './forecast-summary.component';

describe('ForecastSummaryComponent', () => {
  let component: ForecastSummaryComponent;
  let fixture: ComponentFixture<ForecastSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForecastSummaryComponent]
    });
    fixture = TestBed.createComponent(ForecastSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
