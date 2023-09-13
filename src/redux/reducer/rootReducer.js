import { combineReducers } from "redux";

import themeReducer from "./themeReducer";
import recipeReducer from "./recipeReducer";

const rootReducer = combineReducers({
  theme: themeReducer,
  recipe: recipeReducer,
});

export default rootReducer;
