'use strict';

import React from 'react';
import NicoAction from '../actions/NicoAction';
import NicoStore from '../stores/NicoStore';
import CommentAction from '../actions/CommentAction';
import CommentStore from '../stores/CommentStore';
import Header from './component/Header';
import CommentTable from './component/CommentTable';
import Footer from './component/Footer';
import Login from './component/Login';
import Notify from './component/Notify';
import Setting from './Settings';

let Main = React.createClass({
  displayName: 'Main',

  getInitialState() {
    return {
      comments: [],
      isLogin: null,
      viewer: null
    };
  },

  componentWillMount() {
    NicoAction.fetchLoginStatus();
  },

  componentDidMount() {
    NicoStore.addChangeListener(this.onConnectViewer);
    CommentStore.addChangeListener(this.onUpdateComments);
  },

  componentWillUnMount() {
    NicoStore.removeChangeListener(this.onConnectViewer);
    CommentStore.removeChangeListener(this.onUpdateComments);
  },

  handleLogout() {
    NicoAction.logout();
  },

  onConnectViewer() {
    this.setState({isLogin: NicoStore.isLogin()});
    this.setState({viewer: NicoStore.getViewer()});
    if (this.state.viewer !== null) {
      CommentAction.getComment(this.state.viewer);
    }
  },

  onUpdateComments() {
    this.setState({comments: CommentStore.getAllComments()});
  },

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

});

export default Main;

// vim:ft=javascript.jsx
