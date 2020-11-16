import * as React from "react";


interface Props {
  aa?: string;
}
interface State {
  value: number;
}
class NotFound extends React.Component<Props, State> {
  state = {
    value: 10
  };

  UNSAFE_componentWillMount() {

  }

  render() {

    return (
      <div id="NotFound">
        <b>404</b>
      </div>
    );
  }
}

export default NotFound;
