import {Component} from 'react';

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


class WeatherApp extends Component {
    state = {
      wicon: clear_icon,
      city: "Moscow",
      temp: "12°C",
      humidity: "0%",
      windSpeed: "0 km/h",
      iconId: null,
      latitude: null,
      longitude: null,
      weatherCategory: true,
      weatherList : [],
      
      
    }
    

    api_key = '3ebf25ecb2b9c7060185d3004a74c1e5';

    _transformData = (data) => {
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
    getResponce = async (url) => {
      let responce = await fetch(url);
      let data = await responce.json();
      return data;
    }

    getForecastWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&units=metric&lang=ru&appid=${this.api_key}`)
    .then(response => response.json())
    .then(data => {
      const transformedData = data.list.map(item => this._transformData(item));
      this.setState({ weatherList: transformedData });
    })
    .catch(error => {
      console.error('Error:', error);
    });
    }

    // функция обновления большей части state 
    updateWeatherState = (data) => {
      this.setState((prevState) => ({
        city: data.name, 
        temp: data && data.main.temp ? `${Math.floor(data.main.temp)}°C` : 'no data',
        humidity: `${Math.floor(data.main.humidity)}%`,
        windSpeed: `${Math.floor(data.wind.speed)} km/h`,
        iconId: data.weather[0].icon,
      }));
    }

    // функция обновления одного состояние wicon(иконки погоды), вынес с отдельную фукнцию т.к много кода
    getWeatherIcon = (iconId) => {
      let wicon;
      if (iconId === '01d' || iconId === '01n') {
        wicon = clear_icon;
      } else if (iconId === '02d' || iconId === '02n') {
        wicon = cloud_icon;
      } else if (iconId === '03d' || iconId === '03n') {
        wicon = drizzle_icon;
      } else if (iconId === '04d' || iconId === '04n') {
        wicon = drizzle_icon;
      } else if (iconId === '09d' || iconId === '09n') {
        wicon = rain_icon;
      } else if (iconId === '10d' || iconId === '10n') {
        wicon = rain_icon;
      } else if (iconId === '13d' || iconId === '13n') {
        wicon = snow_icon;
      } else {
        wicon = clear_icon;
      }
      this.setState({ wicon: wicon });
    }

    
    
    // вызываю функции обновления state когда получаю данные (компонент меняется)
    async componentDidUpdate(prevProps, prevState) {
      const {city, longitude, latitude} = this.state;
      if (city !== prevState.city) {
        const data = await this.getResponce(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${this.api_key}`);
        this.updateWeatherState(data);
        this.getWeatherIcon(this.state.iconId)
        this.getForecastWeather();
        this.setState( {longitude: prevState = null, latitude: prevState = null} );
      }

      if ((longitude !== null) || (latitude !== null)) {
        const data = await this.getResponce(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=ru&appid=${this.api_key}`);
        this.updateWeatherState(data);
        this.getWeatherIcon(this.state.iconId)
        this.getForecastWeather();
        
      }

    
    }
    
    
   // меняю данные по запросу геолокации
    getLocation = (geolocation) => {
        this.setState(() => ({
          latitude: geolocation && geolocation.latitude ? geolocation.latitude : null,
          longitude: geolocation && geolocation.longitude ? geolocation.longitude : null,
        }))
    }

  // меняю данные по данным инпута
    getCity = (currentCity) => {
      this.setState(() => ({
          city: currentCity,
      }))
    }

    getLocations = (geolocation, currentCity ) => {
      if (currentCity) {
        this.setState(() => ({
          city: currentCity
        }))
      }

      if (geolocation) {
        this.setState(() => ({
          latitude: geolocation && geolocation.latitude ? geolocation.latitude : null,
          longitude: geolocation && geolocation.longitude ? geolocation.longitude : null,
        }))
      }
    }

  



    // переключатели режимов вывода погоды с одного дня по 5 дней. т.к режимов всего два решил сделать переключение через логический тип true/false 
    OneDayViewMode = () => {
      this.setState({
        weatherCategory: true
      });
    }
    
    FiveDayViewMode = () => {
      this.setState({
        weatherCategory: false
      });
    }

 

   

    render() {

    const {city, wicon, temp, humidity, windSpeed, weatherList} = this.state
    const oneDay = <OneDayView
    city={city}
    icon={wicon}
    temp={temp}
    humidity={humidity}
    windSpeed={windSpeed}
    />
    const fiveDay = <FiveDaysView
    city={city}
    icon={wicon}
    temp={temp}
    humidity={humidity}
    windSpeed={windSpeed}
    weatherList={weatherList}
    getWeatherIcon={this.getWeatherIcon}
    />
      return (
        <div className="container">
          <TopBar
            getLocation={this.getLocation}
            getCity={this.getCity}
          />
          {/* переключатель режимов показа погоды */}
          <div className='select-mode'>
            <div
            className={this.state.weatherCategory ? 'selected-item one-day-mode active' : 'selected-item one-day-mode'}
            onClick={this.OneDayViewMode}
            >
              <p>weather now</p>
            </div>
            <div 
            className={this.state.weatherCategory ? 'selected-item five-days-mode' : 'selected-item five-days-mode active'}
            onClick={this.FiveDayViewMode}
            >
                <p>weather for the next 5 days</p>
            </div>
          </div>
          {this.state.weatherCategory ? oneDay : fiveDay} 
        </div>
      )
    }
  }
  

export default WeatherApp;
