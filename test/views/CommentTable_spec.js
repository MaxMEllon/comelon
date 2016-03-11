'use strict';

const assert = require('power-assert');

describe('CommentTable', () => {
  let Immutable;
  let React;
  let ReactDOM;
  let ReactTestUtils;
  let CommentAction;
  let CommentStore;
  let sampleComments;

  before(done => {
    require('../setup')();
    Immutable = require('immutable');
    React = require('react');
    ReactDOM = require('react-dom');
    ReactTestUtils = require('react-addons-test-utils');
    CommentAction = require('../../app/actions/CommentAction');
    CommentStore = require('../../app/stores/CommentStore');
    sampleComments = [
      Immutable.fromJS({
        attr: {
          user_id: 4197870,
          no : 1
        },
        text: 'sample comment'
      })
    ];
    done();
  });

  it('should display Comment in CommentTable', done => {
    const CommentTable = require('../../app/views/component/CommentTable');
    CommentAction.fetchNickname(sampleComments[0]);
    let nickname = null;
    let wait = setInterval(() =>{
      if (nickname !== null && nickname !== undefined) {
        let renderedComponent = ReactTestUtils.renderIntoDocument(<CommentTable comments={sampleComments} />);
        let component = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'CommentComponent');
        let node = ReactDOM.findDOMNode(component);
        assert(node.getAttribute('class'), 'CommentTableComponent');
        clearInterval(wait);
        done();
      }
      nickname = CommentStore.getNickname(sampleComments[0].getIn(['attr', 'user_id']));
    }, 100)
  });

});
