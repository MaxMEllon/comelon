import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../views/main.jsx';
const Nico = require('node-nicovideo-api');

window.onload = function() {
  ReactDOM.render(<Main />, document.getElementById('come'));
}
