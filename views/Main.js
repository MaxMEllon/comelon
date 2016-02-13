'use strict';

const React = require('react');
const Immutable = require('immutable');
const User = require('../config/User');
const debug = require('../utiles/Debug')('MainView');
const NicoAction = require('../actions/NicoAction');
const NicoStore = require('../stores/NicoStore');
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
    NicoStore.addChangeListener(this.onChange);
  },

  componentWillUnMount() {
    NicoStore.removeChangeListener(this.onChange);
  },

  changeText(e) {
    this.setState({lv: e.target.value});
  },

  handleClick() {
    let liveId = this.state.lv;
    if (! isNaN(liveId)) { liveId = `lv${liveId}`; }
    this.setState({comments: []});
    NicoAction.connect(liveId);
  },

  onChange() {
    this.setState({viewer: NicoStore.getViewer()});
    if (this.state.viewer !== null) {
      console.log('<~~~ onChange');
      this.state.viewer.on('comment', comment => {
        let comments = this.state.comments;
        comments.push(Immutable.fromJS(comment));
        this.setState({comments: comments})
      });
    }
  },

  render() {
    debug('~~~> render');
    return (
      <div className='MainView'>
        <TextField value={this.state.lv} hintText='放送番号(lv00000)' onChange={this.changeText} />
        <RaisedButton secondary={true} label='接続' onMouseDown={this.handleClick} />
        <hr />
        <Comment comments={this.state.comments} />
      </div>
    );
  }

});

export default Main;

// vim:ft=javascript.jsx
