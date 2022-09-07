import { useQuery } from 'react-query';
import { get5DayForecast } from './weather.client';
import type { ForecastRequest } from './weather.client';

export const useForecast = (location?: ForecastRequest) =>
  useQuery('forecast', () => get5DayForecast(location), { enabled: !!location });
