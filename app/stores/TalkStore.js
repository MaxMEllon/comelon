'use strict';

const R = require('ramda');
const createStore = require('../utils/AppStore');
const OpenJTalk = require('../utils/OpenJTalk');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const TalkActionType = require('../actions/types/TalkActionTypes');

let messages = [];
let nowTalking = false;

const unShiftMessage = R.insert(0, R.__, messages);
const popMessage = () => messages.pop();

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
    messages = unShiftMessage(action.message);
    talkSync();
    break;
  }

});

const emitTalking = (args) => {
  nowTalking = args;
  TalkStore.emitChange();
};

/**
 * talkSync()
 * 現在別スレッドでされていなかったらコメントを読み上げます．
 * コメント読み上げ中は，storeのnowTalkingがtrueになります
 */
const talkSync = () => {
  let wait = setInterval(() => {
    if (R.not(nowTalking)) {
      const message = popMessage();
      if (message !== undefined && message !== null) {
        emitTalking(true);
        OpenJTalk.talk(message, () => {
          emitTalking(false);
        });
      }
      clearInterval(wait);
    }
  }, 1000);
};

module.exports = TalkStore;
