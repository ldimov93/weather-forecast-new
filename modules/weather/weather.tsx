import { CurrentWeather } from "../../components/weather";
import { DailyForecast, HourlyForecast } from "../../components/forecast";
import { useState, useEffect } from "react";
import { useForecast } from "./weather.store";
import { format } from "date-fns";
import { Spinner } from "../../components/spinner";

type Location = {
  lat: number;
  lon: number;
};

const unit = "C";
const getMinMaxTemps = (min: number, max: number) =>
  `${Math.floor(min)}º${unit} - ${Math.ceil(max)}º${unit}`;

const updateWeather = (setLocation: (location: Location) => void) => {
  navigator.geolocation.getCurrentPosition((geoLocationPosition) => {
    setLocation({
      lat: geoLocationPosition.coords.latitude,
      lon: geoLocationPosition.coords.longitude,
    });
  });
};

export const WeatherPage = () => {
  const [location, setLocation] = useState<Location>();
  const [currentWeekday, setWeekday] = useState(0);
  const { isLoading, data, isFetching } = useForecast(location);

  useEffect(() => updateWeather(setLocation), [setLocation]);

  if (isLoading) {
    return <Spinner />;
  }

  if (data?.message) {
    return <span>{data.message}</span>;
  }

  const current = data?.list?.[0];
  const region = data ? `${data.city.name}, ${data.city.country}` : null;

  const forecast =
    data?.list?.map((forecast, i) => ({
      temperatures: getMinMaxTemps(
        forecast.main.temp_min,
        forecast.main.temp_max
      ),
      active: i == currentWeekday,
      setCurrent: () => setWeekday(i),
      description: forecast.weather[0]?.description,
      icon: forecast.weather[0]?.icon,
      date: format(new Date(forecast.dt * 1000), "y-MM-dd"),
      weekday: format(new Date(forecast.dt * 1000), "EEEE"),
      dt: forecast.dt,
      dt_txt: forecast.dt_txt,
    })) || [];

  const dailyForecast = forecast.reduce((acc, current) => {
    const x = acc.find((item) => item.date === current.date);

    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const hourlyForecast =
    data?.list
      .filter(
        (ele) =>
          format(new Date(ele.dt * 1000), "y-MM-dd") ===
          format(new Date(data?.list[currentWeekday].dt * 1000), "y-MM-dd")
      )
      .map((forecast, i) => ({
        temperatures: getMinMaxTemps(
          forecast.main.temp_min,
          forecast.main.temp_max
        ),
        temp: `${Math.round(forecast.main.temp)}º${unit}`,
        minTemp: forecast.main.temp_min,
        maxTemp: forecast.main.temp_max,
        active: i == currentWeekday,
        setCurrent: () => setWeekday(i),
        description: forecast.weather[0]?.description,
        icon: forecast.weather[0]?.icon,
        dt: forecast.dt,
        dt_txt: forecast.dt_txt,
        hour: format(new Date(forecast.dt * 1000), "p"),
        wind: forecast.wind.speed,
        rain: Math.round(forecast.pop * 100),
      })) || [];

  return (
    <div data-testid="weather-wrapper" className="max-w-5xl mx-auto">
      {location && (
        <CurrentWeather
          temperature={Math.round(current?.main?.temp || 0)}
          unit={unit}
          location={region}
          feelsLike={Math.round(current?.main?.feels_like || 0)}
          rain={current?.rain?.["3h"] || 0}
          chance={Math.round(current?.pop * 100) || 0}
          description={current?.weather[0].description || ""}
          icon={current?.weather[0].icon || ""}
        />
      )}

      {dailyForecast.length > 0 && (
        <DailyForecast forecast={dailyForecast} isFetching={isFetching} />
      )}

      {hourlyForecast.length > 0 && (
        <HourlyForecast forecast={hourlyForecast} isFetching={isFetching} />
      )}
    </div>
  );
};
