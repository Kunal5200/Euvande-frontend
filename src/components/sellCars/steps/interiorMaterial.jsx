import { loginTextField } from "@/utils/styles";
import { Autocomplete, FormHelperText, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const InteriorMaterial = ({ data, setState, state, carData }) => {
  const interiorMaterialHandler = (e, newValue) => {
    console.log(newValue);
    setState({ ...state, interiorMaterial: newValue });
  };
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div>
      <Autocomplete
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Interior Material"
            helperText="Select Interior Material Of Car"
          />
        )}
        options={data.interiorMaterial.map((option) => capitalize(option))}
        onChange={interiorMaterialHandler}
        getOptionLabel={(option) => option}
        sx={loginTextField}
        value={state.interiorMaterial}
      />
    </div>
  );
};

export default InteriorMaterial;
