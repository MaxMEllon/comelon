'use strict';

const R = require('ramda');
const createStore = require('../utils/AppStore');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const CommentActionType = require('../actions/types/CommentActionTypes');

let comments = [];
let nicknames = {};

let resetAllComment = () => {
  comments = [];
};

let setNickName = (userId, nickname) => {
  let newData = {};
  newData[R.toString(userId)] = nickname;
  nicknames = R.merge(nicknames, newData);
};

/**
 * @classdesc CommentStore
 * コメントに関する状態(ハンドルネーム，コメント)を管理します
 */
let CommentStore = createStore({
  /**
   * getAllComments()
   * 受信したコメントを全て返却します
   * @returns {Array} _comments
   */
  getAllComments() {
    return comments;
  },

  /**
   * getNickname() (getNicknameById() に変更するかも)
   * ユーザーIDに基づいたニックネームを返却します
   * @param {number} userId : ユーザーID
   * @returns {strings} nickname
   */
  getNickname(userId) {
    return R.prop(R.toString(userId), nicknames);
  }
});

AppDispatcher.register(action => {
  let type = action.actionType;

  switch (type) {
  /**
   * CommentActionType.GET_COMMENT
   * ActionがCommentを受信した時にdisptachされます
   */
  case CommentActionType.GET_COMMENT:
    let comment = action.comment;
    if (! R.isNil(comment)) {
      comments.push(comment);
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
