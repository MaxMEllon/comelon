'use strict';

let {jsdom} = require('jsdom');

module.exports = () => {
  global.document = jsdom('<!doctype html><html><body></body></html>');
  global.window = document.defaultView;
  global.Image = global.window.Image;
  global.navigator = window.navigator;
  // global.navigator = { userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85 Safari/537.36' };
  global.location = window.location;
};

