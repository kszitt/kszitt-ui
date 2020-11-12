import * as React from "react"
import * as PropTypes from "prop-types"
import {_inherits, _createClass} from "../common"
import {ConfigConsumer} from "../react-context/index"



let Button = function(_React$Component){
  _inherits(Button, _React$Component);
  // console.log("Button.prototype: ", Button.prototype);
  function Button(){
    var _this = this;


    _this.renderButton = function(aaa){
      console.log("aaa: ", aaa);
      // console.log("this: ", this);
      let props = _this.props,
        type = props.type,
        className = props.className;
      // ["default", "primary", "ghost", "dashed", "danger", "link"]
      if(type === "primary") className.concat(" ", type);
      return React.createElement("button", {
        // type: type,
        className: className,
      }, _this.props.children);
    }
  }
  _createClass(Button, [
    {
      key: "render",
      value: function(){
        return React.createElement(ConfigConsumer, null, this.renderButton)
      }
    }
  ])
  return Button;
  // return React.createElement("button", null, "按钮");
}(React.Component);

Button.defaultProps = {
  loading: false,
};
Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
}

export default Button;
