'use strict';

const R = require('ramda');
const React = require('react');
const SettingStore = require('../../stores/SettingStore');
const Comment = require('./Comment');
const List = require('material-ui/lib/lists/list');
const Paper = require('material-ui/lib/paper');

const ifSystemComment = (comment) => R.test(/^(\/(.*)){1}/, comment.get('text'));
const No = (comment) => comment.getIn(['attr', 'no']);
const Id = (comment) => comment.getIn(['attr', 'id']);
const Key = (comment) => `${No(comment)}${Id(comment)}`;
const Size = (components) => R.length(components);

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

  onChangeOption() {
    this.setState({
      systemComment: SettingStore.getOption().systemComment,
      doTalking: SettingStore.getOption().doTalking
    });
  },

  renderComments() {
    const ToSkip = R.and(! this.state.systemComment);
    let components = [];
    const renderComment = c => {
      if (ToSkip(ifSystemComment(c))) return;
      components.push(<Comment key={Key(c)} index={Size(components)} comment={c} />);
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
