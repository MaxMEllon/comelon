'use strict';

require('babel-core/register');
require('babel-polyfill');
require('mocha-generators').install();
const Nightmare = require('nightmare');
const Nico = require('nicolive');
const path = require('path');
const {assert} = require('chai');
const size = require('../config/Size');
const TEST_HTML_PATH = 'file://' + path.join(__dirname, '../index.html');

describe('e2e', function() {
  this.timeout(600000);
  var nightmare;

  before(function() {
    Nico.destroy();
    Nico.logout(error => { if (error) throw error; });
  });

  beforeEach(function() {
    nightmare = Nightmare({
      show: process.env.NIGHTMARE !== '1',
      nodeIntegration: true
    });
  });

  afterEach(function*() {
    yield nightmare.end();
  });

  it('render main view', function*() {
    var title = yield nightmare
      .viewport(size.get('width'), size.get('height'))
      .goto(TEST_HTML_PATH)
      .wait('.MainView')
      .title()
    assert(title, 'こめろん');
  });

  it('login', function*() {
    yield nightmare
      .viewport(size.get('width'), size.get('height'))
      .goto(TEST_HTML_PATH)
      .wait('.EmailForm')
      .click('.EmailForm')
      .type('.EmailForm > input[type=text]', process.env.USER_EMAIL)
      .click('.PasswordForm')
      .type('.PasswordForm > input[type=password]', process.env.PASSWORD)
      .mousedown('button > span')
      .wait(3000)
  });

  it('connect  nsen', function*() {
    yield nightmare
      .viewport(size.get('width'), size.get('height'))
      .goto(TEST_HTML_PATH)
      .wait('.MainView')
      .type('input[type=text]', 'nsen/hotaru')
      .wait(300)
  })

});
