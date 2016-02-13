'use strict';

const assign = require('object-assign');
const {EventEmitter} = require('events');
const AppDispacher = require('../dispacher/AppDispacher');
const NicoActionType = require('../actions/types/NicoActionTypes');

const CHANGE_EVENT = 'change';

let _cookie = null;

let TodoStore = assign({}, EventEmitter.prototype, {
  getCookie() {
    return _cookie;
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

AppDispacher.register(action => {
  let type = action.actionType;

  switch (type) {
  case NicoActionType.LOGIN:
    let cookie = action.cookie;
    if (cookie) {
      _cookie = cookie;
      TodoStore.emitChange();
    }
    break;
  }
});
