'use strict';

const debug = require('debug');
debug.enable('hiyakake:*');
module.exports = label => debug(`hiyakake:${label}`);
