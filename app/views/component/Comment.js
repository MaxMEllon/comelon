'use strict';

const _ = require('lodash');
const React = require('react');
const CommentStore = require('../../stores/CommentStore');
const ElectronAction = require('../../actions/ElectronAction');
const ElectronStore = require('../../stores/ElectronStore');
const ImageLoader = require('react-imageloader');
const Card = require('material-ui/lib/card/card');
const CardHeader = require('material-ui/lib/card/card-header');
const CardText = require('material-ui/lib/card/card-text');
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
const Snipper = require('material-ui/lib/circular-progress');
const usericonURL = require('nicolive/lib/api.json').url.usericonURL;
const bgGreen = {backgroundColor: '#C8E6C9'};
const bgWhite = {backgroundColor: '#FFFFFF'};
const cardHeader = {wordWrap: 'break-word', height: '20px'};
const avater = {width: '48px', paddingLeft: '10px'};

let Comment = React.createClass({
  displayName: 'Comment',

  propTypes: {
    comments: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      height: '720px'
    }
  },

  componentWillMount() {
    ElectronAction.fetchWindowSize();
  },

  componentDidMount() {
    ElectronStore.addChangeListener(this.onResizeWindow);
  },

  componentDidUpdate() {
  },

  componentWillUnMount() {
    ElectronStore.removeChangeListener(this.onResizeWindow);
  },

  onResizeWindow() {
    let size = ElectronStore.getCurrentSize();
    this.setState({height: `${size.get('height') - 120}px`})
  },

  renderComments() {
    let components = [];
    _(this.props.comments).each(comment => {
      let userId = comment.getIn(['attr', 'user_id']);
      let userName = CommentStore.getNickname(userId);
      let userIcon = `${usericonURL}${parseInt(userId / 10000)}/${userId}.jpg`;
      let yourpost = comment.getIn(['attr', 'yourpost']);
      let backgroundColor = yourpost === '1' ? bgGreen : bgWhite;
      components.push(
        <TableRow className='CommentItemBody'
                  key={comment.getIn(['attr', 'no'])}
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
                          style={backgroundColor, cardHeader} />
              <CardText>
                {comment.get('text')}
              </CardText>
            </Card>
          </TableRowColumn>
        </TableRow>
      );
    });
    return components;
  },

  render() {
    return (
      <Table className='CommentTable'
             style={{backgroundColor: '#FFFFFF'}}
             ref='commentTable'
             height={this.state.height}
             selectable={false}
             multiSelectable={false}
             fixedHeader={true}
             fixedFooter={true} >
        <TableBody className='CommentTableBody'
                   displayRowCheckbox={false}
                   displaySelectAll={false}
                   adjustForCheckbox={false} >
          {this.renderComments()}
        </TableBody>
      </Table>
    );
  }
});

module.exports = Comment;

// vim:ft=javascript.jsx
