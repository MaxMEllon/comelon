'use strict';

const chai = require('chai');
const assert = require('power-assert');
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('SettingStore', () => {

  const SettingActionType = require('../../app/actions/types/SettingActionTypes');
  let AppDispatcher, SettingStore, callback = null;

  let actionSetSystemCommentViewOption = {
    actionType: SettingActionType.SET_SYSTEM_COMMENT_VIEW_OPTION,
    systemCommentViewOption: true
  };

  let actionOpen = {
    actionType: SettingActionType.OPEN,
    open: true
  };

  before(() => {
    sandbox.create();
    AppDispatcher = sandbox.spy(require('../../app/dispatcher/AppDispatcher'), 'register');
  });

  beforeEach(() => {
    delete require.cache[require.resolve('../../app/stores/SettingStore')];
    SettingStore = require('../../app/stores/SettingStore');
    callback = AppDispatcher.lastCall.args[0];
  });

  after(() => {
    sandbox.restore();
  });

  it('try to set option of systemComment', () => {
    callback(actionSetSystemCommentViewOption);
    let option = SettingStore.getOption().systemComment;
    assert(option, true);
  });

  it('try open', () => {
    callback(actionOpen);
    let option = SettingStore.isOpen();
    assert(option, true);
  });

});

