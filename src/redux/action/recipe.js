import { CRUD_RECIPE } from "../type/types";

export const crudRecipe = (data) => {
  return {
    type: CRUD_RECIPE,
    payload: data,
  };
};
