'use strict';

const R = require('ramda');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const SettingActionTypes = require('./types/SettingActionTypes');

const dispatchSettingWindowOpenFlag = (flag) => {
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
   *
   */
  setSystemCommentViewOption(option) {
    if (! R.is(Boolean, option)) throw 'type error in SettingAction';
    AppDispatcher.dispatch({
      actionType: SettingActionTypes.SET_SYSTEM_COMMENT_VIEW_OPTION,
      systemCommentViewOption: option
    });
  },

  /**
   *
   */
  setDoTalkingOption(option) {
    if (! R.is(Boolean, option)) throw 'type error in SettingAction';
    AppDispatcher.dispatch({
      actionType: SettingActionTypes.SET_DO_TALKING_OPTION,
      doTalking: option
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
