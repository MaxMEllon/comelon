'use strict';

const chai = require('chai');
const {expect} = chai;
const {shallow, mount} = require('enzyme');
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('Notify', () => {
  let React;

  before(done => {
    sandbox.create();
    React = require('react');
    done();
  });

  after(() => {
    sandbox.restore();
  });

  it('should display Notify', () => {
    const Notify = require('../../app/views/component/Notify');
    const wrapper = shallow(<Notify />);
    expect(wrapper.find(Notify)).to.have.length(0);
  });

  it('if NotifyAction notify message should be setting state.message', () => {
    require('../setup')();
    const Notify = require('../../app/views/component/Notify');
    const NotifyAction = require('../../app/actions/NotificationAction');
    const wrapper = mount(<Notify />);
    NotifyAction.notify('hogepoge');
    expect(wrapper.state().message).to.equal('hogepoge');
    expect(wrapper.state().open).to.be.true;
  });

});
