'use babel';

const Nico = require('nicolive');
const AppDispacher = require('../dispacher/AppDispacher');
const CommentActionType = require('./types/CommentActionTypes');
const Immutable = require('immutable');

let CommentAction = {
  getComment(viewer) {
    viewer.on('comment', comment => {
      AppDispacher.dispatch({
        actionType: CommentActionType.GET_COMMENT,
        comment: Immutable.fromJS(comment)
      });
    });
  },

  postComment(viewer, comment) {
    viewer.on('handshaked', () => {
      Nico.comment(comment, {});
    });
  }
}

module.exports = CommentAction;
