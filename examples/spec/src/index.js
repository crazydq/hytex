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

render();