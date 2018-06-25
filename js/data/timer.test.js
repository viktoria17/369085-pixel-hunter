import {assert} from 'chai';
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

  it(`should test that method tick() correctly works`, () => {
    const timer = new Timer({
      seconds: 10
    });

    timer.tick();
    timer.tick();

    assert.equal(timer.secondsLeft, 8);
  });

});

