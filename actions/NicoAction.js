'use strict';

const Nico = require('nicolive');
const AppDispacher = require('../dispacher/AppDispacher');
const NicoActionType = require('./types/NicoActionTypes');

let NicoAction = {
  login(user) {
    Nico.ping(() => {
      console.log('---> login');
      Nico.login(user.email, user.password, (error, cookie) => {
        if (error) throw error;
        AppDispacher.dispatch({
          actionType: NicoActionType.LOGIN,
          cookie: cookie,
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
