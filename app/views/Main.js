'use strict';

import React from 'react';
import AppComponent from '../utils/AppComponent';
import CommentAction from '../actions/CommentAction';
import CommentStore from '../stores/CommentStore';
import CommentTable from './component/CommentTable';
import Footer from './component/Footer';
import Header from './component/Header';
import Login from './component/Login';
import NicoAction from '../actions/NicoAction';
import NicoStore from '../stores/NicoStore';
import Notify from './component/Notify';
import Setting from './Settings';

export default class Main extends AppComponent {
  static get displayName() {
    return 'Main';
  }

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      isLogin: null,
      viewer: null
    };
  }

  componentWillMount() {
    NicoAction.fetchLoginStatus();
    NicoStore.addChangeListener(this.onConnectViewer);
    CommentStore.addChangeListener(this.onUpdateComments);
  }

  componentWillUnMount() {
    NicoStore.removeChangeListener(this.onConnectViewer);
    CommentStore.removeChangeListener(this.onUpdateComments);
  }

  handleLogout() {
    NicoAction.logout();
  }

  onConnectViewer = () => {
    this.setState({isLogin: NicoStore.isLogin()});
    this.setState({viewer: NicoStore.getViewer()});
    if (this.state.viewer !== null) {
      CommentAction.getComment(this.state.viewer);
    }
  }

  onUpdateComments = () => {
    // render回数を絞るために setState は使わない
    this.state.comments = CommentStore.getAllComments();
    this.forceUpdate();
  }

  render() {
    return (
      <div className='MainView'>
        <Header />
        <CommentTable comments={this.state.comments} />
        <Footer />
        <Login open={this.state.isLogin === false} />
        <Notify />
        <Setting />
      </div>
    );
  }

}

// vim:ft=javascript.jsx
