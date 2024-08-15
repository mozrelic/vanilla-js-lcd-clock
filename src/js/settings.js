/**
 * The default state configuration for the clock view.
 *
 * @typedef {Object} DefaultState
 * @property {string} target - A CSS selector string for the clock container element.
 * @property {string} activeColor - The color used for active elements in the clock.
 * @property {string} inactiveColor - The color used for inactive elements in the clock.
 * @property {boolean} showClockMeta - Flag to determine whether to display clock metadata (day, month, year).
 * @property {boolean} showHour12 - Flag to determine whether to use a 12-hour clock format.
 * @property {boolean} showWeather - Flag to determine whether to display weather information.
 * @property {string} zipcode - The zipcode used for fetching weather information.
 * @property {string} apiKey - The API key used for accessing weather data.
 */

/** @type {DefaultState} */
export const defaultState = {
    target: '.clock-container',
    // activeColor: '#c9d1d9',
    activeColor: '#c00033',
    // inactiveColor: '#262626',
    inactiveColor: '#231519',
    showClockMeta: true,
    showHour12: false,
    showWeather: false,
    zipcode: '97756',
    apiKey: '',
};
