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

let CommentStore = assign({}, EventEmitter.prototype, {
  getAllComments() {
    return _comments;
  },

  getNickname(userId) {
    return _nicknames[`${userId}`];
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(action => {
  let type = action.actionType;

  switch (type) {
  case CommentActionType.GET_COMMENT:
    let comment = action.comment;
    const pattarn = /\/(.*)/;
    if (comment && ! comment.get('text').match(pattarn)) {
      _comments.push(comment);
      CommentStore.emitChange();
    }
    break;

  case CommentActionType.FETCH_NICKNAME:
    let userId = action.userId;
    let nickname = action.nickname;
    setNickName(userId, nickname);
    CommentStore.emitChange();
    break;

  case CommentActionType.RESET_ALL_COMMENT:
    resetAllComment();
    CommentStore.emitChange();
    break;
  }

});

module.exports = CommentStore;
