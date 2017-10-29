import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import moment from "moment";

import AppRouter from "./routers/AppRouter";

import configureStore from "./store/configureStore";
import { startFetchExpenses } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import "./firebase/firebase";

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

ReactDOM.render(<p>Loading...</p>, document.getElementById("app"));
store
  .dispatch(startFetchExpenses())
  .then(() => ReactDOM.render(jsx, document.getElementById("app")));
