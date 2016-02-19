'use babel';

const assert = require('power-assert');
const {sandbox} = require('sinon');

describe('NicoStore', () => {

  const NicoActionType = require('../../app/actions/types/NicoActionTypes');
  let AppDispatcher, NicoStore, callback = null;

  let actionFetchLoginStatus = {
    actionType: NicoActionType.FETCH_LOGIN_STATUS,
    isLogin: true
  };
  let actionLogin = {
    actionType: NicoActionType.LOGIN,
    cookie: 'cookie'
  };
  let actionConnect = {
    actionType: NicoActionType.CONNECT,
    viewer: 'viewer'
  };

  before(() => {
    sandbox.create();
    AppDispatcher = sandbox.spy(require('../../app/dispatcher/AppDispatcher'), 'register');
  });

  beforeEach(() => {
    delete require.cache[require.resolve('../../app/stores/NicoStore')];
    NicoStore = require('../../app/stores/NicoStore');
    callback = AppDispatcher.lastCall.args[0];
  });

  after(() => {
    sandbox.restore();
  });

  it('fetch login status', () => {
    callback(actionFetchLoginStatus);
    let isLogin = NicoStore.isLogin();
    assert.equal(isLogin, true);
  });

  it('login', () => {
    callback(actionLogin);
    let cookie = NicoStore.getCookie();
    assert.equal(cookie, 'cookie');
  });

  it('connect', () => {
    callback(actionConnect);
    let viewer = NicoStore.getViewer();
    assert.equal(viewer, 'viewer');
  });

});

