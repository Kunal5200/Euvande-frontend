import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../reducers/modal";

export default configureStore({
  reducer: {
    modal: modalReducer,
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware({
      serializableCheck: false,
    }),
});
