import { createStore } from 'redux';

// Initial state
const initialState = {
    counter: 0,
};

// Reducer function
function counterReducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, counter: state.counter + 1 };
        case 'DECREMENT':
            return { ...state, counter: state.counter - 1 };
        default:
            return state;
    }
}

// Create Redux store
const store = createStore(counterReducer);

export default store;