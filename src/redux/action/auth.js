import { LOGIN, LOGOUT } from "../type/types";

export const login = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
