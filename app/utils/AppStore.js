'use strict';

import assign from'object-assign';
import EventEmitter from'eventemitter3';

const CHANGE_EVENT = 'change';

let BaseStore = assign({}, EventEmitter.prototype, {
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

const createStore = (store) => assign({}, BaseStore, store);

export default createStore;
