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

    getKeyByValue: function(obj, value) {
        for(let prop in obj) {
            if(obj.hasOwnProperty(prop)) {
                if(obj[prop] === value)
                    return prop;
            }
        }
    }
}