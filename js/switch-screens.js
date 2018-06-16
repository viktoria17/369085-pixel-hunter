import introTemplate from "./templates/intro";
import rulesTemplate from "./templates/rules";
import greetingTemplate from "./templates/greeting";
import gameOneTemplate from "./templates/game-1";
import gameTwoTemplate from "./templates/game-2";
import gameThreeTemplate from "./templates/game-3";
import statsTemplate from "./templates/stats";
import {changeScreen} from "./util";

const selectScreen = (screen) => {
  const mainElement = document.querySelector(`.central`);

  mainElement.innerHTML = ``;
  mainElement.appendChild(screen.cloneNode(true));
};

const screens = () => {
  return Array.from(document.querySelectorAll(`template`)).map((it) => it.content);
};

const renderScreenTemplate = (template) => {
  changeScreen(template);
  selectScreen(screens()[0]);
};

const renderIntroScreen = () => {
  const mainElement = document.querySelector(`#main`);

  mainElement.innerHTML = ``;
  mainElement.appendChild(introTemplate);
};

const showStatsScreen = () => {
  renderScreenTemplate(gameThreeTemplate);

  const optionButtons = document.querySelectorAll(`.game__option`);

  for (let index = 0; index < optionButtons.length; index++) {
    optionButtons[index].addEventListener(`click`, () => {
      renderScreenTemplate(statsTemplate);
      returnToTheGreetingScreen();
    });
  }
};

const showGameThreeScreen = () => {
  renderScreenTemplate(gameTwoTemplate);

  const photoBtn = document.querySelector(`.game__answer--photo`);
  const paintBtn = document.querySelector(`.game__answer--paint`);

  photoBtn.addEventListener(`click`, () => {
    showStatsScreen();
  });

  paintBtn.addEventListener(`click`, () => {
    showStatsScreen();
  });

  returnToTheGreetingScreen();
};

const showGameTwoScreen = () => {
  renderScreenTemplate(gameOneTemplate);

  const photoButtons = document.querySelectorAll(`.game__answer--photo`);
  const paintButtons = document.querySelectorAll(`.game__answer--paint`);

  let clickedButtonsState = [false, false];

  for (let index = 0; index < 2; index++) {
    photoButtons[index].addEventListener(`click`, () => {
      clickedButtonsState[index] = true;
      changeState();
    });

    paintButtons[index].addEventListener(`click`, () => {
      clickedButtonsState[index] = true;
      changeState();
    });
  }

  const changeState = () => {
    if (clickedButtonsState[0] && clickedButtonsState[1]) {
      showGameThreeScreen();
    }
  };

  returnToTheGreetingScreen();
};

const returnToTheGreetingScreen = () => {
  const backBtn = document.querySelector(`.header__back`);

  backBtn.addEventListener(`click`, () => {
    showRulesScreen();
  });
};

const showGameOneScreen = () => {
  renderScreenTemplate(rulesTemplate);

  const input = document.querySelector(`.rules__input`);
  const rulesBtn = document.querySelector(`.rules__button.continue`);

  input.addEventListener(`keyup`, (event) => {
    rulesBtn.disabled = event.currentTarget.value.length === 0;
  });

  rulesBtn.addEventListener(`click`, () => {
    showGameTwoScreen();
  });

  returnToTheGreetingScreen();
};

const showRulesScreen = () => {
  renderScreenTemplate(greetingTemplate);

  const continueBtn = document.querySelector(`.greeting__continue`);

  continueBtn.addEventListener(`click`, () => {
    showGameOneScreen();
  });
};

const showGreetingScreen = () => {
  renderIntroScreen();

  const asteriks = document.querySelector(`.intro__asterisk`);

  asteriks.addEventListener(`click`, () => {
    showRulesScreen();
  });
};

export const createNextBtn = () => {
  const nextBtn = document.createElement(`button`);
  nextBtn.className = `arrows__btn`;
  nextBtn.innerHTML = `->`;
  return nextBtn;
};

export const createBackBtn = () => {
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

export const initializeScreens = () => {
  showGreetingScreen();
};
