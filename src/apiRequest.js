import CityWeather from './classes/weatherCity';

async function apiRequest(place) {
  const apiKey = '8c00744737828145f3aa9a756bb85f06';
  try {
    const temperature = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=imperial`,
      { mode: 'cors' },
    );
    const temperatureC = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=metric`,
      { mode: 'cors' },
    );
    const tempR = await temperature.json();
    const tempC = await temperatureC.json();
    const cityInfo = new CityWeather(tempR.name, tempR.sys.country,
      tempC.main.temp, tempR.main.temp, tempR.weather[0].main,
      tempR.weather[0].description, tempR.weather[0].icon, tempR.coord.lat, tempR.coord.lon);
    return Promise.resolve(cityInfo);
  } catch (error) {
    return Promise.reject(alert);
  }
}

async function apiFlickr(weatherInfo, lat, long) {
  const apiKey = '2553c72554412ae1dcc486fb52503f43';
  const tag = 'outside';
  try {
    console.log(weatherInfo)
    const imagesRet = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${weatherInfo}&media=photos&geo_context=2&lat=${lat}&lon=${long}&radius=31&format=json&nojsoncallback=1`,
      { mode: 'cors' },
    );
    console.log(imagesRet)
    const imges = await imagesRet.json();
    const random = Math.floor(Math.random() * (imges.photos.photo.length - 1) + 1);
    console.log(weatherInfo);
    console.log(tag);
    const imgUrl = `https://farm${imges.photos.photo[random].farm}.staticflickr.com/${imges.photos.photo[random].server}/${imges.photos.photo[random].id}_${imges.photos.photo[random].secret}.jpg`;
    console.log(imgUrl)
    return Promise.resolve(imgUrl);
  } catch (error) {
    return Promise.reject(alert);
  }
}

export { apiRequest, apiFlickr };