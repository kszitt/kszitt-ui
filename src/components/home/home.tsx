import * as React from "react";
// import {connect} from 'react-redux'
import {RouteProps} from "@public/interface";
// import {UpdateUSER, ClearUSER} from "@store/actions/user"
import {GetLogin, PostLogin} from "@http/home"
// import {Button} from "../../kszitt-ui"
import "./home.scss"





interface State {}
class Home extends React.Component<RouteProps, State> {
  state = {
    loading: false
  };

  componentDidMount(): void {
    // this.getLogin();
    // this.postLogin();
  }

  async getLogin(){
    let data = await GetLogin();
    console.log(data);
  }

  async postLogin(){
    let data = await PostLogin();
    console.log(data);
  }

  btnClick = () => {
    console.log("btnClick")
    this.setState({
      loading: !this.state.loading
    });
    setTimeout(() => {
      this.setState({
        loading: !this.state.loading
      });
    }, 2000)
  }

  render() {
    let {loading} = this.state;

    return (
      <div id="home">
        <h1>home1111</h1>
        {/*<Button className="btn" loading={loading} onClick={this.btnClick} type="primary">我是按钮</Button>*/}
      </div>
    );
  }
}

/*function mapStateToProps(state) {
  return {
    USER: state.USER
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新数据
    UpdateUSER: (obj) => {
      dispatch(UpdateUSER(obj));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);*/
export default Home
