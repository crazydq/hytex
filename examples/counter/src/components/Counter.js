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

export default Counter