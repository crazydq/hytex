# Hytex 

Hytex is a state container for JS applications. It watches changing objects and trigger re-rendering of views or UI components using framework like react. It is a lightweight alternative for Redux, Mobx or Flux.

## Compatible with all serious browsers
Works with: IE 9+, FF 4+, SF 5+, WebKit, CH 7+, OP 12+, Node.JS

## Why?
JS single-page applications have become increasingly common these days together with the ever increasing complexity in both 
user experience and UI state. Data flow patterns like Redux or Flux appear to solve this problem. They both have three major parts: store, action, and dispatcher（reducer in Redux). The most important concept they develop is that the state of application is stored in one object tree within a single store, and the only way to change the it is to emit an message that tells which part of data should be modified. After receiving the message, a callback function will be applied to do the state modification. 

Using Redux or Flux do relieve the pain of managing application state. But they also bring up new headache:

* We need to create a lot of files for actions and dispatchers（reducers in Redux).
* State changes can only happen when an action is dispatched which is unfriendly for developers.
* We have to put fetching data logic in some places (action files) and processing data logic in another places (reducers).

The last point is the most obvious disadvantage of Redux and Flux. The idea that state of application is stored in one object tree is great, but using patterns like actions or reducers bring up unnecessary burden for all developers. Message mechanism is a classical design pattern in software engineering for connecting different architecture modules, however, put it inside one architecture module is not reasonable.

In Hytex, I retain the concept of stores but no longer use actions, dispatchers and reducers. Changing application state can be accomplished by a simple assignment operation. Like "react-redux", Hytex provide a connect function to hook state store and UI components, any data change will trigger the re-rendering of corresponding UI components.


## Installation
npm install hytex --save
```javascript
//ES5
var Store = require("hytex").store;
var connectReact = require("hytex").connectReact;
//ES6
import {store, reactConnect } from 'hytex';
```

## Simple Example

We use hytex to implement a counter, we don't need any action or reducer which used by redux.[(view code)](https://github.com/reactjs/redux/tree/master/examples/counter)<br>
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

Now we need to relate data to the UI component. <br>
Here we use a container to warp the component, the container do two things: <br>
1) feed data to component stored in hytex .<br>
2) pass related properties<br>

The changing of counter stored in hytex will trigger re-rendering of the react component and display the new value.
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
You can runs this example in the development mode.
Go to hytex/examples/counter directory, run "npm install" and "npm start", open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Specification
Almost all kinds of data change will trigger callback functions registered in Hytex. All the possibilities are listed as follows, you can try out  the 'spec' example to see the results.
### change a primitive
```javascript
store.simpleValue = store.simpleValue + 1;
```
### change object properties
```javascript
store.changeObject.l = Math.random().toString(36).substr(2, 1);
```
### replace the whole object
```javascript
store.replaceObject = {
    l: Math.random().toString(36).substr(2, 1),
    n: Math.floor(Math.random()*100)
};
```
### add property to object
```javascript
const name = Math.random().toString(36).substr(2, 4);
store.newValueObject[name] =  Math.floor(Math.random()*100);
```

### add property to object
```javascript
const name = Math.random().toString(36).substr(2, 4);
store.newValueObject[name] =  Math.floor(Math.random()*100);
```

### replace the whole array
```javascript
store.replacedArray = [{value: Math.floor(Math.random()*100)}, {value: Math.floor(Math.random()*100)},{value: Math.floor(Math.random()*100)}]
```

### push, unshift and element to an array
```javascript
store.addElmArray.push({
    value: Math.floor(Math.random()*100)
});

store.addElmArray.unshift({
    value: Math.floor(Math.random()*100)
});
```

### pop, shift an element from an array
```javascript
store.addElmArray.shift();

store.addElmArray.pop();
```

### change an element in an array
Hytex doesn't wactch each element in an array, in order to trigger the callback function, use the 'splice' function to replace the element.
```javascript
store.replaceElmArray.splice(0,1, {value: Math.floor(Math.random()*100)});
```

### insert an element to an array
```javascript
store.replaceElmArray.splice(0,0, {value: Math.floor(Math.random()*100)});
```

### delete an element from an array
```javascript
store.deleteElmArray.splice(0,1);
```

### sort or reverse an array
```javascript
store.sortedArray.sort();
store.sortedArray.reverse();
```