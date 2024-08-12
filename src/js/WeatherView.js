import axios from 'axios';
import markup from './markup';
import { AnimateTransition } from './helpers/Animation';

// TODO:
//

class WeatherView {
  #BASE_URL_WEATHER = `https://api.openweathermap.org/`;
  #options;
  #timeInterval;
  #intervalRunning = false;

  async #getGeoFromApi() {
    const baseURL = this.#BASE_URL_WEATHER;
    const { zipcode, apiKey } = this.#options;
    try {
      const options = {
        baseURL,
        url: `geo/1.0/zip?zip=${zipcode}&appid=${apiKey}`,
        timeout: 2000,
      };
      const response = await axios(options);
      return response;
    } catch (err) {
      return err;
    }
  }

  async #getWeatherFromApi(geoData) {
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

      const response = await axios(options);

      spinner.classList.add('hidden');
      target.classList.add('show');

      // return data;
      return response;
    } catch (err) {
      spinner.classList.add('hidden');
      target.classList.add('show');
      return err;
    }
  }

  #renderWeatherMarkup() {
    if (this.#options.hideWeather) return;
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

    return {
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
  }

  async #renderWeatherUpdates(cleanWeatherData) {
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

  #startInterval(bool) {
    this.#getWeather();
    if (this.#intervalRunning === false) {
      this.#timeInterval = setInterval(
        async () => await this.#getWeather(),
        1000 * 9
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

  async #getWeather() {
    try {
      const geoData = await this.#getGeoFromApi();
      this.#apiErrorMessageHandler(geoData);
      const weatherData = await this.#getWeatherFromApi(geoData);
      const cleanWeatherData = await this.#updateWeather(weatherData);
      await this.#renderWeatherUpdates(cleanWeatherData);
    } catch (err) {
      return err;
    }
  }

  #apiErrorMessageHandler(data) {
    const status = data?.response?.status;
    const message = data?.response?.data?.message;
    const apiKeyContainer = document.querySelector('.api-key-container'),
      zipcodeContainer = document.querySelector('.zipcode-container'),
      weatherContainer = document.querySelector('.weather'),
      apiKeyErrorMsg = document.querySelector('.error-msg.apiKey'),
      zipcodeErrorMsg = document.querySelector('.error-msg.zipcode');

    const errorElement = `<p class="error-msg ${status === 401
        ? 'apiKey'
        : status === 404 || status === 400
          ? 'zipcode'
          : ''
      }">${message}</p>`;

    // in all instances of error, we want to stop our setInterval, so we call this here.
    this.#stopInterval();

    // chose an arrow function here because needed access to the outer this for this.#initRender()
    const handleError = (targetClass, parentContainer) => {
      const guard = document.querySelector(targetClass);
      if (!guard)
        parentContainer.insertAdjacentHTML('beforeend', errorElement);
      parentContainer.classList.add('error');
      weatherContainer.remove();
      this.#renderWeatherMarkup();
    };

    if (status === 401) {
      handleError('.apiKey', apiKeyContainer);
      console.error(
        `API Key probably is wrong or api is down : `,
        data?.response.statusText
      );
      const animateIn = new AnimateTransition('.error-msg.apiKey');
      animateIn.startAnimation();
    } else {
      const animateOut = new AnimateTransition(
        '.error-msg.apiKey',
        'slideOut'
      );
      const delayLength = animateOut.startAnimation();

      setTimeout(() => {
        apiKeyContainer
          ? apiKeyContainer.classList.remove('error')
          : '';
        apiKeyErrorMsg ? apiKeyErrorMsg.remove() : '';
      }, delayLength);
    }

    if (status === 404 || status === 400) {
      handleError('.zipcode', zipcodeContainer);
      console.error(
        `Zipcode is probably wrong : `,
        data?.response.statusText
      );
      const animateIn = new AnimateTransition('.error-msg.zipcode');
      animateIn.startAnimation();
    } else {
      const animateOut = new AnimateTransition(
        '.error-msg.zipcode',
        'slideOut'
      );
      const delayLength = animateOut.startAnimation();
      setTimeout(() => {
        zipcodeContainer
          ? zipcodeContainer.classList.remove('error')
          : '';
        zipcodeErrorMsg ? zipcodeErrorMsg.remove() : '';
      }, delayLength);
    }
  }

  start(userOptions) {
    this.updateOptions(userOptions);
    this.#renderWeatherMarkup();
    this.#startInterval(true);
  }
}

export default new WeatherView();
