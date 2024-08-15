/**
 * A class to handle the weather view and related functionality.
 */
import markup from './markup';
import WeatherService from './helpers/WeatherService';
import { AnimateTransition } from './helpers/Animation';

// TODO:
//

class WeatherView {
    #options;
    #intervalId;
    #intervalRunning = false;

    #renderWeatherMarkup() {
        if (!this.#options.showWeather) {
            return;
        }
        const target = document.querySelector('.weather-container');
        const spinner = document.querySelector('.lds-ring');

        if (!spinner) {
            target.insertAdjacentHTML(
                'afterbegin',
                markup.loadingSpinnerMarkup()
            );
        }
        target.insertAdjacentHTML('beforeend', markup.weatherMarkup());

        const digitTarget = document.querySelector('.temp-svg');

        digitTarget.insertAdjacentHTML('afterbegin', markup.digitMarkup());
    }

    async #updateWeather(weatherData) {
        if (!weatherData.data) return;
        const { data } = weatherData;
        const highTemp = -119;

        console.log(weatherData);
        return {
            weatherData: {
                name: data.name,
                description: data.weather[0].description,
                temp: {
                    val1: data.main.temp.toString().charAt(0),
                    val2: data.main.temp.toString().charAt(1),
                    // val1: highTemp.toString().charAt(0),
                    // val2: highTemp.toString().charAt(1),
                },
            },
            iconData: {
                icon: data.weather[0].icon.at(-1),
                iconId: data.weather[0].id,
            },
            status: weatherData.status,
        };
    }

    #renderWeatherUpdates(cleanWeatherData) {
        if (!cleanWeatherData) return;
        const weatherDescription = document.querySelector('.description'),
            digitTarget = document.querySelector('.temp-svg'),
            locationTitle = document.querySelector('.location-title'),
            weatherIcon = document.querySelector('.icon i'),
            data = cleanWeatherData,
            { 0: digitOne, 1: digitTwo } = digitTarget.children;

        digitOne.setAttribute('class', `num-${data.weatherData.temp.val1}`);
        digitTwo.setAttribute('class', `num-${data.weatherData.temp.val2}`);
        weatherIcon.setAttribute(
            'class',
            `wi wi-owm-${data.iconData.icon === 'n' ? 'night' : 'day'}-${data.iconData.iconId
            }`
        );
        weatherDescription.innerText = data.weatherData.description;
        locationTitle.innerText = data.weatherData.name;
    }

    async #getWeather() {
        if (!this.#options.showWeather) {
            this.#stopInterval();
            return;
        }
        try {
            const geoData = await WeatherService.getGeoFromApi();
            this.#apiErrorMessageHandler(geoData);
            const weatherData = await WeatherService.getWeatherFromApi(geoData);
            const cleanWeatherData = await this.#updateWeather(weatherData);
            this.#renderWeatherUpdates(cleanWeatherData);
        } catch (err) {
            return err;
        }
    }

    #createErrorElement(ERROR_TYPES) {
        const { container, errorSelector, message } = ERROR_TYPES;

        const fieldContainer = document.querySelector(`${container}`);
        if (!document.querySelector(`.error-msg.${errorSelector}`)) {
            const errorElement = `<p class="error-msg ${errorSelector}">${message}</p>`;

            fieldContainer.classList.add('error');
            fieldContainer.insertAdjacentHTML('beforeend', errorElement);

            const animateIn = new AnimateTransition(
                `.error-msg.${errorSelector}`
            );
            animateIn.startAnimation();

            document.querySelector('.weather').remove();
            this.#renderWeatherMarkup();
        }
    }

    #clearErrorElement(ERROR_TYPES) {
        const { container, errorSelector } = ERROR_TYPES;

        const fieldContainer = document.querySelector(`${container}`);
        const errorMsgElement = document.querySelector(
            `.error-msg.${errorSelector}`
        );
        const animateOut = new AnimateTransition(
            `.error-msg.${errorSelector}`,
            'slideOut'
        );
        const delayLength = animateOut.startAnimation();

        setTimeout(() => {
            fieldContainer ? fieldContainer.classList.remove('error') : '';
            errorMsgElement ? errorMsgElement.remove() : '';
        }, delayLength);
    }

    #apiErrorMessageHandler(data) {
        const status = data?.response?.status;
        const message = data?.response?.data?.message;

        const ERROR_TYPES = {
            API_KEY: {
                container: '.api-key-container',
                errorSelector: 'apiKey',
                message: message,
            },
            ZIPCODE: {
                container: '.zipcode-container',
                errorSelector: 'zipcode',
                message: message,
            },
        };

        console.log('interval id', this.#intervalId);
        console.log('interval running', this.#intervalRunning);

        if (!data.status) {
            this.#stopInterval();
        }

        if (status === 401) {
            this.#createErrorElement(ERROR_TYPES.API_KEY);
        } else {
            this.#clearErrorElement(ERROR_TYPES.API_KEY);
        }

        if (status === 404 || status === 400) {
            this.#createErrorElement(ERROR_TYPES.ZIPCODE);
        } else {
            this.#clearErrorElement(ERROR_TYPES.ZIPCODE);
        }
    }

    rerenderUpdatedOptions() {
        this.#destroyElement('.weather-container');
        this.#renderWeatherMarkup();
    }

    /**
     * Updates the options for the weather view and weather service.
     * @param {Object} userOptions - The new options to be applied.
     */
    updateOptions(userOptions) {
        this.#options = { ...userOptions };
        WeatherService.setOptions(userOptions);
        if (!userOptions.showWeather || this.#intervalRunning) return;
        this.#startInterval();
    }

    #destroyElement(targetEl) {
        const target = document.querySelector(`${targetEl}`);
        if (!target) return;
        const elementGuard = [...target.children];
        if (elementGuard.length >= 0) {
            elementGuard.forEach((element) => {
                element.remove();
            });
        }
    }

    #startInterval() {
        if (this.#intervalRunning) return;
        this.#intervalRunning = true;
        this.#getWeather();
        this.#intervalId = setInterval(
            async () => await this.#getWeather(),
            2000
        );
    }

    #stopInterval() {
        if (!this.#intervalRunning) return;
        clearInterval(this.#intervalId);
        this.#intervalId = null;
        this.#intervalRunning = false;
    }

    /**
     * Initializes the weather view with user options and renders the initial markup.
     * @param {Object} userOptions - The initial options for the weather view.
     * @param {boolean} userOptions.showWeather - Whether or not to show the weather.
     */
    start(userOptions) {
        this.updateOptions(userOptions);
        this.#renderWeatherMarkup();
    }
}

export default new WeatherView();
