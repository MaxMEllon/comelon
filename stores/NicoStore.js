'use strict';

const assign = require('object-assign');
const debug = require('../utiles/Debug')('NicoStore');
const {EventEmitter} = require('events');
const AppDispacher = require('../dispacher/AppDispacher');
const NicoActionType = require('../actions/types/NicoActionTypes');

const CHANGE_EVENT = 'change';

let _cookie = null;
let _viewer = null;
let _comments = [];

let NicoStore = assign({}, EventEmitter.prototype, {
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

AppDispacher.register(action => {
  let type = action.actionType;

  switch (type) {
  case NicoActionType.LOGIN:
    let cookie = action.cookie;
    console.log('<--- dispach %o', cookie);
    if (cookie) {
      _cookie = cookie;
      NicoStore.emitChange();
    }
    break;

  case NicoActionType.CONNECT:
    let viewer = action.viewer;
    console.log('<--- dispach %o', viewer);
    if (viewer) {
      _viewer = viewer;
      NicoStore.emitChange();
    }
    break;
  }
});

module.exports = NicoStore;
