'use babel';

const React = require('react');
const NicoAction = require('../actions/NicoAction');
const NicoStore = require('../stores/NicoStore');
const CommentAction = require('../actions/CommentAction');
const CommentStore = require('../stores/CommentStore');
const Comment = require('./component/Comment');
const Connect = require('./component/Connect');
const Post = require('./component/Post');
const Login = require('./component/Login');

let Main = React.createClass({
  displayName: 'Main',

  getInitialState() {
    return {
      comments: [],
      isLogin: null,
      viewer: null
    }
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
    this.setState({viewer: NicoStore.getViewer()});
    this.setState({isLogin: NicoStore.isLogin()});
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
        <Login open={this.state.isLogin === false} />
        <Connect />
        <Comment comments={this.state.comments} />
        <Post />
      </div>
    );
  }

});

module.exports = Main;

// vim:ft=javascript.jsx
