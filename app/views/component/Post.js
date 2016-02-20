'use babel';

const React = require('react');
const CommentAction = require('../../actions/CommentAction');
const RaisedButton = require('material-ui/lib/raised-button');
const TextField = require('material-ui/lib/text-field');

let Post = React.createClass({
  displayName: 'Post',

  getInitialState() {
    return {
      comment: ''
    }
  },

  changeComment(e) {
    this.setState({comment: e.target.value});
  },

  handlePostComment() {
    let comment = this.state.comment.trim();
    this.setState({comment: ''});
    CommentAction.postComment(comment);
  },

  render() {
    return (
      <div className='PostCommentForm'>
        <TextField className='CommentForm'
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

module.exports = Post;

// vim:ft=javascript.jsx

