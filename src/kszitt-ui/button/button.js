import * as React from "react"
import * as PropTypes from "prop-types"
import {_inherits, _createClass, _getPrototypeOf, _possibleConstructorReturn, _typeof} from "../common"
import * as _configProvider from "../react-context/index"
import _SizeContext from "../sizeContext"

var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

function isString(str) {
  return typeof str === 'string';
}
function spaceChildren(children, needInserted) {
  var isPrevChildPure = false;
  var childList = []
  ;
  React.Children.forEach(children, function (child) {
    var type = _typeof(child);

    var isCurrentChildPure = type === 'string' || type === 'number';

    if (isPrevChildPure && isCurrentChildPure) {
      var lastIndex = childList.length - 1;
      var lastChild = childList[lastIndex];
      childList[lastIndex] = "".concat(lastChild).concat(child);
    } else {
      childList.push(child);
    }

    isPrevChildPure = isCurrentChildPure;
  }); // Pass to React.Children.map to auto fill key

  return React.Children.map(childList, function (child) {
    return insertSpace(child, needInserted);
  });
}

function insertSpace(child, needInserted) {
  // Check the child if is undefined or null.
  if (child == null) {
    return;
  }

  var SPACE = needInserted ? ' ' : ''; // strictNullChecks oops.

  if (typeof child !== 'string' && typeof child !== 'number' && isString(child.type) && isTwoCNChar(child.props.children)) {
    return React.cloneElement(child, {}, child.props.children.split('').join(SPACE));
  }

  if (typeof child === 'string') {
    if (isTwoCNChar(child)) {
      child = child.split('').join(SPACE);
    }

    return React.createElement("span", null, child);
  }

  return child;
}


let Button = function(_React$Component){
  _inherits(Button, _React$Component);
  // console.log("Button.prototype: ", Button.prototype);
  function Button(props){
    var _this = this;

    // _this = _possibleConstructorReturn(this, _getPrototypeOf(Button).call(this, props));

    _this.handleClick = function (e) {
      var loading = _this.state.loading;
      var onClick = _this.props.onClick;

      if (loading) {
        return;
      }

      if (onClick) {
        onClick(e);
      }
    };

    _this.state = {
      loading: props.loading,
    };
    return _this;
  }
  _createClass(Button, [
    {
      key: "componentDidUpdate",
      value: function(prevProps){
        var loading = this.props.loading;
        if (prevProps.loading !== loading) {
          this.setState({
            loading: loading
          });
        }
      }
    },{
      key: "render",
      value: function(){
        console.log("this.context: ", this.context);
        console.log("this.props: ", this.props);
        var _this = this,
          context = _this.context,
          getPrefixCls = context.getPrefixCls;
        // ConfigConsumer
        return React.createElement(_SizeContext.default.Consumer, null, function(size){
          var props = _this.props,
            children = props.children,
            type = props.type,
            className = props.className;

          var prefixCls = getPrefixCls('btn');
          var loading = _this.state.loading;
          var classes = prefixCls.concat(" ", className);
          if(type) classes = classes.concat(" ", prefixCls.concat("-", type));
          var iconNode = loading ? React.createElement("span", null, "loading") : null;
          var kids = children || children === 0 ? spaceChildren(children) : null;
          var buttonNode = React.createElement("button", {
            className: classes,
            onClick: _this.handleClick,
          }, iconNode, kids);
          return buttonNode;
        })
      }
    }
  ])
  return Button;
  // return React.createElement("button", null, "按钮");
}(React.Component);

Button.defaultProps = {
  loading: false,
};
Button.contextType = _configProvider.ConfigContext;
Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button;
