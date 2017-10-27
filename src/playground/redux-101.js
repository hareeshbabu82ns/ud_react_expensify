import { createStore } from "redux";

//action generators
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INC",
  incrementBy
});
const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DEC",
  decrementBy
});
const resetCount = ({ count = 0 } = {}) => ({
  type: "RESET",
  count
});

//reducer
const defaultState = { counter: 0 };
const countReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "INC":
      return {
        counter: state.counter + action.incrementBy
      };
    case "DEC":
      return {
        counter: state.counter - action.decrementBy
      };
    case "RESET":
      return {
        counter: action.count
      };
    default:
      return state;
  }
};

//redux store setup/initiate
const store = createStore(countReducer);

//listen for store changes
store.subscribe(() => {
  console.log(store.getState());
});

//make changes to store using action generators
store.dispatch(incrementCount());
store.dispatch(incrementCount({ incrementBy: 10 }));

store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 5 }));

store.dispatch(resetCount());
store.dispatch(resetCount({ count: 10 }));
