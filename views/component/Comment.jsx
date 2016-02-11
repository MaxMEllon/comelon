'use babel';

const React = require('react');

let Comment = React.createClass({
  displayName: 'Comment',

  propTypes: {
    text: React.PropTypes.string.isRequired,
    imgUrl: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div>
        <img src={this.props.imgUrl} />
        <p>{this.props.text}</p>
      </div>
    );
  }
});

export default Comment;
