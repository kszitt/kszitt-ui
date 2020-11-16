import * as React from "react"
import * as PropTypes from "prop-types"

declare const ButtonTypes: ["default", "primary"];
declare type ButtonType = (typeof ButtonTypes)[number];
interface ButtonProps {
  type?: ButtonType;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  loading?: boolean;
}
interface ButtonState {
  loading?: boolean;
}
declare class Button extends React.Component<ButtonProps, ButtonState> {
  static propTypes: {
    type: PropTypes.Requireable<string>;
  };
  constructor(props: ButtonProps);
  componentDidMount(): void;
  componentDidUpdate(prevProps: ButtonProps): void;
  componentWillUnmount(): void;
  render(): JSX.Element;
}

export default Button;
