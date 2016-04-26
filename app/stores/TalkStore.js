'use strict';

import Itako from '../utils/Talker';
import createStore from '../utils/AppStore';
import SettingStore from '../stores/SettingStore';
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

TalkStore.registed = AppDispatcher.register(action => {
  let type = action.actionType;

  switch (type) {
  case TalkActionType.TALK:
    if (!SettingStore.getOption().doTalking) break;
    nowTalking = true;
    Itako.read(action.message).then(() => {
      nowTalking = false;
    });
    break;
  }

});

export default TalkStore;
