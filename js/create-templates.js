import greetingTemplate from "./templates/greeting";
import gameTwoTemplate from "./templates/game-2";
import gameThreeTemplate from "./templates/game-3";
import rulesTemplate from "./templates/rules";
import gameTemplate from "./templates/game-1";
import statsTemplate from "./templates/stats";
import modalErrorTemplate from "./templates/modal-error";
import {changeScreen} from "./util";
import modalConfirmTemplate from "./templates/modal-confirm";

export const createScreenTemplates = () => {
  changeScreen(greetingTemplate);
  changeScreen(rulesTemplate);
  changeScreen(gameTemplate);
  changeScreen(gameTwoTemplate);
  changeScreen(gameThreeTemplate);
  changeScreen(modalConfirmTemplate);
  changeScreen(modalErrorTemplate);
  changeScreen(statsTemplate);
};

