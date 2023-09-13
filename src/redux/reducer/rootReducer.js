import { combineReducers } from "redux";

import themeReducer from "./themeReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
});

export default rootReducer;
