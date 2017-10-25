import React from "react";

const EditExpensePage = props => (
  <div>
    <p>Edit Expense : {props.match.params.id}</p>
  </div>
);

export default EditExpensePage;
