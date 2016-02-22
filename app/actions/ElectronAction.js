'use babel';

const Immutable = require('immutable');
const ElectronActionType = require('./types/ElectronActionTypes');
const AppDispatcher = require('../dispatcher/AppDispatcher');

let ElectronAction = {
  resize(width, height) {
    let size = Immutable.fromJS({
      width: width,
      height: height
    });
    AppDispatcher.dispatch({
      actionType: ElectronActionType.RESIZE,
      size: size
    });
  }
};
