'use strict';

const _ = require('lodash');
const React = require('react');
const CommentStore = require('../../stores/CommentStore');
const ElectronAction = require('../../actions/ElectronAction');
const ElectronStore = require('../../stores/ElectronStore');
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');

let Comment = React.createClass({
  displayName: 'Comment',

  propTypes: {
    comments: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      height: '720px'
    }
  },

  componentWillMount() {
    ElectronAction.fetchWindowSize();
  },

  componentDidMount() {
    ElectronStore.addChangeListener(this.onResizeWindow);
  },

  componentDidUpdate() {
    // TODO: scroll
  },

  componentWillUnMount() {
    ElectronStore.removeChangeListener(this.onResizeWindow);
  },

  onResizeWindow() {
    let size = ElectronStore.getCurrentSize();
    this.setState({height: `${size.get('height') - 138}px`})
  },

  renderComments() {
    let components = [];
    _(this.props.comments).each(comment => {
      let text = comment.get('text');
      let userId = comment.getIn(['attr', 'user_id']);
      let userName = CommentStore.getNickname(userId);
      let no = comment.getIn(['attr', 'no']);
      components.unshift(
        <TableRow className='CommentItemBody'
                  key={no}
                  selectable={false} >
          <TableRowColumn className='CommentNo'>
            {no}
          </TableRowColumn>
          <TableRowColumn className='CommentUserName'>
            {userName}
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
      <Table className='CommentTable'
             ref='commentTable'
             height={this.state.height}
             selectable={false}
             multiSelectable={false}
             fixedHeader={true}
             fixedFooter={true} >
        <TableBody className='CommentTableBody'
                   displayRowCheckbox={false}
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
