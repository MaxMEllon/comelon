'use strict';

import createStore from '../utils/AppStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import NicoActionType from '../actions/types/NicoActionTypes';

let cookie = null;
let viewer = null;
let isLogin = true;

/**
 * @classdesc NicoStore
 * ログイン状態やクッキー，ニコ生のソケットなど
 * ニコニコに関する状態を管理します
 */
let NicoStore = createStore({
  /**
   * isLogin()
   * @returns {boolean} _islogin
   * 現在のログイン状態を返します
   */
  isLogin() {
    return isLogin;
  },

  /**
   * getCookie()
   * @returns {strings} _cookie
   * 現在のcookieを返します
   */
  getCookie() {
    return cookie;
  },

  /**
   * getViewer()
   * @returns {Socket} viewer
   * 現在のviewer(ニコ生放送へのソケット)を返します
   */
  getViewer() {
    return viewer;
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
    cookie = action.cookie;
    NicoStore.emitChange();
    break;

  /**
   * NicoActionType.CONNECT
   * 生放送への接続に成功した時にdispatchされます
   * viewerを更新します
   */
  case NicoActionType.CONNECT:
    viewer = action.viewer;
    NicoStore.emitChange();
    break;

  /**
   * NicoActionType.FETCH_LOGIN_STATUS
   * ログイン状態をfetchされた時にdispatchされます
   * 現在のログイン状態を更新します
   */
  case NicoActionType.FETCH_LOGIN_STATUS:
    isLogin = action.isLogin;
    NicoStore.emitChange();
    break;
  }

});

export default NicoStore;
