'use strict';

const AppDispatcher = require('../dispatcher/AppDispatcher');
const NotificationActionType = require('./types/NotificationActionTypes');

let NotificationAction = {
  notify(message) {
    AppDispatcher.dispatch({
      actionType: NotificationActionType.NOTIFY,
      message: message
    });
  }
};

module.exports = NotificationAction;
