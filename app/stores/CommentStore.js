'use strict';

import R from 'ramda';
import {AppStore} from '../utils/AppStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import CommentActionType from '../actions/types/CommentActionTypes';

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
class CommentStore extends AppStore {
  /**
   * getAllComments()
   * 受信したコメントを全て返却します
   * @returns {Array} _comments
   */
  get getAllComments() {
    return comments;
  }

  /**
   * getNickname() (getNicknameById() に変更するかも)
   * ユーザーIDに基づいたニックネームを返却します
   * @param {number} userId : ユーザーID
   * @returns {strings} nickname
   */
  getNickname(userId) {
    return R.prop(R.toString(userId), nicknames);
  }
}

const commentStore = new CommentStore();

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
      commentStore.emitChange();
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
    commentStore.emitChange();
    break;

  /**
   * CommentActionType.RESET_ALL_COMMENT
   * コメントをリセットします
   */
  case CommentActionType.RESET_ALL_COMMENT:
    resetAllComment();
    commentStore.emitChange();
    break;
  }

});

export default commentStore;
