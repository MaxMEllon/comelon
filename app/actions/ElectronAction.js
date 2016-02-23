'use strict';

const Immutable = require('immutable');
const ElectronActionType = require('./types/ElectronActionTypes');
const AppDispatcher = require('../dispatcher/AppDispatcher');
let mainWindow = undefined;
// TODO: dont use process.env
if (process.env.NODE_ENV !== 'test') {
  const remote = require('electron').remote;
  const BrowserWindow = remote.require('browser-window');
  mainWindow = BrowserWindow.getAllWindows()[0];
}

let ElectronAction = {
  fetchWindowSize() {
    if (!mainWindow) return;
    mainWindow.on('resize', () => {
      let size = mainWindow.getSize();
      AppDispatcher.dispatch({
        actionType: ElectronActionType.RESIZE,
        size: Immutable.fromJS({
          width: size[0],
          height: size[1]
        })
      });
    });
  }
};

module.exports = ElectronAction;
