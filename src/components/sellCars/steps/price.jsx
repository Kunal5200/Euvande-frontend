import { loginTextField } from "@/utils/styles";
import { TextField } from "@mui/material";
import React from "react";

const Price = ({ state, setState }) => {
  const priceHandler = (e) => {
    setState({ ...state, price: e.target.value });
  };
  return (
    <div>
      <TextField
        label="Price (in Euro)"
        value={state.price}
        onChange={priceHandler}
        fullWidth
        helperText="Enter Desired Price of Car"
        sx={loginTextField}
      />
    </div>
  );
};

export default Price;
