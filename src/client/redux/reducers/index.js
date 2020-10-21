import { combineReducers } from "redux";

// reducers
import signReducer from "./sign.reducer";
import userReducer from "./user.reducer";
import notificationReducer from "./notification.reducer";
import fieldReducer from "./field.reducer";

export default combineReducers({
  signData: signReducer,
  userData: userReducer,
  notification: notificationReducer,
  fields: fieldReducer,
});
