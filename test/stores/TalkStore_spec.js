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
    message: 'execute to talk if SettingStore has taking option'
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

  xit('execute to talk if SettingStore has taking option', done => {
    callback(actionTalk);
    setTimeout(() => {
      done();
    }, 300);
  });

});

