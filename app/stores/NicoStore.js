'use strict';

const assign = require('object-assign');
const EventEmitter = require('eventemitter3');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const NicoActionType = require('../actions/types/NicoActionTypes');

const CHANGE_EVENT = 'change';

let _cookie = null;
let _viewer = null;
let _isLogin = true;

/**
 * @classdesc NicoStore
 * ログイン状態やクッキー，ニコ生のソケットなど
 * ニコニコに関する状態を管理します
 */
let NicoStore = assign({}, EventEmitter.prototype, {
  /**
   * isLogin()
   * @returns {boolean} _islogin
   * 現在のログイン状態を返します
   */
  isLogin() {
    return _isLogin;
  },

  /**
   * getCookie()
   * @returns {strings} _cookie
   * 現在のcookieを返します
   */
  getCookie() {
    return _cookie;
  },

  /**
   * getViewer()
   * @returns {Socket} viewer
   * 現在のviewer(ニコ生放送へのソケット)を返します
   */
  getViewer() {
    return _viewer;
  },

  /**
   * emitChange()
   * Storeの変更を通知します
   */
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * addChangeListener()
   * Storeが変更された時のコールバックを追加します
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * removeChangeListener()
   * Storeが変更された時のコールバックを削除します
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(action => {
  let type = action.actionType;

  switch (type) {
  /**
   * NicoActionType.LOGIM
   * ログインに成功した時にdispatchされます
   * クッキーを更新します
   */
  case NicoActionType.LOGIN:
    let cookie = action.cookie;
    if (cookie) {
      _cookie = cookie;
      NicoStore.emitChange();
    }
    break;

  /**
   * NicoActionType.CONNECT
   * 生放送への接続に成功した時にdispatchされます
   * viewerを更新します
   */
  case NicoActionType.CONNECT:
    let viewer = action.viewer;
    if (viewer) {
      _viewer = viewer;
      NicoStore.emitChange();
    }
    break;

  /**
   * NicoActionType.FETCH_LOGIN_STATUS
   * ログイン状態をfetchされた時にdispatchされます
   * 現在のログイン状態を更新します
   */
  case NicoActionType.FETCH_LOGIN_STATUS:
    let isLogin = action.isLogin;
    _isLogin = isLogin;
    NicoStore.emitChange();
    break;
  }

});

module.exports = NicoStore;
