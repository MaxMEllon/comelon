'use strict';

const React = require('react');
const Immutable = require('immutable');
const Nico = require('nicolive');
const User = require('../config/User');
const debug = require('../utiles/Debug')('MainView');
const NicoAction = require('../actions/NicoAction');
const Comment = require('../views/component/Comment.js');
const RaisedButton = require('material-ui/lib/raised-button');
const TextField = require('material-ui/lib/text-field');

let Main = React.createClass({
  displayName: 'Main',

  getInitialState() {
    return {
      comments: [],
      lv: ''
    }
  },

  componentDidMount() {
    NicoAction.login(User);
  },
  
  changeText(e) {
    this.setState({lv: e.target.value});
  },
  
  handleClick() {
    let liveId = this.state.lv;
    if (! isNaN(liveId)) { liveId = `lv${liveId}`; }
    this.setState({comments: []});
    Nico.view(liveId, (error, viewer) => {
      if (error) { debug(`X err : ${error}`); }
      viewer.on('comment', comment => {
        let comments = this.state.comments;
        comments.push(Immutable.fromJS(comment));
        this.setState({comments: comments})
      });
    });
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
