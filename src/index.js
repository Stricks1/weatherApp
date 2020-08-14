

async function apiRequest(place, tempType) {
  const apiKey = '8c00744737828145f3aa9a756bb85f06';
  try {
    const temperature = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=${tempType}`,
      { mode: 'cors' },
    );
    const temp = await temperature.json();
    return Promise.resolve(temp);
  } catch (error) {
    return Promise.reject(error);
  }
}

function component() {
  const element = document.createElement('div');
  apiRequest('London,uk', 'metric').then((response, reject) => {
    const returners = response;
    console.log(returners);
    element.innerHTML = returners.main.temp;
    if (!returners.main.temp) {
      element.innerHTML = reject;
    }
  });

  return element;
}

document.body.appendChild(component());