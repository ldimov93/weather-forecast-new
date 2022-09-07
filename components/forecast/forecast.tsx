import Image from "next/image";

export type ForecastItemProps = {
  active: boolean;
};

export type Forecast = {
  weekday?: string;
  temperatures: string;
  setCurrent: () => void;
  active: boolean;
  dt?: number;
  dt_txt: string;
  minTemp: number;
  maxTemp: number;
  description: string;
  icon: string;
  wind: number;
  hour?: string;
  rain?: number;
  temp?: string;
  date?: string;
};

type ForecastProps = {
  forecast: Forecast[];
  isFetching: boolean;
};

export const DailyForecast = (props: ForecastProps) => {
  return (
    <div className="ml-4 mr-4">
      <h1 className="mb-4 text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 md:text-2xl lg:text-3xl">
        Daily
      </h1>
      <div className="flex overflow-x-scroll hide-scroll-bar mb-8">
        <div className="flex flex-nowrap gap-5">
          {props.forecast.map((forecast, i) => (
            <a
              key={i}
              onClick={forecast.setCurrent}
              aria-current={forecast.active}
              className={`${
                forecast.active ? "bg-gray-300 dark:bg-emerald-900" : ""
              } cursor-pointer grid auto-cols-max w-52 sm:w-64 md:w-96 md:grid-cols-2 pl-6 pr-6 pt-3 pb-3 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-500 dark:hover:bg-gray-500`}
            >
              <div className="flex items-center">
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    {forecast.weekday}
                  </span>
                </h1>
                {forecast.icon && (
                  <Image
                    src={`http://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
                    width="50px"
                    height="50px"
                    alt="Weather icon"
                  />
                )}
              </div>
              <div className="flex items-center">
                <div className="flex flex-col">
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {forecast.temperatures}
                  </p>
                  <p className="text-sm">{forecast.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const HourlyForecast = (props: ForecastProps) => {
  return (
    <div className="mb-16 ml-4 mr-4">
      <h1 className="mb-4 text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 md:text-2xl lg:text-3xl">
        Hourly
      </h1>
      {props.forecast.map((forecast, i) => (
        <a
          key={i}
          aria-current={forecast.active}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center mb-4 pl-6 pr-6 pt-3 pb-3 w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="flex items-center">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                {forecast.hour}
              </span>
            </h1>
            <Image
              src={`http://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
              width="50px"
              height="50px"
              alt="Weather icon"
            />
          </div>
          <div className="flex items-center">
            <div className="flex flex-col">
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {forecast.temp}
              </p>
              <p className="text-sm">{forecast.description}</p>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="uppercase font-normal text-gray-700 dark:text-gray-400">
              Rain
            </p>
            <div className="text-sm">{forecast.rain}%</div>
          </div>

          <div className="flex flex-col">
            <p className="uppercase font-normal text-gray-700 dark:text-gray-400">
              Wind
            </p>
            <div className="text-sm">{forecast.wind} m/s</div>
          </div>
        </a>
      ))}
    </div>
  );
};
