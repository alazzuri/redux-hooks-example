import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../store/reducers/modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});
