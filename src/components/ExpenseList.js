import React from "react";
import { connect } from "react-redux";

const ExpenseList = props => (
  <div>
    <h2>Expense List</h2>
    {props.expenses.map(expense => (
      <p key={expense.description}>{expense.description}</p>
    ))}
  </div>
);

const mapStateToProps = store => ({
  expenses: store.expenses
});

export default connect(mapStateToProps)(ExpenseList);
