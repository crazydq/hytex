import React, { Component } from 'react'

class Spec extends Component {
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
                        object replace
                    </button>
                    replaced object : {JSON.stringify(props.replaceObject)}
                </div>
                <div>
                    <button onClick={props.onChangeObjectValue}>
                        object value change
                    </button>
                    changed object : {JSON.stringify(props.changeObject)}
                </div>
                <div>
                    <button onClick={props.addNewObjectValue}>
                        object value added
                    </button>
                    value added object : {JSON.stringify(props.newValueObject)}
                </div>
            </div>
        )
    }
}

export default Spec;