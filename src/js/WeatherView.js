import axios from 'axios';
import markup from './markup';

// TODO:
//

let serverResponses;

function errorHandler(target, message, err) {
    if (!target && !message) return;
    const errorElement = `<p class="error-msg">${message}</p>`;
    const formElements = [...document.querySelectorAll('.setting')];
    console.log(err);

    // console.log(serverResponses);
    // trying to remove error msg if the err property is empty and an error-msg exists
    formElements.forEach((el) => {
        const errElements = [...document.querySelectorAll('.error-msg')];
        errElements.forEach((el) => {
            if (!err.response.status) {
                //
                console.log(el);
                el.remove();
            }
        });

        const formElAttribute = el.getAttribute('data-type');
        if (formElAttribute === target) {
            const guard = document.querySelector('.error-msg');

            if (!guard) {
                const el = document.querySelector(
                    `[data-type="${formElAttribute}"]`
                );
                el.insertAdjacentHTML('beforebegin', errorElement);
            }
        }
    });
}

class WeatherView {
    #BASE_URL_WEATHER = `https://api.openweathermap.org/`;
    #options;
    #timeInterval;
    #intervalRunning = false;

    async #getGeo() {
        const baseURL = this.#BASE_URL_WEATHER;
        const { zipcode, apiKey } = this.#options;
        try {
            const options = {
                baseURL,
                url: `geo/1.0/zip?zip=${zipcode}&appid=${apiKey}`,
                timeout: 2000,
            };
            const response = await axios(options);
            // console.log(response.status);
            serverResponses = {
                ...serverResponses,
                geo: response.status,
            };
            const data = response.data;

            return data;
        } catch (err) {
            // If an error occured with either the api key or the zipcode, setInterval will be cleared
            // I think this needs to happen here, as oppsed to the other weather methods, because this
            // is the first time we try to connect to the api
            clearInterval(this.#timeInterval);
            this.#intervalRunning = false;

            if (err.response.status === 404) {
                console.error(
                    `Zipcode is probably wrong : ${zipcode}`,
                    err.response
                );
            }
            if (err.response.status === 401) {
                errorHandler('apiKey', err.message, err);

                console.error(
                    `API Key probably is wrong or api is down : ${apiKey}`,
                    err.message
                );
            }
            // console.log(err);
            return err;
        }
    }

    async #getWeather() {
        const target = document.querySelector('.weather-container');
        const spinner = document.querySelector('.lds-ring');

        const baseURL = this.#BASE_URL_WEATHER;

        try {
            const locationData = await this.#getGeo();
            if (!locationData) {
                return;
            }
            const { lat, lon } = locationData;

            const options = {
                baseURL,
                url: `data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,daily&units=imperial&appid=${this.#options.apiKey
                    }`,
                timeout: 2000,
            };

            const response = await axios(options);

            if (response.statusText !== 'OK') return;
            const { data } = response;

            spinner.classList.add('hidden');
            target.classList.add('show');
            console.log(data);

            return data;
        } catch (err) {
            // console.error(err.message);

            spinner.classList.add('hidden');
            target.classList.add('show');
            return err;
        }
    }

    #init() {
        const target = document.querySelector('.weather-container');

        target.insertAdjacentHTML('afterbegin', markup.loadingSpinnerMarkup());
        target.insertAdjacentHTML('beforeend', markup.weatherMarkup());

        const digitTarget = document.querySelector('.temp-svg');

        digitTarget.insertAdjacentHTML('afterbegin', markup.digitMarkup());
    }

    async #updateWeather() {
        try {
            const data = await this.#getWeather();

            const cleanData = {
                weatherData: {
                    name: data.name,
                    description: data.weather[0].description,
                    temp: {
                        val1: data.main.temp.toString().split('').slice(0, 1),
                        val2: data.main.temp.toString().split('').slice(1, 2),
                    },
                },
                iconData: {
                    icon: data.weather[0].icon.at(-1),
                    iconId: data.weather[0].id,
                },
            };

            return cleanData;
        } catch (err) {
            // console.log(err);
            return err;
        }
    }

    async #renderWeatherUpdates() {
        const weatherDescription = document.querySelector('.description');

        try {
            const data = await this.#updateWeather();

            const digitTarget = document.querySelector('.temp-svg');
            const locationTitle = document.querySelector('.location-title');
            const weatherIcon = document.querySelector('.icon i');

            const { 0: digitOne, 1: digitTwo } = digitTarget.children;

            digitOne.setAttribute('class', `num-${data.weatherData.temp.val1}`);
            digitTwo.setAttribute('class', `num-${data.weatherData.temp.val2}`);
            weatherIcon.setAttribute(
                'class',
                `wi wi-owm-${data.iconData.icon === 'n' ? 'night' : 'day'}-${data.iconData.iconId
                }`
            );
            weatherDescription.innerText = data.weatherData.description;
            locationTitle.innerText = data.weatherData.name;
            // console.log(daat);
        } catch (err) {
            return err;
        }
    }
    #startInterval(bool) {
        if (this.#intervalRunning === false) {
            this.#timeInterval = setInterval(
                async () => await this.#renderWeatherUpdates(),
                1000 * 3
            );
            this.#intervalRunning = bool;
        }
    }

    updateOptions(userOptions) {
        this.#options = { ...userOptions };
        this.#startInterval();
    }

    async start(userOptions) {
        this.updateOptions(userOptions);
        try {
            this.#init();
            const data = await this.#renderWeatherUpdates();
            console.log(data);

            this.#startInterval(true);
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

export default new WeatherView();
