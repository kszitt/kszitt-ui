import React from "react"
import Gud from "gud"
import * as PropTypes from "prop-types"
import {_inherits, _createClass} from "../common"
const MAX_SIGNED_31_BIT_INT = 1073741823;


function onlyChild(children) {
  return Array.isArray(children) ? children[0] : children;
}


function createEventEmitter(value) {
  var handlers = [];
  return {
    on(handler) {
      handlers.push(handler);
    },
    off(handler) {
      handlers = handlers.filter(function (h) {
        return h !== handler;
      });
    },
    get() {
      return value;
    },
    set(newValue, changedBits) {
      value = newValue;
      handlers.forEach(function (handler) {
        return handler(value, changedBits);
      });
    }
  };
}

function objectIs(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function createReactContext(defaultValue){
  let contextProp = '__react-context-' + Gud() + '__';
  let _Provider$childContex, _Consumer$contextType;

  let Provider = function(_Component){
    _inherits(Provider, _Component);

    function Provider(){
      console.log("Provider arguments: ", arguments);

      this.emitter = createEventEmitter(this.props.value);
    }

    Provider.prototype.getChildContext = function getChildContext() {
      return {
        [contextProp]: this.emitter
      }
    };

    Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        var oldValue = this.props.value;
        var newValue = nextProps.value;
        var changedBits = void 0;

        if (objectIs(oldValue, newValue)) {
          changedBits = 0; // No change
        } else {
          changedBits = MAX_SIGNED_31_BIT_INT;

          changedBits |= 0;

          if (changedBits !== 0) {
            this.emitter.set(nextProps.value, changedBits);
          }
        }
      }
    };

    Provider.prototype.render = function render() {
      return this.props.children;
    };

    return Provider;
  }(React.Component);
  /*Provider.childContextTypes = {
    [contextProp]: PropTypes.object.isRequired
  };*/
  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[contextProp] = PropTypes.object.isRequired, _Provider$childContex);

  let Consumer = function(_Component2){
    _inherits(Consumer, _Component2);

    function Consumer(){
      console.log("Consumer arguments: ", arguments);
      let _this = this;

      _this.state = {
        value: _this.getValue()
      }
      _this.onUpdate = function(newValue, changedBits){
        var observedBits = _this.observedBits | 0;
        if ((observedBits & changedBits) !== 0) {
          _this.setState({ value: _this.getValue() });
        }
      };
    }

    Consumer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var observedBits = nextProps.observedBits;

      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
        : observedBits;
    };

    Consumer.prototype.componentDidMount = function componentDidMount() {
      if (this.context && this.context[contextProp]) {
        this.context[contextProp].on(this.onUpdate);
      }
      var observedBits = this.props.observedBits;

      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
        : observedBits;
    };

    Consumer.prototype.componentWillUnmount = function componentWillUnmount() {
      if (this.context && this.context[contextProp]) {
        this.context[contextProp].off(this.onUpdate);
      }
    };

    Consumer.prototype.getValue = function getValue() {
      if (this.context && this.context[contextProp]) {
        return this.context[contextProp].get();
      } else {
        return defaultValue;
      }
    };

    Consumer.prototype.render = function render() {
      console.log("Consumer.prototype.render")
      return onlyChild(this.props.children)(this.state.value);
    };

    return Consumer;
  }(React.Component);
  /*Consumer.contextTypes = {
    [contextProp]: PropTypes.object
  };*/
  Consumer.contextTypes = (_Consumer$contextType = {}, _Consumer$contextType[contextProp] = PropTypes.object, _Consumer$contextType);

  return {
    Provider: Provider,
    Consumer: Consumer
  };
}

export default createReactContext;
