'use strict';

import Nico from 'nicolive';
import AppDispatcher from '../dispatcher/AppDispatcher';
import NicoActionType from './types/NicoActionTypes';
import {notify} from './NotificationAction';

const dispatchCookie = (cookie) => {
  AppDispatcher.dispatch({
    actionType: NicoActionType.LOGIN,
    cookie: cookie,
  });
};

const dispatchIsLogin = (isLogin) => {
  AppDispatcher.dispatch({
    actionType: NicoActionType.FETCH_LOGIN_STATUS,
    isLogin: isLogin
  });
};

/**
 * @classdesc NicoAction
 * ログイン，ログアウト，ニコ生への接続などのアクションを管理します
 */
let NicoAction = {

  /**
   * fetchLoginStatus()
   * 現在のログイン状態をNicoStore::_isLoginにセットします
   */
  fetchLoginStatus() {
    Nico.ping(error => {
      let isLogin = null;
      if (error) isLogin = false;
      else isLogin = true;
      dispatchIsLogin(isLogin);
    });
  },

  /**
   * login(user)
   * @param {Object} user - user情報 {user: `strings`, password: `strings`}
   * @throws {strings} error - ログイン失敗時エラーメッセージ
   * ニコニコへのログインを試みます．
   * 失敗した場合，NotificationAction.notify()で失敗の通知を行います
   * 成功した場合，cookieをNicoStore::_cookieに登録し
   * NicoStore::_isLoginをtrueにします
   */
  login(user) {
    Nico.ping(error => {
      if (! error) { return; }
      Nico.login(user.email, user.password, (error, cookie) => {
        if (error) {
          notify(`ログインに失敗しました : ${error}`);
          throw error;
        }
        notify('ログインしました');
        dispatchCookie(cookie);
        dispatchIsLogin(true);
      });
    });
  },

  /**
   * connect(liveId)
   * @param {strings} liveId - ニコ生放送番号(ex. lv000000)
   * @throws {strings} error - ニコ生接続の失敗時メッセージ
   * ニコニコ生放送への接続を試みます．
   * 失敗した場合，NotificationAction.notify()で失敗の通知を行います
   * 成功した場合，SocketであるviewerをNicoStoreに登録します．
   * これは，Commentの取得時に必要となります．
   */
  connect(liveId) {
    Nico.view(liveId, (error, viewer) => {
      if (error) {
        notify(`接続に失敗しました : ${error}`);
        throw error;
      }
      AppDispatcher.dispatch({
        actionType: NicoActionType.CONNECT,
        viewer: viewer
      });
      notify('接続に成功しました');
    });
  },

  /**
   * logout()
   * @throws {strings} error - ニコ生接続の失敗時メッセージ
   * ニコニコからログアウトします
   */
  logout() {
    Nico.logout(error => {
      if (error) throw error;
      dispatchIsLogin(false);
      dispatchCookie('');
    });
  }

};

export default NicoAction;

// vim:ft=javascript
