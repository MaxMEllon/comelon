'use strict';

import React from 'react';
import NicoAction from '../../actions/NicoAction';

import {
  Dialog,
  FlatButton,
  TextField,
  FontIcon
} from 'material-ui';

const iconStyles = {
  marginRight: 24,
};

export default class Login extends React.Component {
  static propTypes = {
    open: React.PropTypes.bool.isRequired
  }

  displayName: 'Login'

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      open: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open});
  }

  handleClose = () => {
    this.setState({open: false});
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    NicoAction.login(user);
  }

  changeEmail = (e) => {
    this.setState({email: e.target.value});
  }

  changePassword = (e) => {
    this.setState({password: e.target.value});
  }

  render() {
    const actions = [
      <FlatButton label='ログイン'
                  primary={true}
                  onMouseDown={this.handleClose} />
    ];

    return (
      <div className='LoginComponent'>
        <Dialog className='LoginModal'
                title='ログインフォーム'
                open={this.state.open}
                actions={actions}
                modal={false}
                onRequestClose={this.handleClose} >
          <FontIcon className='muidocs-icon-action-face'
                    style={iconStyles} />
          <TextField className='EmailForm'
                     style={{width: '90%'}}
                     value={this.state.email}
                     hintText='メールアドレス'
                     onChange={this.changeEmail} />
          <br />
          <FontIcon className='muidocs-icon-action-lock'
                    style={iconStyles} />
          <TextField className='PasswordForm'
                     style={{width: '90%'}}
                     value={this.state.password}
                     type='password'
                     hintText='パスワード'
                     onChange={this.changePassword} />
        </Dialog>
      </div>
    );
  }
}

// vim:ft=javascript.jsx
