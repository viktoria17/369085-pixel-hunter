'use strict';

const mainElement = document.querySelector(`.central`);

const selectTemplate = (template) => {
	mainElement.innerHTML = ``;
	mainElement.appendChild(template);
};

const allTemplates = Array.from(document.querySelectorAll(`template`)).map((it) => it.content);

selectTemplate(allTemplates[0]);

