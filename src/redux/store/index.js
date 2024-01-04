import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../reducers/modal";
import userReducer from "../reducers/user";
import userInfoReducer from "../reducers/userdetails";
export default configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
    userInfo: userInfoReducer,
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware({
      serializableCheck: false,
    }),
});
