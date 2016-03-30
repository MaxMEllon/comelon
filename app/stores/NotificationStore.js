'use strict';

import createStore from '../utils/AppStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import NotificationActionType from '../actions/types/NotificationActionTypes';

let message = '';

/**
 * @classdesc NotificationStore
 * こめろんの通知情報を管理します
 */
let NotificationStore = createStore({
  /**
   * getMessage()
   * @returns {strings} _message
   * 現在メッセージを返却します
   */
  getMessage() {
    return message;
  },
});

AppDispatcher.register(action => {
  let type = action.actionType;
  switch (type) {
  /**
   * NicoActionType.NOTIFY
   * 通知メッセージを空じゃなければ登録します
   */
  case NotificationActionType.NOTIFY:
    message = action.message;
    NotificationStore.emitChange();
    break;
  }
});

export default NotificationStore;
