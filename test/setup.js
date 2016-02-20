'use babel';

let {jsdom} = require('jsdom');

module.exports = () => {
  global.document = jsdom('<!doctype html><html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = window.navigator;
  global.location = window.location;
};

