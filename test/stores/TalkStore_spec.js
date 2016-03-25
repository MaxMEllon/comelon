'use strict';

const chai = require('chai');
const {expect} = chai;
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('TalkStore', () => {

  const TalkActionType = require('../../app/actions/types/TalkActionTypes');
  let AppDispatcher, TalkStore, callback = null;

  let actionTalk = {
    actionType: TalkActionType.TALK,
    message: 'sample'
  };

  before(() => {
    sandbox.create();
    AppDispatcher = sandbox.spy(require('../../app/dispatcher/AppDispatcher'), 'register');
  });

  beforeEach(() => {
    delete require.cache[require.resolve('../../app/stores/TalkStore')];
    TalkStore = require('../../app/stores/TalkStore');
    callback = AppDispatcher.lastCall.args[0];
  });

  after(() => {
    sandbox.restore();
  });

  it('execute to talk if SettingStore has taking option', () => {
    callback(actionTalk);
    setTimeout(() => {
      expect(TalkStore.isTalkingNow()).to.be.equal(true);
    }, 100);
  });

});

