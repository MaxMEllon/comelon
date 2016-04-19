'use strict';

import Itako from '../utils/Talker';
import createStore from '../utils/AppStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import TalkActionType from '../actions/types/TalkActionTypes';

let nowTalking = false;

/**
 * @classdesc TalkStore
 * コメントに関する状態(ハンドルネーム，コメント)を管理します
 */
let TalkStore = createStore({
  isTalkingNow() {
    return nowTalking;
  }
});

AppDispatcher.register(action => {
  let type = action.actionType;

  switch (type) {
  /**
   * コメントを読み上げリストに追加し
   * 順番が回ってきたらコメントを読み上げます
   */
  case TalkActionType.TALK:
    Itako.read(action.message);
    break;
  }

});

export default TalkStore;
