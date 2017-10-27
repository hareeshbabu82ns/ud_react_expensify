import React from "react";
import { connect } from "react-redux";

import ExpenseListItem from "./ExpenseListItem";
import ExpenseListFilters from "./ExpenseListFilters";
import filterExpenses from "../selectors/expenses";

const ExpenseList = props => (
  <div>
    <ExpenseListFilters />
    <h2>Expense List</h2>
    {props.expenses.map(expense => (
      <ExpenseListItem key={expense.description} {...expense} />
    ))}
  </div>
);

const mapStateToProps = store => ({
  expenses: filterExpenses(store.expenses, store.filters)
});

export default connect(mapStateToProps)(ExpenseList);
