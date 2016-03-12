'use strict';

const assign = require('object-assign');
const EventEmitter = require('eventemitter3');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const SettingActionType = require('../actions/types/SettingActionTypes');

const CHANGE_EVENT = 'change';

let option = {
  open: false,
  systemCommentViewOption: false
};

/**
 * @classdesc SettingStore
 * コメントに関する状態(ハンドルネーム，コメント)を管理します
 */
let SettingStore = assign({}, EventEmitter.prototype, {
  /**
   * getAllComments()
   * 受信したコメントを全て返却します
   * @returns {Array} _comments
   */

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
    if (systemCommentViewOption !== option.systemCommentViewOption) {
      option.systemCommentViewOption = systemCommentViewOption;
      this.emitChange();
    }
    break;

  /**
   *
   */
  case SettingActionType.OPEN:
    let open = action.open;
    if (open !== option.open) {
      option.open = open;
      this.emitChange();
    }
    break;
  }

});

module.exports = SettingStore;
