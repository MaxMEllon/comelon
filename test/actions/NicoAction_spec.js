'use strict';

require('babel-core/register');
require('babel-polyfill');

const chai = require('chai');
const {assert} = require('chai');
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('NicoAction', () => {
  let Nico, NicoAction, NicoStore, loginAction = null;

  before(() => {
    sandbox.create();
    Nico = require('nicolive');
    NicoAction = require('../../app/actions/NicoAction');
    NicoAction.logout();
    Nico.destroy();
    loginAction = () => {
      let user = {
        email: process.env.USER_EMAIL,
        password: process.env.PASSWORD
      };
      NicoAction.login(user);
    };
  });

  beforeEach(() => {
    delete require.cache[require.resolve('../../app/stores/NicoStore')];
    NicoStore = require('../../app/stores/NicoStore');
  });

  it('try login', done => {
    let isWindows = (process.platform === 'win32');
    if (isWindows) { done(); }
    let wait = setInterval(() => {
      loginAction();
      let isLogin = NicoStore.isLogin();
      if (isLogin) {
        assert(isLogin, true);
        clearInterval(wait);
        done();
      }
    }, 500);
  });

  xit('try logout', done => {
    let callback = () => {
      assert(NicoStore.isLogin(), false);
      NicoStore.removeChangeListener(callback);
      done();
    };
    NicoStore.addChangeListener(callback);
    NicoAction.logout();
  });

  after(() => {
    sandbox.restore();
  });

});
