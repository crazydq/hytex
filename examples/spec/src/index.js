import React from 'react';
import ReactDOM from 'react-dom';
import Spec from './container';
import { store } from 'hytex';

store.init({
    simpleValue: 1,
    replaceObject: {
        l: 'a',
        n: 20
    },
    changeObject: {
        l: 'a'
    },
    newValueObject: {},
    addElmArray: [],
    deleteElmArray: [{value: 1}, {value: 2}, {value: 3}],
    replaceElmArray: [],
    sortedArray: [3,5,2,5,6,1,7,9,4,8,0],
    replacedArray: [{value: 1}, {value: 2}, {value: 3}],
    objectChildren: {
        children: {
            value: 1
        }
    }
});

const rootEl = document.getElementById('root');
const render = () => ReactDOM.render(
    <Spec />,
    rootEl
);


store.observe(store.changeObject, function(oldVal, newVal, prop) {
    console.log("old value is "+JSON.stringify(oldVal)+", new value is "+JSON.stringify(newVal)+" prop is "+prop);
});

store.observe(store.newValueObject, function(oldVal, newVal) {
    console.log("old value is "+JSON.stringify(oldVal)+", new value is "+JSON.stringify(newVal));
});

store.observe(store, function(oldVal, newVal, prop) {
    console.log("old value is "+JSON.stringify(oldVal)+", new value is "+JSON.stringify(newVal)+" prop is "+prop);
});

store.observe(store.addElmArray, function(newVal) {
    console.log("new value is "+JSON.stringify(newVal));
});

render();