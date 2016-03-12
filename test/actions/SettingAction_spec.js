'use strict';

require('babel-core/register');
require('babel-polyfill');

const chai = require('chai');
const {assert} = chai;
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('SettingAction', () => {
  let SettingAction, SettingStore;

  before(() => {
    sandbox.create();
    SettingAction = require('../../app/actions/SettingAction');
  });

  beforeEach(() => {
    delete require.cache[require.resolve('../../app/stores/SettingStore')];
    SettingStore = require('../../app/stores/SettingStore');
  });

  it('try to set system comment view option', done => {
    let callback = () => {
      let systemCommentOption = SettingStore.getOption().systemComment;
      assert(systemCommentOption, true);
      SettingStore.removeListener(callback);
      done();
    };
    SettingStore.addChangeListener(callback);
    SettingAction.setSystemCommentViewOption(true);
  });

  it('try open', done => {
    let callback = () => {
      let isOpen = SettingStore.isOpen();
      assert(isOpen, true);
      SettingStore.removeListener(callback);
      done();
    };
    SettingStore.addChangeListener(callback);
    SettingAction.open();
  });

  it('try close', done => {
    let callback = () => {
      let isOpen = SettingStore.isOpen();
      assert(isOpen, false);
      SettingStore.removeListener(callback);
      done();
    };
    SettingStore.addChangeListener(callback);
    SettingAction.close();
  });

  after(() => {
    sandbox.restore();
  });

});
