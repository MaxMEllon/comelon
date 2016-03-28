'use strict';

const React = require('react');
const NicoAction = require('../../actions/NicoAction');
const NotificationAction = require('../../actions/NotificationAction');
const CommentAction = require('../../actions/CommentAction');
const SettingAction = require('../../actions/SettingAction');
const Appbar = require('material-ui/lib/app-bar');
const Colors = require('material-ui/lib/styles/colors');
const IconButton = require('material-ui/lib/icon-button');
const PlayIcon = require('material-ui/lib/svg-icons/av/airplay');
const SettingsIcon = require('material-ui/lib/svg-icons/action/settings');
const TextField = require('material-ui/lib/text-field');

const defaultIconButtonProps = { tooltipPosition: 'bottom-left' };
const connect = <PlayIcon color={Colors.white} hoverColor={Colors.cyanA100}/>;
const setting = <SettingsIcon  color={Colors.white} hoverColor={Colors.cyanA100}/>;
const icons = {connect, setting};

const tryConnect = (liveId) => {
  if (! isNaN(liveId)) { liveId = `lv${liveId}`; }
  if (liveId === '' || liveId === 'lv') {
    return NotificationAction.notify('生放送IDの書式ではありません');
  }
  CommentAction.resetAllComment();
  NicoAction.connect(liveId);
};

let Header = React.createClass({
  displayName: 'Header',

  getInitialState() {
    return {
      lv: ''
    };
  },

  changeLiveid(e) {
    this.setState({lv: e.target.value});
  },

  handleClick(type) {
    switch (type) {
    case 'connect':
      tryConnect(this.state.lv.trim());
      break;
    case 'setting':
      SettingAction.open();
      break;
    }
  },

  renderButton(label, type) {
    return (
      <IconButton {...defaultIconButtonProps}
        className={`${type}Button`}
        tooltip={label}
        onMouseDown={() => this.handleClick(type)}
      >{icons[type]}</IconButton>
    );
  },

  render() {
    const textFieldProps = {
      className: 'LiveIdForm',
      value: this.state.lv,
      onChange: this.changeLiveid,
      style: { margin: '0 2em' },
      inputStyle: { color: 'white' },
      hintStyle: { color: 'rgba(255,255,255,.5)' },
      hintText: '放送番号(lvXXXXXX)'
    };

    return (
      <div className='Header'>
        <Appbar style={{position: 'fixed', top: '0', left: '0', right: '0'}}
          iconElementLeft={<div />}
          title={
            <div>
              <span>comelon</span>
              <TextField {...textFieldProps} />
            </div>
          }
          iconElementRight={
            <div>
              {this.renderButton('接続', 'connect')}
              {this.renderButton('設定', 'setting')}
            </div>
          }
        />
      </div>
    );
  }

});

module.exports = Header;

// vim:ft=javascript.jsx
