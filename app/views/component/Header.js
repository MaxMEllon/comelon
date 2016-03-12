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

  render() {
    return (
      <div className='Header'>
        <Appbar
          style={{position: 'fixed', top: '0', left: '0', right: '0'}}
          iconElementLeft={<div />}
          title={
            <div>
              <span>comelon</span>
              <TextField
                className='LiveIdForm'
                value={this.state.lv}
                onChange={this.changeLiveid}
                style={{margin: '0 2em'}}
                hintStyle={{color: 'rgba(255,255,255,.5)'}}
                hintText='放送番号(lv00000)'
                inputStyle={{color: 'white'}}
              />
            </div>
          }
          iconElementRight={
            <div>
              <IconButton
                className='NicoLiveConnectButton'
                tooltip='接続'
                tooltipPosition='bottom-left'
                onMouseDown={this.handleConnect}
              ><PlayIcon color={Colors.white} hoverColor={Colors.cyanA100}/></IconButton>
              <IconButton
                className='AppSettingsButton'
                tooltip='設定'
                tooltipPosition='bottom-left'
                onMouseDown={this.handleConfig}
              ><SettingsIcon  color={Colors.white} hoverColor={Colors.cyanA100}/></IconButton>
            </div>
          }
        />
      </div>
    );
  }

});

module.exports = Header;

// vim:ft=javascript.jsx
