import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WeatherApp from './Components/WeatherApp/WeatherApp';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>
);


