('use strict');

import './index.scss';
import clockView from './clockView.js';
import { getWeather, renderWeather } from './src/js/weather.js';

clockView.start({
    // target: '.clock-container',
    hour12: true,
    // clockMeta: true,
    // activeColor: 'purple',
    // inactiveColor: 'green',
});

const weatherData = await getWeather();
renderWeather(weatherData);
