import React from "react";
import { connect } from "react-redux";

import ExpenseForm from "./ExpenseForm";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";

const EditExpensePage = props => (
  <div className="container">
    <ExpenseForm
      expense={props.expense}
      onSubmit={expense => {
        props
          .dispatch(startEditExpense(props.expense.id, expense))
          .then(() => props.history.push("/dashboard"));
      }}
    />
    <button
      className="btn btn-primary"
      onClick={() => {
        props
          .dispatch(startRemoveExpense({ id: props.expense.id }))
          .then(() => props.history.push("/dashboard"));
      }}
    >
      Remove
    </button>
  </div>
);

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(
      expense => expense.id === props.match.params.id
    )
  };
};
export default connect(mapStateToProps)(EditExpensePage);
