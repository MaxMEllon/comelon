'use strict';

const _ = require('lodash');
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

  renderComments() {
    let components = [];
    let index = 0;
    _(this.props.comments).each(comment => {
      if (SettingStore.getOption().systemComment === false) {
        const pattarn = /\/(.*)/;
        comment.get('text').match(pattarn);
        return;
      }
      let no = comment.getIn(['attr', 'no']);
      let id = comment.getIn(['attr', 'user_id']);
      components.push(<Comment key={`${no}${id}`} index={index} comment={comment} />);
      index++;
    });
    return components;
  },

  render() {
    return (
      <List
        className='CommentTableComponent'
        style={{marginTop: '64px', marginBottom: '64px'}}
      >
        <Paper className='CommentTableBody'>
          {this.renderComments()}
        </Paper>
      </List>
    );
  }
});

module.exports = CommentTable;

// vim:ft=javascript.jsx
