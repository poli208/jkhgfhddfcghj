class Config {
  lat
  lon
  city
  frequency

  constructor(lat, lon, city, frequency) {
    this.lat = lat;
    this.lon = lon;
    this.city = city;
    this.frequency = frequency;
  }

  static fromObject({lat, lon, city, frequency}){
    return new Config(lat, lon, city, frequency);
  }
}

module.exports = Config;
