import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should initiate expenses store", () => {
  const action = { type: "@@INIT" };
  expect(expensesReducer(undefined, action)).toEqual([]);
});

test("should add expense", () => {
  const expense = {
    id: "4",
    note: "Credit Card",
    amount: 80000,
    description: "",
    createdAt: 1000
  };
  const action = { type: "ADD_EXPENSE", expense };
  // expect(expensesReducer(expenses, action)[expenses.length]).toEqual(expense);
  expect(expensesReducer(expenses, action)).toEqual([...expenses, expense]);
});

test("should remove expense", () => {
  const action = { type: "REMOVE_EXPENSE", id: expenses[1].id };
  expect(expensesReducer(expenses, action)).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense", () => {
  const action = { type: "REMOVE_EXPENSE", id: "5" };
  expect(expensesReducer(expenses, action).length).toEqual(expenses.length);
});

test("should edit expense", () => {
  const payload = expenses[1];
  payload.amount = 38800;
  const action = { type: "EDIT_EXPENSE", id: payload.id, payload };
  expect(expensesReducer(expenses, action)[1]).toEqual(payload);
});

test("should not edit expense", () => {
  const payload = expenses[1];
  payload.amount = 38800;
  const action = { type: "EDIT_EXPENSE", id: "5", payload };
  expect(expensesReducer(expenses, action)[1]).toEqual(payload);
});
