import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import moment from "moment";

import AppRouter, { history } from "./routers/AppRouter";

import configureStore from "./store/configureStore";
import { startFetchExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
import getVisibleExpenses from "./selectors/expenses";
import { firebase } from "./firebase/firebase";

import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

// store.dispatch(
//   setExpenses([
//     {
//       id: "883",
//       description: "water bill",
//       amount: 33390,
//       createdAt: moment("2017-10-10").valueOf()
//     },
//     {
//       id: "848",
//       description: "gas bill",
//       amount: 6000,
//       createdAt: moment("2017-11-01").valueOf()
//     }
//   ])
// );

// store.dispatch(
//   addExpense({
//     description: "water bill",
//     amount: 6000,
//     createdAt: moment("2017-10-10").valueOf()
//   })
// );
// store.dispatch(
//   addExpense({
//     description: "gas bill",
//     amount: 3500,
//     createdAt: moment("2017-11-01").valueOf()
//   })
// );
// store.dispatch(
//   addExpense({
//     description: "rent",
//     amount: 80000,
//     createdAt: moment("2017-09-20").valueOf()
//   })
// );

// store.dispatch(setTextFilter("gas"));
// const { expenses, filters } = store.getState();
// console.log(getVisibleExpenses(expenses, filters));

// setTimeout(() => {
//   store.dispatch(setTextFilter("bill"));
// }, 3000);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("app"));
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById("app"));

firebase.auth().onAuthStateChanged(user => {
  // console.log(user);
  if (user) {
    //already loggedin
    store.dispatch(login(user.uid));
    store.dispatch(startFetchExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === "/") history.push("/dashboard");
    });
  } else {
    //not loggedin
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});
