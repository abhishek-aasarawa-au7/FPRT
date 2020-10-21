import { v4 as uuid } from "uuid";
import {
  CREATE_FIELD,
  UPDATE_FIELD,
  DELETE_FIELD,
} from "../actions/field.action";

const fieldModel = {
  id: uuid(),
  question: "",
};

const initialState = [];

const fieldReducer = function (state, action) {
  state = state || initialState;

  switch (action.type) {
    case CREATE_FIELD:
      const field = { ...fieldModel, question: action.payload, id: uuid() };
      return [...state, field];

    case UPDATE_FIELD:
      let field_list = state.map((field) => {
        if (field.id === action.payload.id) {
          return {
            ...field,
            question: action.payload.question,
          };
        }
        return field;
      });
      return field_list;

    case DELETE_FIELD:
      const fields = state.filter((field) => field.id !== action.payload);
      return fields;

    default:
      return state;
  }
};

export default fieldReducer;
