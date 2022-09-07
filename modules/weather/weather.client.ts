import type { ForecastApiResponse } from '../../interfaces/';

export type ForecastRequest = {
  lat: number;
  lon: number;
};

const baseUrl = '/api';

export const get5DayForecast = async (params?: ForecastRequest) => {
  try {
    if (!params) return null;
    const resp = await fetch(
      `${baseUrl}/forecast?lat=${params.lat}&lon=${params.lon}`,
    );
    const data: ForecastApiResponse = await resp.json();
    return data;
  } catch (error) {
    return null;
  }
};
