import React, {useState, useEffect} from "react"
import './TopBar.css'
import search_icon from '../Assets/search.png'
import geolocation_icon from '../Assets/location-dot-solid.svg'


const TopBar = ({getLocation, getCity}) => {
    const [inputValue, setInputValue] = useState('');
    const [geolocationValue, setGeolocation] = useState();

    // полачаю данные из инпут
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    // получаю геолокацию пользователя
    const getGeolocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setGeolocation(position.coords);
        });
        console.log(geolocationValue) 
    }
    // делаю вызов с данными полученными о городе из input, и запускаю функцию получения данных от api
 
    useEffect(() => {
        if (geolocationValue) {
            getLocation(geolocationValue);
        }
    }, [geolocationValue, getLocation]);

    return (
        <div className="top-bar">
            <input 
                type="text" 
                className="cityInput" 
                placeholder="Search" 
                value={inputValue} 
                onChange={handleInputChange}
            />
            <div 
                className="search-icon" 
                onClick={() => getCity(inputValue)}
            >
                <img src={search_icon} alt="" />
            </div>
            <div
                className="geolocation-search"
                onClick={() => {getGeolocation()}}
            >
                <img src={geolocation_icon} alt="geolocation" />
            </div>
        </div>
    )
};

export default TopBar;
