'use babel';

const Nico = require('nicolive');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const NicoActionType = require('./types/NicoActionTypes');

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
        if (error) throw error;
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
      if (error) throw error;
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
