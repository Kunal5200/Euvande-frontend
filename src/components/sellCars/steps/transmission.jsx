import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const Transmission = () => {
  return (
    <div>
      <Autocomplete renderInput={(params) => <TextField {...params} />} />
    </div>
  );
};

export default Transmission;
