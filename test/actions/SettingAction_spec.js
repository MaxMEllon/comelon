'use strict';

require('babel-core/register');
require('babel-polyfill');

const chai = require('chai');
const {expect} = chai;
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
      expect(systemCommentOption).to.be.equal(true);
      SettingStore.removeChangeListener(callback);
      done();
    };
    SettingStore.addChangeListener(callback);
    SettingAction.setSystemCommentViewOption(true);
  });

  it('try open and close', done => {
    let openCallback = () => {
      let isOpen = SettingStore.isOpen();
      expect(isOpen).to.be.equal(true);
    };
    SettingStore.addChangeListener(openCallback);
    SettingAction.open();
    SettingStore.removeChangeListener(openCallback);
    let closeCallback = () => {
      let isOpen = SettingStore.isOpen();
      expect(isOpen).to.be.equal(false);
      SettingStore.removeChangeListener(openCallback);
      done();
    };
    SettingStore.addChangeListener(closeCallback);
    SettingAction.close();
  });

  after(() => {
    sandbox.restore();
  });

});
