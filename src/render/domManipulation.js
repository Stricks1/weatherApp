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
    apiRequest(city.value).then((response) => {
      const cityName = document.getElementById('city-name');
      cityName.innerHTML = response.city;
      const countryName = document.getElementById('country-name');
      countryName.innerHTML = response.country;
      const tempC = document.getElementById('temp-c');
      tempC.innerHTML = response.temperatureC;
      const tempF = document.getElementById('temp-f');
      tempF.innerHTML = response.temperatureF;
      const mainInfo = document.getElementById('main-info');
      mainInfo.innerHTML = response.main;
      const descripInfo = document.getElementById('description-info');
      descripInfo.innerHTML = response.description;
      const iconImg = document.getElementById('icon-img');
      iconImg.setAttribute('src', `http://openweathermap.org/img/wn/${response.icon}@2x.png`);
      apiFlickr(response.main).then((response) => {
        const bgImaging = document.getElementById('bg-load');
        bgImaging.style.backgroundImage = `url(${response})`;
      }).catch(() => {
        const bgImaging = document.getElementById('bg-load');
        bgImaging.style.backgroundImage = 'url(https://data.whicdn.com/images/70107766/original.jpg)';
      });
      loadGif.classList.add('d-none');
      searchBtn.classList.remove('d-none');
      searchInput.classList.remove('d-none');
    }).catch(() => {
      const cityName = document.getElementById('city-name');
      cityName.innerHTML = 'City not found, please try another city';
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