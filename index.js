('use strict');

import './index.scss';
import clockView from './src/js/ClockView';
import { getWeather, renderWeather } from './src/js/WeatherView';

clockView.start({
    // target: '.clock-container',
    hour12: true,
    // clockMeta: false,
    // activeColor: 'purple',
    // inactiveColor: 'green',
});

const weatherData = await getWeather();
renderWeather(weatherData);
