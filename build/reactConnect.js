'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (view, mapData, properties, onEnter) {
  return (0, _reactComposer2.default)(function (cb, id) {
    _store2.default.addHandler(mapData, function (name, data) {
      cb(name, data);
    }, true, id);
  }, function (id) {
    _store2.default.deleteHandler(mapData, id);
  }, properties, onEnter, mapData)(view);
};

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _reactComposer = require('./reactComposer');

var _reactComposer2 = _interopRequireDefault(_reactComposer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];