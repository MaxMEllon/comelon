'use babel';

const chai = require('chai');
const assert = require('power-assert');
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('CommentAction', () => {
  const CommentActionType = require('../../actions/types/CommentActionTypes');
  const Immutable = require('immutable');
  let AppDispatcher, CommentAction, CommentStore, callback = null;

  let actionGetComment = {
    actionType: CommentActionType.GET_COMMENT,
    comment: Immutable.fromJS({
      attr: {
        no: 2525,
        user_id: 2525,
        premium: 2
      },
      text: 'sample comment'
    })
  };

  before(() => {
    sandbox.create();
    CommentAction = require('../../actions/CommentAction');
    AppDispatcher = sandbox.spy(require('../../dispatcher/AppDispatcher'), 'register');
    
  });

  beforeEach(() => {
    delete require.cache[require.resolve('../../stores/CommentStore')];
    CommentStore = require('../../stores/CommentStore');
    callback = AppDispatcher.lastCall.args[0];
  });

  it('reset all comment', () => {
    callback(actionGetComment);
    let comments = CommentStore.getAllComments();
    assert(comments.length, 1);
    CommentAction.resetAllComment();
    comments = CommentStore.getAllComments();
    assert(comments, []);
  });

  after(() => {
    sandbox.restore();
  });

});
