import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <p>
      <Link to={`/edit/${id}`}>{description}</Link> - {amount} -{" "}
      {moment(createdAt).format("MMM Do, YYYY")}
    </p>
  </div>
);

export default ExpenseListItem;
