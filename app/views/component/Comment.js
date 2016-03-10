'use strict';

const React = require('react');
const CommentStore = require('../../stores/CommentStore');
const ImageLoader = require('react-imageloader');
const Divider = require('material-ui/lib/divider');
const ListItem = require('material-ui/lib/lists/list-item');
const Snipper = require('material-ui/lib/circular-progress');
const usericonURL = require('nicolive/lib/api.json').url.usericonURL;

let Comment = React.createClass({
  displayName: 'Comment',

  propTypes: {
    comment: React.PropTypes.any,
    index: React.PropTypes.number
  },

  renderAvater(userIcon) {
    return (
      <ImageLoader style={{width: '36px', height: '36px'}}
                   preloader={() => { return <Snipper size={0.5}/> }}
                   imgProps={{width: '36px', height: '36px'}}
                   src={userIcon}>
        <img width='36px' height='36px' src='./assets/img/blank.jpg' />
      </ImageLoader>
    );
  },

  render() {
    let userId = this.props.comment.getIn(['attr', 'user_id']);
    let userName = CommentStore.getNickname(userId);
    let userIcon = userName === '184' ? './assets/img/blank.jpg'
                 : `${usericonURL}${parseInt(userId / 10000)}/${userId}.jpg`;
    userName = isNaN(userId) ? userId : userName;
    return (
      <div>
        <ListItem
          key={this.props.comment.getIn(['attr', 'no'])}
          value={this.props.index}
          leftAvatar={this.renderAvater(userIcon)}
          primaryText={userName}
          secondaryText={<p>{this.props.comment.get('text')}</p>}
        />
        <Divider />
      </div>
    );
  }

});

module.exports = Comment;

// vim:ft=javascript.jsx
