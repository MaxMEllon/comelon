'use babel';

const _ = require('lodash');
const Immutable = require('immutable');
const User = require('../config/User');
const React = require('react');
const Nico = require('nicolive');
const debug = require('../utiles/Debug')('MainView');
const Comment = require('./component/Comment').default;

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

  componentWillUpdate(nextProps, nextState) {
    debug(`<~~~ update`);
  },

  changeText(e) {
    this.setState({lv: e.target.value});
  },

  handleClick() {
    Nico.login(User.email, User.password, (error, cookie) => {
      if (error) { debug(`X err : ${error}`); }
      let liveId = this.state.lv;
      Nico.view(liveId, (error, viewer) => {
        if (error) { debug(`X err : ${error}`); }
        viewer.on('comment', comment => {
          let comments = this.state.comments;
          debug(`debug : ${comment}`);
          console.log(comment);
          comments.push(Immutable.fromJS(comment));
          this.setState({comments: comments})
        });
      });
    });
  },

  renderComments() {
    let components = [];
    _(this.state.comments).each(comment => {
      let userId = comment.getIn(['attr', 'user_id']);
      let text = comment.get('text');
      let no = comment.getIn(['attr', 'no']);
      if (isNaN(userId)) {userId = '184'}
      components.push(
        <Comment key={no} no={no} text={text} userName={userId} />
      );
    });
    return components;
  },

  render() {
    debug('~~~> render');
    return (
      <div>
        <h1>test</h1>
        <input type="text" value={this.state.lv} onChange={this.changeText} />
        <button onClick={this.handleClick} />
        {this.renderComments()}
      </div>
    );
  }
});

export default Main;
