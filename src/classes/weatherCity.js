class CityWeather {
  constructor(city, country, temperatureC, temperatureF, main, description, icon, lat, long) {
    this.city = city;
    this.country = country;
    this.temperatureC = temperatureC;
    this.temperatureF = temperatureF;
    this.main = main;
    this.description = description;
    this.icon = icon;
    this.lat = lat;
    this.long = long;
  }
}

export default CityWeather;