'use babel';

require('babel-core/register');
require('babel-polyfill');
require('mocha-generators').install();
const Nightmare = require('nightmare');
const path = require('path');
const {assert} = require('chai');
const size = require('../config/Size');
const TEST_HTML_PATH = 'file://' + path.join(__dirname, '../index.html');

describe('e2e', () => {
  var nightmare;

  beforeEach(function() {
    nightmare = Nightmare({
      show: true,
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
});
