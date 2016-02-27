'use strict';

const _ = require('lodash');
const React = require('react');
const ReactDOM = require('react-dom');
const Comment = require('./Comment');
const ElectronAction = require('../../actions/ElectronAction');
const ElectronStore = require('../../stores/ElectronStore');
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');

let CommentTable = React.createClass({
  displayName: 'CommentTable',

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
    // FIXME:
    // not done scroll of 'CommentTable' component when added 'Comment' component.
    let commentTable = ReactDOM.findDOMNode(this.refs.commentTable);
    commentTable.scrollTo = commentTable.scrollHeight;
  },

  componentWillUnMount() {
    ElectronStore.removeChangeListener(this.onResizeWindow);
  },

  onResizeWindow() {
    let size = ElectronStore.getCurrentSize();
    this.setState({height: `${size.get('height') - 120}px`})
  },

  renderComments() {
    let components = [];
    _(this.props.comments).each(comment => {
      components.push(<Comment comment={comment} />);
    });
    return components;
  },

  render() {
    return (
      <Table className='CommentTable'
             style={{backgroundColor: '#FFFFFF'}}
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

module.exports = CommentTable;

// vim:ft=javascript.jsx
