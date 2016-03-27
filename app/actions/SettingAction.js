'use strict';

const R = require('ramda');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const SettingActionType = require('./types/SettingActionTypes');

const missingType = 'Uncought TypeError in SettingAction';

const dispatchSettingWindowOpenFlag = (flag) => {
  AppDispatcher.dispatch({
    actionType: SettingActionType.OPEN,
    open: flag
  });
};

/**
 * @classdesc SettingAction
 */
let SettingAction = {

  /**
   * setSystemCommentViewOption()
   * @param {boolean} - 運営コメントを表示するかどうか
   * 運営コメントを表示するかどうかのオプションを設定します
   */
  setSystemCommentViewOption(option) {
    if (! R.is(Boolean, option)) throw missingType;
    AppDispatcher.dispatch({
      actionType: SettingActionType.SET_SYSTEM_COMMENT_VIEW_OPTION,
      systemCommentViewOption: option
    });
  },

  /**
   * setDoTalkingOption()
   * @param {boolean} - 棒読みをオンオフにするかどうか
   * 棒読みのオンオフを設定します
   */
  setDoTalkingOption(doTalking) {
    if (! R.is(Boolean, doTalking)) throw missingType;
    AppDispatcher.dispatch({
      actionType: SettingActionType.SET_DO_TALKING_OPTION,
      doTalking: doTalking
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
