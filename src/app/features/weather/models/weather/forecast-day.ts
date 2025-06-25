import { HourlyWeather } from "./hourly-weather";
import { DaySummary } from "./day-summary";
import { Astro } from "../astronomy/astro";

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: DaySummary;
  astro: Astro;
  hour: HourlyWeather[];
}
