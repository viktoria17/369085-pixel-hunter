import greetingTemplate from './greeting';
import rulesTemplate from './rules';
import gameTemplate from './game-1';
import gameTwoTemplate from './game-2';
import gameThreeTemplate from './game-3';
import modalConfirmTemplate from './modal-confirm';
import modalErrorTemplate from './modal-error';
import statsTemplate from './stats';
import introTemplate from './intro';

const getTemplates = () => {
  const mainElement = document.querySelector(`#app`);

  mainElement.innerHTML = ``;
  mainElement.appendChild(greetingTemplate);
  mainElement.appendChild(rulesTemplate);
  mainElement.appendChild(gameTemplate);
  mainElement.appendChild(gameTwoTemplate);
  mainElement.appendChild(gameThreeTemplate);
  mainElement.appendChild(modalConfirmTemplate);
  mainElement.appendChild(modalErrorTemplate);
  mainElement.appendChild(statsTemplate);

  return mainElement;
};

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

function getScreens() {
  getIntroTemplate();
  getTemplates();

  const screens = Array.from(document.querySelectorAll(`template`)).map((it) => it.content);

  selectScreen(screens[0]);
  return screens;
}

const screens = getScreens();

let current = 0;
const select = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  selectScreen(screens[current]);
};

const bindKeyboardEvents = () => {
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

bindKeyboardEvents();

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

const bindNextBtnClickEvents = () => {
  const nextBtn = document.querySelector(`.arrows__wrap button:nth-child(3)`);

  nextBtn.addEventListener(`click`, () => {
    current++;
    select(current);
  });
};

const bindBackBtnClickEvents = () => {
  const backBtn = document.querySelector(`.arrows__wrap button`);

  backBtn.addEventListener(`click`, () => {
    current--;
    select(current);
  });
};

bindNextBtnClickEvents();
bindBackBtnClickEvents();
