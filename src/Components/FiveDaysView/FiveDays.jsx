import React from "react"
import '../FiveDaysView/FiveDays.css'
// icons
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
// weather icons
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'


const FiveDaysView = ({city, weatherList}) => {
  const chunkedWeatherList = [];
  if(weatherList.length && weatherList.length > 0) {
    for (let i = 0; i < weatherList.length; i += 8) {
      chunkedWeatherList.push(weatherList.slice(i, i + 8));
    } 
  }
 

  const getWeatherIcon = (iconId) => {
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
    return wicon
  }
  
  return (
    <div>
      <div className="weather-items">
        {chunkedWeatherList.map((chunk, index) => (
          <div key={index} className="weather-item">
            <div className="weather-main-data">
              <img src={getWeatherIcon(chunk[0].iconId)} alt='weather-icon' />
              <div className="weather-main-data-temp">
                {Math.floor(chunk[0].temp)}°C
              </div>
            </div>
            
            <div className="weather-data">
              <img src={wind_icon} alt="wind-icon" />
              {Math.floor(chunk[0].wind)}km/h
            </div>

            <div className="weather-data">
              <img src={humidity_icon} alt="humidity-icon" />
              {chunk[0].humidity}%
            </div>
          </div>
        ))}
      </div>
      <div className="location">
        {city}
      </div>
    </div>
  );
};
export default FiveDaysView;



    // <div>
    //   <div className="weather-items">
        
    //     <div className="weather-item">

    //       <div className="weather-main-data">
    //         <img src={icon} alt='weather-icon' />
    //         <div className="weather-main-data-temp">
    //           {temp}
    //         </div>
    //       </div>
        
    //       <div className="weather-data">
    //         <img src={wind_icon} alt="wind-icon" />
    //         {windSpeed}
    //       </div>

    //       <div className="weather-data">
    //         <img src={humidity_icon} alt="humidity-icon" />
    //         {humidity}
    //       </div>

    //     </div>
    //   </div>

    //   <div className="location">
    //     {city}
    //   </div>
    // </div>