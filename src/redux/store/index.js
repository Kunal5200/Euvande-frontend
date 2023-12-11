import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../reducers/modal";
import userReducer from "../reducers/user";
export default configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware({
      serializableCheck: false,
    }),
});
