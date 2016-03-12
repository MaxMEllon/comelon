'use strict';

const AppDispatcher = require('../dispatcher/AppDispatcher');
const SettingActionTypes = require('./types/SettingActionTypes');

let dispatchSettingWindowOpenFlag = (flag) => {
  AppDispatcher.dispatch({
    actionType: SettingActionTypes.OPEN,
    open: flag
  });
};

/**
 * @classdesc SettingAction
 */
let SettingAction = {

  /**
   * getComment() 名前変更予定
   * @param {boolean} - / から始まるシステムコメントの表示，非表示
   */
  setSystemCommentViewOption(option) {
    if (typeof option !== 'boolean') throw 'type error in SettingAction';
    AppDispatcher.dispatch({
      actionType: SettingActionTypes.SET_SYSTEM_COMMENT_VIEW_OPTION,
      systemCommentViewOption: option
    });
  },

  /**
   * open() SettingsModalの表示
   */
  open() {
    dispatchSettingWindowOpenFlag(true);
  },

  /**
   * open() SettingsModalのクローズ
   */
  close() {
    dispatchSettingWindowOpenFlag(false);
  }
};

module.exports = SettingAction;
