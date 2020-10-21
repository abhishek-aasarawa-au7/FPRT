import { combineReducers } from "redux";

// reducers
import signReducer from "./sign.reducer";
import userReducer from "./user.reducer";
import notificationReducer from "./notification.reducer";

export default combineReducers({
  signData: signReducer,
  userData: userReducer,
  notification: notificationReducer,
});
