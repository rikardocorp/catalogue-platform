import { createWrapper } from 'next-redux-wrapper';
// import { createStore } from 'redux';
import reducer from './reducers/rootReducer'



import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

/* Reducer */

const makeStore = (initialState) => createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

// create a makeStore function
// const makeStore = context => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });