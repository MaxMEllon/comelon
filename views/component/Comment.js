'use babel';

const React = require('react');

let Comment = React.createClass({
  displayName: 'Comment',

  propTypes: {
    text: React.PropTypes.string.isRequired,
    no: React.PropTypes.string.isRequired,
    userName: React.PropTypes.string.isRequired,
  },

  render() {
     return (
      <div className='commentComponent'>
        <div className='No'>
          {this.props.no}
        </div>
        <div className='userName'>
          {this.props.userName}
        </div>
        <div className='comment'>
          {this.props.text}
        </div>
      </div>
    );
  }
});

export default Comment;

// vim:ft=javascript.jsx
