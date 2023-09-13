import { CHANGE_THEME_DARK, CHANGE_THEME_LIGHT } from "../type/types";

export const changeThemeDark = () => {
  return {
    type: CHANGE_THEME_DARK,
  };
};

export const changeThemeLight = () => {
  return {
    type: CHANGE_THEME_LIGHT,
  };
};
