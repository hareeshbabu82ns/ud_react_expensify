import React from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";

const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={props =>
        isAuthenticated ? <Redirect to="/" /> : <Component {...props} />}
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});
export default connect(mapStateToProps)(PublicRoute);
