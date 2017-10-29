import React from "react";
import { connect } from "react-redux";

import { startLogin } from "../actions/auth";

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <h2>Login page</h2>
        <button onClick={() => this.props.dispatch(startLogin())}>login</button>
      </div>
    );
  }
}

export default connect()(LoginPage);
