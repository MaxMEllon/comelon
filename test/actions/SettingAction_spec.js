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

  it('if system comment view option set null should be exception', done => {
    setTimeout(() => {
      expect(() => {
        SettingAction.setSystemCommentViewOption(null);
      }).to.throw('Uncought TypeError in SettingAction');
      done();
    }, 500);
  });

  it('should set to SettingStore of doTalking if call setDoTalkingOption of Action', done => {
    let callback = () => {
      let talkingOption = SettingStore.getOption().doTalking;
      expect(talkingOption).to.be.equal(true);
      SettingStore.removeChangeListener(callback);
      done();
    };
    SettingStore.addChangeListener(callback);
    SettingAction.setDoTalkingOption(true);
  });

  it('if option set null should be exception', done => {
    setTimeout(() => {
      expect(() => {
        SettingAction.setDoTalkingOption(null);
      }).to.throw('Uncought TypeError in SettingAction');
      done();
    }, 500);
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
