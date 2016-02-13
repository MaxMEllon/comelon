'use strict';

const _ = require('lodash');
const React = require('react');
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');

let Comment = React.createClass({
  displayName: 'Comment',

  propTypes: {
    comments: React.PropTypes.any
  },

  renderComments() {
    let components = [];
    _(this.props.comments).each(comment => {
      let userId = comment.getIn(['attr', 'user_id']);
      let text = comment.get('text');
      let no = comment.getIn(['attr', 'no']);
      if (isNaN(userId)) {userId = '184'}
      components.push(
        <TableRow key={no} selectable={false}>
          <TableRowColumn className='CommentNo'>
            {no}
          </TableRowColumn>
          <TableRowColumn className='CommentUserName'>
            {userId}
          </TableRowColumn>
          <TableRowColumn className='CommentText'>
            {text}
          </TableRowColumn>
        </TableRow>
      );
    });
    return components;
  },

  render() {
    return (
      <Table selectable={false}
             multiSelectable={false}
             fixedHeader={true}
             fixedFooter={true} >
        <TableBody displayRowCheckbox={false}
                   displaySelectAll={false}
                   adjustForCheckbox={false} >
          {this.renderComments()}
        </TableBody>
      </Table>
    );
  }
});

module.exports = Comment;

// vim:ft=javascript.jsx
