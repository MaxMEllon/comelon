'use strict';

const chai = require('chai');
const assert = require('power-assert');
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('ElectronStore', () => {

  const ElectronActionType = require('../../app/actions/types/ElectronActionTypes');
  const Immutable = require('immutable');
  let AppDispatcher, ElectronStore, callback = null;

  let actionResizeWindow = {
    actionType: ElectronActionType.RESIZE,
    size: Immutable.fromJS({
      width: 600,
      height: 600
    })
  };

  before(() => {
    sandbox.create();
    AppDispatcher = sandbox.spy(require('../../app/dispatcher/AppDispatcher'), 'register');
  });

  beforeEach(() => {
    delete require.cache[require.resolve('../../app/stores/ElectronStore')];
    ElectronStore = require('../../app/stores/ElectronStore');
    callback = AppDispatcher.lastCall.args[0];
  });

  after(() => {
    sandbox.restore();
  });

  it('get current size', () => {
    callback(actionResizeWindow);
    let size = ElectronStore.getCurrentSize();
    assert(size.get('width'), 600);
    assert(size.get('height'), 600);
  });

});

