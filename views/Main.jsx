'use babel';

const Immutable = require('immutable');
const User = require('../config/User');
const React = require('react');
const nicolive = require('nicolive');

let Main = React.createClass({
  displayName: 'Main',

  getInitialState() {
    return {
      comments: [],
      lv: ''
    }
  },

  componentWillMount() {
  },

  changeText(e) {
    this.setState({lv: e.target.value});
  },

  handleClick() {
    nicolive.login(User.email, User.password, (error,cookie) => {
      var live_id = this.state.lv;
      nicolive.view(live_id, (error, viewer) => {
        viewer.on('comment', comment => {
          let comments = this.state.comments;
          comments.push(Immutable.fromJS(comment));
          this.setState({comments: comments})
        });
      });
    });
  },

  render() {
    return (
      <div>
        <h1>test</h1>
        <input type="text" value={this.state.lv} onChange={this.changeText} />
        <button onClick={this.handleClick} />
        <ul>
          {(() => {
            let components = [];
            for (var i = 0; i < this.state.comments.length; i++) {
              var comment = this.state.comments[i];
              console.log(comment.get('usericon'));
              components.push(<li key={i}>{comment.get('text')}<img src={comment.get('usericon')} /></li>);
            }
            return components;
          })()}
        </ul>
      </div>
    );
  }
});

export default Main;
