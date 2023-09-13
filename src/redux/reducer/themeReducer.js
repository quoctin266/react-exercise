import { CHANGE_THEME_DARK, CHANGE_THEME_LIGHT } from "../type/types";

const INITIAL_STATE = {
  headerBackground: "dark",
  background: "#c7c7c7",
  color: "light",
};

const themeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_THEME_LIGHT:
      return {
        ...state,
        headerBackground: "dark",
        background: "#c7c7c7",
        color: "light",
      };

    case CHANGE_THEME_DARK:
      return {
        ...state,
        headerBackground: "light",
        background: "#1c1c1c",
        color: "dark",
      };

    default:
      return state;
  }
};

export default themeReducer;
