'use strict';

require('babel-core/register');
require('babel-polyfill');

const chai = require('chai');
const {expect} = chai;
const {sandbox} = require('sinon');
chai.use(require('sinon-chai'));

describe('NotificationAction', () => {
  let NotificationAction;

  before(() => {
    sandbox.create();
    NotificationAction = require('../../app/actions/NotificationAction');
  });

  it('if send empty message or other types should throw exception', () => {
    expect(() => {
      NotificationAction.notify('');
    }).to.throw('message is not strings');
  });

  it('if send null should throw exception', () => {
    expect(() => {
      NotificationAction.notify(null);
    }).to.throw('message is not strings');
  });

  after(() => {
    sandbox.restore();
  });

});
