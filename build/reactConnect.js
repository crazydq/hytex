'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (view, mapData, properties, onEnter) {

  if (typeof view !== 'undefined') {
    if (typeof view !== 'function') {
      throw new Error('Expected the view to be a React Class or Function.');
    }
  } else {
    throw new Error('view is a necessary parameter');
  }

  if (typeof mapData !== 'undefined') {
    if (typeof mapData !== 'function') {
      throw new Error('Expected the mapData to be a function.');
    }
  } else {
    throw new Error('mapData is a necessary parameter');
  }

  if (typeof properties !== 'undefined') {
    if (!_utils2.default.isObject(properties)) {
      throw new Error('Expected the properties to be a plain object.');
    }
  }

  if (typeof onEnter !== 'undefined') {
    if (typeof onEnter !== 'function') {
      throw new Error('Expected the onEnter to be a function.');
    }
  }

  return (0, _reactComposer2.default)(function (cb, id) {
    _store2.default.addHandler(mapData, function (name, data) {
      cb(name, data);
    }, id);
  }, function (id) {
    _store2.default.deleteHandler(mapData, id);
  }, properties, onEnter, mapData)(view);
};

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _reactComposer = require('./reactComposer');

var _reactComposer2 = _interopRequireDefault(_reactComposer);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];