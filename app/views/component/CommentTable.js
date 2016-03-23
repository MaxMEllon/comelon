'use strict';

const R = require('ramda');
const React = require('react');
const SettingStore = require('../../stores/SettingStore');
const Comment = require('./Comment');
const List = require('material-ui/lib/lists/list');
const Paper = require('material-ui/lib/paper');

let CommentTable = React.createClass({
  displayName: 'CommentTable',

  propTypes: {
    comments: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      systemComment: false,
      doTalking: false
    };
  },

  componentDidMount() {
    SettingStore.addChangeListener(this.onChangeOption);
  },

  componentDidUnMount() {
    SettingStore.addChangeListener(this.onChangeOption);
  },

  onChangeSystemComment() {
    this.setState({
      systemComment: SettingStore.getOption().systemComment,
      doTalking: SettingStore.getOption().doTalking
    });
  },

  renderComments() {
    let components = [];
    const match = R.test(/^(\/(.*)){1}/);
    const isShowSystemComment = ! this.state.systemComment;
    let index = 0;
    const renderComment = comment => {
      const isSkip = R.and(isShowSystemComment, match(comment.get('text')));
      if (isSkip) return;
      let no = comment.getIn(['attr', 'no']);
      let id = comment.getIn(['attr', 'user_id']);
      components.push(<Comment key={`${no}${id}`} index={index} comment={comment} />);
      index++;
    };
    R.forEach(renderComment, this.props.comments);
    return components;
  },

  render() {
    return (
      <List className='CommentTableComponent'
        style={{marginTop: '64px', marginBottom: '64px'}} >
        <Paper className='CommentTableBody'>
          {this.renderComments()}
        </Paper>
      </List>
    );
  }
});

module.exports = CommentTable;

// vim:ft=javascript.jsx
