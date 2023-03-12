import { showDate } from "../js/date.js";
import { showGreeting } from "../js/date.js";
import { getLocalStorage } from "../js/date.js";
import { getWeather } from "./weather.js";
import { getQuotes } from "./quotes.js";
const languageCheckbox = document.querySelector(".language-checkbox");
const languageMod = document.querySelector(".language-mod");
const languageKnob = document.querySelector(".language-knob");
const settingsDesc = document.querySelectorAll(".description");

export const timeOfDayEn = [
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

const settingsEn = [
  "Language:",
  "Chose API:",
  "Player:",
  "Weather:",
  "Time:",
  "Date:  ",
  "Greeting:",
  "Quotes:",
];

const settingsUk = [
  "Мова:",
  "Виберіть API:",
  "Плеєр:",
  "Погода:",
  "Час:",
  "Дата:",
  "Привітанне:",
  "Цитати:",
];

languageCheckbox.addEventListener("change", generateTranslation);
function generateTranslation() {
  if (this.checked) {
    languageMod.textContent = "Український";
    languageKnob.classList.add("lchecked");
    translateDate(false);
    translateGreetings(false);
    translateWeather(false);
    translateQuotes(false);
    translateSettings(false);
  } else {
    languageMod.textContent = "English";
    languageKnob.classList.remove("lchecked");
    translateDate(true);
    translateGreetings(true);
    translateWeather(true);
    translateQuotes(true);
    translateSettings(true);
  }
}

function translateDate(isEng) {
  if (isEng) showDate("en-US");
  else showDate("uk");
}

function translateGreetings(isEng) {
  if (isEng) {
    showGreeting("en");
    getLocalStorage("en");
  } else {
    showGreeting("uk");
    getLocalStorage("uk");
  }
}

function translateWeather(isEng) {
  if (isEng) {
    getWeather("en");
  } else {
    getWeather("uk");
  }
}

function translateQuotes(isEng) {
  if (isEng) {
    getQuotes("en");
  } else {
    getQuotes("uk");
  }
}

export function translateSettings(isEng) {
  if (isEng) {
    for (let i = 0; i < settingsDesc.length; i++) {
      settingsDesc[i].textContent = settingsEn[i];
    }
  } else {
    for (let i = 0; i < settingsDesc.length; i++) {
      settingsDesc[i].textContent = settingsUk[i];
    }
  }
}
