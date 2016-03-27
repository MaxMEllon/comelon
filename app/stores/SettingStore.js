'use strict';

const createStore = require('../utils/AppStore');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const SettingActionType = require('../actions/types/SettingActionTypes');

let open = false;
let option = {
  systemComment: false,
  doTalking: false,
};

/**
 * @classdesc SettingStore
 * コメントに関する状態(ハンドルネーム，コメント)を管理します
 */
let SettingStore = createStore({
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
