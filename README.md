# Hytex 

Hytex is a state container for JS applications. It watches changing objects and trigger the re-rendering of views using framework like react. It is a lightwweight alternative for Redux, Mobx or Flux.

## Compatible with all serious browsers
Works with: IE 9+, FF 4+, SF 5+, WebKit, CH 7+, OP 12+, Node.JS

## Installation
npm install hytex --save
```javascript
var Store = require("hytex").store;
var connectReact = require("hytex").store;
//ES6
import {store, reactConnect } from 'hytex';
```

# Simple Example

We use hytex to implement a counter, we don't need any action or reducer which used by redux.(https://github.com/reactjs/redux/tree/master/examples/counter)<br>
First we initialize our data store.
```javascript
import { store } from 'hytex';
store.init({
    counter: 0
});
```

Then, we've got a UI component to display and control the counter number.
```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Counter extends Component {
    static propTypes = {
        value: PropTypes.number.isRequired,
        onIncrement: PropTypes.func.isRequired,
        onDecrement: PropTypes.func.isRequired
    };

    incrementAsync = () => {
        setTimeout(this.props.onIncrement, 1000)
    };

    render() {
        const props =  this.props;
        return (
            <p>
                Clicked: {props.value} times
                {' '}
                <button onClick={props.onIncrement}>
                    +
                </button>
                {' '}
                <button onClick={props.onDecrement}>
                    -
                </button>
                {' '}
                <button onClick={props.incrementIfOdd}>
                    Increment if odd
                </button>
                {' '}
                <button onClick={this.incrementAsync}>
                    Increment async
                </button>
            </p>
        )
    }
}

export default Counter;
```

Now we need to relate data to the UI component, here we use a container to warp the component. The container do two things: 1) pass data stored in hytex to component, 2) pass related properties

```javascript
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
```
You can runs this example in the development mode.<br>
Go to hytex/examples/counter directory, run "npm install" and "npm start", open [http://localhost:3000](http://localhost:3000) to view it in the browser.
