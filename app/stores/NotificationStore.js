'use strict';

const assign = require('object-assign');
const EventEmitter = require('eventemitter3');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const NotificationActionType = require('../actions/types/NotificationActionTypes');

const CHANGE_EVENT = 'change';

let _message = ''

/**
 * @classdesc NotificationStore
 * こめろんの通知情報を管理します
 */
let NotificationStore = assign({}, EventEmitter.prototype, {
  /**
   * getMessage()
   * @returns {strings} _message
   * 現在メッセージを返却します
   */
  getMessage() {
    return _message;
  },

  /**
   * emitChange()
   * Storeの変更を通知します
   */
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * addChangeListener()
   * Storeが変更された時のコールバックを追加します
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * removeChangeListener()
   * Storeが変更された時のコールバックを削除します
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(action => {
  let type = action.actionType;
  switch (type) {
  /**
   * NicoActionType.NOTIFY
   * 通知メッセージを空じゃなければ登録します
   */
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
