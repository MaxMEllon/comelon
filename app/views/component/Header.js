'use strict';

const React = require('react');
const Toolbar = require('material-ui/lib/toolbar/toolbar');
const ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
const IconButton = require('material-ui/lib/icon-button');
const SettingsIcon = require('react-material-icons/icons/action/settings');
const Connect = require('./Connect');

let Header = React.createClass({
  displayName: 'Header',

  renderOptionButton() {
    return (
      <IconButton style={{marginTop: '5px'}}>
        <SettingsIcon />
      </IconButton>
    );
  },

  render() {
    return (
      <div className='Header'>
        <Toolbar style={{padding: '0px 5px 0px 24px'}}>
          <ToolbarGroup firstChild={true} float='left'>
            <Connect />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            {this.renderOptionButton()}
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }

});

module.exports = Header;

// vim:ft=javascript.jsx
