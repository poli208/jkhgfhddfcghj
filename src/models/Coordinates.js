class Coordinates {
  lat
  lon
  city

  constructor(lat, lon, city) {
    this.lat = lat ?? null;
    this.lon = lon ?? null;
    this.city = city ?? null;
  }
}

module.exports = Coordinates
