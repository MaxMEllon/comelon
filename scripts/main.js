'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
const Main = require('../app/views/Main');

window.onload = function() {
  ReactDOM.render(<Main />, document.getElementById('come'));
}
