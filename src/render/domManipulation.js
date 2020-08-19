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
    const dateInfo = document.getElementById('date-info');
    dateInfo.innerHTML = '';
    const errorContainer = document.getElementById('error-container');
    errorContainer.classList.add('d-none');
    const boxInfo = document.getElementById('box-weather');
    boxInfo.classList.add('d-none');
    boxInfo.classList.remove('d-flex');
  }

  function changeCity() {
    clearInfo();
    const boxInfo = document.getElementById('box-weather');
    const loadGif = document.getElementById('loading');
    const errorContainer = document.getElementById('error-container');
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
      const dateInfo = document.getElementById('date-info');
      apiFlickr(cityWeather.main, cityWeather.lat, cityWeather.long).then((response) => {
        const bgImaging = document.getElementById('bg-load');
        const image = new Image();
        image.src = response;
        image.addEventListener('load', () => {
          bgImaging.style.backgroundImage = `url(${response})`;
          loadGif.classList.add('d-none');
          searchBtn.classList.remove('d-none');
          searchInput.classList.remove('d-none');
          boxInfo.classList.remove('d-none');
          boxInfo.classList.add('d-flex');
          cityName.innerHTML = cityWeather.city;
          countryName.innerHTML = cityWeather.country;
          tempC.innerHTML = cityWeather.temperatureC;
          tempF.innerHTML = cityWeather.temperatureF;
          mainInfo.innerHTML = cityWeather.main;
          descripInfo.innerHTML = cityWeather.description;
          let date = new Date().toUTCString();
          date = date.split(' ').slice(0, 4).join(' ');
          dateInfo.innerHTML = date;
          iconImg.setAttribute('src', `http://openweathermap.org/img/wn/${cityWeather.icon}@2x.png`);
        });
      }).catch(() => {
        const bgImaging = document.getElementById('bg-load');
        bgImaging.style.backgroundImage = 'url(https://data.whicdn.com/images/70107766/original.jpg)';
        loadGif.classList.add('d-none');
        searchBtn.classList.remove('d-none');
        searchInput.classList.remove('d-none');
        boxInfo.classList.remove('d-none');
        boxInfo.classList.add('d-flex');
        cityName.innerHTML = cityWeather.city;
        countryName.innerHTML = cityWeather.country;
        tempC.innerHTML = cityWeather.temperatureC;
        tempF.innerHTML = cityWeather.temperatureF;
        mainInfo.innerHTML = cityWeather.main;
        descripInfo.innerHTML = cityWeather.description;
        let date = new Date().toUTCString();
        date = date.split(' ').slice(0, 4).join(' ');
        dateInfo.innerHTML = date;
        iconImg.setAttribute('src', `http://openweathermap.org/img/wn/${cityWeather.icon}@2x.png`);
      });
    }).catch(() => {
      const bgImaging = document.getElementById('bg-load');
      bgImaging.style.backgroundImage = 'url(https://data.whicdn.com/images/70107766/original.jpg)';
      loadGif.classList.add('d-none');
      searchBtn.classList.remove('d-none');
      searchInput.classList.remove('d-none');
      const errorMsg = document.getElementById('error-info');
      errorMsg.innerHTML = `Sorry we could not get weather information for <b>${city.value}</b>, please try another city`;
      errorContainer.classList.remove('d-none');
    });
    return element;
  }

  function changeTemp() {
    const buttonC = document.getElementById('btn-c');
    const buttonF = document.getElementById('btn-f');
    const tempC = document.getElementById('temp-c');
    const tempF = document.getElementById('temp-f');
    buttonC.classList.toggle('selected');
    buttonF.classList.toggle('selected');
    tempC.classList.toggle('d-inline');
    tempC.classList.toggle('d-none');
    tempF.classList.toggle('d-inline');
    tempF.classList.toggle('d-none');
  }

  function setToggleListener() {
    const buttonC = document.getElementById('btn-c');
    const buttonF = document.getElementById('btn-f');
    buttonC.addEventListener('click', changeTemp);
    buttonF.addEventListener('click', changeTemp);
  }

  const setListeners = () => {
    const buttonSearch = document.getElementById('search-city');
    buttonSearch.addEventListener('click', changeCity);
    const inputCity = document.getElementById('address-input');
    inputCity.addEventListener('keypress', (e) => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        changeCity();
      }
    });
    setToggleListener();
  };

  return {
    setListeners,
  };
})();

export default domManipulation;