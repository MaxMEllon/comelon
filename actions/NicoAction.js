'use strict';

const Nico = require('nicolive');
const debug = require('../utiles/Debug')('NicoAction');
const AppDispacher = require('../dispacher/AppDispacher');
const TodoActionType = require('./types/NicoActionTypes');

let NicoAction = {
  login(user) {
    console.log('---> login');
    Nico.ping(() => {
      Nico.login(user.email, user.password, (error, cookie) => {
        if (error) throw error;
        AppDispacher.dispatch({
          actionType: TodoActionType.LOGIN,
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
        actionType: TodoActionType.CONNECT,
        viewer: viewer
      });
    });
  }
};

module.exports = NicoAction

// vim:ft=javascript
