import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../views/Main.jsx';
const Nico = require('node-nicovideo-api');

window.onload = function() {
  ReactDOM.render(<Main />, document.getElementById('come'));
}
