'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Watch = (0, _main2.default)();
var _fun = Symbol('fun');
var _store = Symbol('store');
var LEVEL = 8;

var dataStore = {
    init: function init(store) {
        if (typeof store !== 'undefined') {
            if (!_utils2.default.isObject(store)) {
                throw new Error('Expected the store to be a plain object.');
            }
        } else {
            throw new Error('store is a necessary parameter');
        }
        this[_store] = store;
        this[_fun] = {};
    },
    addHandler: function addHandler(dataMap, fun, trigger, id) {
        var _this2 = this;

        var filtered = dataMap(this[_store]);
        var keys = Object.keys(filtered);
        var props = _utils2.default.getDataMapKey(dataMap);
        props.forEach(function (prop, i) {
            _this2._register(prop, keys[i], fun.bind(null, keys[i]), id, dataMap);
        });
        if (trigger) {
            fun.bind(null, null, filtered)();
        }
    },
    deleteHandler: function deleteHandler(dataMap, id) {
        var _this3 = this;

        var filtered = dataMap(this[_store]);
        var keys = Object.keys(filtered);
        var props = _utils2.default.getDataMapKey(dataMap);
        props.forEach(function (prop, i) {
            Watch.unwatch(_this3[_store], prop, _this3[_fun][id + '_' + keys[i]]);
            Watch.unwatch(_this3[_store][prop], _this3[_fun][id + '_' + keys[i]]);
        });
    },
    _register: function _register(name, key, watcher, id, dataMap) {
        var _this = this;
        var fun = function fun() {
            watcher(dataMap(_this[_store])[key]);
        };
        this[_fun][id + '_' + key] = fun;
        Watch.watch(this[_store], name, fun, LEVEL, true);
    }
};

var handler = {
    get: function get(target, name) {
        if (target[_store]) {
            return name in target[_store] ? target[_store][name] : target[name];
        } else {
            return target[name];
        }
    },
    set: function set(target, name, value) {
        if (target[_store] && name in target[_store]) {
            target[_store][name] = value;
        } else {
            target[name] = value;
        }
        return true;
    }
};

exports.default = new Proxy(dataStore, handler);
module.exports = exports['default'];