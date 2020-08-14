import apiRequest from './apiRequest';

function component() {
  const element = document.createElement('div');
  apiRequest('London,uk', 'metric').then((response) => {
    const returners = response;
    console.log(returners);
    element.innerHTML = returners.main.temp;
  }).catch(e => {
    console.log('here')
    e('a3');
    console.log('here2')
  });
  return element;
}

document.body.appendChild(component());