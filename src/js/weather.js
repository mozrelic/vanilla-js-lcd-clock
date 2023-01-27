import axios from "axios";

const zipCode = "97756";
const apiKey = "ef9f7861750cc66b5688bdfad901efd4";
const BASE_URL_GEO = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${apiKey}`;

export async function getGeo() {
  console.log(BASE_URL_GEO);
  try {
    const response = await axios.get(BASE_URL_GEO);
    const { lat, lon } = response.data;
    console.log(lat, lon);
  } catch (error) {
    console.error(error);
  }
}
