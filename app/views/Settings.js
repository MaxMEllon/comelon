'use strict';

const R = require('ramda');
const React = require('react');
const Immutable = require('immutable');
const SettingAction = require('../actions/SettingAction');
const SettingStore = require('../stores/SettingStore');
const Divider = require('material-ui/lib/divider');
const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');
const Toggle = require('material-ui/lib/toggle');

let Settings = React.createClass({
  displayName: 'Settings',

  getInitialState() {
    return {
      open: false,
      option: Immutable.fromJS({
        systemComment: false
      })
    };
  },

  componentWillMount() {
    SettingStore.addChangeListener(this.onChangeState);
  },

  componentWillUnMount() {
    SettingStore.removeChangeListener(this.onChangeState);
  },

  onChangeState() {
    this.setState({
      open: SettingStore.isOpen(),
      option: Immutable.fromJS(SettingStore.getOption())
    });
  },

  handleClose() {
    this.setState({open: false});
    SettingAction.close();
  },

  handleToggle() {
    const toggled = R.not(this.state.option.get('systemComment'));
    SettingAction.setSystemCommentViewOption(toggled);
  },

  render() {
    const actions = [
      <FlatButton
        label='閉じる'
        secondary={true}
        onMouseDown={this.handleClose}
      />
    ];

    return (
      <div className='SettingsView'>
        <Dialog
          className='LoginModal'
          title='設定'
          open={this.state.open}
          actions={actions}
          modal={false}
          onRequestClose={this.handleClose} >
          <div className='SettingsContainer'>
            <Divider />
            <p style={{fontSize: '14px', color: '#030303'}}>
              設定は変更した時点で反映されます
            </p>
            <br />
            <Toggle
              defaultToggled={this.state.option.get('systemComment')}
              onToggle={this.handleToggle}
              label='運営コメントの表示／非表示'
            />
          </div>
        </Dialog>
      </div>
    );
  }

});

module.exports = Settings;

// vim:ft=javascript.jsx
