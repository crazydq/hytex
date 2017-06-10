import Spec from './components/Spec';
import {store, reactConnect } from 'hytex';

const mapData = (store) => {
    return {
        simpleValue: store.simpleValue,
        replaceObject: store.replaceObject,
        changeObject: store.changeObject,
        newValueObject: store.newValueObject
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
    }
};

export default reactConnect(Spec, mapData, properties);