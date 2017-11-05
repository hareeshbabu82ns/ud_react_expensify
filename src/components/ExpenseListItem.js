import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

export const ExpenseListItem = ({
  id,
  description,
  amount,
  createdAt,
  note
}) => (
  <div className="list-group-item flex-column align-items-start">
    <div className="d-flex w-100 justify-content-between">
      <Link className="mb-1" to={`/edit/${id}`}>
        {description}
      </Link>
      <small>
        {numeral(amount / 100).format("$0,0.00")} -{" "}
        {moment(createdAt).format("MMM Do, YYYY")}
      </small>
    </div>
    <p className="mb-1">{note}</p>
  </div>
);

export default ExpenseListItem;
