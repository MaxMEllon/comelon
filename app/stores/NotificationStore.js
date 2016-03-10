'use strict';

const assign = require('object-assign');
const EventEmitter = require('eventemitter3');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const NotificationActionType = require('../actions/types/NotificationActionTypes');

const CHANGE_EVENT = 'change';

let _message = ''

let NotificationStore = assign({}, EventEmitter.prototype, {
  getMessage() {
    return _message;
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
  case NotificationActionType.NOTIFY:
    let message = action.message;
    if (message !== '') {
      _message = message;
      NotificationStore.emitChange();
    }
    break;
  }
});

module.exports = NotificationStore;
