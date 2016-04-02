'use strict';

const {expect} = require('chai');
const {shallow, mount} = require('enzyme');

describe('MainView', () => {
  let React;

  before(() => {
    React = require('react');
    require('../setup')();
  });

  it('should display MainView', () => {
    const Main = require('../../app/views/Main');
    const wrapper = shallow(<Main />);
    expect(wrapper.find('MainView')).to.have.length(0);
    expect(wrapper.find('MainView').root.length).to.equal(1);
  });

  it('if MainView mounted should have child component', () => {
    const Main = require('../../app/views/Main');
    const Header = require('../../app/views/component/Header');
    const wrapper = mount(<Main />);
    expect(wrapper.find(<Header />).length).to.equal(0);
  });

});
