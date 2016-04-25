'use strict';

import React from 'react';
import R from 'ramda';

export default class AppComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const propsEqual = R.equals(nextProps, this.props);
    const stateEqual = R.equals(nextState, this.state);
    return R.not(propsEqual && stateEqual);
  }
}
