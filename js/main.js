import {createScreenTemplates} from './create-templates';
import {bindKeyboardEvents, addButtonsWithStyles, bindNextBtnClickEvents, bindBackBtnClickEvents} from './switch-screens';

const main = () => {
	createScreenTemplates();
	bindKeyboardEvents();
	addButtonsWithStyles();
	bindNextBtnClickEvents();
	bindBackBtnClickEvents();
};

main();
