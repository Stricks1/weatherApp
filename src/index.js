const apiKey = '8c00744737828145f3aa9a756bb85f06';

async function getTemp() {
  try {
    const tempFjson = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${apiKey}&units=imperial`,
      { mode: 'cors' },
    );
    const tempCjson = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${apiKey}&units=metric`,
      { mode: 'cors' },
    );
    const tempF = await tempFjson.json();
    const tempC = await tempCjson.json();
    return Promise.resolve([tempF, tempC]);
  } catch (error) {
    return Promise.reject(error);
  }
}

function component() {
  const element = document.createElement('div');
  getTemp().then((response, reject) => {
    const returners = response;
    console.log(returners);
    element.innerHTML = returners[1].main.temp;
    if (!returners[1].main.temp) {
      reject()
    }
  });

  return element;
}

document.body.appendChild(component());