import utils from './utils';

export default function main() {

    var WatchJS = {},
        lengthsubjects = [];

    var pendingChanges = []; // used coalesce changes from defineProperty and __defineSetter__

    var supportDefineProperty = false;
    try {
        supportDefineProperty = Object.defineProperty && Object.defineProperty({}, 'x', {});
    } catch (ex) {

    }

    var defineGetAndSet = function (obj, propName, getter, setter) {
        try {
            Object.observe(obj, function (changes) {
                changes.forEach(function (change) {
                    if (change.name === propName) {
                        setter(change.object[change.name]);
                    }
                });
            });
        }
        catch (e) {
            Object.defineProperty(obj, propName, {
                get: getter,
                set: function (value) {
                    setter.call(this, value, true); // coalesce changes
                },
                enumerable: true,
                configurable: true
            });
        }
    };

    var defineProp = function (obj, propName, value) {
        try {
            Object.defineProperty(obj, propName, {
                enumerable: false,
                configurable: true,
                writable: false,
                value: value
            });
        } catch (error) {
            obj[propName] = value;
        }
    };

    var watch = function () {
        if (utils.isFunction(arguments[1])) {
            watchAll.apply(this, arguments);
        } else if (utils.isArray(arguments[1])) {
            watchMany.apply(this, arguments);
        } else {
            watchOne.apply(this, arguments);
        }
    };

    var watchAll = function (obj, watcher, level, addNRemove) {

        if ((typeof obj == "string") || (!utils.isObject(obj) && !utils.isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        if (utils.isArray(obj)) {
            defineWatcher(obj, "__watchall__", watcher, level); // watch all changes on the array
            if (level === undefined || level > 0) {
                for (var prop = 0; prop < obj.length; prop++) { // watch objects in array
                    watchAll(obj[prop], watcher, level, addNRemove);
                }
            }
        }
        else {
            var prop, props = [];
            for (prop in obj) { //for each attribute if obj is an object
                if (prop == "$val" || (!supportDefineProperty && prop === 'watchers')) {
                    continue;
                }

                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    props.push(prop); //put in the props
                }
            }
            watchMany(obj, props, watcher, level, addNRemove); //watch all items of the props
        }


        if (addNRemove) {
            pushToLengthSubjects(obj, "$$watchlengthsubjectroot", watcher, level);
        }
    };

    var watchMany = function (obj, props, watcher, level, addNRemove) {

        if ((typeof obj == "string") || (!utils.isObject(obj) && !utils.isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        for (var i = 0; i < props.length; i++) { //watch each property
            var prop = props[i];
            watchOne(obj, prop, watcher, level, addNRemove);
        }

    };

    var watchOne = function (obj, prop, watcher, level, addNRemove) {
        if ((typeof obj == "string") || (!utils.isObject(obj) && !utils.isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        if (utils.isFunction(obj[prop])) { //dont watch if it is a function
            return;
        }
        if (obj[prop] != null && (level === undefined || level > 0)) {
            watchAll(obj[prop], watcher, level !== undefined ? level - 1 : level); //recursively watch all attributes of this
        }

        defineWatcher(obj, prop, watcher, level);

        if (addNRemove && (level === undefined || level > 0)) {
            pushToLengthSubjects(obj, prop, watcher, level);
        }

    };

    var unwatch = function () {

        if (utils.isFunction(arguments[1])) {
            unwatchAll.apply(this, arguments);
        } else if (utils.isArray(arguments[1])) {
            unwatchMany.apply(this, arguments);
        } else {
            unwatchOne.apply(this, arguments);
        }

    };

    var unwatchAll = function (obj, watcher) {
        if (obj instanceof String || (!utils.isObject(obj) && !utils.isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        if (utils.isArray(obj)) {
            var props = ['__watchall__'];
            for (var prop = 0; prop < obj.length; prop++) { //for each item if obj is an array
                props.push(prop); //put in the props
            }
            unwatchMany(obj, props, watcher); //watch all itens of the props
        } else {
            var unwatchPropsInObject = function (obj2) {
                var props = [];
                for (var prop2 in obj2) { //for each attribute if obj is an object
                    if (obj2.hasOwnProperty(prop2)) {
                        if (utils.isObject(obj2[prop2])) {
                            unwatchPropsInObject(obj2[prop2]); //recurs into object props
                        } else {
                            props.push(prop2); //put in the props
                        }
                    }
                }
                unwatchMany(obj2, props, watcher); //unwatch all of the props
            };
            unwatchPropsInObject(obj);
        }
    };

    var unwatchMany = function (obj, props, watcher) {

        for (var prop2 in props) { //watch each attribute of "props" if is an object
            if (props.hasOwnProperty(prop2)) {
                unwatchOne(obj, props[prop2], watcher);
            }
        }
    };

    var defineWatcher = function (obj, prop, watcher, level) {
        var newWatcher = false;
        var isArr = utils.isArray(obj);

        if (!obj.watchers) {
            defineProp(obj, "watchers", {});
            if (isArr) {
                // watch array functions
                watchFunctions(obj, function (index, action, newValue, oldValue) {
                    addPendingChange(obj, index, action, newValue, oldValue);
                    if (level !== 0 && newValue && (utils.isObject(newValue) || utils.isArray(newValue))) {
                        var i, n, ln, wAll, watchList = obj.watchers[prop];
                        if ((wAll = obj.watchers['__watchall__'])) {
                            watchList = watchList ? watchList.concat(wAll) : wAll;
                        }
                        ln = watchList ? watchList.length : 0;
                        for (i = 0; i < ln; i++) {
                            if (action !== 'splice') {
                                watchAll(newValue, watchList[i], (level === undefined) ? level : level - 1);
                            }
                            else {
                                // watch spliced values
                                for (n = 0; n < newValue.length; n++) {
                                    watchAll(newValue[n], watchList[i], (level === undefined) ? level : level - 1);
                                }
                            }
                        }
                    }
                });
            }
        }

        if (!obj.watchers[prop]) {
            obj.watchers[prop] = [];
            if (!isArr) newWatcher = true;
        }

        for (var i = 0; i < obj.watchers[prop].length; i++) {
            if (obj.watchers[prop][i] === watcher) {
                return;
            }
        }

        obj.watchers[prop].push(watcher); //add the new watcher to the watchers array

        if (newWatcher) {
            var val = obj[prop];
            var getter = function () {
                return val;
            };

            var setter = function (newval, delayWatcher) {
                var oldval = val;
                val = newval;
                if (level !== 0
                    && obj[prop] && (utils.isObject(obj[prop]) || utils.isArray(obj[prop]))
                    && !obj[prop].watchers) {
                    // watch sub properties
                    var i, ln = obj.watchers[prop].length;
                    for (i = 0; i < ln; i++) {
                        watchAll(obj[prop], obj.watchers[prop][i], (level === undefined) ? level : level - 1);
                    }
                }

                //watchFunctions(obj, prop);

                //if (JSON.stringify(oldval) !== JSON.stringify(newval)) {
                if (oldval !== newval) {
                    if (!delayWatcher) {
                        callWatchers(obj, prop, "set", newval, oldval);
                    }
                    else {
                        addPendingChange(obj, prop, "set", newval, oldval);
                    }
                    WatchJS.noMore = false;
                }
            };

            defineGetAndSet(obj, prop, getter, setter);
        }

    };

    var callWatchers = function (obj, prop, action, newval, oldval) {
        if (prop !== undefined) {
            var ln, wl, watchList = obj.watchers[prop];
            if ((wl = obj.watchers['__watchall__'])) {
                watchList = watchList ? watchList.concat(wl) : wl;
            }
            ln = watchList ? watchList.length : 0;
            for (var wr = 0; wr < ln; wr++) {
                watchList[wr].call(obj, prop, action, newval, oldval);
            }
        } else {
            for (var prop in obj) {//call all
                if (obj.hasOwnProperty(prop)) {
                    callWatchers(obj, prop, action, newval, oldval);
                }
            }
        }
    };

    var methodNames = ['pop', 'push', 'reverse', 'shift', 'sort', 'slice', 'unshift', 'splice'];

    var defineArrayMethodWatcher = function (obj, original, methodName, callback) {
        defineProp(obj, methodName, function () {
            var index = 0;
            var i, newValue, oldValue, response;
            // get values before splicing array
            if (methodName === 'splice') {
                var start = arguments[0];
                var end = start + arguments[1];
                oldValue = obj.slice(start, end);
                newValue = [];
                for (i = 2; i < arguments.length; i++) {
                    newValue[i - 2] = arguments[i];
                }
                index = start;
            }
            else {
                newValue = arguments.length > 0 ? arguments[0] : undefined;
            }

            response = original.apply(obj, arguments);
            if (methodName !== 'slice') {
                if (methodName === 'pop') {
                    oldValue = response;
                    index = obj.length;
                }
                else if (methodName === 'push') {
                    index = obj.length - 1;
                }
                else if (methodName === 'shift') {
                    oldValue = response;
                }
                else if (methodName !== 'unshift' && newValue === undefined) {
                    newValue = response;
                }
                callback.call(obj, index, methodName, newValue, oldValue)
            }
            return response;
        });
    };

    var watchFunctions = function (obj, callback) {

        if (!utils.isFunction(callback) || !obj || (obj instanceof String) || (!utils.isArray(obj))) {
            return;
        }

        for (var i = methodNames.length, methodName; i--;) {
            methodName = methodNames[i];
            defineArrayMethodWatcher(obj, obj[methodName], methodName, callback);
        }

    };

    var unwatchOne = function (obj, prop, watcher) {
        if (prop) {
            if (obj.watchers && obj.watchers[prop]) {
                if (watcher === undefined) {
                    delete obj.watchers[prop]; // remove all property watchers
                }
                else {
                    for (var i = 0; i < obj.watchers[prop].length; i++) {
                        var w = obj.watchers[prop][i];
                        if (w == watcher) {
                            obj.watchers[prop].splice(i, 1);
                        }
                    }
                }
            }
        }
        else {
            delete obj.watchers;
        }
        removeFromLengthSubjects(obj, prop, watcher);
    };

    var pendingTimerID = null;
    var addPendingChange = function (obj, prop, mode, newval, oldval) {
        pendingChanges[pendingChanges.length] = {
            obj: obj,
            prop: prop,
            mode: mode,
            newval: newval,
            oldval: oldval
        };
        if (pendingTimerID === null) {
            pendingTimerID = setTimeout(applyPendingChanges);
        }
    };

    var applyPendingChanges = function () {
        // apply pending changes
        var change = null;
        pendingTimerID = null;
        for (var i = 0; i < pendingChanges.length; i++) {
            change = pendingChanges[i];
            callWatchers(change.obj, change.prop, change.mode, change.newval, change.oldval);
        }
        if (change) {
            pendingChanges = [];
            change = null;
        }
    };

    var loop = function () {
        // check for new or deleted props
        for (var i = 0; i < lengthsubjects.length; i++) {
            var subj = lengthsubjects[i];
            if (utils.isObject(subj.actual)) {
                if (subj.prop === "$$watchlengthsubjectroot") {

                    var difference = utils.getObjDiff(subj.obj, subj.actual);

                    if (difference.added.length || difference.removed.length) {
                        if (difference.added.length) {
                            watchMany(subj.obj, difference.added, subj.watcher, subj.level - 1, true);
                        }

                        subj.watcher.call(subj.obj, "root", "differentattr", difference, subj.actual);
                    }
                    subj.actual = utils.clone(subj.obj);

                } else {
                    var difference = utils.getObjDiff(subj.obj[subj.prop], subj.actual);

                    if (difference.added.length || difference.removed.length) {
                        if (difference.added.length) {
                            for (var j = 0; j < subj.obj.watchers[subj.prop].length; j++) {
                                watchMany(subj.obj[subj.prop], difference.added, subj.obj.watchers[subj.prop][j], subj.level - 1, true);
                            }
                        }

                        callWatchers(subj.obj, subj.prop, "differentattr", difference, subj.actual);
                    }
                    subj.actual = utils.clone(subj.obj[subj.prop]);

                }
            }
        }
    };

    var pushToLengthSubjects = function (obj, prop, watcher, level) {

        var actual;

        if (prop === "$$watchlengthsubjectroot") {
            actual = utils.clone(obj);
        } else {
            actual = utils.clone(obj[prop]);
        }

        lengthsubjects.push({
            obj: obj,
            prop: prop,
            actual: actual,
            watcher: watcher,
            level: level
        });
    };

    var removeFromLengthSubjects = function (obj, prop, watcher) {
        for (var i = 0; i < lengthsubjects.length; i++) {
            var subj = lengthsubjects[i];

            if (subj.obj == obj) {
                if (!prop || subj.prop == prop) {
                    if (!watcher || subj.watcher == watcher) {
                        // if we splice off one item at position i
                        // we need to decrement i as the array is one item shorter
                        // so when we increment i in the loop statement we
                        // will land at the correct index.
                        // if it's not decremented, you won't delete all length subjects
                        lengthsubjects.splice(i--, 1);
                    }
                }
            }
        }

    };

    setInterval(loop, 50);

    WatchJS.watch = watch;
    WatchJS.unwatch = unwatch;
    WatchJS.callWatchers = callWatchers;

    return WatchJS;

};
