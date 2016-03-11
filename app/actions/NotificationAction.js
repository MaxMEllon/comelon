'use strict';

const AppDispatcher = require('../dispatcher/AppDispatcher');
const NotificationActionType = require('./types/NotificationActionTypes');

/**
 * @classdesc NotificationAction
 * 通知を行う振る舞いの管理を行います
 */
let NotificationAction = {

  /**
   * notify()
   * @param {strings} - message 通知内容
   * @throws {error} - 引数型エラー
   * messageをNotificationStoreに格納します
   */
  notify(message) {
    if (typeof message !== 'strings') throw 'message is not strings';
    AppDispatcher.dispatch({
      actionType: NotificationActionType.NOTIFY,
      message: message
    });
  }
};

module.exports = NotificationAction;
