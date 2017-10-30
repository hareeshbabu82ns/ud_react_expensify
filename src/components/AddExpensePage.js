import React from "react";
import { connect } from "react-redux";

import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from "../actions/expenses";

const AddExpensePage = props => (
  <div className="container">
    <p>Add Expense</p>
    <ExpenseForm
      onSubmit={expense => {
        props.dispatch(startAddExpense(expense));
        props.history.push("/dashboard");
      }}
    />
  </div>
);

export default connect()(AddExpensePage);
