'use babel';

const React = require('react');
const NicoAction = require('../../actions/NicoAction');
const CommentAction = require('../../actions/CommentAction');
const RaisedButton = require('material-ui/lib/raised-button');
const TextField = require('material-ui/lib/text-field');

let Connect = React.createClass({
  displayName: 'Connect',

  getInitialState() {
    return {
      lv: ''
    }
  },

  changeLiveid(e) {
    this.setState({lv: e.target.value});
  },

  handleConnect() {
    let liveId = this.state.lv.trim();
    if (! isNaN(liveId)) { liveId = `lv${liveId}`; }
    CommentAction.resetAllComment();
    NicoAction.connect(liveId);
  },

  render() {
    return (
      <div className='ConnectForm'>
        <TextField className='LiveIdForm'
                   value={this.state.lv}
                   hintText='放送番号(lv00000)'
                   onChange={this.changeLiveid} />
        <RaisedButton className='LiveConnectButton'
                      secondary={true}
                      label='接続'
                      onMouseDown={this.handleConnect} />
      </div>
    );
  }
});

module.exports = Connect;

// vim:ft=javascript.jsx
