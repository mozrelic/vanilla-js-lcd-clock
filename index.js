('use strict');

import './index.scss';
import clockView from './src/js/ClockView';
import { getWeather, renderWeather } from './src/js/WeatherView';

clockView.start({
    // target: '.clock-container',
    hour12: true,
    // clockMeta: false,
    activeColor: 'oklch(85.29% 0.266 155.65)',
    // activeColor: '#7921c6',
    // inactiveColor: 'green',
});

const targetFields = document.querySelectorAll('.setting');

console.log(targetFields);

// console.log(target);
const weatherData = await getWeather();
renderWeather(weatherData);
