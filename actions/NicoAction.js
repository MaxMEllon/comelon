'use strict';

const Nico = require('nicolive');
const AppDispacher = require('../dispacher/AppDispacher');
const TodoActionType = require('./types/NicoActionTypes');

let NicoAction = {
  login(user) {
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
};

module.exports = NicoAction

// vim:ft=javascript
