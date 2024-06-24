function refreshWeather(response) {
  let temperatureELement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#date-time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

  cityElement.innerHTML = response.data.city;
  temperatureELement.innerHTML = response.data.temperature.current;
  temperatureELement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  speedElement.innerHTML = response.data.wind.speed;
  timeElement.innerHTML = formatDate(date);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "a448f164ed4ot600b779c438c2f1cdaf";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "a448f164ed4ot600b779c438c2f1cdaf";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response);

  let days = ["Tues", "Wed", "Thurs", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` 
        <div class="weather-forecast-day">
         <div class="weather-forecast-date">${day}</div>
         <div class="weather-forecast-icon">🌥️</div>
         <div class="weather-forecast-temp">
            <span class="weather-forecast-temp-high">18</span>
            <span class="weather-forecast-temp-low">12</span>
         </div>
        `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Sydney");
