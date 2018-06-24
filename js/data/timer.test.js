import Timer from './timer';

describe(`Timer`, () => {

  it(`should test that the timer's callback correctly works`, (done) => {
    new Timer({
      seconds: 1,
      timeEndedCallback: () => {
        done();
      }
    }).start();
  });

});

