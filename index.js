('use strict');

import './index.scss';
import clockView from './clockView.js';
import { getWeather, renderWeather } from './src/js/weather.js';

const weatherData = await getWeather();
console.log(weatherData);
renderWeather(weatherData);

const target = document.querySelector('.clock-container');
const hourEl = document.querySelector('.hour');
const minutesEl = document.querySelector('.minutes');
const secondsEl = document.querySelector('.seconds');
const antePostEl = document.querySelector('.am-pm');

const dayEl = document.querySelector('.day');
const monthEl = document.querySelector('.month');
const yearEl = document.querySelector('.year');

const setDigits = (time) => {
    hourEl.firstElementChild.setAttribute('class', `num-${time.hh1}`);
    hourEl.lastElementChild.setAttribute('class', `num-${time.hh2}`);
    minutesEl.firstElementChild.setAttribute('class', `num-${time.mm1}`);
    minutesEl.lastElementChild.setAttribute('class', `num-${time.mm2}`);
    secondsEl.firstElementChild.setAttribute('class', `num-${time.ss1}`);
    secondsEl.lastElementChild.setAttribute('class', `num-${time.ss2}`);
};

const setAntePost = (time) => {
    // get children elements of am-pm parent container
    const { 0: amEl, 1: pmEl } = antePostEl.children;

    const elClass = time.antePost === 'am' ? 'its-am' : 'its-pm';

    // check if both elements have their active class
    const resetLetters =
        amEl.classList.contains('its-am') && pmEl.classList.contains('its-pm');

    // if both do, remove active class from both
    if (resetLetters) {
        amEl.classList.remove('its-am');
        pmEl.classList.remove('its-pm');
    }

    // set active class
    if (time.antePost === 'am') amEl.setAttribute('class', `${elClass} `);

    if (time.antePost === 'pm') pmEl.setAttribute('class', `${elClass}`);
};

const setDay = (time) => {
    const { 0: num1, 1: num2 } = dayEl.children;

    num1.setAttribute('class', `num-${time.da1}`);
    num2.setAttribute('class', `num-${time.da2}`);
};

const setMonth = (time) => {
    const { 0: num1, 1: num2 } = monthEl.children;

    num1.setAttribute('class', `num-${time.mo1}`);
    num2.setAttribute('class', `num-${time.mo2}`);
};

const setYear = (time) => {
    const { 0: num1, 1: num2 } = yearEl.children;

    num1.setAttribute('class', `num-${time.ye1}`);
    num2.setAttribute('class', `num-${time.ye2}`);
};

const getCurrentTime = () => {
    const rawTime = new Date();

    const formatter = new Intl.DateTimeFormat('en-us', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });

    const filteredTime = formatter
        .formatToParts(rawTime)
        .filter((row) => row['type'] !== 'literal');

    // this takes the filtered time object and gets the last two digits from each value string, so i can then save them into a new
    // object with a specific key name. I have done it this way so I can use the final key value as a template literal to render
    // the correct css class
    const tempTimeObj = {};
    filteredTime.forEach(function(item) {
        let tempTimeValue = item['value'].padStart(2, '0').split('').slice(-2);

        tempTimeValue.forEach((value, i) => {
            tempTimeObj[`${item['type']}${i + 1}`] = value;
        });
    });

    const timeObj = {
        ye1: tempTimeObj.year1,
        ye2: tempTimeObj.year2,
        mo1: tempTimeObj.month1,
        mo2: tempTimeObj.month2,
        da1: tempTimeObj.day1,
        da2: tempTimeObj.day2,
        hh1: tempTimeObj.hour1,
        hh2: tempTimeObj.hour2,
        mm1: tempTimeObj.minute1,
        mm2: tempTimeObj.minute2,
        ss1: tempTimeObj.second1,
        ss2: tempTimeObj.second2,
        antePost:
            `${tempTimeObj.dayPeriod1}${tempTimeObj.dayPeriod2}`.toLowerCase(),
    };

    return timeObj;
};

const setCurrentTime = () => {
    const timeObj = getCurrentTime();

    setDigits(timeObj);
    setAntePost(timeObj);
    setDay(timeObj);
    setMonth(timeObj);
    setYear(timeObj);
};

clockView.start({
    // target: '.clock-container',
    hour12: true,
    // clockMeta: true,
    // activeColor: 'purple',
    // inactiveColor: 'green',
});

// setInterval(setCurrentTime, 1000);
