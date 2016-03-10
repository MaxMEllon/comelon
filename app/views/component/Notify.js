'use strict';

const React = require('react');
const NotificationStore = require('../../stores/NotificationStore');
const Snackbar = require('material-ui/lib/snackbar');

let Notify = React.createClass({
  displayName: 'Notify',

  getInitialState() {
    return {
      open: false,
      message: ''
    }
  },

  componentWillMount() {
    NotificationStore.addChangeListener(this.onNotify);
  },

  componentDidMount() {
  },

  componentWillUnMount() {
    NotificationStore.removeChangeListener(this.onNotify);
  },

  onNotify() {
    this.setState({
      message: NotificationStore.getMessage(),
      open: true
    });
  },

  handleRequestClose() {
    this.setState({open: false});
  },

  render() {
    return (
      <div className='Notify'>
        <Snackbar
          style={{bottom: '60px'}}
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }

});

module.exports = Notify;

// vim:ft=javascript.jsx
