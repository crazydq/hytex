'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
    },
    observe: function observe(obj, prop, watcher) {
        if (typeof prop === 'function') {
            watcher = prop;
        }
        var fun = function fun(prop, action, newval, oldval) {
            if (action === 'differentattr') {
                var _obj = this[prop];
                delete _obj.set;
                delete _obj.get;
                delete _obj.watchers;
                watcher(oldval, _obj);
            }
            if (action === 'set') {
                watcher(oldval, newval, prop);
            } else if (action === 'push' || action === 'unshift' || action === 'shift' || action === 'pop' || action === 'splice' || action === 'sort' || action === 'reverse') {
                var arr = this.map(function (elm) {
                    var newVal = _extends({}, elm);
                    delete newVal.set;
                    delete newVal.get;
                    delete newVal.watchers;
                    return newVal;
                });
                if (oldval && !_utils2.default.isArray(oldval)) {
                    delete oldval.set;
                    delete oldval.get;
                    delete oldval.watchers;
                } else if (oldval && _utils2.default.isArray(oldval)) {
                    oldval = oldval.map(function (elm) {
                        var newVal = _extends({}, elm);
                        delete newVal.set;
                        delete newVal.get;
                        delete newVal.watchers;
                        return newVal;
                    });
                }
                var old = arr.concat([]);
                if (action === 'push') {
                    old.pop();
                } else if (action === 'unshift') {
                    old.shift();
                } else if (action === 'pop') {
                    old.push(oldval);
                } else if (action === 'shift') {
                    old.unshift(oldval);
                } else if (action === 'splice') {
                    old.splice.apply(old, [prop, newval.length].concat(_toConsumableArray(oldval)));
                }
                watcher(old, arr);
            }
        };
        if (typeof prop === 'function') {
            Watch.watch(this[_store], fun, LEVEL, true);
        } else {
            Watch.watch(this[_store], prop, fun, LEVEL, true);
        }
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