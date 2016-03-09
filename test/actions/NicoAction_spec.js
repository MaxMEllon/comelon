'use strict';

require('babel-core/register');
require('babel-polyfill');

const chai = require('chai');
const {assert} = require('chai');
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('NicoAction', () => {
  let NicoAction, NicoStore, loginAction = null;

  before(() => {
    sandbox.create();
    NicoAction = require('../../app/actions/NicoAction');
    loginAction = async () => {
      let user = {
        email: process.env.USER_EMAIL,
        password: process.env.PASSWORD
      }
      await NicoAction.login(user);
    }
  });

  beforeEach(() => {
    delete require.cache[require.resolve('../../app/stores/NicoStore')];
    NicoStore = require('../../app/stores/NicoStore');
  });

  it('try login', async () => {
    await loginAction();
    NicoAction.fetchLoginStatus();
    assert(NicoStore.isLogin(), true);
  });

  xit('try connect', async () => {
    NicoAction.fetchLoginStatus();
    await loginAction();
    await NicoAction.connect('nsen/hotaru');
    // Uncaught RangeError: port should be >= 0 and < 65536: 
    //   at lookupAndConnect (net.js:930:13)
    //   at Socket.connect (net.js:907:5)
    //   at Object.exports.connect.exports.createConnection (net.js:64:35)
    //   at node_modules/.store/nicolive@0.0.4/_/lib/nicolive/view.js:37:26
    //   at Request._callback (node_modules/.store/nicolive@0.0.4/_/lib/nicolive/get-player-status.js:71:14)
    //   at Request.self.callback (node_modules/.store/request@2.69.0/_/request.js:199:22)
    //   at Request.<anonymous> (node_modules/.store/request@2.69.0/_/request.js:1036:10)
    //   at IncomingMessage.<anonymous> (node_modules/.store/request@2.69.0/_/request.js:963:12)
    //   at endReadableNT (_stream_readable.js:906:12) 
  });

  it('try logout', () => {
    NicoAction.logout();
    NicoAction.fetchLoginStatus();
    assert(NicoStore.isLogin(), false);
  });

  after(() => {
    sandbox.restore();
  });

});
