'use babel';

const Nico = require('nicolive');
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

let CommentAction = {
  getComment(viewer) {
    viewer.on('comment', comment => {
      let come = Immutable.fromJS(comment);
      this.fetchNickname(come);
      AppDispatcher.dispatch({
        actionType: CommentActionType.GET_COMMENT,
        comment: come
      });
    });
  },

  postComment(comment) {
    Nico.comment(comment, {mail: ''}, (error) => {
      if (error) throw error;
    });
  },

  resetAllComment() {
    AppDispatcher.dispatch({
      actionType: CommentActionType.RESET_ALL_COMMENT
    });
  },

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