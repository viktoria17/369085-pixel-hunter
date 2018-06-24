export const countPointsForCorrectAnswers = (answers) => {
  let score = 0;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].isCorrect) {
      const averageAnswer = answers[i].time > 9 && answers[i].time < 21;
      const fastAnswer = answers[i].time > 0 && answers[i].time < 10;
      const slowAnswer = answers[i].time > 20 && answers[i].time < 31;

      if (averageAnswer) {
        score += 100;
      } else if (fastAnswer) {
        score += 150;
      } else if (slowAnswer) {
        score += 50;
      }
    }
  }

  return score;
};

export const gameIsFinished = (answers) => {
  if (answers.length === 10) {
    return true;
  }

  const lives = countLives(answers);

  if (lives === -1) {
    return true;
  }

  return false;
};

export const gameIsFailed = (answers) => {
  if (answers.length < 10) {
    return -1;
  }

  return false;
};

export const countLives = (answers) => {
  let wrongAnswers = 0;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].isCorrect === false || answers[i].time > 30) {
      wrongAnswers += 1;
    }
  }

  return 3 - wrongAnswers;
};
