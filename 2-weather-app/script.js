document.getElementById("location-form").addEventListener("submit", getWeather);

const API_KEY = "bfe40e05d9371e69717cc8e8daa9bf71";

async function getWeather(e) {
  e.preventDefault();
  try {
    const location = document.getElementById("location-input").value;
    console.log(location);

    const fetchData = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&appid=bfe40e05d9371e69717cc8e8daa9bf71&units=metric"
    );

    const weatherData = await fetchData.json();
    console.log(weatherData.name);
  } catch (error) {
    console.log(error);
  }
}
