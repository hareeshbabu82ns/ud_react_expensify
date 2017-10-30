import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";

import filterExpenses, { getExpensesTotal } from "../selectors/expenses";

const ExpenseListHeader = ({ expensesCount, expensesTotal }) => {
  return (
    <h6>
      Displaying <span className="text-primary">{expensesCount}</span>{" "}
      Expense(s), Totalling{" "}
      <span className="text-primary">
        {numeral(expensesTotal / 100).format("$0,0.00")}
      </span>
    </h6>
  );
};
const mapStateToProps = store => {
  const visibleExpenses = filterExpenses(store.expenses, store.filters);
  return {
    expensesCount: visibleExpenses.length,
    expensesTotal: getExpensesTotal(visibleExpenses)
  };
};
export default connect(mapStateToProps)(ExpenseListHeader);
