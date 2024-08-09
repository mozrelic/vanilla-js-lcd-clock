import axios from 'axios';
import markup from './markup';
import AnimateTransition from './helpers/Animation';

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
      const { lat, lon } = locationData;

      const options = {
        baseURL,
        url: `data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,daily&units=imperial&appid=${this.#options.apiKey
          }`,
        timeout: 2000,
      };

      const response = await axios(options);

      const { data } = response;

      spinner.classList.add('hidden');
      target.classList.add('show');

      return data;
    } catch (err) {
      console.log(err);

      spinner.classList.add('hidden');
      target.classList.add('show');
      return err;
    }
  }

  #initRender() {
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
  }

  async #renderWeatherUpdates(cleanWeatherData) {
    const weatherDescription = document.querySelector('.description');
    const digitTarget = document.querySelector('.temp-svg');
    const locationTitle = document.querySelector('.location-title');
    const weatherIcon = document.querySelector('.icon i');

    const data = cleanWeatherData;

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
  }

  #startInterval(bool) {
    this.#weather();
    if (this.#intervalRunning === false) {
      this.#timeInterval = setInterval(
        async () => await this.#weather(),
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
    // console.log(data);
    const apiKeyContainer = document.querySelector('.api-key-container'),
      zipcodeContainer = document.querySelector('.zipcode-container'),
      errEl1 = apiKeyContainer.querySelector('.error-msg.apiKey'),
      errEl2 = zipcodeContainer.querySelector('.error-msg.zipcode'),
      weatherContainer = document.querySelector('.weather');

    if (apiKeyContainer.children.length > 1) {
      apiKeyContainer.classList.remove('error');
      errEl1.remove();
    }

    if (zipcodeContainer.children.length > 1) {
      zipcodeContainer.classList.remove('error');
      errEl2.remove();
    }

    if (!data.response) return;
    const { status } = data.response;
    const { message } = data.response.data;

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
      this.#initRender();
    };

    if (status === 401) {
      handleError('.apiKey', apiKeyContainer);
      console.error(
        `API Key probably is wrong or api is down : `,
        data?.response.statusText
      );
    }

    if (status === 404 || status === 400) {
      handleError('.zipcode', zipcodeContainer);
      console.error(
        `Zipcode is probably wrong : `,
        data?.response.statusText
      );
    }
    if (status !== 200) {
      AnimateTransition.startAnimation('.error-msg');
    }
    console.log(status);
  }

  start(userOptions) {
    this.updateOptions(userOptions);
    this.#initRender();
    this.#startInterval(true);
  }
}

export default new WeatherView();
