import createReactContext from "./react-context"

const ConfigContext = createReactContext({
  getPrefixCls: function getPrefixCls(suffixCls, customizePrefixCls) {
    if (customizePrefixCls) return customizePrefixCls;
    return "kszitt-".concat(suffixCls);
  },
})

export const ConfigConsumer = ConfigContext.Consumer
