'use strict';

import React from 'react';
import AppComponent from '../../utils/AppComponent';
import CommentStore from '../../stores/CommentStore';
import ImageLoader from 'react-imageloader';
import Divider from 'material-ui/lib/divider';
import ListItem from 'material-ui/lib/lists/list-item';
import Snipper from 'material-ui/lib/circular-progress';
import {url} from 'nicolive/lib/api.json';
const {usericonURL} = url;

export default class Comment extends AppComponent {
  static get propTypes() {
    return {
      comment: React.PropTypes.any.isRequired,
      index: React.PropTypes.number.isRequired
    };
  }

  static get displayName() {
    return 'Comment';
  }

  constructor(props) {
    super(props);
    this.state = {
      nowTalking: false,
    };
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
