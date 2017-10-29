import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <p>
      <Link to={`/edit/${id}`}>{description}</Link> -{" "}
      {numeral(amount / 100).format("$0,0.00")} -{" "}
      {moment(createdAt).format("MMM Do, YYYY")}
    </p>
  </div>
);

export default ExpenseListItem;
