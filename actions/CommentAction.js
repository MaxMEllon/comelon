'use babel';

const Nico = require('nicolive');
const AppDispacher = require('../dispacher/AppDispacher');
const CommentActionType = require('./types/CommentActionTypes');
const Immutable = require('immutable');

let CommentAction = {
  getComment(viewer) {
    viewer.on('comment', comment => {
      let come = Immutable.fromJS(comment);
      this.fetchNickname(come);
      AppDispacher.dispatch({
        actionType: CommentActionType.GET_COMMENT,
        comment: come
      });
    });
  },

  postComment(comment) {
    Nico.comment(comment, {mail: ''}, (error, result) => {
      if (error) throw error;
      console.log('<=== postComment:result %o', result);
    });
  },

  fetchNickname(comment) {
    let userId = comment.getIn(['attr', 'user_id']);
    let no = comment.getIn(['attr', 'no']);
    let anonymous = '184';
    if (isNaN(userId)) {
      AppDispacher.dispatch({
        actionType: CommentActionType.FETCH_NICKNAME,
        nickname: anonymous,
        userId: userId
      });
    } else {
      Nico.fetchNickname(userId, (error, nickname) => {
        if (error) throw error;
        AppDispacher.dispatch({
          actionType: CommentActionType.FETCH_NICKNAME,
          nickname: nickname,
          userId: userId
        });
      });
    }
  }

}

module.exports = CommentAction;
