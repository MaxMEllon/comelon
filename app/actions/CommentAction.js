'use strict';

const _ = require('lodash');
const Nico = require('nicolive');
const NotificationAction = require('../actions/NotificationAction');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const CommentActionType = require('./types/CommentActionTypes');
const Immutable = require('immutable');

let dispatchNickname = (userId, nickname) => {
  AppDispatcher.dispatch({
    actionType: CommentActionType.FETCH_NICKNAME,
    nickname: nickname,
    userId: userId
  });
};

/**
 * @classdesc CommentAction
 * コメントの送受信，各コメントのハンドルネームの管理を行います
 */
let CommentAction = {

  /**
   * getComment() 名前変更予定
   * @param {Socket} - viewer ニコ生へのSocket
   * NicoAction.connect()を呼び出したあと，NicoStore.getViewerから
   * ソケットを取得する必要があります．
   * このメソッドはイベントの登録になっているので，
   * 一度呼び出すだけで良いです．
   */
  getComment(viewer) {
    viewer.on('comment', comment => {
      _.defer(() => {
        let come = Immutable.fromJS(comment);
        this.fetchNickname(come);
        AppDispatcher.dispatch({
          actionType: CommentActionType.GET_COMMENT,
          comment: come
        });
      }, 300);
    });
  },

  /**
   * postComment()
   * @param {strings} - コメント文
   * @param {Object} - 184投稿オプション {184: `strings`}
   * コメントの投稿を試みます
   * 失敗時 NotificationAction.notifyで通知を行います
   */
  postComment(comment, mail = {mail: ''}) {
    Nico.comment(comment, mail, (error) => {
      if (error) NotificationAction.notify('コメントの投稿に失敗しました');
    });
  },

  /**
   * resetAllComment()
   * CommentStoreに登録されているコメント一覧をリセットします
   */
  resetAllComment() {
    AppDispatcher.dispatch({
      actionType: CommentActionType.RESET_ALL_COMMENT
    });
  },

  /**
   * fetchNickname()
   * @param {Immutable.Map} comment - Immutable.Map型にしたAPIレスポンス
   * コメントのハンドルネームを取得し，CommentStoreに登録します
   * 取得できないユーザー（匿名ユーザー）の場合，
   * '184' を登録します
   */
  fetchNickname(comment) {
    let userId = comment.getIn(['attr', 'user_id']);
    let anonymous = '184';
    if (isNaN(userId)) {
      dispatchNickname(userId, anonymous);
    } else {
      Nico.fetchNickname(userId, (error, nickname) => {
        if (error) throw error;
        dispatchNickname(userId, nickname);
      });
    }
  }

};

module.exports = CommentAction;
