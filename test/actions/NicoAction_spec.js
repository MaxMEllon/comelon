'use strict';

const chai = require('chai');
const {assert} = require('chai');
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('NicoAction', () => {
  let NicoAction, NicoStore = null;

  before(() => {
    sandbox.create();
    NicoAction = require('../../app/actions/NicoAction');
  });

  beforeEach(() => {
    delete require.cache[require.resolve('../../app/stores/NicoStore')];
    NicoStore = require('../../app/stores/NicoStore');
  });

  it('fetch login status', () => {
    NicoAction.logout();
    NicoAction.fetchLoginStatus();
    assert(NicoStore.isLogin(), false);
  });

  after(() => {
    sandbox.restore();
  });

});
