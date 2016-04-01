'use strict';

import React from 'react';
import CommentStore from '../../stores/CommentStore';
import SettingStore from '../../stores/SettingStore';
import TalkAction from '../../actions/TalkAction';
import TalkStore from '../../stores/TalkStore';
import ImageLoader from 'react-imageloader';
import Divider from 'material-ui/lib/divider';
import ListItem from 'material-ui/lib/lists/list-item';
import Snipper from 'material-ui/lib/circular-progress';
import {url} from 'nicolive/lib/api.json';
const {usericonURL} = url;

export default class Comment extends React.Component {
  static propTypes = {
    comment: React.PropTypes.any.isRequired,
    index: React.PropTypes.number.isRequired
  }

  displayName: 'Comment'

  constructor(props) {
    super(props);
    this.state = {
      nowTalking: false,
    };
  }

  componentWillMount() {
    TalkStore.addChangeListener(this.onNowTalking);
  }

  componentDidMount() {
    if (SettingStore.getOption().doTalking) {
      TalkAction.talk(this.props.comment.get('text'));
    }
  }

  componentWillUnMount() {
    TalkStore.removeChangeListener(this.onNowTalking);
  }

  onNowTalking = () => {
    this.setState({nowTalking: TalkStore.isTalkingNow()});
  }

  renderAvater(userIcon) {
    return (
      <ImageLoader
        style={{width: '36px', height: '36px'}}
        preloader={() => <Snipper size={0.5}/> }
        imgProps={{width: '36px', height: '36px'}}
        src={userIcon}
      ><img width='36px' height='36px' src='./assets/img/blank.jpg' />
      </ImageLoader>
    );
  }

  render() {
    let userId = this.props.comment.getIn(['attr', 'user_id']);
    let userName = CommentStore.getNickname(userId);
    let userIcon = userName === '184' ? './assets/img/blank.jpg'
                 : `${usericonURL}${parseInt(userId / 10000)}/${userId}.jpg`;
    userName = isNaN(userId) ? userId : userName;
    return (
      <div className='CommentComponent'>
        <ListItem
          key={`${this.props.comment.getIn(['attr', 'no'])}${userId}`}
          value={this.props.index}
          leftAvatar={this.renderAvater(userIcon)}
          secondaryText={<p>{userName}</p>}
          primaryText={this.props.comment.get('text')}
        />
        <Divider />
      </div>
    );
  }

}

// vim:ft=javascript.jsx
