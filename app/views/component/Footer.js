'use strict';

import R from 'ramda';
import React from 'react';
import CommentAction from '../../actions/CommentAction';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';

let Footer = React.createClass({
  displayName: 'Footer',

  getInitialState() {
    return {
      comment: '',
      mail: ''
    };
  },

  changeComment(e) {
    this.setState({comment: e.target.value});
  },

  handleToggle() {
    const setMailState = (mail) => this.setState({mail: mail});
    R.isEmpty(this.state.mail) ? setMailState('184') : setMailState('');
  },

  handlePostComment() {
    const comment = this.state.comment.trim();
    const notEmpty = R.complement(R.isEmpty);
    if (notEmpty(comment)) {
      CommentAction.postComment(comment, {mail: this.state.mail});
      this.setState({comment: ''});
    }
  },

  render() {
    return (
      <div className='Footer'>
        <Toolbar style={{position: 'fixed', bottom: '0', left: '0', right: '0'}} >
          <ToolbarGroup firstChild={true} float='left' style={{width: '50%'}}>
            <TextField
              className='CommentForm'
              value={this.state.comment}
              style={{marginLeft: '20px', width: '100%', minWidth: '100px'}}
              hintText='コメント'
              onChange={this.changeComment}
            />
          </ToolbarGroup>
          <ToolbarGroup float='right' style={{width: '18%', marginTop: '16px'}}>
            <Toggle
              ref='anonymousNav'
              onToggle={this.handleToggle}
              label='184'
              labelPosition='right'
              style={{maxWidth: 250, float: 'right'}}
            />
          </ToolbarGroup>
          <ToolbarGroup float='right' style={{width: '15%'}}>
            <RaisedButton
              className='LiveConnectButton'
              primary={true}
              style={{width: '30%', minWidth: '60px', float: 'right'}}
              label='送信'
              onMouseDown={this.handlePostComment}
            />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }

});

export default Footer;

// vim:ft=javascript.jsx
