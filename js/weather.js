const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherError = document.querySelector(".weather-error");
const city = document.querySelector(".city");
city.value = "Minsk";
const translateDataUK = ["Швидкість вітру", "м/с", "Вологість"];
export async function getWeather(
  language = "en",
  translateData = ["Wind speed", "m/s", "Humidity"]
) {
  translateData = language === "en" ? translateData : translateDataUK;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=e2599aa70d4b4711c30d7eb153f20fea&units=metric`;
  const res = await fetch(url);

  if (res["ok"]) {
    const data = await res.json();
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${translateData[0]}: ${Math.ceil(data.wind.speed)} ${
      translateData[1]
    }`;
    humidity.textContent = `${translateData[2]}: ${data.main.humidity}%`;
    showWeather(true);
  } else {
    showWeather(false);
  }
}

function showWeather(condition) {
  if (condition) {
    weatherIcon.style.display = "flex";
    temperature.style.display = "flex";
    weatherDescription.style.display = "flex";
    wind.style.display = "flex";
    humidity.style.display = "flex";
    weatherError.style.display = "none";
  } else {
    weatherIcon.style.display = "none";
    temperature.style.display = "none";
    weatherDescription.style.display = "none";
    wind.style.display = "none";
    humidity.style.display = "none";
    weatherError.style.display = "flex";
    weatherError.textContent =
      localStorage.getItem("language") === "en"
        ? `Error! city not found for '${city.value}'!`
        : `Помилка! місто не знайдено для '${city.value}'`;
    if (!city.value) {
      city.placeholder =
        localStorage.getItem("language") === "en"
          ? "[ Enter city ]"
          : "[ Введіть місто ]";
      weatherError.style.display = "flex";
      weatherError.textContent =
        localStorage.getItem("language") === "en"
          ? "Error! Nothing to geocode!"
          : "Помилка! Нема чого геокодувати!";
      return;
    }
  }
}

city.addEventListener("input", () => {
  if (!city.value) {
    city.placeholder =
      localStorage.getItem("language") === "en"
        ? "[ Enter city ]"
        : "[ Введіть місто ]";
  }
});

city.addEventListener("change", () => {
  getWeather(localStorage.getItem("language"));
});

function getLocalStorage() {
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
    getWeather(localStorage.getItem("language"));
  } else getWeather(localStorage.getItem("language"));
}

function setLocalStorage() {
  localStorage.setItem("city", city.value);
}

window.addEventListener("load", getLocalStorage);
window.addEventListener("beforeunload", setLocalStorage);
