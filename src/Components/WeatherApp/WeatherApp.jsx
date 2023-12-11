import {useEffect, useState, useCallback} from 'react';

import "./WeatherApp.css";

// weather icon
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'

// components import
import TopBar from '../TopBar/TopBar';
import OneDayView from '../OneDayView/OneDayView';
import FiveDaysView from '../FiveDaysView/FiveDays';


const WeatherApp = () => {
  const [data, setData] = useState({
      wicon: clear_icon,
      city: "Moscow",
      temp: "12°C",
      humidity: "0%",
      windSpeed: "0 km/h",
      iconId: null,
      latitude: 52.123431234,
      longitude: 54.12345885,
      weatherCategory: true,
      weatherList : [],
  });

    

    const api_key = '3ebf25ecb2b9c7060185d3004a74c1e5';

    const _transformData = (data) => {
      return {
        dt: data.dt,
        dt_txt: data.dt_txt,
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        iconId: data.weather[0].icon
      }
    }

    // запрос на сервере
    const getResponce = async (url) => {
      let responce = await fetch(url);
      let data = await responce.json();
      return data;
    }

    const getRequest = (url) => {
      let res = getResponce(url);
      updateWeatherState(res);
      getWeatherIcon(data.iconId);
      // getForecastWeather();
    }

    const getForecastWeather = useCallback(async () => {
      await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${data.city}&units=metric&lang=ru&appid=${api_key}`)
      .then(response => response.json())
      .then(data => {
        const transformedData = data.list.map(item => _transformData(item));
        setData({weatherList: transformedData });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }, [data.city]);

    // функция обновления большей части state 
    const updateWeatherState = (data) => {
      setData((prevState) => ({
        city: data.name, 
        temp: data && data.main && data.main.temp ? `${Math.floor(data.main.temp)}°C` : 'no temp',
        humidity: data.main && data.main.humidity ? `${Math.floor(data.main.humidity)}%` : 'no hum',
        windSpeed: data.wind && data.wind.speed ? `${Math.floor(data.wind.speed)} km/h` : 'no speed',
        iconId: data.weather && data.weather[0].icon ? data.weather[0].icon : '01d',
      }));
    }

    // функция обновления одного состояние wicon(иконки погоды), вынес с отдельную фукнцию т.к много кода
    const getWeatherIcon = (iconId) => {
      let currWicon;
      if (iconId === '01d' || iconId === '01n') {
        currWicon = clear_icon;
      } else if (iconId === '02d' || iconId === '02n') {
        currWicon = cloud_icon;
      } else if (iconId === '03d' || iconId === '03n') {
        currWicon = drizzle_icon;
      } else if (iconId === '04d' || iconId === '04n') {
        currWicon = drizzle_icon;
      } else if (iconId === '09d' || iconId === '09n') {
        currWicon = rain_icon;
      } else if (iconId === '10d' || iconId === '10n') {
        currWicon = rain_icon;
      } else if (iconId === '13d' || iconId === '13n') {
        currWicon = snow_icon;
      } else {
        currWicon = clear_icon;
      }
      setData({ wicon: currWicon });
    }

    
 
    // вызываю функции обновления state когда получаю данные (компонент меняется)
    // useEffect ((prevProps, prevState) => {
      
      
    //     // const res = getResponce(`https://api.openweathermap.org/data/2.5/weather?q=${data.city}&units=metric&lang=ru&appid=${api_key}`);
    //     // updateWeatherState(res);
    //     // getWeatherIcon(data.iconId);
    //     // // getForecastWeather();
    //     getRequest(`https://api.openweathermap.org/data/2.5/weather?q=${data.city}&units=metric&lang=ru&appid=${api_key}`);
    //     setData({ longitude: null, latitude: null });
      
    // }, [data.city])

    // useEffect((prevState) => {
    //   if (data.longitude && data.latitude) {
    //     const res = getResponce(`https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&units=metric&lang=ru&appid=${api_key}`);
    //     updateWeatherState(res);
    //     getWeatherIcon(data.iconId);
    //     getForecastWeather();
    //   }
        
    // }, [data.longitude, data.latitude, getForecastWeather , data.iconId])

   // меняю данные по запросу геолокации
    const getLocation = (geolocation) => {
        setData(() => ({
          latitude: geolocation && geolocation.latitude ? geolocation.latitude : null,
          longitude: geolocation && geolocation.longitude ? geolocation.longitude : null,
        }))
        console.log('click')
    }

  // меняю данные по данным инпута
    const getCity = (currentCity) => {
      setData(() => ({
          city: currentCity,
      }))
    }

    // переключатели режимов вывода погоды с одного дня по 5 дней. т.к режимов всего два решил сделать переключение через логический тип true/false 
    const OneDayViewMode = () => {
      setData({
        weatherCategory: true
      });
    }
    
    const FiveDayViewMode = () => {
      setData({
        weatherCategory: false
      });
    }
    const {city, wicon, temp, humidity, windSpeed, weatherList, weatherCategory} = data
      const oneDayModule = <OneDayView
      city={data.city}
      icon={data.wicon}
      temp={data.temp}
      humidity={data.humidity}
      windSpeed={data.windSpeed}
      />
      const fiveDayModule = <FiveDaysView
      city={data.city}
      icon={data.wicon}
      temp={data.temp}
      humidity={data.humidity}
      windSpeed={data.windSpeed}
      weatherList={data.weatherList}
      getWeatherIcon={getWeatherIcon}
      />
      return (

        <div className="container">
          <TopBar
            getLocation={getLocation}
            getCity={getCity}
          />
          {/* переключатель режимов показа погоды */}
          {/* <div className='select-mode'>
            <div
            className={data.weatherCategory ? 'selected-item one-day-mode active' : 'selected-item one-day-mode'}
            onClick={OneDayViewMode}
            >
              <p>weather now</p>
            </div>
            <div 
            className={data.weatherCategory ? 'selected-item five-days-mode' : 'selected-item five-days-mode active'}
            onClick={FiveDayViewMode}
            >
                <p>weather for the next 5 days</p>
            </div>
          </div> */}

          <OneDayView
          city={data.city}
          icon={data.wicon}
          temp={data.temp}
          humidity={data.humidity}
          windSpeed={data.windSpeed}
          />
        
          {/* {data.weatherCategory ? oneDayModule : fiveDayModule}  */}
        </div>
      )
    
  }
  

export default WeatherApp;
