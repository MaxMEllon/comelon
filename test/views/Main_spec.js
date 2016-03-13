'use strict';

const {expect} = require('chai');
const {shallow} = require('enzyme');

describe('MainView', () => {
  let React;

  before(() => {
    React = require('react');
  });

  it('should display MainView', () => {
    const Main = require('../../app/views/Main');
    const wrapper = shallow(<Main />);
    expect(wrapper.find('MainView')).to.have.length(0);
    expect(wrapper.find('MainView').root.length).to.equal(1);
  });

});
