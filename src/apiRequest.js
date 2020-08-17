async function apiRequest(place, tempType) {
  const apiKey = '8c00744737828145f3aa9a756bb85f06';
  try {
    const temperature = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=${tempType}`,
      { mode: 'cors' },
    );
    console.log(temperature);
    const temp = temperature.json();
    return Promise.resolve(temp);
  } catch (error) {
    return Promise.reject(alert);
  }
}

export default apiRequest;