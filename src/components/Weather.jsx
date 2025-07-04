import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import { assets } from '../assets/assets'



const Weather = () => {
  const [weatherData, setWeatherData]= useState(false);
  const inputRef= useRef(null);
  const allIcons = {
  "1000": assets.clear, 
  "1003": assets.clear, 
  "1006": assets.cloud, 
  "1009": assets.cloud, 
  "1030": assets.cloud, 
  "1063": assets.cloud, 
  "1066": assets.snow, 
  "1069": assets.snow, 
  "1072": assets.drizzle, 
  "1087": assets.cloud, 
  "1114": assets.snow, 
  "1117": assets.snow, 
  "1135": assets.cloud,
  "1147": assets.cloud,
  "1150": assets.drizzle,
  "1153": assets.drizzle,
  "1168": assets.drizzle,
  "1171": assets.drizzle,
  "1180": assets.rain, 
  "1183": assets.rain, 
  "1186": assets.rain, 
  "1189": assets.rain, 
  "1192": assets.rain, 
  "1195": assets.rain, 
  "1198": assets.rain, 
  "1201": assets.rain, 
  "1204": assets.snow, 
  "1207": assets.snow, 
  "1210": assets.snow, 
  "1213": assets.snow,
  "1216": assets.snow,
  "1219": assets.snow,
  "1222": assets.snow,
  "1225": assets.snow,
  "1237": assets.snow,
  "1240": assets.rain,
  "1243": assets.rain,
  "1246": assets.rain,
  "1249": assets.snow,
  "1252": assets.snow,
  "1255": assets.snow,
  "1258": assets.snow,
  "1261": assets.snow,
  "1264": assets.snow,
  "1273": assets.rain, 
  "1276": assets.rain,
  "1279": assets.snow,
  "1282": assets.snow
}


  const search = async (city) => {
    if (city===""){
      alert("Enter City Name")
      return;
    }
  try {
    const url = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const icon = allIcons[String(data.current.condition.code)] || assets.clear;
    setWeatherData({
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      temperature: Math.floor(data.current.temp_c),
      location: data.location.name,
      icon: icon


    })
    
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  search();
}, []);
  return (
    

    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search'  onKeyDown={e => {
            if (e.key === "Enter") {
                search(inputRef.current.value);
            }
        }}/>
            <img src={assets.search} alt="search" onClick={()=>search(inputRef.current.value)}/>
        </div>
        <img src={weatherData.icon} className='weather-icon' alt="" />
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={assets.humidity} alt="" />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={assets.wind} alt="" />
            <div>
              <p>{weatherData.windSpeed}km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Weather