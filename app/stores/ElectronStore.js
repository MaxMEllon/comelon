'use babel';

const assign = require('object-assign');
const EventEmitter = require('eventemitter3');
const ElectronActionType = require('../actions/types/ElectronActionTypes');
const AppDispatcher = require('../dispatcher/AppDispatcher');

const CHANGE_EVENT = 'change';

let _size = require('../../config/Size');

let ElectronStore = assign({}, EventEmitter.prototype, {
  getCurrentSize() {
    return _size;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(action => {
  let type = action.actionType;

  switch (type) {
  case ElectronActionType.RESIZE:
    let size = action.size;
    _size = size;
    ElectronStore.emitChange();
    break;
  }
});

module.exports = ElectronStore;
