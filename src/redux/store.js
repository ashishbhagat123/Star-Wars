import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { personReducer } from "./persons/reducer"

let composeEnhancers = compose;

if (process.env.NODE_ENV !== "production") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
}

const enhancer = composeEnhancers(applyMiddleware(thunk));

// Creating Store
const store = createStore(personReducer, enhancer);

export default store;