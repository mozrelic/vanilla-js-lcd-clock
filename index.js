'use strict';

import './index.scss';
import store from 'store';
import ClockView from './src/js/ClockView';
import WeatherView from './src/js/WeatherView';
import FormHandler from './src/js/FormHandler';
import ModalHandler from './src/js/helpers/ModalHandler';
import { defaultState } from './src/js/settings';
import { AnimateTransition } from './src/js/helpers/Animation';

let settings = {
    ...defaultState,
    showHour12: true,
    apiKey: '',
    zipcode: '97756',
};

let localStorageSettings = {
    ...defaultState,
    ...store.get('settings'),
};

// send initial settings to clock and weather from locaStorage
ClockView.start({
    ...localStorageSettings,
});

WeatherView.start({
    ...localStorageSettings,
});

ModalHandler.start();

const formTarget = document.querySelector('.settings');

// load foarm fields with their respective data on startup
FormHandler.init(localStorageSettings);

formTarget.addEventListener('input', (e) => {
    const target = e.target.closest('.setting');

    FormHandler.handleChange(target);
    settings = FormHandler.returnState();
    store.set('settings', settings);

    ClockView.setOptions(settings);
    ClockView.rerenderUpdatedOptions();
    if (
        target.classList.contains('set-api-key') ||
        target.classList.contains('set-zipcode') ||
        target.classList.contains('show-weather')
    ) {
        WeatherView.updateOptions(settings);
        WeatherView.rerenderUpdatedOptions();
        // WeatherView.renderWeatherMarkup();
    }
});

const animate = new AnimateTransition('.svg, .modal-trigger');
animate.startAnimation();
