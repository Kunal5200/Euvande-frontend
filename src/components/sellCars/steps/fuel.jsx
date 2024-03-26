import { Autocomplete, Button, Grid, Stack, TextField } from "@mui/material";
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
  useEffect(() => {
    if (carInfo && carInfo.variant && carInfo.variant.fuelType) {
      setSelectedFuelType(carInfo.variant.fuelType);
    }
  }, [carInfo.variant]);
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
        <Grid item lg={12}>
          <Autocomplete
            renderInput={(params) => (
              <TextField {...params} label="Select Fuel Type" />
            )}
            options={data.fuel}
            value={selectedFuelType}
            onChange={fuelTypeHandler}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default FuelStep;
