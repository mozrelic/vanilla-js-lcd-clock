import axios from 'axios';
import markup from './markup';

// TODO: turn this into a class that accepts options passed into from the user to set zip code and apikey. Also need
// to add a setInterval to update the weather

// create a WeatherView class with a constructor that accepts parameters for zipcode, apikey, and a callback function
class WeatherView {
    #BASE_URL_WEATHER = `https://api.openweathermap.org/`;
    #options;

    async #getGeo() {
        const baseURL = this.#BASE_URL_WEATHER;
        try {
            const { zipcode, apiKey } = this.#options;
            console.log(zipcode, apiKey);
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
        const target = document.querySelector('.weather');
        const spinner = document.querySelector('.lds-ring');

        const baseURL = this.#BASE_URL_WEATHER;
        console.log(baseURL);
        try {
            const locationData = await this.#getGeo();
            const { lat, lon } = locationData;

            const options = {
                baseURL,
                url: `data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,daily&units=imperial&appid=${this.#options.apiKey
                    }`,
                timeout: 2000,
            };
            const response = await axios(options).then((res) => {
                // console.log(res);
                if (res.statusText !== 'OK') return;
                const { data } = res;
                spinner.classList.add('hidden');
                target.classList.add('show');

                return data;
            });

            return response;
        } catch (err) {
            console.log(err);
        }
    }

    async start(userOptions) {
        this.#options = { ...userOptions };
        try {
            this.#renderWeather();
            this.timeInterval = setInterval(
                () => this.#renderWeather(),
                1000 * 300
            );
        } catch (error) { }
    }

    async #updateWeater() {
        const data = await this.#getWeather();

        const cleanData = {
            weatherData: {
                name: data.name,
                description: data.weather[0].description,
                iconId: data.weather[0].id,
                // icon: data.weather[0].icon.at(-1),
                // TODO:
                // need to pad the temperature digits with a zero, or make sure
                // that if temp is a single digit, that the decimal point isn't shown.
                temp: data.main.temp.toString().split('').slice(0, 2).join(''),
            },
            icon: data.weather[0].icon.at(-1),
        };

        return cleanData;
    }

    async #renderWeather() {
        const target = document.querySelector('.weather');
        const data = await this.#updateWeater();
        // const data = await this.#getWeather();
        //
        // const cleanData = {
        //     name: data.name,
        //     description: data.weather[0].description,
        //     iconId: data.weather[0].id,
        //     icon: data.weather[0].icon,
        //     // TODO:
        //     // need to pad the temperature digits with a zero, or make sure
        //     // that if temp is a single digit, that the decimal point isn't shown.
        //     temp: data.main.temp.toString().split('').slice(0, 2).join(''),
        // };
        //
        // const dayOrNight = cleanData.icon.at(-1);

        target.insertAdjacentHTML(
            'afterbegin',
            markup.weatherMarkup(data.weatherData, data.icon)
        );
    }
}

export default new WeatherView();
