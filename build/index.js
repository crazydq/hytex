'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _reactConnect = require('./reactConnect');

var _reactConnect2 = _interopRequireDefault(_reactConnect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    store: _store2.default,
    reactConnect: _reactConnect2.default
};
module.exports = exports['default'];