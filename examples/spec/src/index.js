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
    newValueObject: {}
});

const rootEl = document.getElementById('root');
const render = () => ReactDOM.render(
    <Spec />,
    rootEl
);

render();