import axios from 'axios';
import markup from './markup';

// TODO:
//

class WeatherView {
    #BASE_URL_WEATHER = `https://api.openweathermap.org/`;
    #options;
    #timeInterval;

    async #getGeo() {
        const baseURL = this.#BASE_URL_WEATHER;
        try {
            const { zipcode, apiKey } = this.#options;

            const options = {
                baseURL,
                url: `geo/1.0/zip?zip=${zipcode}&appid=${apiKey}`,
                timeout: 2000,
            };
            const response = await axios(options);
            const data = response.data;

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async #getWeather() {
        const target = document.querySelector('.weather-container');
        const spinner = document.querySelector('.lds-ring');

        const baseURL = this.#BASE_URL_WEATHER;

        try {
            const locationData = await this.#getGeo();
            const { lat, lon } = locationData;

            const options = {
                baseURL,
                url: `data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,daily&units=imperial&appid=${
                    this.#options.apiKey
                }`,
                timeout: 2000,
            };

            const response = await axios(options);

            if (response.statusText !== 'OK') return;
            const { data } = response;

            spinner.classList.add('hidden');
            target.classList.add('show');

            return data;
        } catch (err) {
            console.log(err);
            spinner.classList.add('hidden');
            target.classList.add('show');
        }
    }

    #init() {
        const target = document.querySelector('.weather-container');

        target.insertAdjacentHTML('afterbegin', markup.loadingSpinnerMarkup());
        target.insertAdjacentHTML('beforeend', markup.weatherMarkup());

        const digitTarget = document.querySelector('.temp-svg');
        console.log(digitTarget);
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
            console.log(err);
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
                `wi wi-owm-${data.iconData.icon === 'n' ? 'night' : 'day'}-${
                    data.iconData.iconId
                }`
            );
            weatherDescription.innerText = data.weatherData.description;
            locationTitle.innerText = data.weatherData.name;
        } catch (err) {
            console.log(err);
        }
    }

    start(userOptions) {
        this.#options = { ...userOptions };
        this.#init();
        this.#renderWeatherUpdates();

        this.#timeInterval = setInterval(
            () => this.#renderWeatherUpdates(),
            1000 * 3
        );
    }
    // async start(userOptions) {
    //     this.#options = { ...userOptions };
    //     try {
    //         this.#init();
    //         await this.#renderWeatherUpdates();
    //
    //         this.#timeInterval = setInterval(
    //             async () => await this.#renderWeatherUpdates(),
    //             1000 * 3
    //         );
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}

export default new WeatherView();
