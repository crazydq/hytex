import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Spec from './container';
import { store } from '../../../src/index';

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

class Parent extends Component {
    componentDidMount (prevProps, prevState) {
        //console.log(this.spec.desc());
    }
    render() {
        return (<div><Spec ref={(elm) => { this.spec = elm; }}/></div>);
    }
}

const rootEl = document.getElementById('root');
const render = () => ReactDOM.render(
    <Parent />,
    rootEl
);


store.observe(store, 'changeObject', function(oldVal, newVal) {
    console.log("old value is "+JSON.stringify(oldVal)+", new value is "+JSON.stringify(newVal));
});

store.observe(store, 'newValueObject', function(oldVal, newVal) {
    console.log("old value is "+JSON.stringify(oldVal)+", new value is "+JSON.stringify(newVal));
});

store.observe(store, 'replaceObject', function(oldVal, newVal) {
    console.log("old value is "+JSON.stringify(oldVal)+", new value is "+JSON.stringify(newVal));
});

store.observe(store, 'replacedArray', function(oldVal, newVal) {
    console.log("old value is "+JSON.stringify(oldVal)+", new value is "+JSON.stringify(newVal));
});

store.observe(store, 'addElmArray', function(oldVal, newVal) {
    console.log("old value is "+JSON.stringify(oldVal));
    console.log("new value is "+JSON.stringify(newVal));
});

store.observe(store, 'replaceElmArray', function(oldVal, newVal) {
    console.log("old value is "+JSON.stringify(oldVal)+", new value is "+JSON.stringify(newVal));
});

render();