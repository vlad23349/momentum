import playList from './playList.js';

const audio = document.querySelector('audio');
const playPr = document.querySelector('.play-prev');
const play = document.querySelector('.play');
const playN = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
const timeline = document.querySelector('.player-timeline');
const volumeSlider = document.querySelector('.player-controls .volume-slider');
const volume = document.querySelector('.volume-container');
const volumePersentage = document.querySelector('.player-controls .volume-percentage');
let isPlay = false;
audio.src = '../assets/sounds/RiverFlowsInYou.mp3';
let playNum = 0;
function playAudio(isNext = false) {
  if (isPlay) {
    isPlay = false;
    audio.pause();
  } else {
    isPlay = true;
    if (isNext) {
      audio.src = playList[playNum].src;
      audio.currentTime = 0;
    }
    audio.play();
  }
}

function toggleBtn() {
  if (isPlay) {
    play.classList.remove('pause');
    playAudio();
  } else {
    play.classList.add('pause');
    playAudio();
  }
}

function playNext() {
  if (playNum >= playList.length - 1) playNum = 0;
  else playNum++;
  play.classList.add('pause');
  isPlay = false;
  changeComposition(playListContainer.children[playNum]);
}

function playPrev() {
  if (playNum === 0) playNum = playList.length - 1;
  else playNum--;
  play.classList.add('pause');
  isPlay = false;
  changeComposition(playListContainer.children[playNum]);
}

function createPlayList() {
  let playListItem = document.createElement('li');
  playList.forEach((el, index) => {
    playListItem = document.createElement('li');
    playListItem.classList.add('play-item');
    if (index === 0) playListItem.classList.add('item-active');
    playListItem.textContent = el.title;
    playListContainer.append(playListItem);
  });
}

function changeComposition(e) {
  playListContainer.childNodes.forEach((el) => {
    el.classList.remove('item-active');
  });
  e.classList.add('item-active');
  playNum = playList.findIndex((x) => x.title === e.textContent);
  isPlay = false;
  play.classList.add('pause');
  playAudio(true);
}

//click on timeline to skip around
timeline.addEventListener(
  'click',
  (e) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
    audio.currentTime = timeToSeek;
  },
  false
);

//check audio percentage and update time accordingly
setInterval(() => {
  const progressBar = document.querySelector('.progress');
  progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
  document.querySelector('.player-time .current').textContent = getTimeCodeFromNum(audio.currentTime);
}, 500);

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

//click volume slider to change volume
volumeSlider.addEventListener(
  'click',
  (e) => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    document.querySelector('.player-controls .volume-percentage').style.width = newVolume * 100 + '%';
  },
  false
);

audio.addEventListener(
  'loadeddata',
  () => {
    document.querySelector('.player-time .length').textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = 0.75;
  },
  false
);

document.addEventListener('DOMContentLoaded', () => {
  createPlayList();
});
audio.addEventListener('ended', playNext);
play.addEventListener('click', toggleBtn);
playN.addEventListener('click', playNext);
playPr.addEventListener('click', playPrev);
playListContainer.addEventListener('click', (e) => {
  changeComposition(e.target);
});
volume.addEventListener('click', (e) => {
  if (e.target.className === 'volume-slider' || e.target.className === 'volume-percentage') return;
  if (e.target.classList.contains('volume-off')) {
    e.target.classList.remove('volume-off');
    audio.volume = parseInt(window.getComputedStyle(volumePersentage).width) / 120;
  } else {
    e.target.classList.add('volume-off');
    audio.volume = 0;
  }
});
