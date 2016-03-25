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
const play = <PlayIcon color={Colors.white} hoverColor={Colors.cyanA100}/>;
const setting = <SettingsIcon  color={Colors.white} hoverColor={Colors.cyanA100}/>;

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

  handleConnect() {
    let liveId = this.state.lv.trim();
    if (! isNaN(liveId)) { liveId = `lv${liveId}`; }
    if (liveId === '' || liveId === 'lv') {
      NotificationAction.notify('生放送IDの書式ではありません');
      return;
    }
    CommentAction.resetAllComment();
    NicoAction.connect(liveId);
  },

  handleConfig() {
    SettingAction.open();
  },

  renderConnectButton() {
    return (
      <IconButton {...defaultIconButtonProps}
        className='NicoLiveConnectButton'
        tooltip='接続'
        onMouseDown={this.handleConnect}
      >{play}</IconButton>
    );
  },

  renderSettingButton() {
    return (
      <IconButton {...defaultIconButtonProps}
        className='AppSettingsButton'
        tooltip='設定'
        onMouseDown={this.handleConfig}
      >{setting}</IconButton>
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
              {this.renderConnectButton()}
              {this.renderSettingButton()}
            </div>
          }
        />
      </div>
    );
  }

});

module.exports = Header;

// vim:ft=javascript.jsx
