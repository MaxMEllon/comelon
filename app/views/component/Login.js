'use strict';

import React from 'react';
import NicoAction from '../../actions/NicoAction';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import FontIcon from 'material-ui/lib/font-icon';

const iconStyles = {
  marginRight: 24,
};

let Login = React.createClass({
  displayName: 'Login',

  propTypes: {
    open: React.PropTypes.bool.isRequired
  },

  getInitialState() {
    return {
      email: '',
      password: '',
      open: false
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open});
  },

  handleClose() {
    this.setState({open: false});
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    NicoAction.login(user);
  },

  changeEmail(e) {
    this.setState({email: e.target.value});
  },

  changePassword(e) {
    this.setState({password: e.target.value});
  },

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
});

export default Login;

// vim:ft=javascript.jsx
