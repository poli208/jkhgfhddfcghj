const {WEATHER_EMOJIS} = require('../constants');

class Weather {
  description
  temp
  feelsLike
  pressure
  humidity
  windSpeed
  city
  emoji

  constructor(description, temp, feelsLike, pressure, humidity, windSpeed, city, id) {
    this.description = description ?? null
    this.temp = temp ?? null
    this.feelsLike = feelsLike ?? null
    this.pressure = pressure ?? null
    this.humidity = humidity ?? null
    this.windSpeed = windSpeed ?? null
    this.city = city ?? null

    WEATHER_EMOJIS.forEach((emoji) => {
      if(id <= emoji.max && id>=emoji.min){
        this.emoji = emoji.emoji
      }
    })
  }

  static fromResponse({weather = [], main, wind, name}) {
    const [{description}] = weather
    const [{id}] = weather
    const {temp} = main
    const {feels_like} = main
    const {pressure} = main
    const {humidity} = main
    const {speed} = wind

    return new Weather(
      description,
      temp,
      feels_like,
      pressure,
      humidity,
      speed,
      name,
      id
    )
  }
}

module.exports = Weather;
