'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (composer, decomposer, properties, onEnter, mapData) {
    return function wrap(UIComponent) {
        var Wrapper = function (_Component) {
            _inherits(Wrapper, _Component);

            function Wrapper(props) {
                _classCallCheck(this, Wrapper);

                var _this2 = _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));

                _this2.id = makeid();
                return _this2;
            }

            _createClass(Wrapper, [{
                key: 'componentDidMount',
                value: function componentDidMount() {
                    composer(cb.bind(null, this), this.id);
                    if (onEnter && _utils2.default.isFunction(onEnter)) {
                        onEnter(this.props);
                    }
                    var _this = this;
                    Object.getOwnPropertyNames(UIComponent.prototype).forEach(function (key) {
                        _this[key] = UIComponent.prototype[key].bind(_this.wrapped);
                    });
                }
            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    decomposer(this.id);
                }
            }, {
                key: 'render',
                value: function render() {
                    var _this3 = this;

                    var props = _extends({}, mapData(_store2.default), this.state, this.props, properties);
                    return _react2.default.createElement(UIComponent, _extends({}, props, { ref: function ref(child) {
                            _this3.wrapped = child;
                        } }));
                }
            }]);

            return Wrapper;
        }(_react.Component);

        ;
        return Wrapper;
    };
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function cb(container, name, payload) {
    if (name) {
        container.setState(function (state) {
            var res = _extends({}, state);
            res[name] = payload;
            return res;
        });
    } else {
        container.setState(function (state) {
            return _extends({}, state, payload);
        });
    }
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }return text;
}

module.exports = exports['default'];