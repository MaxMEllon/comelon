'use babel';

const chai = require('chai');
const assert = require('power-assert');
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('CommentStore', () => {

  const CommentActionType = require('../../app/actions/types/CommentActionTypes');
  const Immutable = require('immutable');
  let AppDispatcher, CommentStore, callback = null;

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
    AppDispatcher = sandbox.spy(require('../../app/dispatcher/AppDispatcher'), 'register');
  });

  beforeEach(() => {
    delete require.cache[require.resolve('../../app/stores/CommentStore')];
    CommentStore = require('../../app/stores/CommentStore');
    callback = AppDispatcher.lastCall.args[0];
  });

  after(() => {
    sandbox.restore();
  });

  it('get comment', () => {
    callback(actionGetComment);
    let comments = CommentStore.getAllComments();
    assert(comments.length, 1);
  });

});

