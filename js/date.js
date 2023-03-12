const time = document.querySelector(".time");
const ourDate = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");

const options = {
  month: "long",
  day: "numeric",
  weekday: "long",
};

const timeOfDayEn = [
  "Good morning",
  "Good afternoon",
  "Good evening",
  "Good night",
];

const timeOfDayUk = [
  "Доброго ранку",
  "Добрий день",
  "Добрий вечір",
  "Доброї ночі",
];

const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
};

export const showDate = (language = "en-US") => {
  if (language === null) language = "en-US";
  const date = new Date();
  const currentDate = date.toLocaleString(language, options);
  ourDate.textContent = currentDate;
  setTimeout(showTime, 10000);
};

export const getTimeOfDay = (language = "en") => {
  const timeOfDay = language === "en" ? timeOfDayEn : timeOfDayUk;
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 6 && hours <= 11) return timeOfDay[0];
  else if (hours >= 12 && hours <= 17) return timeOfDay[1];
  else if (hours >= 18 && hours <= 23) return timeOfDay[2];
  else if (hours >= 0 && hours <= 5) return timeOfDay[3];
};

export const showGreeting = (language) => {
  greeting.textContent = `${getTimeOfDay(language)}`;
};

document.addEventListener("DOMContentLoaded", () => {
  showTime();
  showDate(localStorage.getItem("language"));
  showGreeting(localStorage.getItem("language"));
});

function setLocalStorage() {
  localStorage.setItem("name", name.value);
}

name.addEventListener("input", () => {
  if (!name.value) {
    name.placeholder =
      localStorage.getItem("language") === "en" ? "Enter name" : "Введіть ім'я";
  }
});

export function getLocalStorage(language = "en") {
  if (!name.value) {
    name.placeholder = language === "en" ? "Enter name" : "Введіть ім'я";
  }
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
}

window.addEventListener(
  "load",
  getLocalStorage(localStorage.getItem("language"))
);
window.addEventListener("beforeunload", () => {
  setLocalStorage();
  getLocalStorage(localStorage.getItem("language"));
});
