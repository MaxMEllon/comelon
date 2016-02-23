'use strict';

import app from 'app';
import BrowserWindow from 'browser-window';
const size = require('./config/Size');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: size.get('width'), height: size.get('height')});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
});
