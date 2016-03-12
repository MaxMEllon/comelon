'use strict';

const React = require('react');
const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');

let Settings = React.createClass({
  displayName: 'Settings',

  handleClose() {
    this.setState({open: false});
  },

  render() {
    const actions = [
      <FlatButton
        label='キャンセル'
        secondary={true}
        onMouseDown={this.handleClose}
      />,
      <FlatButton
        label='設定'
        primary={true}
        keyboardFocused={true}
        onMouseDown={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          className='LoginModal'
          title='設定'
          open={this.state.open}
          actions={actions}
          modal={false}
          onRequestClose={this.handleClose} >
        </Dialog>
      </div>
    );
  }

});

module.exports = Settings;

// vim:ft=javascript.jsx
