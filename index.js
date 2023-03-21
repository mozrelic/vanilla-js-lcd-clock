('use strict');

import './index.scss';
import ClockView from './src/js/ClockView';
import WeatherView from './src/js/WeatherView';
import { modalHandler } from './src/js/helpers/modal';

ClockView.start({
    // target: '.clock-container',
    hour12: true,
    // clockMeta: false,
    // activeColor: 'oklch(85.29% 0.266 155.65)',
    // activeColor: '#7921c6',
    // inactiveColor: 'green',
});

WeatherView.start({
    zipcode: '97756',
    apiKey: 'ef9f7861750cc66b5688bdfad901efd4',
});

modalHandler();
