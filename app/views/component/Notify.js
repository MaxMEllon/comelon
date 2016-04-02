'use strict';

import React from 'react';
import NotificationStore from '../../stores/NotificationStore';
import Snackbar from 'material-ui/lib/snackbar';

export default class Notify extends React.Component {
  displayName: 'Notify'

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: ''
    };
  }

  componentWillMount() {
    NotificationStore.addChangeListener(this.onNotify);
  }

  componentDidMount() {
  }

  componentWillUnMount() {
    NotificationStore.removeChangeListener(this.onNotify);
  }

  onNotify = () => {
    this.setState({
      message: NotificationStore.getMessage(),
      open: true
    });
  }

  handleRequestClose = () => {
    this.setState({open: false});
  }

  render() {
    return (
      <div className='Notify'>
        <Snackbar
          style={{bottom: '60px'}}
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }

}

export default Notify;

// vim:ft=javascript.jsx
