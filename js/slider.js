import { getTimeOfDay } from "./date.js";

const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
const radioToggle = document.querySelectorAll("input[type='radio']");
let randomNum = 1;

const getRandomNumber = () => {
  randomNum = Math.floor(Math.random() * 20);
  if (randomNum === 0) randomNum = 1;
};

const getRandomAPINumber = () => {
  let randomAPINum = Math.floor(Math.random() * 100);
  return randomAPINum;
};

const setBg = (dayTime) => {
  if (dayTime === "ранку") dayTime = "morning";
  else if (dayTime === "день") dayTime = "afternoon";
  else if (dayTime === "вечір") dayTime = "evening";
  else if (dayTime === "ночі") dayTime = "night";
  if (randomNum < 10) randomNum = "0" + randomNum;
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayTime}/${randomNum}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url('${img.src}')`;
  };
};

async function setUnsplashBg() {
  const img = new Image();
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=JFcT-T9BmB9KlW8iwyCKVqAEZmj6se_QlGCBMPWHiRo`;
  const res = await fetch(url);
  const data = await res.json();
  img.src = `${data.urls.regular}`;
  img.onload = () => {
    document.body.style.backgroundImage = `url('${img.src}')`;
  };
}

async function setFlickrBg() {
  const img = new Image();
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a72b024b01302846ad0999ba4cc09e5c&tags=nature&page=${getRandomAPINumber()}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  img.src = `${data.photos.photo[getRandomAPINumber()].url_l}`;
  img.onload = () => {
    document.body.style.backgroundImage = `url('${img.src}')`;
  };
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(`#${localStorage.getItem("API")}`).checked = true;
  if (localStorage.getItem("API") === "github")
    setBg(
      getTimeOfDay(localStorage.getItem("language")).split(" ")[1],
      getRandomNumber()
    );
  else if (localStorage.getItem("API") === "unsplash") setUnsplashBg();
  else setFlickrBg();
});

const getSlideNext = () => {
  if (randomNum <= 19) ++randomNum;
  else randomNum = 1;
};

const getSlidePrev = () => {
  if (randomNum <= 20 && randomNum > 1) --randomNum;
  else randomNum = 20;
};

slideNext.addEventListener("click", () => {
  if (localStorage.getItem("API") === "github")
    setBg(
      getTimeOfDay(localStorage.getItem("language")).split(" ")[1],
      getSlideNext()
    );
  else if (localStorage.getItem("API") === "unsplash") setUnsplashBg();
  else setFlickrBg();
});

slidePrev.addEventListener("click", () => {
  if (localStorage.getItem("API") === "github")
    setBg(
      getTimeOfDay(localStorage.getItem("language")).split(" ")[1],
      getSlidePrev()
    );
  else if (localStorage.getItem("API") === "unsplash") setUnsplashBg();
  else setFlickrBg();
});

radioToggle.forEach((elem) => {
  elem.addEventListener("change", () => {
    if (elem.value === "1") {
      setLocalStorage();
      setBg(
        getTimeOfDay(localStorage.getItem("language")).split(" ")[1],
        getSlideNext()
      );
    } else if (elem.value === "2") {
      setLocalStorage();
      setUnsplashBg();
    } else {
      setLocalStorage();
      setFlickrBg();
    }
  });
});

function setLocalStorage() {
  localStorage.setItem(
    "API",
    document.querySelector("input[type='radio']:checked").id
  );
}

window.addEventListener("beforeunload", () => {
  setLocalStorage();
});
