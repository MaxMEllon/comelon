'use strict';

const assign = require('object-assign');
const EventEmitter = require('eventemitter3');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const SettingActionType = require('../actions/types/SettingActionTypes');

const CHANGE_EVENT = 'change';

let open = false;
let option = {
  systemComment: false,
  doTalking: false,
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
    return open;
  },

  /**
   * getOption()
   * @returns {Object} _option
   */
  getOption() {
    return option;
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
   * SET_SYSTEM_COMMENT_VIEW_OPTION evnet
   */
  case SettingActionType.SET_SYSTEM_COMMENT_VIEW_OPTION:
    option.systemComment = action.systemCommentViewOption;
    SettingStore.emitChange();
    break;

  /**
   * SET_DO_TALKING_OPTION evnet
   */
  case SettingActionType.SET_DO_TALKING_OPTION:
    option.doTalking = action.doTalking;
    SettingStore.emitChange();
    break;

  /**
   * OPEN event
   * Settings View を開きます
   */
  case SettingActionType.OPEN:
    open = action.open;
    SettingStore.emitChange();
    break;
  }

});

module.exports = SettingStore;
