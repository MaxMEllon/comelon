'use strict';

import assign from'object-assign';
import EventEmitter from'eventemitter3';

const CHANGE_EVENT = 'change';

export class AppStore extends EventEmitter {
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
}

export function createStore(store) {
  assign({}, AppStore, store);
};
