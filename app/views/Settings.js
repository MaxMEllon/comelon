'use strict';

import R from 'ramda';
import React from 'react';
import Immutable from 'immutable';
import AppComponent from '../utils/AppComponent';
import SettingAction from '../actions/SettingAction';
import SettingStore from '../stores/SettingStore';

import {
  Divider,
  Dialog,
  FlatButton,
  Toggle
} from 'material-ui';

export default class Settings extends AppComponent {
  static get displayName() {
    return 'Settings';
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      option: Immutable.fromJS({
        systemComment: false,
        doTalking: false
      })
    };
  }

  componentWillMount() {
    SettingStore.addChangeListener(this.onChangeState);
  }

  componentWillUnMount() {
    SettingStore.removeChangeListener(this.onChangeState);
  }

  onChangeState = () => {
    this.setState({
      open: SettingStore.isOpen(),
      option: Immutable.fromJS(SettingStore.getOption())
    });
  }

  handleClose = () => {
    this.setState({open: false});
    SettingAction.close();
  }

  handleToggle = (method, type) => {
    this.state.option[type] = R.not(this.state.option.get(type));
    SettingAction[method](this.state.option[type]);
  }

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

}

// vim:ft=javascript.jsx
