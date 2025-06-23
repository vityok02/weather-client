import { HourlyWeather } from "./hourly-weather";
import { DaySummary } from "./day-summary";

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: DaySummary;
  hour: HourlyWeather[];
}
