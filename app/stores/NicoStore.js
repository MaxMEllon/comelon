'use strict';

const assign = require('object-assign');
const EventEmitter = require('eventemitter3');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const NicoActionType = require('../actions/types/NicoActionTypes');

const CHANGE_EVENT = 'change';

let _cookie = null;
let _viewer = null;
let _isLogin = true;

let NicoStore = assign({}, EventEmitter.prototype, {
  isLogin() {
    return _isLogin;
  },

  getCookie() {
    return _cookie;
  },

  getViewer() {
    return _viewer;
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
  case NicoActionType.LOGIN:
    let cookie = action.cookie;
    if (cookie) {
      _cookie = cookie;
      NicoStore.emitChange();
    }
    break;

  case NicoActionType.CONNECT:
    let viewer = action.viewer;
    if (viewer) {
      _viewer = viewer;
      NicoStore.emitChange();
    }
    break;

  case NicoActionType.FETCH_LOGIN_STATUS:
    let isLogin = action.isLogin;
    _isLogin = isLogin;
    NicoStore.emitChange();
    break;
  }

});

module.exports = NicoStore;
