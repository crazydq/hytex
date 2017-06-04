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
        var filtered = dataMap(this[_store]);
        for (var key in filtered) {
            if (filtered.hasOwnProperty(key)) {
                var name = _utils2.default.getKeyByValue(this[_store], filtered[key]);
                if (name) {
                    if (trigger) {
                        fun.bind(null, key, filtered[key])();
                    }
                    this._register(name, fun.bind(null, key), id);
                }
            }
        }
    },
    deleteHandler: function deleteHandler(dataMap, id) {
        var filtered = dataMap(this[_store]);
        for (var key in filtered) {
            if (filtered.hasOwnProperty(key)) {
                var name = _utils2.default.getKeyByValue(this[_store], filtered[key]);
                if (name) {
                    Watch.unwatch(this[_store], name, this[_fun][id + '_' + name]);
                    Watch.unwatch(this[_store][name], this[_fun][id + '_' + name]);
                }
            }
        }
    },
    _register: function _register(name, watcher, id) {
        var _this = this;
        var fun = function fun() {
            watcher(_this[_store][name]);
        };
        this[_fun][id + '_' + name] = fun;
        Watch.watch(this[_store], name, fun, 8, true);
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