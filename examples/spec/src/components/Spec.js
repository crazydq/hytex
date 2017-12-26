import React, { Component } from 'react'

class Spec extends Component {
    constructor(props) {
      super(props);
      this.abc = 'abc';
    }
    desc () {
      console.log(this.abc);
    }
    componentDidMount() {

    }
    render() {
        const props =  this.props;
        return (
            <div>
                <div>
                    <button onClick={props.onChangeSimpleVale}>
                        change simple value
                    </button>
                    Simple value: {props.simpleValue}
                </div>
                <div>
                    <button onClick={props.onReplaceObject}>
                        replace object
                    </button>
                    replaced object : {JSON.stringify(props.replaceObject)}
                </div>
                <div>
                    <button onClick={props.onChangeObjectValue}>
                        change object value
                    </button>
                    changed object : {JSON.stringify(props.changeObject)}
                </div>
                <div>
                    <button onClick={props.addNewObjectValue}>
                        add object value
                    </button>
                    value added object : {JSON.stringify(props.newValueObject)}
                </div>
                <div>
                    <button onClick={props.changeObjectChildren}>
                        change object value
                    </button>
                    changed object : {JSON.stringify(props.objectChildren)}
                </div>
                <br/>
                <div>
                    <button onClick={props.replaceArray}>
                        replace whole array
                    </button>
                    the array is: {JSON.stringify(props.replacedArray)}
                </div>
                <div>
                    <button onClick={props.pushElmToArray}>
                        push new element to an array
                    </button>
                    <button onClick={props.popElmFromArray}>
                        pop element from an array
                    </button>
                    <button onClick={props.unshiftElmToArray}>
                        unshift element to an array
                    </button>
                    <button onClick={props.shiftElmFromArray}>
                        shift element from an array
                    </button>
                    the array is: {JSON.stringify(props.addElmArray)}
                </div>
                <div>
                    <button onClick={props.deleteElmFromArray}>
                        delete element from an array
                    </button>
                    the array is: {JSON.stringify(props.deleteElmArray)}
                </div>
                <div>
                    <button onClick={props.replaceElmFromArray}>
                        replace element from an array
                    </button>
                    <button onClick={props.insertElmToArray}>
                        insert element to an array
                    </button>
                    the array is: {JSON.stringify(props.replaceElmArray)}
                </div>
                <div>
                    <button onClick={props.sortArray}>
                        sort array
                    </button>
                    <button onClick={props.reverseArray}>
                        reverse array
                    </button>
                    the array is: {JSON.stringify(props.sortedArray)}
                </div>

            </div>
        )
    }
}

export default Spec;