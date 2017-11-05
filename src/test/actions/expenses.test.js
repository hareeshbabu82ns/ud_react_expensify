import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import {
  startAddExpense,
  startEditExpense,
  startRemoveExpense,
  addExpense,
  editExpense,
  removeExpense
} from "../../actions/expenses";
import databaseRef from "../../firebase/firebase";

import expenses from "../fixtures/expenses";

const createMockStore = configureMockStore([thunk]);

let store;
const uid = "test";
beforeAll(() => {
  store = createMockStore({ auth: { uid } });
});

test("should add default expense", () => {
  const result = addExpense(expenses[1]);
  expect(result).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[1]
  });
});

test("should add expense to database with values", done => {
  const expense = {
    description: "Mosue",
    amount: 3300,
    note: "",
    createdAt: 1000
  };
  store
    .dispatch(startAddExpense(expense))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expense
        }
      });
      return databaseRef
        .child(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expense);
      done();
    })
    .catch(() => {});
});

test("should edit expense in the database", done => {
  const expense = store.getActions()[0].expense;
  expense.amount = 78899;
  store
    .dispatch(startEditExpense(expense.id, expense))
    .then(() => {
      const updatedExpense = store.getActions()[0].expense;
      expect(updatedExpense).toEqual(expense);
      return databaseRef
        .child(`users/${uid}/expenses/${expense.id}`)
        .once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expense);
      done();
    });
});

test("should remove expense from db", done => {
  const expense = store.getActions()[0].expense;
  store.dispatch(startRemoveExpense(expense)).then(() => {
    const latestAction = store.getActions()[2];
    console.log(store.getState());
    expect(latestAction).toEqual({
      type: "REMOVE_EXPENSE",
      id: expense.id
    });
    done();
  });
});

afterAll(() => {
  databaseRef.child(`users/${uid}/expenses`).remove();
});
