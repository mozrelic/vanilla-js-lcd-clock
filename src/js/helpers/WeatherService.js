import axios from 'axios';

class WeatherService {
    #BASE_URL_WEATHER = `https://api.openweathermap.org/`;
    #options;

    setOptions(options) {
        this.#options = {
            apiKey: options.apiKey,
            zipcode: options.zipcode,
        };
    }
    async getGeoFromApi() {
        const baseURL = this.#BASE_URL_WEATHER;
        const { zipcode, apiKey } = this.#options;
        try {
            const options = {
                baseURL,
                url: `geo/1.0/zip?zip=${zipcode}&appid=${apiKey}`,
                timeout: 2000,
            };
            return await axios(options);
        } catch (err) {
            return err;
        }
    }

    async getWeatherFromApi(geoData) {
        const target = document.querySelector('.weather-container');
        const spinner = document.querySelector('.lds-ring');

        const baseURL = this.#BASE_URL_WEATHER;

        try {
            const locationData = geoData.data;
            const { lat, lon } = locationData;

            const options = {
                baseURL,
                url: `data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,daily&units=imperial&appid=${this.#options.apiKey
                    }`,
                timeout: 2000,
            };

            spinner.classList.add('hidden');
            target.classList.add('show');

            return await axios(options);
        } catch (err) {
            spinner.classList.add('hidden');
            target.classList.add('show');

            return err;
        }
    }
}

export default new WeatherService();
