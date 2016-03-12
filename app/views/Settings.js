'use strict';

const Immutable = require('immutable');
const React = require('react');
const SettingAction = require('../actions/SettingAction');
const SettingStore = require('../stores/SettingStore');
const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');

let Settings = React.createClass({
  displayName: 'Settings',

  getInitialState() {
    return {
      open: false,
      option: {
        systemComment: false
      }
    };
  },

  componentWillMount() {
    SettingStore.addChangeListener(this.onChangeState);
  },

  componentWillUnMount() {
    SettingStore.removeChangeListener(this.onChangeState);
  },

  onChangeState() {
    this.setState({open: SettingStore.isOpen()});
    this.setState({option: Immutable.fromJS(SettingStore.getOption())});
  },

  handleClose() {
    this.setState({open: false});
    SettingAction.close();
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
          <div></div>
        </Dialog>
      </div>
    );
  }

});

module.exports = Settings;

// vim:ft=javascript.jsx
