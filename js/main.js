'use strict';

const mainElement = document.querySelector(`.central`);

const selectTemplate = (template) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(template.cloneNode(true));
};

const templates = Array.from(document.querySelectorAll(`template`)).map((it) => it.content);

selectTemplate(templates[0]);

let current = 0;
const select = (index) => {
  index = index < 0 ? templates.length - 1 : index;
  index = index >= templates.length ? 0 : index;
  current = index;
  selectTemplate(templates[current]);
};

const countNextBtnClicks = () => {
  const nextBtn = document.querySelector(`.arrows__wrap button:nth-child(3)`);

  nextBtn.addEventListener(`click`, () => {
    current = current + 1;
    select(current);
  });
};

const countBackBtnClicks = () => {
  const backBtn = document.querySelector(`.arrows__wrap button`);

  backBtn.addEventListener(`click`, () => {
    current = current - 1;
    select(current);
  });
};

countNextBtnClicks();
countBackBtnClicks();
