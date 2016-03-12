#! /usr/bin/env node
'use strict';

const spawn = require('child_process').spawn;
const electron = require('electron-prebuilt');
const join = require('path').join;

let argv = [join(__dirname, '../main.js')];

spawn(electron, argv);
