import { getLocalStorage } from "../js/date.js";
import { translateSettings } from "../js/pageTranslater.js";
const settingsIco = document.querySelector(".settings-ico");
const settingsContainer = document.querySelector(".settings-container");
const languageMod = document.querySelector(".language-mod");
const checkbox = document.querySelectorAll(".def-checkbox");
const languageCheckbox = document.querySelector(".language-checkbox");
const player = document.querySelector(".player");
const languageKnob = document.querySelector(".language-knob");
const weather = document.querySelector(".weather");
const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greetings = document.querySelector(".greeting-container");
const quote = document.querySelector(".quote-container");
const displayArr = [player, weather, time, date, greetings, quote];
settingsIco.addEventListener("click", (e) => {
  if (e.target.classList.contains("scale")) {
    e.target.classList.remove("scale");
    fadeOut(settingsContainer);
  } else {
    e.target.classList.add("scale");
    fadeIn(settingsContainer);
  }
});

function moveTogglerKnob(isCh, toggler) {
  if (typeof isCh === "string") isCh = isCh === "true";
  if (isCh) {
    toggler.classList.add("checked");
    toggler.closest(".toggler-slider").classList.add("green");
  } else {
    toggler.classList.remove("checked");
    toggler.closest(".toggler-slider").classList.remove("green");
  }
}

function displayElements(isDisp, nameOfElement) {
  if (typeof isDisp === "string") isDisp = isDisp === "true";
  if (isDisp) fadeIn(document.querySelector(`.${nameOfElement}`));
  else fadeOut(document.querySelector(`.${nameOfElement}`));
}

checkbox.forEach((element) => {
  element.addEventListener("change", () => {
    if (element.checked) {
      const togglerKnob = element.nextElementSibling.firstElementChild;
      togglerKnob.parentNode;
      moveTogglerKnob(true, togglerKnob);
      displayElements(true, togglerKnob.id.replace("-knob", ""));
    } else {
      const togglerKnob = element.nextElementSibling.firstElementChild;
      moveTogglerKnob(false, togglerKnob);
      displayElements(false, togglerKnob.id.replace("-knob", ""));
    }
  });
});

function fadeOut(obj) {
  obj.classList.remove("fadeIn");
  obj.classList.add("fadeOut");
}

function fadeIn(obj) {
  obj.classList.remove("fadeOut");
  obj.classList.add("fadeIn");
}

function setLanguageMod() {
  if (localStorage.getItem("language") === "en") {
    languageMod.textContent = "English";
    languageKnob.classList.remove("lchecked");
    languageCheckbox.checked = false;
    getLocalStorage();
  } else {
    languageMod.textContent = "Український";
    languageKnob.classList.add("lchecked");
    languageCheckbox.checked = true;
    getLocalStorage("Введіть ім'я");
  }
}

function setCheckbox() {
  checkbox.forEach((elem) => {
    if (elem.nextElementSibling.classList.contains("green"))
      elem.checked = true;
    else elem.checked = false;
  });
}

function setLocalStorage() {
  for (let i = 0; i < displayArr.length; i++) {
    localStorage.setItem(
      displayArr[i].id,
      displayArr[i].classList.contains("fadeIn")
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setLanguageMod();
  for (let i = 0; i < displayArr.length; i++) {
    displayElements(localStorage.getItem(displayArr[i].id), displayArr[i].id);
    moveTogglerKnob(
      localStorage.getItem(displayArr[i].id),
      document.querySelector(`#${displayArr[i].id}-knob`)
    );
  }
  setCheckbox();
  translateSettings(localStorage.getItem("language") === "en");
});

window.addEventListener("beforeunload", () => {
  setLocalStorage();
});
