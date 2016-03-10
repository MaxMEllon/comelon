'use strict';

require('babel-core/register');
require('babel-polyfill');

const chai = require('chai');
const {expect} = chai;
const assert = require('power-assert');
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('CommentAction', () => {
  let NicoAction, NicoStore, CommentAction, CommentStore, Immutable;

  before(() => {
    sandbox.create();
    Immutable = require('immutable');
    CommentAction = require('../../app/actions/CommentAction');
    NicoAction = require('../../app/actions/NicoAction');
    NicoStore = require('../../app/stores/NicoStore');
    let user = {
      email: process.env.USER_EMAIL,
      password: process.env.PASSWORD
    }
    NicoAction.login(user);
  });

  beforeEach(() => {
    delete require.cache[require.resolve('../../app/stores/CommentStore')];
    CommentStore = require('../../app/stores/CommentStore');
  });

  it('reset all comment', done => {
    CommentAction.resetAllComment();
    let comments = CommentStore.getAllComments();
    assert(comments, []);
    done();
  });

  it('fetch nickname', () => {
    let sampleComment = Immutable.fromJS({ attr: { user_id: 4197870 } });
    CommentAction.fetchNickname(sampleComment);
    let nickname = null;
    let wait = setInterval(() =>{
      if (nickname !== null && nickname !== undefined) {
        expect(nickname).to.be.equal('MaxMEllon');
        clearInterval(wait);
      }
      nickname = CommentStore.getNickname(sampleComment.getIn(['attr', 'user_id']));
    }, 100)
  })

  it('try comment', done => {
    let wait = setInterval(() => { NicoAction.fetchLoginStatus(); }, 300);
    let waitConnect = setInterval(() => {
      if (NicoStore.getViewer() !== null && NicoStore.getViewer() !== null) {
        CommentAction.getComment(NicoStore.getViewer());
        clearInterval(waitConnect);
        done();
      }
    }, 500);
    let loginCallback = () => {
      if (NicoStore.isLogin()) {
        expect(NicoStore.isLogin()).to.be.equal(true);
        NicoAction.connect('nsen/hotaru');
        clearInterval(wait);
      }
    };
    NicoStore.addChangeListener(loginCallback);
  });

  after(() => {
    sandbox.restore();
  });

});
