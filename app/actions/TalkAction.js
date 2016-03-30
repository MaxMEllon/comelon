'use strict';

import R from 'ramda';
import AppDispatcher from '../dispatcher/AppDispatcher';
import TalkActionType from './types/TalkActionTypes';

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

export default TalkAction;
