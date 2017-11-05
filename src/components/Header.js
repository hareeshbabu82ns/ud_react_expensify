import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { startLogout } from "../actions/auth";

export const Header = props => (
  <header>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a className="navbar-brand" href="#">
        Expensify
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav mr-auto">
          <NavLink
            to="/dashboard"
            className="nav-item nav-link"
            activeClassName="active"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/create"
            className="nav-item nav-link"
            activeClassName="active"
          >
            Create
          </NavLink>
        </div>
        <form className="form-inline my-2 my-lg-0">
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={props.startLogout}
          >
            Logout
          </button>
        </form>
      </div>
    </nav>
  </header>
);
const mapDispatchToProps = dispatch => {
  return {
    startLogout: () => {
      dispatch(startLogout());
    }
  };
};
export default connect(undefined, mapDispatchToProps)(Header);
