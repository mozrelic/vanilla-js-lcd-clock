// ('use strict');

import './index.scss';
import ClockView from './src/js/ClockView';
import WeatherView from './src/js/WeatherView';
import FormHandler from './src/js/FormHandler';
import { modalHandler } from './src/js/helpers/modal';
import { defaultState } from './src/js/settings';

let settings;

settings = {
    ...defaultState,
    ...settings,
    hour12: true,
    apiKey: 'ef9f7861750cc66b5688bdfad901efd4',
    zipcode: '97756',
};

ClockView.start({
    ...settings,
});

WeatherView.start({
    ...settings,
});

modalHandler();

const formTarget = document.querySelector('.settings');

FormHandler.init(settings);
ClockView.setOptions(settings);

formTarget.addEventListener('input', (e) => {
    const target = e.target.closest('.setting');

    FormHandler.handleChange(target);
    settings = FormHandler.returnState();

    // console.log('settings from index.js', settings);

    ClockView.setOptions(settings);
    ClockView.rerenderUpdatedOptions();
    WeatherView.updateOptions(settings);
});

const slideIn = document.querySelectorAll('.svg');

slideIn.forEach((el) => {
    el.classList.add('slideIn');
    setTimeout(() => {
        el.classList.remove('slideIn');
    }, 3200);
});
