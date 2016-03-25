'use strict';

const OpenJTalk = require('openjtalk');

module.exports = new OpenJTalk({
  alpha           : 0.5,
  beta            : 0.8,
  uv_threshold    : 0.5,
  gv_weight_mgc   : 0.5,
  gv_weight_lf0   : 0.5
});