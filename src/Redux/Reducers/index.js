import { combineReducers } from "redux";
import { userReducer, dishReducer } from "./reducers";

const rootReducer = combineReducers({
  userReducer,
  dishReducer,
});

export default rootReducer;
