/*import createReactContext from "./react-context"

const ConfigContext = createReactContext({
  getPrefixCls: function getPrefixCls(suffixCls, customizePrefixCls) {
    if (customizePrefixCls) return customizePrefixCls;
    return "kszitt-".concat(suffixCls);
  },
})

export const ConfigConsumer = ConfigContext.Consumer*/


import React from "react"

export const ConfigContext = React.createContext({
  getPrefixCls: function getPrefixCls(suffixCls, customizePrefixCls) {
    if (customizePrefixCls) return customizePrefixCls;
    return "kszitt-".concat(suffixCls);
  },
})


