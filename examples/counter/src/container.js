import Counter from './components/Counter';
import {store, reactConnect } from 'hytex';

const mapData = (store) => {
    return {
        value: store.counter
    }
};

const properties = {
    onIncrement: function () {
        store.counter = store.counter + 1;
    },
    onDecrement: function() {
        store.counter = store.counter - 1;
    },
    incrementIfOdd: function() {
        if (store.counter % 2 !== 0) {
            store.counter = store.counter + 1;
        }
    }
};

export default reactConnect(Counter, mapData, properties);