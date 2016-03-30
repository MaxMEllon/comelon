'use strict';

import R from 'ramda';
import AppDispatcher from '../dispatcher/AppDispatcher';
import NotificationActionType from './types/NotificationActionTypes';

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
    const notString = R.complement(R.is(String));
    const empty = R.isEmpty;
    const fail = R.either(notString, empty);
    if (fail(message)) throw 'message is not strings';
    AppDispatcher.dispatch({
      actionType: NotificationActionType.NOTIFY,
      message: message
    });
  }
};

export default NotificationAction;
