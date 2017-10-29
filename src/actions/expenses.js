import uuid from "uuid";
import databaseRef from "../firebase/firebase";

//-- Expenses Action Generators
export const addExpense = (expense = {}) => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return dispatch => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = Date.now()
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    databaseRef
      .child("expenses")
      .push(expense)
      .then(ref => {
        console.log(ref);
        dispatch(addExpense({ id: ref.key, ...expense }));
      });
  };
};

export const removeExpense = ({ id = "" } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

export const editExpense = (id, payload) => ({
  type: "EDIT_EXPENSE",
  id,
  payload
});
