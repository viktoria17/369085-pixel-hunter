import {assert} from 'chai';
import {
  countPointsForCorrectAnswers,
  isGameFinished,
  isGameFailed,
  countLives,
  addPointsForLives,
  countFinalPoints,
} from './game-data';

const TIME_SLOW = 21;
const TIME_FAST = 5;
const TIME_AVERAGE = 15;

describe(`Count points`, () => {
  it(`should add 100 points for one correct answer with an average speed`, () => {
    const answers = [
      {
        time: TIME_AVERAGE,
        isCorrect: true,
      },
    ];

    assert.equal(countPointsForCorrectAnswers(answers), 100);
  });

  it(`should add 100 points for each correct answer with an average speed`, () => {
    const answers = [
      {
        time: TIME_AVERAGE,
        isCorrect: true,
      },
      {
        time: 20,
        isCorrect: true,
      },
      {
        time: 10,
        isCorrect: true,
      },
    ];

    assert.equal(countPointsForCorrectAnswers(answers), 300);
  });

  it(`should not add points for incorrect answers`, () => {
    const answers = [
      {
        time: TIME_AVERAGE,
        isCorrect: false,
      },
      {
        time: TIME_AVERAGE,
        isCorrect: true,
      },
      {
        time: TIME_AVERAGE,
        isCorrect: false,
      },
    ];

    assert.equal(countPointsForCorrectAnswers(answers), 100);
  });

  it(`should add 150 points for each correct answer with a fast speed`, () => {
    const answers = [
      {
        time: 1,
        isCorrect: true,
      },
      {
        time: TIME_FAST,
        isCorrect: true,
      },
    ];

    assert.equal(countPointsForCorrectAnswers(answers), 300);
  });

  it(`should add 50 points for each correct answer with a slow speed`, () => {
    const answers = [
      {
        time: TIME_SLOW,
        isCorrect: true,
      },
      {
        time: TIME_SLOW,
        isCorrect: true,
      },
      {
        time: 30,
        isCorrect: true,
      },
    ];

    assert.equal(countPointsForCorrectAnswers(answers), 150);
  });

  it(`should calculate correctly answers with different speeds`, () => {
    const answers = [
      {
        time: TIME_FAST,
        isCorrect: true,
      },
      {
        time: TIME_AVERAGE,
        isCorrect: true,
      },
      {
        time: TIME_SLOW,
        isCorrect: true,
      },
      {
        time: TIME_FAST,
        isCorrect: false,
      },
    ];

    assert.equal(countPointsForCorrectAnswers(answers), 300);
  });

  it(`should add an additional 150 points for 3 remaining lives`, () => {
    let answers = Array(10).fill({
      time: TIME_AVERAGE,
      isCorrect: true,
    });

    assert.equal(isGameFinished(answers), true);
    assert.equal(addPointsForLives(answers), 150);
  });

  it(`should add an additional 100 points for 2 remaining lives`, () => {
    let answers = Array(9).fill({
      time: TIME_AVERAGE,
      isCorrect: true,
    }).concat({
      time: TIME_AVERAGE,
      isCorrect: false,
    });

    assert.equal(isGameFinished(answers), true);
    assert.equal(addPointsForLives(answers), 100);
  });

  it(`should not add additional 50 points for 0 remaining lives`, () => {
    let answers = Array(7).fill({
      time: TIME_AVERAGE, isCorrect: true,
    }).concat(Array(3).fill({
      time: TIME_AVERAGE,
      isCorrect: false,
    }));

    assert.equal(isGameFinished(answers), true);
    assert.equal(addPointsForLives(answers), 0);
  });

  it(`should return 1150 points if the player answered all questions with an average speed and he has 3 lives`, () => {
    let answers = Array(10).fill({
      time: TIME_AVERAGE,
      isCorrect: true,
    });

    assert.equal(countFinalPoints(answers), 1150);
  });
});

describe(`Check if the game is over`, () => {
  it(`should finish the game if the player answered all questions`, () => {
    let answers = Array(10).fill({
      time: TIME_AVERAGE,
      isCorrect: true,
    });

    assert.equal(isGameFinished(answers), true);
  });

  it(`should return -1 if the player answered less than 10 questions`, () => {
    const answers = Array(2).fill({
      time: TIME_AVERAGE,
      isCorrect: true,
    });

    assert.equal(isGameFailed(answers), -1);
  });
});

describe(`Count lives`, () => {

  it(`should remain 3 lives if all answers are correct`, () => {
    const answers = Array(2).fill({
      time: TIME_AVERAGE,
      isCorrect: true,
    });

    assert.equal(countLives(answers), 3);
  });

  it(`should remain 1 life if the player made 2 mistakes`, () => {
    const answers = Array(2).fill({
      time: TIME_AVERAGE,
      isCorrect: false,
    });

    assert.equal(countLives(answers), 1);
  });

  it(`should remain 0 lives if the player made 3 mistakes`, () => {
    const answers = [
      {
        time: TIME_AVERAGE,
        isCorrect: false,
      },
      {
        time: TIME_AVERAGE,
        isCorrect: true,
      },
      {
        time: TIME_AVERAGE,
        isCorrect: false,
      },
      {
        time: TIME_AVERAGE,
        isCorrect: false,
      },
    ];

    assert.equal(countLives(answers), 0);
  });

  it(`should end the game if the player made 4 mistakes`, () => {
    const answers = [
      {
        time: TIME_AVERAGE,
        isCorrect: false,
      },
      {
        time: TIME_AVERAGE,
        isCorrect: false,
      },
      {
        time: TIME_AVERAGE,
        isCorrect: true,
      },
      {
        time: TIME_AVERAGE,
        isCorrect: false,
      },
      {
        time: TIME_AVERAGE,
        isCorrect: false,
      },
    ];

    assert.equal(countLives(answers), -1);
    assert.equal(isGameFinished(answers), true);
  });

  it(`should take away 1 life if the player did not answer in 30 seconds`, () => {
    const answers = [
      {
        time: 31,
        isCorrect: false
      },
    ];

    assert.equal(countLives(answers), 2);
  });

  it(`should not take a life if the player answered in 30 seconds`, () => {
    const answers = [
      {
        time: 30,
        isCorrect: true
      },
    ];

    assert.equal(countLives(answers), 3);
  });
});
