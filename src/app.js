import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import AppRouter from "./routers/AppRouter";

import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";

import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

store.dispatch(addExpense({ description: "water bill", amount: 6000 }));
store.dispatch(addExpense({ description: "gas bill", amount: 3500 }));

store.dispatch(setTextFilter("gas"));
const { expenses, filters } = store.getState();
console.log(getVisibleExpenses(expenses, filters));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
