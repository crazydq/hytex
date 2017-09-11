import Spec from './components/Spec';
import { store, reactConnect } from 'hytex';

const mapData = (store) => {
    return {
        simpleValue: store.simpleValue,
        replaceObject: store.replaceObject,
        changeObject: store.changeObject,
        newValueObject: store.newValueObject,
        replacedArray: store.replacedArray,
        addElmArray: store.addElmArray,
        deleteElmArray: store.deleteElmArray,
        replaceElmArray: store.replaceElmArray,
        sortedArray: store.sortedArray,
        objectChildren: store.objectChildren.children
    }
};

const properties = {
    onChangeSimpleVale: function () {
        store.simpleValue = store.simpleValue + 1;
    },
    onReplaceObject: function () {
        store.replaceObject = {
            l: Math.random().toString(36).substr(2, 1),
            n: Math.floor(Math.random()*100)
        };
    },
    onChangeObjectValue: function () {
        store.changeObject.l = Math.random().toString(36).substr(2, 1);
    },
    addNewObjectValue: function () {
        const name = Math.random().toString(36).substr(2, 4);
        store.newValueObject[name] =  Math.floor(Math.random()*100);
    },
    replaceArray: function () {
        store.replacedArray = [{value: Math.floor(Math.random()*100)}, {value: Math.floor(Math.random()*100)},{value: Math.floor(Math.random()*100)}]
    },
    pushElmToArray: function() {
        store.addElmArray.push({
            value: Math.floor(Math.random()*100)
        });
    },
    unshiftElmToArray: function() {
        store.addElmArray.unshift({
            value: Math.floor(Math.random()*100)
        });
    },
    shiftElmFromArray: function() {
        store.addElmArray.shift();
    },
    popElmFromArray: function() {
        store.addElmArray.pop();
    },
    deleteElmFromArray: function() {
        store.deleteElmArray.splice(0,1);
    },
    replaceElmFromArray: function() {
        store.replaceElmArray.splice(0,1, {value: Math.floor(Math.random()*100)});
    },
    insertElmToArray: function() {
        store.replaceElmArray.splice(0,0, {value: Math.floor(Math.random()*100)});
    },
    sortArray: function() {
        store.sortedArray.sort();
    },
    reverseArray: function() {
        store.sortedArray.reverse();
    },
    changeObjectChildren: function () {
        store.objectChildren.children.value = Math.floor(Math.random()*100);
    }
};

export default reactConnect(Spec, mapData, properties);