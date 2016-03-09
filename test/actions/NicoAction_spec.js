'use strict';

require('babel-core/register');
require('babel-polyfill');

const chai = require('chai');
const {assert} = require('chai');
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('NicoAction', () => {
  let NicoAction, NicoStore, loginAction = null;

  before(() => {
    sandbox.create();
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

  it('try login', () => {
    loginAction();
    NicoAction.fetchLoginStatus();
    assert(NicoStore.isLogin(), true);
  });

  it('try connect', async () => {
    NicoAction.fetchLoginStatus();
    if (! NicoStore.isLogin()) loginAction();
    NicoAction.connect('nsen/hotaru');
    let viewer = await NicoStore.getViewer();
    assert(viewer, true);
  });

  it('try logout', () => {
    NicoAction.logout();
    NicoAction.fetchLoginStatus();
    assert(NicoStore.isLogin(), false);
  });

  after(() => {
    sandbox.restore();
  });

});
