'use strict';

const React = require('react');
const CommentStore = require('../../stores/CommentStore');
const ImageLoader = require('react-imageloader');
const Card = require('material-ui/lib/card/card');
const CardHeader = require('material-ui/lib/card/card-header');
const CardText = require('material-ui/lib/card/card-text');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
const Snipper = require('material-ui/lib/circular-progress');
const usericonURL = require('nicolive/lib/api.json').url.usericonURL;
const cardHeader = {wordWrap: 'break-word', height: '20px'};
const avater = {width: '48px', paddingLeft: '10px'};

let Comment = React.createClass({
  displayName: 'Comment',

  propTypes: {
    comment: React.PropTypes.any
  },

  render() {
    let userId = this.props.comment.getIn(['attr', 'user_id']);
    let userName = CommentStore.getNickname(userId);
    let userIcon = `${usericonURL}${parseInt(userId / 10000)}/${userId}.jpg`;
    return (
      <TableRow className='CommentItemBody'
                key={this.props.comment.getIn(['attr', 'no'])}
                selectable={false} >
        <TableRowColumn style={avater}>
          <ImageLoader style={{width: '78px', height: '78px'}}
                       preloader={() => { return <Snipper/> }}
                       imgProps={{width: '78px', height: '78px'}}
                       src={userIcon}>
            <img width='78px' height='78px' src='./assets/img/blank.jpg' />
          </ImageLoader>
        </TableRowColumn>
        <TableRowColumn>
          <Card>
            <CardHeader title={userName}
                        style={cardHeader} />
            <CardText>
              {this.props.comment.get('text')}
            </CardText>
          </Card>
        </TableRowColumn>
      </TableRow>
    );
  }

});

module.exports = Comment;

// vim:ft=javascript.jsx
