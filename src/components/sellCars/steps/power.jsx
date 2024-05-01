import { loginTextField } from "@/utils/styles";
import { Info } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";

const Power = ({ setState, state }) => {
  const inputHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <TextField
            label="Engine Power (in KW)"
            fullWidth
            id="power"
            type="number"
            onChange={inputHandler}
            value={state.power}
            helperText="Enter Engine Power (in Kilo Watts)"
            // focused={Boolean(state.power)}
            sx={loginTextField}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <TextField
            label="Engine displacementL (L)"
            fullWidth
            id="displacementL"
            InputProps={{
              endAdornment: (
                <InputAdornment sx={{ cursor: "pointer" }}>
                  <Tooltip title="Engine displacementL refers to the total volume of all the cylinders in an engine. It is typically measured in liters (L) or cubic centimeters (cc).">
                    <Info />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            onChange={inputHandler}
            value={state.displacementL}
            helperText="Engine displacementL : The Total volume of all the cylinders in an engine"
            // focused={Boolean(state.displacementL)}
            sx={loginTextField}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Power;
