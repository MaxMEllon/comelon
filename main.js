'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const size = require('./config/Size');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: size.get('width'), height: size.get('height')});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
});
