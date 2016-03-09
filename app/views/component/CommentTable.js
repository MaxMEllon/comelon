'use strict';

const _ = require('lodash');
const React = require('react');
const Comment = require('./Comment');
const ElectronAction = require('../../actions/ElectronAction');
const ElectronStore = require('../../stores/ElectronStore');
const List = require('material-ui/lib/lists/list');
const Paper = require('material-ui/lib/paper');

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
    let index = 0;
    _(this.props.comments).each(comment => {
      components.push(<Comment index={index} comment={comment} />);;
      index++;
    });
    return components;
  },

  render() {
    return (
      <List
        className='CommentTable'
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
