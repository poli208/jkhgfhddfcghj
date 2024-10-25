const Coordinates = require('./models/Coordinates');
const Weather = require('./models/Weather');

module.exports = {
  geocode: async (city) => {
    try {

      console.log(`https://ru.api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.OPENWEATHERMAP_KEY}`)

      const req = await fetch(`https://ru.api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.OPENWEATHERMAP_KEY}`);
      const [response] = await req.json();

      if (!response) {
        return null
      }

      const {lat, lon, local_names} = response;

      return new Coordinates(lat, lon, local_names?.ru ?? city);
    } catch (e) {
      console.error(e)
      return null
    }
  },
  getWeather: async (coordinates) => {
    try {
      const req = await fetch(`https://ru.api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHERMAP_KEY}&lat=${coordinates.lat}&lon=${coordinates.lon}&lang=ru&units=metric`);
      const response = await req.json();

      if (!response) {
        return null
      }

      return Weather.fromResponse({...response, name: coordinates.city});

    } catch (e) {
      console.error(e)
      return null
    }
  }
}
