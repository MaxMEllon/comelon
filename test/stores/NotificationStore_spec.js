'use strict';

const assert = require('power-assert');
const {sandbox} = require('sinon');

describe('NotificationStore', () => {

  const NotificationActionType = require('../../app/actions/types/NotificationActionTypes');
  let AppDispatcher, NotificationStore, callback = null;

  let actionNotify = {
    actionType: NotificationActionType.NOTIFY,
    message: 'test'
  };

  before(() => {
    sandbox.create();
    AppDispatcher = sandbox.spy(require('../../app/dispatcher/AppDispatcher'), 'register');
  });

  beforeEach(() => {
    delete require.cache[require.resolve('../../app/stores/NotificationStore')];
    NotificationStore = require('../../app/stores/NotificationStore');
    callback = AppDispatcher.lastCall.args[0];
  });

  after(() => {
    sandbox.restore();
  });

  it('notify', () => {
    callback(actionNotify);
    let message = NotificationStore.getMessage();
    assert.equal(message, 'test');
  });

});

