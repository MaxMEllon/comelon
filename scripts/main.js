'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Main = require('../app/views/Main');

window.onload = function() {
  ReactDOM.render(<Main />, document.getElementById('come'));
}
