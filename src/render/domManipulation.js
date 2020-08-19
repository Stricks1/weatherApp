import { apiRequest, apiFlickr } from '../apiRequest';

const domManipulation = (() => {
  function clearInfo() {
    const cityName = document.getElementById('city-name');
    cityName.innerHTML = '';
    const countryName = document.getElementById('country-name');
    countryName.innerHTML = '';
    const tempC = document.getElementById('temp-c');
    tempC.innerHTML = '';
    const tempF = document.getElementById('temp-f');
    tempF.innerHTML = '';
    const mainInfo = document.getElementById('main-info');
    mainInfo.innerHTML = '';
    const descripInfo = document.getElementById('description-info');
    descripInfo.innerHTML = '';
    const iconImg = document.getElementById('icon-img');
    iconImg.setAttribute('src', '');
  }

  function changeCity() {
    clearInfo();
    const loadGif = document.getElementById('loading');
    loadGif.classList.remove('d-none');
    const searchBtn = document.getElementById('search-city');
    const searchInput = document.querySelector('.algolia-places');
    searchInput.classList.add('d-none');
    searchBtn.classList.add('d-none');
    const city = document.getElementById('address-input');
    const element = document.createElement('div');
    apiRequest(city.value).then((cityWeather) => {
      const cityName = document.getElementById('city-name');
      const countryName = document.getElementById('country-name');
      const tempC = document.getElementById('temp-c');
      const tempF = document.getElementById('temp-f');
      const mainInfo = document.getElementById('main-info');
      const descripInfo = document.getElementById('description-info');
      const iconImg = document.getElementById('icon-img');
      apiFlickr(cityWeather.main, cityWeather.lat, cityWeather.long).then((response) => {
        const bgImaging = document.getElementById('bg-load');
        const image = new Image();
        image.src = response;
        image.addEventListener('load', () => {
          bgImaging.style.backgroundImage = `url(${response})`;
          loadGif.classList.add('d-none');
          searchBtn.classList.remove('d-none');
          searchInput.classList.remove('d-none');
          cityName.innerHTML = cityWeather.city;
          countryName.innerHTML = cityWeather.country;
          tempC.innerHTML = cityWeather.temperatureC;
          tempF.innerHTML = cityWeather.temperatureF;
          mainInfo.innerHTML = cityWeather.main;
          descripInfo.innerHTML = cityWeather.description;
          iconImg.setAttribute('src', `http://openweathermap.org/img/wn/${cityWeather.icon}@2x.png`);
        });
      }).catch(() => {
        const bgImaging = document.getElementById('bg-load');
        bgImaging.style.backgroundImage = 'url(https://data.whicdn.com/images/70107766/original.jpg)';
      });
    }).catch(() => {
      const cityName = document.getElementById('city-name');
      cityName.innerHTML = 'City not found, please try another city';
      const bgImaging = document.getElementById('bg-load');
      bgImaging.style.backgroundImage = 'url(https://data.whicdn.com/images/70107766/original.jpg)';
      loadGif.classList.add('d-none');
      searchBtn.classList.remove('d-none');
      searchInput.classList.remove('d-none');
    });
    return element;
  }

  const setListeners = () => {
    const buttonSearch = document.getElementById('search-city');
    buttonSearch.addEventListener('click', changeCity);
  };

  return {
    setListeners,
  };
})();

export default domManipulation;