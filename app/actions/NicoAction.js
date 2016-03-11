'use strict';

const Nico = require('nicolive');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const NicoActionType = require('./types/NicoActionTypes');
const NotificationAction = require('./NotificationAction');

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
      AppDispatcher.dispatch({
        actionType: NicoActionType.FETCH_LOGIN_STATUS,
        isLogin: isLogin
      });
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
          NotificationAction.notify(`ログインに失敗しました : ${error}`);
          throw error;
        }
        NotificationAction.notify('ログインしました');
        AppDispatcher.dispatch({
          actionType: NicoActionType.LOGIN,
          cookie: cookie,
        });
        AppDispatcher.dispatch({
          actionType: NicoActionType.FETCH_LOGIN_STATUS,
          isLogin: true
        });
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
        NotificationAction.notify(`接続に失敗しました : ${error}`);
        throw error;
      }
      NotificationAction.notify('接続に成功しました');
      AppDispatcher.dispatch({
        actionType: NicoActionType.CONNECT,
        viewer: viewer
      });
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
      AppDispatcher.dispatch({
        actionType: NicoActionType.FETCH_LOGIN_STATUS,
        isLogin: false
      });
    });
  }

};

module.exports = NicoAction;

// vim:ft=javascript
