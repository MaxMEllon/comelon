'use babel';

const React = require('react');
const User = require('../config/User');
const NicoAction = require('../actions/NicoAction');
const NicoStore = require('../stores/NicoStore');
const CommentAction = require('../actions/CommentAction');
const CommentStore = require('../stores/CommentStore');
const Comment = require('../views/component/Comment.js');
const RaisedButton = require('material-ui/lib/raised-button');
const TextField = require('material-ui/lib/text-field');

let Main = React.createClass({
  displayName: 'Main',

  getInitialState() {
    return {
      comments: [],
      comment: '',
      lv: '',
      viewer: null
    }
  },

  componentDidMount() {
    NicoAction.login(User);
    NicoStore.addChangeListener(this.onConnectViewer);
    CommentStore.addChangeListener(this.onUpdateComments);
  },

  componentWillUnMount() {
    NicoAction.logout();
    NicoStore.removeChangeListener(this.onConnectViewer);
    CommentStore.removeChangeListener(this.onUpdateComments);
  },

  changeLiveid(e) {
    this.setState({lv: e.target.value});
  },

  changeComment(e) {
    this.setState({comment: e.target.value});
  },

  handleConnect() {
    let liveId = this.state.lv.trim();
    if (! isNaN(liveId)) { liveId = `lv${liveId}`; }
    this.setState({comments: []});
    NicoAction.connect(liveId);
  },

  handlePostComment() {
    let comment = this.state.comment.trim();
    this.setState({comment: ''});
    CommentAction.postComment(this.state.viewer, comment);
  },

  onConnectViewer() {
    this.setState({viewer: NicoStore.getViewer()});
    if (this.state.viewer !== null) {
      console.log('<~~~ onConnectViewer');
      CommentAction.getComment(this.state.viewer);
    }
  },

  onUpdateComments() {
    this.setState({comments: CommentStore.getAllComments()});
  },

  render() {
    console.log('~~~> render');
    return (
      <div className='MainView'>
        <TextField className='LiveIdForm'
                   value={this.state.lv}
                   hintText='放送番号(lv00000)'
                   onChange={this.changeLiveid} />
        <RaisedButton className='LiveConnectButton'
                      secondary={true}
                      label='接続'
                      onMouseDown={this.handleConnect} />
        <Comment comments={this.state.comments} />
        <TextField className='LiveIdForm'
                   style={{width: '400px'}}
                   value={this.state.comment}
                   hintText='コメント'
                   onChange={this.changeComment} />
        <RaisedButton className='LiveConnectButton'
                      primary={true}
                      label='送信'
                      onMouseDown={this.handlePostComment} />
      </div>
    );
  }

});

export default Main;

// vim:ft=javascript.jsx
