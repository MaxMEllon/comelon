'use babel';

let {jsdom} = require('jsdom');
const assert = require('power-assert');

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;
global.location = window.location;

describe('MainView', () => {
  let React;
  let ReactDOM;
  let ReactTestUtils;

  before(() => {
    React = require('react');
    ReactDOM = require('react-dom');
    ReactTestUtils = require('react-addons-test-utils');
  });

  it('should display MainView', () => {
    const Main = require('../../app/views/Main');
    let renderedComponent = ReactTestUtils.renderIntoDocument(<Main />);
    let component  = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'MainView');
    let node = ReactDOM.findDOMNode(component);
    assert(node.getAttribute('class'), 'MainView');
  });

});
