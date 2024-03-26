import { Autocomplete, FormHelperText, TextField } from "@mui/material";
import React from "react";

const InteriorMaterial = ({ data, setState, state }) => {
  const interiorMaterialHandler = (e, newValue) => {
    setState({ ...state, interiorMaterial: newValue });
  };
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  return (
    <div>
      <Autocomplete
        renderInput={(params) => (
          <TextField {...params} label="Select Interior Material" />
        )}
        options={data.interiorMaterial.map((option) => capitalize(option))}
        onChange={interiorMaterialHandler}
        getOptionLabel={(option) => option}
      />
      <FormHelperText>Select Interior Material Of Car </FormHelperText>
    </div>
  );
};

export default InteriorMaterial;
