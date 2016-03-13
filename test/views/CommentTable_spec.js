'use strict';

const chai = require('chai');
const {expect} = chai;
const {shallow} = require('enzyme');
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('CommentTable', () => {
  let Immutable;
  let React;
  let sampleComments;

  before(done => {
    sandbox.create();
    Immutable = require('immutable');
    React = require('react');
    sampleComments = [
      Immutable.fromJS({
        attr: {user_id: 4197870, no : 1},
        text: 'sample comment1'
      }),
      Immutable.fromJS({
        attr: {user_id: 4197870, no : 1},
        text: 'sample comment2'
      })
    ];
    done();
  });

  after(() => {
    sandbox.restore();
  });

  it('should display Comment in CommentTable ', done => {
    const CommentTable = require('../../app/views/component/CommentTable');
    const Comment = require('../../app/views/component/Comment');
    const wrapper = shallow(<CommentTable comments={sampleComments} />);
    expect(wrapper.find(Comment).length).to.equal(2);
    done();
  });

});
