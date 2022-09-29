import axios from "axios"
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=ee4fb7d1a1b956e57ad6b8268e247c41"

const getWeather = async capital => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=' + ${capital} + '&appid=ee4fb7d1a1b956e57ad6b8268e247c41`);
    return response.data;
};

export default getWeather;