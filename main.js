'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const size = require('./config/Size');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: size.width, height: size.height});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
