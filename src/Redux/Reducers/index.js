import { combineReducers } from "redux";
import { userReducer, dishReducer, ratedDishesReducer } from "./reducers";

const rootReducer = combineReducers({
  userReducer,
  dishReducer,
  ratedDishesReducer,
});

export default rootReducer;
