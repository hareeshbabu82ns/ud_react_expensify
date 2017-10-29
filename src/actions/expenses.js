import uuid from "uuid";
import databaseRef from "../firebase/firebase";

//-- Expenses Action Generators
export const addExpense = (expense = {}) => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = Date.now()
    } = expenseData;
    const uid = getState().auth.uid;
    const expense = { description, note, amount, createdAt };
    databaseRef
      .child(`users/${uid}/expenses`)
      .push(expense)
      .then(ref => {
        dispatch(addExpense({ id: ref.key, ...expense }));
      });
  };
};

export const removeExpense = ({ id = "" } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});
export const startRemoveExpense = ({ id = "" }) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return databaseRef
      .child(`users/${uid}/expenses`)
      .child(id)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }));
      });
  };
};

export const editExpense = (id, payload) => ({
  type: "EDIT_EXPENSE",
  id,
  payload
});
export const startEditExpense = (id, payload) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return databaseRef
      .child(`users/${uid}/expenses/${id}`)
      .update(payload)
      .then(() => dispatch(editExpense(id, payload)));
  };
};

export const setExpenses = (expenses = []) => ({
  type: "SET_EXPENSES",
  expenses
});

export const startFetchExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return databaseRef
      .child(`users/${uid}/expenses`)
      .once("value")
      .then(snapshot => {
        const expenses = [];
        snapshot.forEach(expense => {
          expenses.push({ id: expense.key, ...expense.val() });
        });
        dispatch(setExpenses(expenses));
      });
  };
};
