import { Spinner } from "flowbite-react";
import Image from "next/image";

type WeatherProps = {
  temperature: number;
  unit: string;
  location: string;
  feelsLike: number;
  rain: number;
  chance: number;
  description: string;
  icon: string;
};

export const CurrentWeather = (props: WeatherProps) => {
  return (
    <div className="mt-16 mb-8 ml-4 mr-4">
      <h1 className="mb-4 text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 md:text-2xl lg:text-3xl">
        Current weather in {props.location ? props.location : <Spinner />}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center mb-4 pl-6 pr-6 pt-3 pb-3 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            {props.temperature}º{props.unit}
          </span>
        </h1>
        {props.icon && (
          <div className="flex items-center">
            <Image
              src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}
              width="50px"
              height="50px"
              alt="Weather icon"
            />
            <p>{props.description}</p>
          </div>
        )}
        <div className="flex flex-col">
          <div className="font-normal uppercase text-gray-700 dark:text-gray-400">
            Feels like
          </div>
          <div>
            {props.feelsLike}º{props.unit}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="font-normal uppercase text-gray-700 dark:text-gray-400">
            Precipitation
          </div>
          <div>{props.rain} mm</div>
        </div>
      </div>
    </div>
  );
};
