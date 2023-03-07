import axios from 'axios';
import Markup from './markup';

const zipCode = '97756';
const apiKey = 'ef9f7861750cc66b5688bdfad901efd4';

const BASE_URL_GEO = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${apiKey}`;
// const BASE_URL_WEATHER = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

// TODO: turn this into a class that accepts options passed into from the user to set zip code and apikey. Also need
// to add a setInterval to update the weather

const spinner = document.querySelector('.lds-ring');

async function getGeo() {
  try {
    const response = await axios.get(BASE_URL_GEO);
    const data = response.data;

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getWeather() {
  const target = document.querySelector('.weather');

  const baseURL = 'https://api.openweathermap.org/data/2.5/';
  try {
    const locationData = await getGeo();
    const { lat, lon } = locationData;

    const options = {
      baseURL,
      url: `weather?lat=${lat}&lon=${lon}&exclude=hourly,daily&units=imperial&appid=${apiKey}`,
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

export function renderWeather(data) {
  const target = document.querySelector('.weather');
  const cleanData = {
    name: data.name,
    description: data.weather[0].description,
    iconId: data.weather[0].id,
    icon: data.weather[0].icon,
    // TODO:
    // need to pad the temperature digits with a zero, or make sure
    // that if temp is a single digit, that the decimal point isn't shown.
    temp: data.main.temp.toString().split('').slice(0, 2).join(''),
  };

  const dayOrNight = cleanData.icon.at(-1);

  target.insertAdjacentHTML(
    'afterbegin',
    Markup.weatherMarkup(cleanData, dayOrNight)
  );
}
