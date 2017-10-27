import { createStore, combineReducers } from "redux";
import uuid from "uuid";

const demoState = {
  expenses: [
    {
      id: "<random_string>",
      description: "expense description",
      note: "long notes for expense",
      amount: 80000, //in cents/paise (*100)
      createdAt: 0
    }
  ],
  filters: {
    text: "search text",
    sortBy: "amount", //date or amount
    startDate: undefined,
    endDate: undefined
  }
};

// Action Generators

//-- Expenses Action Generators
const addExpense = (
  { description = "", note = "", amount = 0, createdAt = 0 } = {}
) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

const removeExpense = ({ id = "" } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

const editExpense = (id, payload) => ({
  type: "EDIT_EXPENSE",
  id,
  payload
});

// --Filter Action Generators
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});
const sortByDate = () => ({
  type: "SORT_BY_DATE"
});
const setStartDate = date => ({
  type: "SET_START_DATE",
  date
});
const setEndDate = date => ({
  type: "SET_END_DATE",
  date
});

// reducers

// -- Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map(item => {
        return item.id === action.id
          ? { ...item, ...action.payload, id: item.id }
          : item;
      });
    default:
      return state;
  }
};

// -- Filters Reducer
const filtersReducerDefaultState = {
  text: "",
  sortBy: "date", //or 'amount'
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return { ...state, text: action.text };
    case "SORT_BY_AMOUNT":
      return { ...state, sortBy: "amount" };
    case "SORT_BY_DATE":
      return { ...state, sortBy: "date" };
    case "SET_START_DATE":
      return { ...state, startDate: action.date };
    case "SET_END_DATE":
      return { ...state, endDate: action.date };
    default:
      return state;
  }
};

// filter expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
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

// initialize store
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

// use store
store.subscribe(() => {
  const { expenses, filters } = store.getState();
  console.log(getVisibleExpenses(expenses, filters));
  // console.log(store.getState());
});

const expense1 = store.dispatch(
  addExpense({ description: "rent", amount: 80000, createdAt: 1000 })
);
const expense2 = store.dispatch(
  addExpense({ description: "milk", amount: 1300, createdAt: 3000 })
);
const expense3 = store.dispatch(
  addExpense({ description: "bread", amount: 400, createdAt: -1000 })
);

// store.dispatch(removeExpense({ id: expense2.expense.id }));

// store.dispatch(
//   editExpense(expense3.expense.id, { note: "for kid", amount: 400 })
// );

store.dispatch(setTextFilter("re"));
store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

// store.dispatch(setStartDate(333));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(555));
// store.dispatch(setEndDate());
