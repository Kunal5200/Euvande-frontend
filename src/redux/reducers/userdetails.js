import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  name: "",
  email: "",
  phoneNo: "",
};

export const userInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setDetails: (state, actions) => {
      return (state = actions.payload);
    },
  },
});

export const { setDetails } = userInfo.actions;
export default userInfo.reducer;
