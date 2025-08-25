import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import authReducer from "./auth";

// Reducer function w/ out redux toolkit
// function counterReducer(state = initialState, action) {
//   switch (action.type) {
//     case "INCREMENT":
//       return {
//         ...state,
//         counter: state.counter + 1,
//       };
//     case "INCREASE":
//       return {
//         ...state,
//         counter: state.counter + action.amount,
//       };
//     case "DECREMENT":
//       return {
//         ...state,
//         counter: state.counter - 1,
//       };
//     case "TOGGLE":
//       return {
//         ...state,
//         isVisible: !state.isVisible,
//       };
//     default:
//       return state;
//   }
// }

// Create Redux store

const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
});

export default store;
