import { Current } from "./current";
import { Location } from "./location";

export interface WeatherApiResponse {
  location: Location;
  current: Current;
}
