'use strict';

import R from 'ramda';
import React from 'react';
import SettingStore from '../../stores/SettingStore';
import Comment from './Comment';
import {List, Paper} from 'material-ui';

const isNil = (obj) => obj != null;
const ifSystemComment = (comment) => R.test(/^(\/(.*)){1}/, comment.get('text'));
const No = (comment) => comment.getIn(['attr', 'no']);
const Id = (comment) => comment.getIn(['attr', 'id']);
const generateKey = (no, id) => {
  if (isNil(no) || isNil(id)) {
    return Math.random().toString(36).slice(-8);
  } else {
    return `${no}${id}`;
  }
};
const Key = (comment) => generateKey(No(comment), Id(comment));
const Size = (components) => R.length(components);

export default class CommentTable extends React.Component {
  static propTypes = {
    comments: React.PropTypes.array.isRequired
  }

  displayName: 'CommentTable'

  constructor(props) {
    super(props);
    this.state = {
      systemComment: false,
      doTalking: false
    };
  }

  componentDidMount() {
    SettingStore.addChangeListener(this.onChangeOption);
  }

  componentWillUnMount() {
    SettingStore.addChangeListener(this.onChangeOption);
  }

  onChangeOption = () => {
    this.setState({
      systemComment: SettingStore.getOption().systemComment,
      doTalking: SettingStore.getOption().doTalking
    });
  }

  renderComments() {
    const ToSkip = R.and(! this.state.systemComment);
    let components = [];
    const renderComment = c => {
      if (ToSkip(ifSystemComment(c))) return;
      components.push(<Comment key={Key(c)} index={Size(components)} comment={c} />);
    };
    R.forEach(renderComment, this.props.comments);
    return components;
  }

  render() {
    return (
      <List className='CommentTableComponent'
        style={{marginTop: '64px', marginBottom: '64px'}} >
        <Paper className='CommentTableBody'>
          {this.renderComments()}
        </Paper>
      </List>
    );
  }
}

// vim:ft=javascript.jsx
