'use babel';

const Nico = require('nicolive');
const AppDispacher = require('../dispacher/AppDispacher');
const NicoActionType = require('./types/NicoActionTypes');

let NicoAction = {
  fetchLoginStatus() {
    console.log('---> fetchLoginStatus');
    Nico.ping(error => {
      let isLogin = null;
      if (error) isLogin = false;
      else isLogin = true;
      AppDispacher.dispatch({
        actionType: NicoActionType.FETCH_LOGIN_STATUS,
        isLogin: isLogin
      });
    });
  },

  login(user) {
    Nico.ping(error => {
      if (! error) { return; }
      console.log('---> login');
      Nico.login(user.email, user.password, (error, cookie) => {
        if (error) throw error;
        AppDispacher.dispatch({
          actionType: NicoActionType.LOGIN,
          cookie: cookie,
        });
        AppDispacher.dispatch({
          actionType: NicoActionType.FETCH_LOGIN_STATUS,
          isLogin: true
        });
      });
    });
  },

  connect(liveId) {
    console.log('---> connect %o', liveId);
    Nico.view(liveId, (error, viewer) => {
      if (error) throw error;
      AppDispacher.dispatch({
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
