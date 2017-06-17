'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var acorn = require("acorn");

exports.default = {
    isFunction: function isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
    },

    isArray: function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },

    isObject: function isObject(obj) {
        return {}.toString.apply(obj) === '[object Object]';
    },

    getObjDiff: function getObjDiff(a, b) {
        var aplus = [],
            bplus = [];

        if (!(typeof a == "string") && !(typeof b == "string")) {

            if (this.isArray(a)) {
                for (var i = 0; i < a.length; i++) {
                    if (b[i] === undefined) aplus.push(i);
                }
            } else {
                for (var i in a) {
                    if (a.hasOwnProperty(i)) {
                        if (b[i] === undefined) {
                            aplus.push(i);
                        }
                    }
                }
            }

            if (this.isArray(b)) {
                for (var j = 0; j < b.length; j++) {
                    if (a[j] === undefined) bplus.push(j);
                }
            } else {
                for (var j in b) {
                    if (b.hasOwnProperty(j)) {
                        if (a[j] === undefined) {
                            bplus.push(j);
                        }
                    }
                }
            }
        }

        return {
            added: aplus,
            removed: bplus
        };
    },

    clone: function clone(obj) {

        if (null == obj || "object" != (typeof obj === 'undefined' ? 'undefined' : _typeof(obj))) {
            return obj;
        }

        var copy = obj.constructor();

        for (var attr in obj) {
            copy[attr] = obj[attr];
        }

        return copy;
    },

    _getNodeName: function _getNodeName(item) {
        var node = item.value;
        var name = '';
        while (node.object) {
            if (node.property && node.property.name) {
                name = node.property.name;
            }
            node = node.object;
        }
        return name;
    },

    getDataMapKey: function getDataMapKey(dataMap) {
        var _this = this;

        var funStr = dataMap.toString().replace(/function\s+/, 'function F');
        var block = acorn.parse(funStr).body[0].body;
        var res = [];
        if (block.type === 'BlockStatement' && block.body && block.body.length > 0) {
            var returnState = block.body[block.body.length - 1];
            if (returnState.type === 'ReturnStatement' && returnState.argument.properties && returnState.argument.properties.length > 0) {
                var props = returnState.argument.properties;
                res = props.map(function (item) {
                    return _this._getNodeName(item);
                });
            }
        }
        return res;
    }
};
module.exports = exports['default'];