import React, { useState } from "react";
import { type Temperature } from "./types";
import "./App.css";
import Logo from './assets/sunny_sun_cloud_weather_cloudy_icon_194237.svg'
import noInfo from './assets/7VE.gif'

function App(): JSX.Element {
  const [data, setData] = useState<Temperature>();
  const [hasError, setHasError] = useState(false)
  const [query, setQuery] = useState('')
  const apiKey = import.meta.env.VITE_WEATHER_APP_API_KEY;

  const handleQuery = (e : React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)

  }
  async function fetchData() {
    try {
      let response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=no&lang=es`
      );
      if (!response.ok) {
        setHasError(true)
        throw new Error(`HTTP error! status: ${response.status}`)
      } else {
        let res = await response.json();
        return res;
      }
    } catch (error) {
      setHasError(true)
      console.log("There was an error with the request", error);
    }
  }

  async function getInfo() {
    let result = await fetchData();
    setData(result);
  }

  return (
    <>
      <nav className="flex w-full fixed items-center justify-center top-0">
        <img
          src={Logo}
          className="App-logo"
          alt="logo"
        />
        <h1 className="ml-3">Cli-Mate</h1>
      </nav>
      {/* <div className="absolute top-0 left-3/4 w-30 text-sm">
        <p>Check out the current temperature in {data?.location?.name}.</p>
        <p>
          The app uses WeatherAPI to get the information about the weather of{" "}
          {data?.location?.name}.
        </p>
        <p>
          If you want to see more details go to this link:
          https://www.weatherapi.com/.
        </p>
        <p>
          You can also find the source code here:
          https://github.com/JuanFerreiro/weather-app
        </p>
        <p>
          Current Temperature:
          {data?.current?.temp_c! > 25
            ? "It's On Fire!"
            : `Temperature: ${data?.current?.temp_c}°C`}{" "}
        </p>
        <p>Humidity: {data?.current?.humidity}%</p>
        <p>Feels Like: {data?.current?.feelslike_c}°C</p>
        <p>Wind Speed: {data?.current?.wind_kph} km/h</p>
        <p>Description: {data?.current?.condition?.text}</p>
      </div> */}

      <div className=" min-h-screen flex items-center justify-center min-w-full">
        <div className={`flex flex-col bg-slate-800/50 rounded-xl p-8 max-w-sm max-h-100 `}>
          <div className="relative my-1 rounded-md">
            <input type="text" value={query} onChange={handleQuery} className="block bg-slate-800/80 w-full rounded-md border-0 py-1.5 pl-7 pr-20 outline-none text-neutral-400  placeholder:text-gray-200  sm:text-lg sm:leading-8" placeholder="Ingresa la ubicación " />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="currency" className="sr-only">Currency</label>
              <button id="currency" onClick={getInfo} name="Currency" className=" h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">Search</button>
            </div>
          </div>
          <div className="transition-height duration-500  ease-in-out">
            { !data ? 
              <div className={`flex flex-col w-full items-center animate-fadeIn justify-center ${!hasError && "hidden"}`}>
                <img src={noInfo} className="h-32 w-32 ease-out duration-700 hover:ease-in" alt="No information" />
                <h4 className="mt-4 font-medium text-lg">There is no info here!</h4>
              </div>
              :
              <div className="animate-fadeIn">
                <div className="mt-8 self-center inline-flex items-center justify-center h-16 w-16">
                  <img
                    src={data?.current?.condition.icon}
                    className="w-auto h-auto"
                    alt={data?.current.condition.text}
                  />
                </div>
                <div className="grid grid-cols-2 items-center justify-center mt-2">
                  <div className="flex flex-col">
                    <h1 className="font-medium text-6xl w-full">{data?.current?.temp_c}°</h1>
                    <div className="text-sm text-gray-500">{data?.location?.name}, {new Date(data?.current?.last_updated!).toLocaleString('es-DO', {weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false })} </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-12">{data?.current?.condition?.text}</div>
                    <div className="mt-1">
                      <span className="text-sm">
                        <i className="far fa-long-arrow-up"></i>
                      </span>
                      <span className="text-sm font-light text-gray-500">28°C</span>
                    </div>

                    <div>
                      <span className="text-sm">
                        <i className="far fa-long-arrow-down"></i>
                      </span>
                      <span className="text-sm font-light text-gray-500">20°C</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between mt-6">
                  <div className="flex flex-col items-center">
                    <div className="font-medium text-sm">Wind</div>
                    <div className="text-sm text-gray-500">
                      {data?.current?.wind_kph} km/h
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="font-medium text-sm">Humidity</div>
                    <div className="text-sm text-gray-500">
                      {data?.current?.humidity}%
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="font-medium text-sm">Visibility</div>
                    <div className="text-sm text-gray-500">10km</div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      {/* <h1 className="text-green-700">{data?.location?.name}</h1>
      <h2>{data?.current?.condition.text}</h2>
      <div className="mx-auto mt-6 max-w-2xl max-h-full sm:px-6 justify-items-center lg:grid lg:max-w-2xl lg:grid-cols-2 lg:gap-x-8 lg:px-3">
        <div className="h-full w-full hidden overflow-visible rounded-lg bg-slate-600/50 lg:block">
          <p className="h-full w-full">
            {" "}
            {`${data?.location?.region}, ${data?.location?.tz_id}`}
          </p>
          <p className="h-full w-full">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non hic
            placeat, temporibus rerum maxime fugiat nihil asperiores. Quasi
            mollitia odio, voluptatum eum dolor voluptate nostrum obcaecati
            aperiam provident, similique quaerat.
          </p>
        </div>
        <div className="hidden w-full h-full lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="h-4/4 max-w-2xl overflow-hidden bg-slate-600/75 rounded-lg">
            <p className="h-full w-full"> {data?.current?.temp_c} C°</p>
          </div>
          <div className="overflow-hidden bg-slate-600/75 rounded-lg">
            <p className="h-full w-full"> {data?.current?.temp_f} F°</p>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default App;
