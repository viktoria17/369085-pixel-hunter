'use strict';

const mainElement = document.querySelector(`.central`);

const selectScreen = (screen) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(screen.cloneNode(true));
};

const screens = Array.from(document.querySelectorAll(`template`)).map((it) => it.content);

selectScreen(screens[0]);

let current = 0;
const select = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  selectScreen(screens[current]);
};

const countKeyboardClicks = () => {
  addEventListener(`keydown`, (e) => {
    if (e.keyCode === 39) {
      current++;
      select(current);
    } else if (e.keyCode === 37) {
      current--;
      select(current);
    }
  });
};

countKeyboardClicks();

const countNextBtnClicks = () => {
  const nextBtn = document.querySelector(`.arrows__wrap button:nth-child(3)`);

  nextBtn.addEventListener(`click`, () => {
    current++;
    select(current);
  });
};

const countBackBtnClicks = () => {
  const backBtn = document.querySelector(`.arrows__wrap button`);

  backBtn.addEventListener(`click`, () => {
    current--;
    select(current);
  });
};

countNextBtnClicks();
countBackBtnClicks();
