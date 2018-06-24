import {assert} from 'chai';
import {
  countPointsForCorrectAnswers,
  gameIsFinished,
  gameIsFailed,
  countLives,
  addPointsForLive,
  countFinalPoints,
} from './game-data';

describe(`Count points`, () => {

  it(`should add 100 points for one correct answer with an average speed`, () => {
    const answers = [
      {
        time: 20,
        isCorrect: true,
      },
    ];

    assert.equal(countPointsForCorrectAnswers(answers), 100);
  });

  it(`should add 100 points for each correct answer with an average speed`, () => {
    const answers = [
      {
        time: 10,
        isCorrect: true,
      },
      {
        time: 15,
        isCorrect: true,
      },
      {
        time: 20,
        isCorrect: true,
      },
    ];

    assert.equal(countPointsForCorrectAnswers(answers), 300);
  });

  it(`should not add points for incorrect answers`, () => {
    const answers = [
      {
        time: 15,
        isCorrect: false,
      },
      {
        time: 15,
        isCorrect: true,
      },
      {
        time: 15,
        isCorrect: false,
      },
    ];

    assert.equal(countPointsForCorrectAnswers(answers), 100);
  });

  it(`should add 150 points for one correct answer with a fast speed`, () => {
    const answers = [
      {
        time: 9,
        isCorrect: true,
      },
    ];

    assert.equal(countPointsForCorrectAnswers(answers), 150);
  });

  it(`should add 150 points for each correct answer with a fast speed`, () => {
    const answers = [
      {
        time: 1,
        isCorrect: true,
      },
      {
        time: 5,
        isCorrect: true,
      },
    ];

    assert.equal(countPointsForCorrectAnswers(answers), 300);
  });

  it(`should add 50 points for one correct answer with a slow speed`, () => {
    const answers = [
      {
        time: 21,
        isCorrect: true,
      },
    ];

    assert.equal(countPointsForCorrectAnswers(answers), 50);
  });

  it(`should add 50 points for each correct answer with a slow speed`, () => {
    const answers = [
      {
        time: 22,
        isCorrect: true,
      },
      {
        time: 25,
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
        time: 5,
        isCorrect: true,
      },
      {
        time: 15,
        isCorrect: true,
      },
      {
        time: 8,
        isCorrect: true,
      },
      {
        time: 22,
        isCorrect: true,
      },
      {
        time: 5,
        isCorrect: false,
      },
    ];

    assert.equal(countPointsForCorrectAnswers(answers), 450);
  });

  it(`should add an additional 150 points for 3 remaining lives`, () => {
    let answers = [];

    for (let i = 0; i < 10; i++) {
      answers.push({
        time: 15,
        isCorrect: true,
      });
    }

    assert.equal(gameIsFinished(answers), true);
    assert.equal(addPointsForLive(answers), 150);
  });

  it(`should add an additional 100 points for 2 remaining lives`, () => {
    let answers = [];

    for (let i = 0; i < 9; i++) {
      answers.push({
        time: 15,
        isCorrect: true,
      });
    }

    answers.push({
      time: 15,
      isCorrect: false,
    });

    assert.equal(gameIsFinished(answers), true);
    assert.equal(addPointsForLive(answers), 100);
  });

  it(`should not add additional 50 points for 0 remaining lives`, () => {
    let answers = [];

    for (let i = 0; i < 7; i++) {
      answers.push({
        time: 15,
        isCorrect: true,
      });
    }

    for (let i = 0; i < 3; i++) {
      answers.push({
        time: 15,
        isCorrect: false,
      });
    }

    assert.equal(gameIsFinished(answers), true);
    assert.equal(addPointsForLive(answers), 0);
  });

  it(`should return 1150 points if the player answered all questions with an average speed and he has 3 lives`, () => {
    let answers = [];

    for (let i = 0; i < 10; i++) {
      answers.push({
        time: 15,
        isCorrect: true,
      });
    }

    assert.equal(countFinalPoints(answers), 1150);
  });
});

describe(`Check if the game is over`, () => {
  it(`should finish the game if the player answered all questions`, () => {
    let answers = [];

    for (let i = 0; i < 10; i++) {
      answers.push({
        time: 15,
        isCorrect: true,
      });
    }

    assert.equal(gameIsFinished(answers), true);
  });

  it(`should return -1 if the player answered less than 10 questions`, () => {
    const answers = [
      {
        time: 15,
        isCorrect: true,
      },
      {
        time: 15,
        isCorrect: true,
      },
    ];

    assert.equal(gameIsFailed(answers), -1);
  });
});

describe(`Count lives`, () => {

  it(`should remain 3 lives if all answers are correct`, () => {
    const answers = [
      {
        time: 15,
        isCorrect: true,
      },
      {
        time: 15,
        isCorrect: true,
      },
    ];

    assert.equal(countLives(answers), 3);
  });

  it(`should remain 1 life if the player made 2 mistakes`, () => {
    const answers = [
      {
        time: 15,
        isCorrect: false,
      },
      {
        time: 15,
        isCorrect: false,
      },
    ];

    assert.equal(countLives(answers), 1);
  });

  it(`should remain 0 lives if the player made 3 mistakes`, () => {
    const answers = [
      {
        time: 15,
        isCorrect: false,
      },
      {
        time: 15,
        isCorrect: true,
      },
      {
        time: 15,
        isCorrect: false,
      },
      {
        time: 15,
        isCorrect: false,
      },
    ];

    assert.equal(countLives(answers), 0);
  });

  it(`should end the game if the player made 4 mistakes`, () => {
    const answers = [
      {
        time: 15,
        isCorrect: false,
      },
      {
        time: 15,
        isCorrect: false,
      },
      {
        time: 15,
        isCorrect: true,
      },
      {
        time: 15,
        isCorrect: false,
      },
      {
        time: 15,
        isCorrect: false,
      },
    ];

    assert.equal(countLives(answers), -1);
    assert.equal(gameIsFinished(answers), true);
  });

  it(`should take away 1 life if the player did not answer in 30 seconds`, () => {
    const answers = [
      {
        time: 31,
        isCorrect: ``
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
