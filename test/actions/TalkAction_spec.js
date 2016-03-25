'use strict';

const chai = require('chai');
const {expect} = chai;
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('TalkAction', () => {
  let TalkAction, TalkStore;

  before(() => {
    sandbox.create();
    TalkAction = require('../../app/actions/TalkAction');
  });

  beforeEach(() => {
    delete require.cache[require.resolve('../../app/stores/TalkStore')];
    TalkStore = require('../../app/stores/TalkStore');
  });

  after(() => {
    sandbox.restore();
  });

  it('should be set nowtalking in store if called talk action', () => {
    TalkAction.talk('sample');
    setTimeout(() => {
      expect(TalkStore.isTalkingNow()).to.be.equal(true);
    }, 100);
  });

});
