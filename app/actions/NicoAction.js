'use strict';

const Nico = require('nicolive');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const NicoActionType = require('./types/NicoActionTypes');
const NotificationAction = require('./NotificationAction');

let NicoAction = {
  fetchLoginStatus() {
    Nico.ping(error => {
      let isLogin = null;
      if (error) isLogin = false;
      else isLogin = true;
      AppDispatcher.dispatch({
        actionType: NicoActionType.FETCH_LOGIN_STATUS,
        isLogin: isLogin
      });
    });
  },

  login(user) {
    Nico.ping(error => {
      if (! error) { return; }
      Nico.login(user.email, user.password, (error, cookie) => {
        if (error) {
          NotificationAction.notify(`ログインに失敗しました : ${error}`);
          throw error;
        }
        NotificationAction.notify('ログインしました');
        AppDispatcher.dispatch({
          actionType: NicoActionType.LOGIN,
          cookie: cookie,
        });
        AppDispatcher.dispatch({
          actionType: NicoActionType.FETCH_LOGIN_STATUS,
          isLogin: true
        });
      });
    });
  },

  connect(liveId) {
    Nico.view(liveId, (error, viewer) => {
      if (error) {
        NotificationAction.notify(`接続に失敗しました : ${error}`);
        throw error;
      }
      NotificationAction.notify('接続に成功しました');
      AppDispatcher.dispatch({
        actionType: NicoActionType.CONNECT,
        viewer: viewer
      });
    });
  },

  logout() {
    Nico.logout(error => {
      if (error) throw error;
    });
  }

};

module.exports = NicoAction;

// vim:ft=javascript
