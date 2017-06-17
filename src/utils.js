const acorn = require("acorn");

export default {
    isFunction: function (functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
    },

    isArray: function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },

    isObject: function (obj) {
        return {}.toString.apply(obj) === '[object Object]';
    },

    getObjDiff: function (a, b) {
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
        }
    },

    clone: function (obj) {

        if (null == obj || "object" != typeof obj) {
            return obj;
        }

        var copy = obj.constructor();

        for (var attr in obj) {
            copy[attr] = obj[attr];
        }

        return copy;
    },

    _getNodeName: function (item) {
        let node = item.value;
        let name = '';
        while (node.object) {
            if (node.property && node.property.name) {
                name = node.property.name;
            }
            node = node.object;
        }
        return name;
    },

    getDataMapKey: function (dataMap) {
        const block =  acorn.parse(dataMap).body[0].body;
        let res = [];
        if (block.type === 'BlockStatement' && block.body && block.body.length > 0) {
            const returnState = block.body[block.body.length - 1];
            if (returnState.type === 'ReturnStatement' && returnState.argument
                    .properties && returnState.argument
                    .properties.length > 0) {
                const props = returnState.argument.properties;
                res = props.map((item)=>{
                    return this._getNodeName(item);
                });

            }
        }
        return res;
    }
}