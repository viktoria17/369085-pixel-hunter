import {createScreenTemplates} from "./create-templates";
import introTemplate from "./templates/intro";

const getIntroTemplate = () => {
  const mainElement = document.querySelector(`#main`);

  mainElement.innerHTML = ``;
  mainElement.appendChild(introTemplate);

  return mainElement;
};

const selectScreen = (screen) => {
  const mainElement = document.querySelector(`.central`);

  mainElement.innerHTML = ``;
  mainElement.appendChild(screen.cloneNode(true));
};

const initializeScreens = () => {
  getIntroTemplate();
  createScreenTemplates();

  const screens = Array.from(document.querySelectorAll(`template`)).map((it) => it.content);

  selectScreen(screens[0]);
  return screens;
};

const screens = initializeScreens();

let current = 0;
const checkIfAnyScreensLeft = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  selectScreen(screens[current]);
};

export const bindKeyboardEvents = () => {
  addEventListener(`keydown`, (e) => {
    if (e.keyCode === 39) {
      current++;
      checkIfAnyScreensLeft(current);
    } else if (e.keyCode === 37) {
      current--;
      checkIfAnyScreensLeft(current);
    }
  });
};

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

export const addButtonsWithStyles = () => {
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

export const bindNextBtnClickEvents = () => {
  const nextBtn = document.querySelector(`.arrows__wrap button:nth-child(3)`);

  nextBtn.addEventListener(`click`, () => {
    current++;
    checkIfAnyScreensLeft(current);
  });
};

export const bindBackBtnClickEvents = () => {
  const backBtn = document.querySelector(`.arrows__wrap button`);

  backBtn.addEventListener(`click`, () => {
    current--;
    checkIfAnyScreensLeft(current);
  });
};
