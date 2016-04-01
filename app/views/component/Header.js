'use strict';

import React from 'react';
import NicoAction from '../../actions/NicoAction';
import NotificationAction from '../../actions/NotificationAction';
import CommentAction from '../../actions/CommentAction';
import SettingAction from '../../actions/SettingAction';

import Colors from 'material-ui/lib/styles/colors';
import PlayIcon from 'material-ui/lib/svg-icons/av/airplay';
import SettingsIcon from 'material-ui/lib/svg-icons/action/settings';
import {
  Appbar,
  IconButton,
  TextField
} from 'material-ui';

const defaultIconButtonProps = {tooltipPosition: 'bottom-left'};
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

export default class Header extends React.Component {
  displayName: 'Header'

  constructor(props) {
    super(props);
    this.state = {
      lv: ''
    };
  }

  changeLiveid = (e) => {
    this.setState({lv: e.target.value});
  }

  handleClick = (type) => {
    switch (type) {
    case 'connect':
      tryConnect(this.state.lv.trim());
      break;
    case 'setting':
      SettingAction.open();
      break;
    }
  }

  renderButton(label, type) {
    return (
      <IconButton {...defaultIconButtonProps}
        className={`${type}Button`}
        tooltip={label}
        onMouseDown={() => this.handleClick(type)}
      >{icons[type]}</IconButton>
    );
  }

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

}

// vim:ft=javascript.jsx
