import apiRequest from '../apiRequest';

const domManipulation = (() => {
  function changeCity() {
    const city = document.getElementById('address-input');
    const element = document.createElement('div');
    apiRequest(city.value, 'metric').then((response) => {
      const returners = response;
      element.innerHTML = returners.main.temp;
      document.body.appendChild(element);
    }).catch(e => {
      element.innerHTML = 'City not found';
      document.body.appendChild(element);
    });
    return element;
  }

  const setListeners = () => {
    const city = document.getElementById('address-input');
    city.addEventListener('change', changeCity);
  };

  return {
    setListeners,
  };
})();

export default domManipulation;