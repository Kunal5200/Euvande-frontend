import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../reducers/modal";
import userReducer from "../reducers/user";
import userInfoReducer from "../reducers/userdetails";
import carInfoReducer from "../reducers/vehicleInformation";
import carDetailsReducer from "../reducers/carInformation";
export default configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
    userInfo: userInfoReducer,
    CarInfo: carInfoReducer,
    CarInformation: carDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
