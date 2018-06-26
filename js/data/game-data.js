export const countPointsForCorrectAnswers = (answers) => {
  let score = 0;

  for (const answer of answers) {
    if (answer.isCorrect) {
      const averageAnswer = answer.time > 9 && answer.time < 21;
      const fastAnswer = answer.time > 0 && answer.time < 10;
      const slowAnswer = answer.time > 20 && answer.time < 31;

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

export const isGameFinished = (answers) => {
  return answers.length === 10 ? true : countLives(answers) === -1;
};

export const isGameFailed = (answers) => {
  return answers.length < 10 ? -1 : false;
};

export const countLives = (answers) => {
  let wrongAnswers = 0;

  for (const answer of answers) {
    if (answer.isCorrect === false || answer.time > 30) {
      wrongAnswers += 1;
    }
  }

  return 3 - wrongAnswers;
};

export const addPointsForLives = (answers) => {
  return isGameFinished(answers) ? countLives(answers) * 50 : 0;
};

export const countFinalPoints = (answers) => {
  return countPointsForCorrectAnswers(answers) + addPointsForLives(answers);
};
