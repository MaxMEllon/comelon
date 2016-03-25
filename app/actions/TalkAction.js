'use strict';

const R = require('ramda');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const TalkActionType = require('./types/TalkActionTypes');

/**
 * @classdesc TalkAction
 * しゃべります
 */
let TalkAction = {

  /**
   * talk()
   * @param {strings} - message 喋る内容
   * @throws {error}
   */
  talk(message) {
    const match = R.test(/^(\/(.*)){1}/);
    if (match(message)) return;
    setTimeout(() => {
      AppDispatcher.dispatch({
        actionType: TalkActionType.TALK,
        message: message
      });
    }, 200);
  }
};

module.exports = TalkAction;
