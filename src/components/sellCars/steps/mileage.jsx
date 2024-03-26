import { loginTextField } from "@/utils/styles";
import { Info } from "@mui/icons-material";
import { Grid, TextField, Tooltip } from "@mui/material";
import React from "react";

const Mileage = ({ state, setState }) => {
  const mileageHandler = (e) => {
    setState({ ...state, mileage: e.target.value });
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <TextField
            label="Mileage (in KM)"
            value={state.mileage}
            onChange={mileageHandler}
            fullWidth
            sx={loginTextField}
            InputProps={{
              endAdornment: (
                <Tooltip title="This refers to the total distance that a vehicle has traveled since it was first manufactured or since its odometer was last reset. It's typically measured in miles or kilometers">
                  <Info sx={{ cursor: "pointer" }} />
                </Tooltip>
              ),
            }}
            helperText="Mileage :  The Total distance that a vehicle has traveled"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Mileage;
