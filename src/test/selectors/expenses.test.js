import moment from "moment";

import expensesFilter from "../../selectors/expenses";
import expenses from "../fixtures/expenses";

test("should sort by date", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };
  expect(expensesFilter(expenses, filters)).toEqual([
    expenses[2],
    expenses[1],
    expenses[0]
  ]);
});
test("should sort by amount", () => {
  const filters = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  };
  expect(expensesFilter(expenses, filters)).toEqual([
    expenses[2],
    expenses[0],
    expenses[1]
  ]);
});
test("should filter by text", () => {
  const filters = {
    text: "r",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  };
  expect(expensesFilter(expenses, filters)).toEqual([expenses[0], expenses[1]]);
});
test("should filter by startDate and endDate", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: moment(0)
      .subtract(2, "day")
      .valueOf(),
    endDate: moment(0)
      .add(2, "day")
      .valueOf()
  };
  expect(expensesFilter(expenses, filters)).toEqual([expenses[1]]);
});
