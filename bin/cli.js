#! /usr/bin/env node
'use strict';

const spawn = require('child_process').spawn;
const electron = require('electron-prebuilt');
const join = require('path').join;
const existsSync = require('fs').existsSync;

let argv = [join(__dirname, '..')];

spawn(electron, argv);
