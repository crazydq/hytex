import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './container';
import { store } from 'hytex';

store.init({
    counter: 0
});

const rootEl = document.getElementById('root');

const render = () => ReactDOM.render(
    <Counter/>,
    rootEl
);

render();