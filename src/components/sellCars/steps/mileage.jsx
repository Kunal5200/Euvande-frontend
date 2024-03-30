import data from "@/assests/data";
import { loginTextField } from "@/utils/styles";
import { Info } from "@mui/icons-material";
import { Autocomplete, Grid, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";

const Mileage = ({ state, setState, carData }) => {
  const [ownerShip, setOwnerShip] = useState(null);
  const mileageHandler = (e) => {
    setState({ ...state, mileage: e.target.value });
  };
  const ownershipHandler = (e, newValue) => {
    setOwnerShip(newValue);
    if (newValue) {
      setState({ ...state, ownership: newValue.ownership });
    }
  };

  useEffect(() => {
    if (carData && carData.ownership) {
      setOwnerShip({
        ownership: carData.ownership,
      });
    }
  }, [carData]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <TextField
            label="Mileage (in KM)"
            value={state.mileage}
            onChange={mileageHandler}
            fullWidth
            type="number"
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
        <Grid item lg={6}>
          {/* <TextField label="Ownership of Car" /> */}
          <Autocomplete
            options={data.carOwnerShip}
            getOptionLabel={(option) => option.ownership}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Ownership of Car"
                helperText="Ownership :Please specify your current ownership status for the car.."
              />
            )}
            sx={loginTextField}
            onChange={ownershipHandler}
            value={ownerShip}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Mileage;
