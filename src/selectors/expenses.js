import moment from "moment";

// filter expenses
export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const createdAt = moment(expense.createdAt);
      const startDateMatch = startDate
        ? moment(startDate).isSameOrBefore(createdAt, "day")
        : true;
      const endDateMatch = endDate
        ? moment(endDate).isSameOrAfter(createdAt, "day")
        : true;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return textMatch && startDateMatch && endDateMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt > b.createdAt ? -1 : 1;
      } else if (sortBy === "amount") {
        return a.amount > b.amount ? -1 : 1;
      }
    });
};

export const getExpensesTotal = expenses => {
  return expenses
    .map(e => e.amount)
    .reduce((amtPrev, amtCurr) => amtPrev + amtCurr);
};
