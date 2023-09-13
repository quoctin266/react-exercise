import { CRUD_RECIPE } from "../type/types";

const INITIAL_STATE = {
  list: [],
};

const recipeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CRUD_RECIPE:
      return {
        ...state,
        list: action?.payload,
      };

    default:
      return state;
  }
};

export default recipeReducer;
