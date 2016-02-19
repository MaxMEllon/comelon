'use babel';

let {jsdom} = require('jsdom');

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;
global.location = window.location;

describe('MainView', () => {
  let React;
  // let ReactDOM;
  let ReactTestUtils;

  before(() => {
    React = require('react');
    // ReactDOM = require('react-dom');
    ReactTestUtils = require('react-addons-test-utils');
  });

  it('should be display MainView', () => {
    const Main = require('../../views/Main');
    let component = ReactTestUtils.renderIntoDocument(<Main />);
  });

});
