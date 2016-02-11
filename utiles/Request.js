'use strict';

const _ = require('lodash');
const debug = require('./Debug')('Request');
const request = require('superagent');

module.exports = (method, url, body) => {
  method = method.toLowerCase();
  method = method === 'delete' ? 'del' : method;
  return new Promise((resolve, reject) => {
    let req = request[method](url).accept('application/json');
    _.each(body, (key, val) => {
      req = req.field(key, val);
    });
    req.end((reason, res) => {
      let statusCode = _.result(res, 'status') || _.result(reason, 'status');
      debug(`<--- ${statusCode}:${url}`);
      reason ? reject(_.extend(reason, {statusCode})) : resolve(res);
    });
  });
};
