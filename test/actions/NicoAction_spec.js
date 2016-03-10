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
    Nico.destroy();
    NicoAction = require('../../app/actions/NicoAction');
    loginAction = () => {
      let user = {
        email: process.env.USER_EMAIL,
        password: process.env.PASSWORD
      }
      NicoAction.login(user);
    }
  });

  beforeEach(() => {
    delete require.cache[require.resolve('../../app/stores/NicoStore')];
    NicoStore = require('../../app/stores/NicoStore');
  });

  it('try login', (done) => {
    loginAction();
    NicoAction.fetchLoginStatus();
    assert(NicoStore.isLogin(), true);
    done()
  });

  it('try logout', (done) => {
    NicoAction.logout();
    NicoAction.fetchLoginStatus();
    assert(NicoStore.isLogin(), false);
    done();
  });

  after(() => {
    sandbox.restore();
  });

});
