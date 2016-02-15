'use babel';

const debug = require('debug');
debug.enable('comelon:*');
module.exports = label => debug(`comelon:${label}`);
