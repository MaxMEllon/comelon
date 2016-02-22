'use babel';

const React = require('react');
const NicoAction = require('../../actions/NicoAction');
const CommentAction = require('../../actions/CommentAction');
const IconButton = require('material-ui/lib/icon-button');
const PlayIcon = require('react-material-icons/icons/av/play-arrow');
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
    if (liveId === '' || liveId === 'lv') { return; }
    CommentAction.resetAllComment();
    NicoAction.connect(liveId);
  },

  render() {
    return (
      <div className='ConnectForm'>
        <TextField className='LiveIdForm'
                   value={this.state.lv}
                   style={{marginLeft: '10px'}}
                   hintText='放送番号(lv00000)'
                   onChange={this.changeLiveid} />
        <IconButton className='LiveIdForm'
                    style={{marginTop: '5px'}}
                    onMouseDown={this.handleConnect}>
          <PlayIcon />
        </IconButton>
      </div>
    );
  }
});

module.exports = Connect;

// vim:ft=javascript.jsx
