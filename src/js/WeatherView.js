import axios from 'axios';
import markup from './markup';

// TODO:
//

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
            const data = response.data;

            return data;
        } catch (err) {
            // If an error occured with either the api key or the zipcode, setInterval will be cleared
            // I think this needs to happen here, as oppsed to the other weather methods, because this
            // is the first time we try to connect to the api
            // clearInterval(this.#timeInterval);
            // this.#intervalRunning = false;
            this.#stopInterval();

            if (err.response.status === 404) {
                console.error(
                    `Zipcode is probably wrong : ${zipcode}`,
                    err.response
                );
            }
            if (err.response.status === 401) {
                console.error(
                    `API Key probably is wrong or api is down : ${apiKey}`,
                    err.message
                );
            }
            // console.log(err);
            return err;
        }
    }

    async #getWeather(geoData) {
        const target = document.querySelector('.weather-container');
        const spinner = document.querySelector('.lds-ring');

        const baseURL = this.#BASE_URL_WEATHER;

        try {
            const locationData = geoData;
            // console.log(geoData);
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
            // console.log(data);

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

    async #updateWeather(weatherData) {
        try {
            const data = weatherData;

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

    async #renderWeatherUpdates(cleanWeatherData) {
        const weatherDescription = document.querySelector('.description');

        try {
            const data = cleanWeatherData;

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
        } catch (err) {
            return err;
        }
    }
    #startInterval(bool) {
        if (this.#intervalRunning === false) {
            this.#timeInterval = setInterval(
                async () => await this.#weather(),
                1000 * 3
            );
            this.#intervalRunning = bool;
        }
    }
    #stopInterval() {
        clearInterval(this.#timeInterval);
        this.#intervalRunning = false;
    }

    updateOptions(userOptions) {
        this.#options = { ...userOptions };
        this.#startInterval(true);
    }
    async #weather() {
        try {
            const geoData = await this.#getGeo();
            this.#apiErrorHandler(geoData);

            const weatherData = await this.#getWeather(geoData);
            const cleanWeatherData = await this.#updateWeather(weatherData);
            await this.#renderWeatherUpdates(cleanWeatherData);
        } catch (err) {
            // console.log(err);
            return err;
        }
    }
    #apiErrorHandler(data) {
        console.log(data);
        const apiKeyContainer = document.querySelector('.api-key-container');
        const zipcodeContainer = document.querySelector('.zipcode-container');
        const errEl1 = apiKeyContainer.querySelector('.error-msg.apiKey');
        const errEl2 = zipcodeContainer.querySelector('.error-msg.zipcode');
        const weatherContainer = document.querySelector('.weather');

        console.log(apiKeyContainer.children.length);
        if (apiKeyContainer.children.length > 1) errEl1.remove();

        if (zipcodeContainer.children.length > 1) errEl2.remove();

        if (!data.response) return;
        const { status } = data.response;
        const { message } = data.response.data;

        const errorElement = `<p class="error-msg ${status === 401 ? 'apiKey' : status === 404 ? 'zipcode' : ''
            }">${message}</p>`;

        if (status === 401) {
            const target = apiKeyContainer;
            const guard = document.querySelector('.apiKey');
            if (!guard) target.insertAdjacentHTML('afterbegin', errorElement);
            weatherContainer.remove();
            this.#init();
        }

        if (status === 404) {
            const target = zipcodeContainer;
            const guard = document.querySelector('.zipcode');
            if (!guard) target.insertAdjacentHTML('afterbegin', errorElement);
            weatherContainer.remove();
            this.#init();
        }
    }

    async start(userOptions) {
        this.updateOptions(userOptions);
        try {
            this.#init();

            await this.#weather();

            this.#startInterval(true);
        } catch (err) {
            console.log(err);
        }
    }
}

export default new WeatherView();
