import React from "react";
import { connect } from "react-redux";

import ExpenseListItem from "./ExpenseListItem";
import ExpenseListFilters from "./ExpenseListFilters";
import ExpenseListHeader from "./ExpenseListHeader";
import filterExpenses from "../selectors/expenses";

export const ExpenseList = props => (
  <div>
    <ExpenseListHeader />
    <ExpenseListFilters />
    <h4>Expense List</h4>
    <div className="list-group">
      {props.expenses.map(expense => (
        <ExpenseListItem key={expense.id} {...expense} />
      ))}
    </div>
  </div>
);

const mapStateToProps = store => ({
  expenses: filterExpenses(store.expenses, store.filters)
});

export default connect(mapStateToProps)(ExpenseList);
