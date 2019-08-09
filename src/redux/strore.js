import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import { drinkReducer } from "./reducers/drinkReducer";
// import { adReducer } from "./reducers/addReducer";

const root = combineReducers({
  drinkReducer
  // adReducer
});

export default createStore(root, applyMiddleware(promise));
