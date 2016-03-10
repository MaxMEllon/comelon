'use strict';

require('babel-core/register');
require('babel-polyfill');

const chai = require('chai');
const {expect} = chai;
const assert = require('power-assert');
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('CommentAction', () => {
  let NicoAction, NicoStore, CommentAction, CommentStore = null;

  before(() => {
    sandbox.create();
    CommentAction = require('../../app/actions/CommentAction');
    NicoAction = require('../../app/actions/NicoAction');
    NicoStore = require('../../app/stores/NicoStore');
  });

  beforeEach(() => {
    delete require.cache[require.resolve('../../app/stores/CommentStore')];
    CommentStore = require('../../app/stores/CommentStore');
  });

  it('reset all comment', (done) => {
    CommentAction.resetAllComment();
    let comments = CommentStore.getAllComments();
    assert(comments, []);
    done();
  });

  it('get and post comment', (done) => {
    let user = {
      email: process.env.USER_EMAIL,
      password: process.env.PASSWORD
    }
    NicoAction.login(user);
    let login = setInterval(() => {
      if (NicoStore.isLogin()) clearInterval(login);
      NicoAction.fetchLoginStatus();
    }, 300);
    assert(NicoStore.isLogin(), true);
    let viewer = null;
    NicoAction.connect('nsen/hotaru');
    let connect = setInterval(() => {
      if (viewer !== null) {
        CommentAction.postComment(`test${Math.random()}`, {mail: '184'});
        CommentAction.getComment(viewer);
        let comments = CommentStore.getAllComment();
        expect(comments).to.not.equal([]);
        clearInterval(connect);
      }
      viewer = NicoStore.getViewer();
    }, 100);
    done();
  });

  after(() => {
    sandbox.restore();
  });

});
