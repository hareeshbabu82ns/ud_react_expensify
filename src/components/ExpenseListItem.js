import React from "react";
import { connect } from "react-redux";

import { removeExpense } from "../actions/expenses";

const ExpenseListItem = ({ id, description, amount, createdAt, dispatch }) => (
  <div>
    <p>
      {description} - {amount} - {createdAt} &nbsp;
      <button onClick={() => dispatch(removeExpense({ id }))}>Remove</button>
    </p>
  </div>
);

export default connect()(ExpenseListItem);
