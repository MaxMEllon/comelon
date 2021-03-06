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
    };
    NicoAction.login(user);
  });

  beforeEach(() => {
    delete require.cache[require.resolve('../../app/stores/CommentStore')];
    CommentStore = require('../../app/stores/CommentStore');
  });

  xit('try connect', done => {
    let isWindows = (process.platform === 'win32');
    if (isWindows) { done(); }
    else {
      let waitLogin = setInterval(() => { NicoAction.fetchLoginStatus(); }, 700);
      let isConnected = false;
      let loginCallback = () => {
        if (NicoStore.isLogin() && ! isConnected) {
          expect(NicoStore.isLogin()).to.be.equal(true);
          NicoAction.connect('nsen/hotaru');
          isConnected = true;
          clearInterval(waitLogin);
        }
      };
      NicoStore.addChangeListener(loginCallback);
      let waitConnect = setInterval(() => {
        let viewer = NicoStore.getViewer();
        if (viewer !== null && viewer !== undefined) {
          CommentAction.getComment(viewer);
          clearInterval(waitConnect);
          done();
        }
      }, 500);
    }
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
    let wait = setInterval(() => {
      if (nickname !== null && nickname !== undefined) {
        expect(nickname).to.be.equal('MaxMEllon');
        clearInterval(wait);
      }
      nickname = CommentStore.getNickname(sampleComment.getIn(['attr', 'user_id']));
    }, 100);
  });

  after(() => {
    sandbox.restore();
  });

});
