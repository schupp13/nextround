import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import { drinkReducer } from "./reducers/drinkReducer";
// import { adReducer } from "./reducers/addReducer";
import { authReducer } from "./reducers/authReducer";

const root = combineReducers({
  drinkReducer,
  authReducer
  // adReducer
});

export default createStore(root, applyMiddleware(promise));
