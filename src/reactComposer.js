import {Component, createElement} from 'react';
import utils from './utils';

function cb(container, name, payload) {
    container.setState(state => {
        let res = {...state};
        res[name] = payload;
        return res;
    });
}

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

export default function (composer, decomposer, properties, onEnter) {
  return function wrap(UIComponent) {
    return class extends Component {
      constructor(props) {
        super(props);
        this.id = makeid();
      }

      componentDidMount() {
        composer(cb.bind(null, this), this.id);
        if (onEnter && utils.isFunction(onEnter)) {
            onEnter(this.props);
        }
      }

      componentWillUnmount() {
        decomposer(this.id);
      }

      render() {
        const props = {...this.state, ...this.props, ...properties};
        return createElement(
          UIComponent,
          props,
        );
      }
    };
  }
}
