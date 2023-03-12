('use strict');

import './index.scss';
import clockView from './src/js/ClockView';
import { getWeather, renderWeather } from './src/js/WeatherView';

clockView.start({
    // target: '.clock-container',
    hour12: true,
    // clockMeta: false,
    // activeColor: '#7921c6',
    // inactiveColor: 'green',
});

const target = document.querySelector('.set-zipcode');

// console.log(target);
const weatherData = await getWeather();
renderWeather(weatherData);
