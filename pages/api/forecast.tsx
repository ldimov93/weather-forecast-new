import type { NextApiRequest, NextApiResponse } from "next";
import { ForecastApiResponse } from "../../interfaces/";

const apiKey = process.env.openWeatherKey || "";
const baseUrl = "https://api.openweathermap.org/data/2.5";
const units = "metric"; // Temperature in Kelvin by default
const isNotNullOrUndefined = <T extends Object>(
  input: null | undefined | T
): input is T => input != null;

const getForecastByCoords = async (lat: number, lon: number) => {
  const paramsObj = {
    lat: `${lat}`,
    lon: `${lon}`,
    appid: apiKey,
    units: units,
  };
  const searchParams = new URLSearchParams(paramsObj);
  const forecastUrl = new URL(`${baseUrl}/forecast?${searchParams}`);

  try {
    const resp = await fetch(forecastUrl.href);
    const data: ForecastApiResponse = await resp.json();
    return data;
  } catch (error) {
    return null;
  }
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ForecastApiResponse>
) {
  const lat = parseFloat(`${_req.query?.lat}`);
  const lon = parseFloat(`${_req.query?.lon}`);

  if (isNaN(lat) || isNaN(lon)) return res.status(400);

  let data = await getForecastByCoords(lat, lon);
  if (data == null) return res.status(500);

  data.list = data?.list
    ?.filter(isNotNullOrUndefined);

  res.status(200).json(data);
}
