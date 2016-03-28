'use strict';

const chai = require('chai');
const {expect} = chai;
const {shallow} = require('enzyme');

describe('Comment', () => {
  let Immutable;
  let React;
  let sampleComments;

  before(() => {
    React = require('react');
    require('../setup')();
    Immutable = require('immutable');
    sampleComments = [
      Immutable.fromJS({
        attr: {user_id: 4197870, no : 1},
        text: 'sample comment1'
      }),
      Immutable.fromJS({
        attr: {user_id: 'hogepoge', no : 2},
        text: '/sample'
      })
    ];
  });

  it('should display Comment', () => {
    const Comment = require('../../app/views/component/Comment');
    const wrapper = shallow(<Comment key={1} index={0} comment={sampleComments[0]} />);
    expect(wrapper).to.have.length(1);
  });

  it('should display Comment (184)', () => {
    const Comment = require('../../app/views/component/Comment');
    const wrapper = shallow(<Comment key={2} index={1} comment={sampleComments[1]} />);
    expect(wrapper).to.have.length(1);
  });

});
