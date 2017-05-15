import main from './main';
import utils from './utils';

const Watch = main();
const _fun = Symbol('fun');
const _store = Symbol('store');

let dataStore = {
    init: function(store){
        this[_store] = store || {};
        this[_fun] = {};
    },
    addHandler: function(dataMap, fun, trigger, id) {
        const filtered = dataMap(this[_store]);
        for (let key in filtered) {
            if (filtered.hasOwnProperty(key)) {
                let name = utils.getKeyByValue(this[_store], filtered[key]);
                if (name) {
                    if (trigger) {
                        fun.bind(null, key, filtered[key])();
                    }
                    this._register(name, fun.bind(null, key), id);
                }
            }
        }
    },
    deleteHandler: function (dataMap, id) {
        const filtered = dataMap(this[_store]);
        for (let key in filtered) {
            if (filtered.hasOwnProperty(key)) {
                let name = utils.getKeyByValue(this[_store], filtered[key]);
                if (name) {
                    Watch.unwatch(this[_store], name, this[_fun][id+'_'+name]);
                    Watch.unwatch(this[_store][name], this[_fun][id+'_'+name]);
                }
            }
        }
    },
    _register: function(name, watcher, id) {
        const _this = this;
        const fun = function() {
            watcher(_this[_store][name]);
        };
        this[_fun][id+'_'+name] = fun;
        Watch.watch(this[_store], name, fun, 8, true);
    }
};

var handler = {
    get: function(target, name) {
        if (target[_store]) {
            return name in target[_store] ? target[_store][name] : target[name];
        }
        else {
            return target[name];
        }
    },
    set: function(target, name, value) {
        if (target[_store] && name in target[_store] ) {
            target[_store][name] = value;
        }
        else {
            target[name] = value;
        }
        return true;
    }
};

export default new Proxy(dataStore, handler);