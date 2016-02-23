'use strict';

const assert = require('power-assert');

describe('MainView', () => {
  let React;
  let ReactDOM;
  let ReactTestUtils;

  before(done => {
    require('../setup')();
    React = require('react');
    ReactDOM = require('react-dom');
    ReactTestUtils = require('react-addons-test-utils');
    done();
  });

  it('should display MainView', done => {
    const Main = require('../../app/views/Main');
    let renderedComponent = ReactTestUtils.renderIntoDocument(<Main />);
    let component  = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'MainView');
    let node = ReactDOM.findDOMNode(component);
    assert(node.getAttribute('class'), 'MainView');
    done();
  });

});
