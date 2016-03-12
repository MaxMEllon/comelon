'use strict';

const React = require('react');
const CommentAction = require('../../actions/CommentAction');
const Toolbar = require('material-ui/lib/toolbar/toolbar');
const ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
const RaisedButton = require('material-ui/lib/raised-button');
const TextField = require('material-ui/lib/text-field');
const Toggle = require('material-ui/lib/toggle');

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
    if (this.state.mail === '') {
      this.setState({mail: 184});
    } else {
      this.setState({mail: ''});
    }
  },

  handlePostComment() {
    let comment = this.state.comment.trim();
    if (comment !== '') {
      CommentAction.postComment(comment, {mail: this.state.mail});
      this.setState({comment: ''});
    }
  },

  render() {
    return (
      <div className='Footer'>
        <Toolbar style={{position: 'fixed', bottom: '0', left: '0', right: '0'}} >
          <ToolbarGroup firstChild={true} float='left' style={{width: '60%'}}>
            <TextField
              className='CommentForm'
              value={this.state.comment}
              style={{marginLeft: '20px', width: '100%'}}
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
          <ToolbarGroup float='right' style={{width: '20%'}}>
            <RaisedButton
              className='LiveConnectButton'
              primary={true}
              style={{width: '40%', minWidth: '80px', float: 'right'}}
              label='送信'
              onMouseDown={this.handlePostComment}
            />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }

});

module.exports = Footer;

// vim:ft=javascript.jsx
