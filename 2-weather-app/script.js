document.getElementById("location-form").addEventListener("submit", getWeather);

const weatherDataDisplay = document.getElementById("weather-data");

const API_KEY = "bfe40e05d9371e69717cc8e8daa9bf71";

async function getWeather(e) {
  e.preventDefault();
  try {
    const locationInput = document.getElementById("location-input");
    const location = locationInput.value;

    const fetchData = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&appid=bfe40e05d9371e69717cc8e8daa9bf71&units=metric"
    );
    const weatherData = await fetchData.json();

    weatherDataDisplay.innerHTML = createUI(weatherData);
    //clears the location
    locationInput.value = "";
  } catch (error) {
    createUI(error);
  }
}

const createUI = (weatherData) => {
  if (weatherData.cod === 200) {
    const name = weatherData.name;
    const status = weatherData.weather[0].main;
    const temp = weatherData.main.temp;

    return `<h2>${name}</h2>
    <p>${status}</p>
    <p>${temp} °C</p>
    `;
  } else {
    return `<h2>Error: City not found</h2>`;
  }
};
