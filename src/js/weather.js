import axios from 'axios';

const zipCode = '97756';
const apiKey = 'ef9f7861750cc66b5688bdfad901efd4';

const BASE_URL_GEO = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${apiKey}`;
// const BASE_URL_WEATHER = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

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
  try {
    const locationData = await getGeo();
    const { lat, lon } = locationData;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,daily&units=imperial&appid=${apiKey}`
    );
    const { data } = response;

    return data;
  } catch (err) {
    console.log(err);
  }
}

export function renderWeather(data) {
  const target = document.querySelector('.weather-container');
  const cleanData = {
    name: data.name,
    description: data.weather[0].description,
    iconId: data.weather[0].id,
    icon: data.weather[0].icon,
    temp: data.main.temp,
  };

  const dayOrNight = cleanData.icon.at(-1);

  const weatherMarkup = `
  <div class="location-title">${cleanData.name}</div>
    <div class="icon">
    <i class="wi wi-owm-${dayOrNight === 'n' ? 'night' : 'day'}-${cleanData.iconId
    }"></i>
    </div>
    <div class="description">
      ${cleanData.description}
    </div>
  <div class="temp"> <i class="wi wi-fahrenheit"></i>${cleanData.temp}</div >
    `;

  target.insertAdjacentHTML('afterbegin', weatherMarkup);
  // console.log(cleanData);
}
