const axios = require('axios');

const getClima = async(lat, lon) => {
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5a5c8757c736af3181031759fb811d9b&units=metric`)
    return resp.data.main.temp;
}

module.exports = {
    getClima
}