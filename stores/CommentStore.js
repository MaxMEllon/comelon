'use strict';

const assign = require('object-assign');
const {EventEmitter} = require('events');
const AppDispacher = require('../dispacher/AppDispacher');
const CommentActionType = require('../actions/types/NicoActionTypes');

const CHANGE_EVENT = 'change';

let _comments = [];

let CommentStore = assign({}, EventEmitter.prototype, {
  getAllComments() {
    return _comments;
  },

  resetAllComments() {
    _comments = [];
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

AppDispacher.register(action => {
  let type = action.actionType;

  switch (type) {
  case CommentActionType.GET_COMMENT:
    let comment = action.comment;
    console.log('<--- dispach %o', comment);
    if (comment) {
      _comments.push(comment);
      CommentStore.emitChange();
    }
    break;
  }
});

module.exports = CommentStore;
