import React from "react"
import './OneDayView.css'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'


const OneDayView = ({icon, city, temp, humidity, windSpeed }) => {
  return (
    <>
      <div>
        <div className="weather-image">
            <img src={icon} alt="" /> 
        </div>
        <div className="weather-temp">
            {temp}
        </div>
        <div className="weather-location">
            {city}  
        </div>
      </div>
      <div className="data-container">
        <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
                <div className="humidity-percent">
                    {humidity}
                </div>
                <div className="text">
                    Humidity
                </div>
            </div>
        </div>
        <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
                <div className="wind-speed">
                    {windSpeed}
                </div>
                <div className="text">
                    Wind Speed
                </div>
            </div>
        </div>
    </div>
    </>
  
    
  )
};

export default OneDayView;
