'use strict';

const R = require('ramda');
const assign = require('object-assign');
const EventEmitter = require('eventemitter3');
const OpenJTalk = require('../utils/OpenJTalk');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const TalkActionType = require('../actions/types/TalkActionTypes');

const CHANGE_EVENT = 'change';

let messages = [];
let nowTalking = false;

const unShiftMessage = R.insert(0, R.__, messages);
const popMessage = () => messages.pop();
const emitTalking = (args) => {
  nowTalking = args;
  TalkStore.emitChange();
};

const talkSync = () => {
  let wait = setInterval(() => {
    if (R.not(nowTalking)) {
      emitTalking(true);
      OpenJTalk.talk(popMessage(), () => {
        emitTalking(false);
      });
      clearInterval(wait);
    }
  }, 1000);
};

/**
 * @classdesc TalkStore
 * コメントに関する状態(ハンドルネーム，コメント)を管理します
 */
let TalkStore = assign({}, EventEmitter.prototype, {

  /**
   * emitChange()
   * Storeの変更を通知します
   */
  isTalkingNow() {
    return nowTalking;
  },

  /**
   * emitChange()
   * Storeの変更を通知します
   */
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * addChangeListener()
   * Storeが変更された時のコールバックを追加します
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * removeChangeListener()
   * Storeが変更された時のコールバックを削除します
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(action => {
  let type = action.actionType;

  switch (type) {
  /**
   *
   */
  case TalkActionType.TALK:
    messages = unShiftMessage(action.message);
    talkSync();
    break;
  }

});

module.exports = TalkStore;
