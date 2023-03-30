('use strict');

import './index.scss';
import ClockView from './src/js/ClockView';
import WeatherView from './src/js/WeatherView';
import { modalHandler } from './src/js/helpers/modal';
import { FormHandler } from './src/js/form';

let settings;
const defaultOptions = ClockView.defaultOptions;

settings = { ...defaultOptions, ...settings, hour12: true };

ClockView.start({
    ...settings,
    // target: '.clock-container',
    // hour12: true,
    // clockMeta: true,
    // activeColor: 'oklch(85.29% 0.266 155.65)',
    // activeColor: '#7921c6',
    // inactiveColor: 'green',
});

WeatherView.start({
    zipcode: '97756',
    apiKey: 'ef9f7861750cc66b5688bdfad901efd4',
});

modalHandler();

const SettingsForm = new FormHandler();

const form = document.querySelector('.settings');

SettingsForm.init(settings);
ClockView.setOptions(settings);

form.addEventListener('input', (e) => {
    const target = e.target.closest('.setting');

    SettingsForm.handleChange(target);
    settings = SettingsForm.returnState();

    // console.log('settings from index.js', settings);
    ClockView.setOptions(settings);
    ClockView.rerenderUpdatedOptions();
});

const slideIn = document.querySelectorAll('.svg');

slideIn.forEach((el) => {
    el.classList.add('slideIn');
    setTimeout(() => {
        el.classList.remove('slideIn');
    }, 3200);
});
