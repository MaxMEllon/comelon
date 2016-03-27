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
        systemComment: false,
        doTalking: false
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

  handleToggle(method, type) {
    const nextState = {};
    nextState[type] = R.not(this.state.option.get(type));
    this.setState(nextState);
    SettingAction[method](nextState[type]);
  },

  render() {
    const actions = [
      <FlatButton
        label='閉じる'
        secondary={true}
        onMouseDown={this.handleClose}
      />
    ];

    const dialogOptions = {
      className: 'LoginModal',
      title: '設定',
      modal: false,
      actions: actions,
      open: this.state.open,
      onRequestClose: this.handleClose
    };

    return (
      <div className='SettingsView'>
        <Dialog {...dialogOptions} >
          <div className='SettingsContainer'>
            <Divider />
            <p style={{fontSize: '14px', color: '#030303'}}>
              設定は変更した時点で反映されます
            </p>
            <br />
            <Toggle defaultToggled={this.state.option.get('systemComment')}
              onToggle={() => this.handleToggle('setSystemCommentViewOption', 'systemComment')}
              label='運営コメントの非表示／表示'
            />
            <Toggle defaultToggled={this.state.option.get('doTalking')}
              onToggle={() => this.handleToggle('setDoTalkingOption', 'doTalking')}
              label='棒読みのオフ／オン'
            />
          </div>
        </Dialog>
      </div>
    );
  }

});

module.exports = Settings;

// vim:ft=javascript.jsx
