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

const createNextBtn = () => {
  const nextBtn = document.createElement(`button`);
  nextBtn.className = `arrows__btn`;
  nextBtn.innerHTML = `->`;
  return nextBtn;
};

const createBackBtn = () => {
  const backBtn = document.createElement(`button`);
  backBtn.className = `arrows__btn`;
  backBtn.innerHTML = `<-`;
  return backBtn;
};

const addButtonsWithStyles = () => {
  const divEl = document.createElement(`div`);
  divEl.className = `arrows__wrap`;

  const style = document.createElement(`style`);
  style.type = `text/css`;

  let css = `.arrows__wrap { position: absolute; top: 95px; left: 50%; margin-left: -56px; }`;
  css += ` .arrows__btn { background: none; border: 2px solid black; padding: 5px 20px; }`;

  style.appendChild(document.createTextNode(css));
  divEl.appendChild(style);

  const backBtn = createBackBtn();
  divEl.appendChild(backBtn);

  const nextBtn = createNextBtn();
  divEl.appendChild(nextBtn);

  document.body.appendChild(divEl);
};

addButtonsWithStyles();

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
