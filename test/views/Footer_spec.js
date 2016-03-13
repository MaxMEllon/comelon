'use strict';

const chai = require('chai');
const {expect} = chai;
const {shallow, mount} = require('enzyme');
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('Footer', () => {
  let React;

  before(done => {
    sandbox.create();
    React = require('react');
    done();
  });

  after(() => {
    sandbox.restore();
  });

  it('should display Footer', () => {
    const Footer = require('../../app/views/component/Footer');
    const wrapper = shallow(<Footer />);
    expect(wrapper.find(Footer)).to.have.length(0);
  });

  it('if toggled should be set mail option of state', () => {
    require('../setup')();
    const Footer = require('../../app/views/component/Footer');
    const wrapper = mount(<Footer />);
    wrapper.component.getInstance().handleToggle();
    expect(wrapper.state().mail).to.equal(184);
  });

  it('if input text should be change text of state', () => {
    require('../setup')();
    const Footer = require('../../app/views/component/Footer');
    const wrapper = mount(<Footer />);
    let event = {target: { value: 'sample comment' }};
    wrapper.component.getInstance().changeComment(event);
    expect(wrapper.state().comment).to.equal('sample comment');
  });

});
