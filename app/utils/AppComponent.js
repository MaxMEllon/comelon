'use strict';

import React from 'react';
import isEqual from 'lodash.isequal';

export default class AppComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const isEqualProps = isEqual(this.props, nextProps);
    const isEqualState = isEqual(this.state, nextState);
    return !(isEqualProps && isEqualState);
  }
}
