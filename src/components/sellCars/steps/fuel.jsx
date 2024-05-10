import { loginTextField } from "@/utils/styles";
import {
  Autocomplete,
  Button,
  FormHelperText,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FuelStep = ({ data, state, setState }) => {
  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const carInfo = useSelector((state) => state.CarInformation);

  const fuelTypeHandler = (e, newValue) => {
    setSelectedFuelType(newValue);
    setState({ ...state, fuelType: newValue });
  };
  const handleFuelType = (val) => {
    setState({ ...state, fuelType: val });
  };

  const colorHandler = (e) => {
    setState({ ...state, color: e.target.value });
  };
  useEffect(() => {
    if (carInfo && carInfo.variant) {
      setState({ ...state, fuelType: carInfo.variant.fuelType });
    }
  }, [carInfo]);
  return (
    <div>
      {/* <Stack direction={"row"} alignItems={"center"} spacing={2}>
        {data &&
          data.fuel.map((val, i) => (
            <Button
              key={i}
              sx={{
                border: "1px solid #000",
                color: state.fuelType === val ? "#fff" : "#000",
                backgroundColor: state.fuelType === val ? "#000" : "#fff",
                fontSize:12,
                ":hover": {
                  backgroundColor: state.fuelType === val ? "#000" : "#fff",
                },
              }}
              onClick={() => handleFuelType(val)}
            >
              {val}
            </Button>
          ))}
      </Stack> */}
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Fuel Type"
                helperText=" Select Fuel Type of the Car"
              />
            )}
            options={data.fuel}
            value={state.fuelType}
            onChange={fuelTypeHandler}
            sx={loginTextField}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <TextField
            label="Enter Color of the Car"
            helperText="Enter Color of the Car"
            sx={loginTextField}
            fullWidth
            onChange={colorHandler}
            value={state.color}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default FuelStep;
