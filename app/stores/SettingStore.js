'use strict';

const assign = require('object-assign');
const EventEmitter = require('eventemitter3');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const SettingActionType = require('../actions/types/SettingActionTypes');

const CHANGE_EVENT = 'change';

let _open = false;
let _option = {
  systemComment: false
};

/**
 * @classdesc SettingStore
 * コメントに関する状態(ハンドルネーム，コメント)を管理します
 */
let SettingStore = assign({}, EventEmitter.prototype, {
  /**
   * isOpen()
   * @returns {boolean} _open
   */
  isOpen() {
    return _open;
  },

  /**
   * getOption()
   * @returns {Object} _option
   */
  getOption() {
    return _option;
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
   *
   */
  case SettingActionType.SET_SYSTEM_COMMENT_VIEW_OPTION:
    let systemCommentViewOption = action.systemCommentViewOption;
    if (systemCommentViewOption !== _option.systemComment) {
      _option.systemComment = systemCommentViewOption;
      SettingStore.emitChange();
    }
    break;

  /**
   *
   */
  case SettingActionType.OPEN:
    let open = action.open;
    if (_open !== open) {
      _open = open;
      SettingStore.emitChange();
    }
    break;
  }

});

module.exports = SettingStore;
