'use strict';

const chai = require('chai');
const {expect} = chai;
const {shallow, mount} = require('enzyme');
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('CommentTable', () => {
  let React;

  before(done => {
    sandbox.create();
    React = require('react');
    done();
  });

  after(() => {
    sandbox.restore();
  });

  it('should display Header', done => {
    const Header = require('../../app/views/component/Header');
    const wrapper = shallow(<Header />);
    expect(wrapper.find(Header)).to.have.length(0);
    done();
  });

  it('try click settings button in Header', () => {
    require('../setup')();
    const Header = require('../../app/views/component/Header');
    const Appbar = require('material-ui/lib/app-bar');
    const IconButton = require('material-ui/lib/icon-button');
    const wrapper = mount(<Header />);
    const AppbarWraper = wrapper.find(Appbar);
    expect(AppbarWraper.length).to.equal(1);
    const ConnectButton = AppbarWraper.find(IconButton).first();
    expect(ConnectButton.props().tooltip).to.equal('接続');
    const SettingsButton = AppbarWraper.find(IconButton).last();
    expect(SettingsButton.props().tooltip).to.equal('設定');
  });

});
