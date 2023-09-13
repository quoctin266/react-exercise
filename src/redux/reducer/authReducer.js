import { LOGIN, LOGOUT } from "../type/types";

const INITIAL_STATE = {
  name: "",
  email: "",
  img: "",
  isAuthenticated: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        name: action?.payload?.name,
        email: action?.payload?.email,
        img: action?.payload?.img,
        isAuthenticated: true,
      };

    case LOGOUT:
      return {
        ...state,
        name: "",
        email: "",
        img: "",
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default authReducer;
