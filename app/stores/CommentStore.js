'use strict';

const assign = require('object-assign');
const EventEmitter = require('eventemitter3');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const CommentActionType = require('../actions/types/CommentActionTypes');

const CHANGE_EVENT = 'change';

let _comments = [];
let _nicknames = {};

let resetAllComment = () => {
  _comments = [];
};

let setNickName = (userId, nickname) => {
  _nicknames[`${userId}`] = nickname;
};

/**
 * @classdesc CommentStore
 * コメントに関する状態(ハンドルネーム，コメント)を管理します
 */
let CommentStore = assign({}, EventEmitter.prototype, {
  /**
   * getAllComments()
   * 受信したコメントを全て返却します
   * @returns {Array} _comments
   */
  getAllComments() {
    return _comments;
  },

  /**
   * getNickname() (getNicknameById() に変更するかも)
   * ユーザーIDに基づいたニックネームを返却します
   * @param {number} userId : ユーザーID
   * @returns {strings} nickname
   */
  getNickname(userId) {
    return _nicknames[`${userId}`];
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
   * CommentActionType.GET_COMMENT
   * ActionがCommentを受信した時にdisptachされます
   * `/` から始まるコメントは無視します
   * TODO: `/` から始まるコメントの非表示の設定
   */
  case CommentActionType.GET_COMMENT:
    let comment = action.comment;
    const pattarn = /\/(.*)/;
    if (comment && ! comment.get('text').match(pattarn)) {
      _comments.push(comment);
      CommentStore.emitChange();
    }
    break;

  /**
   * CommentActionType.FETCH_NICKNAME
   * Actionがニックネームを受信した時にdisptachされます
   * nicknameはuserIDをキーとした配列で管理されています
   */
  case CommentActionType.FETCH_NICKNAME:
    let userId = action.userId;
    let nickname = action.nickname;
    setNickName(userId, nickname);
    CommentStore.emitChange();
    break;

  /**
   * CommentActionType.RESET_ALL_COMMENT
   * コメントをリセットします
   */
  case CommentActionType.RESET_ALL_COMMENT:
    resetAllComment();
    CommentStore.emitChange();
    break;
  }

});

module.exports = CommentStore;
