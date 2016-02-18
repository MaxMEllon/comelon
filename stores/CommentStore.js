'use babel';

const _ = require('lodash');
const Immutable = require('immutable');
const assign = require('object-assign');
const {EventEmitter} = require('events');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const CommentActionType = require('../actions/types/CommentActionTypes');

const CHANGE_EVENT = 'change';

let _comments = [];
let _nicknames = {};

let isAccountType = comment => {
  let type = comment.getIn(['attr', 'premium']);
  switch (type) {
  case 2:
    return 'command';
  case 3:
    return 'owner';
  default:
    return 'anonymous';
  }
};

let setNickName = (userId, nickname) => {
  _nicknames[`${userId}`] = nickname;
};

let CommentStore = assign({}, EventEmitter.prototype, {
  getAllComments() {
    return _comments;
  },

  resetAllComments() {
    _comments = [];
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
    comment.set('type', isAccountType(comment));
    if (comment) {
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
    CommentStore.resetAllComment();
    break;
  }

});

module.exports = CommentStore;
