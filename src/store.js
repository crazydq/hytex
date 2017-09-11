import main from './main';
import utils from './utils';
const Watch = main();
const _fun = Symbol('fun');
const _store = Symbol('store');
const LEVEL = 8;

let dataStore = {
    init: function(store){
        if (typeof store !== 'undefined') {
            if (!utils.isObject(store)) {
                throw new Error('Expected the store to be a plain object.');
            }
        }
        else {
            throw new Error('store is a necessary parameter');
        }
        this[_store] = store;
        this[_fun] = {};
    },
    addHandler: function(dataMap, fun, trigger, id) {
        const filtered = dataMap(this[_store]);
        const keys = Object.keys(filtered);
        const props = utils.getDataMapKey(dataMap);
        props.forEach((prop, i)=>{
            this._register(prop, keys[i], fun.bind(null, keys[i]), id, dataMap);
        });
        if (trigger) {
            fun.bind(null, null, filtered)();
        }
    },
    deleteHandler: function (dataMap, id) {
        const filtered = dataMap(this[_store]);
        const keys = Object.keys(filtered);
        const props = utils.getDataMapKey(dataMap);
        props.forEach((prop, i)=>{
            Watch.unwatch(this[_store], prop, this[_fun][id+'_'+keys[i]]);
            Watch.unwatch(this[_store][prop], this[_fun][id+'_'+keys[i]]);
        });
    },
    _register: function(name, key, watcher, id, dataMap) {
        const _this = this;
        const fun = function() {
            watcher(dataMap(_this[_store])[key]);
        };
        this[_fun][id+'_'+key] = fun;
        Watch.watch(this[_store], name, fun, LEVEL, true);
    },
    observe: function (obj, watcher) {
        if (obj === this) {
            obj = this[_store];
        }
        const fun = function(prop, action, newval, oldval) {
            if (action === 'differentattr') {
                let obj = {...this};
                delete obj.set;
                delete obj.get;
                delete obj.watchers;
                watcher(oldval, obj);
            }
            if (action === 'set') {
                watcher(oldval, newval, prop);
            }
            else if(action === 'push' || action === 'unshift' || action === 'shift' || action === 'pop' ||
                action === 'splice' || action === 'sort' || action === 'reverse') {
                let arr = this.map(function(elm){
                    let newVal = {...elm};
                    delete newVal.set;
                    delete newVal.get;
                    delete newVal.watchers;
                    return newVal;
                });
                watcher(arr);
            }
        };
        Watch.watch(obj, fun, LEVEL, true);
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