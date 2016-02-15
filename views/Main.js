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

  changeText(e) {
    this.setState({lv: e.target.value});
  },

  handleClick() {
    let liveId = this.state.lv.trim();
    if (! isNaN(liveId)) { liveId = `lv${liveId}`; }
    this.setState({comments: []});
    NicoAction.connect(liveId);
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
                   onChange={this.changeText} />
        <RaisedButton className='LiveConnectButton'
                      secondary={true}
                      label='接続'
                      onMouseDown={this.handleClick} />
        <Comment comments={this.state.comments} />
      </div>
    );
  }

});

export default Main;

// vim:ft=javascript.jsx
