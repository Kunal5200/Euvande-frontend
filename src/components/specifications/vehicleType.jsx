import { Button, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
// import Button from "../button";
import styles from "@/styles/specifications.module.css";
import { FaAngleLeft } from "react-icons/fa";
const VehicleType = ({ data, setActiveStep, activeStep, setState, state }) => {
  console.log(state)
  const handleVehicleType = (vehicleType) => {
    setActiveStep(activeStep + 1);
    setState({ ...state, vehicleType: vehicleType });
  };
  return (
    <div>
      <Grid container spacing={1}>
        {data.map((val, i) => (
          <Grid item lg={3} key={i}>
            <Button
              sx={{
                color: state.vehicleType === val ? "#fff" : "#000",
                backgroundColor: state.vehicleType === val ? "#000" : "#fff",
                border: "1px solid #000",
                "&:hover": {
                  color: state.vehicleType === val ? "#000" : "#ffffff",
                  backgroundColor: state.vehicleType === val ? "#fff" : "#000",
                  border: "1px solid #000",
                },
                textTransform: "capitalize",
                width: 150,
              }}
              onClick={() => handleVehicleType(val)}
            >
              {val}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button
        sx={{ mt: 2, width: 150 }}
        onClick={() => setActiveStep(activeStep - 1)}
      >
        {" "}
        <FaAngleLeft /> Back
      </Button>
      {/* <Button
        className="custom_btn_white mt-2"
        onClick={() => setActiveStep(activeStep - 1)}
        type="button"
        backgroundColor="#000"
        color="#fff"
        width="100px"
      >
        Back
      </Button> */}
    </div>
  );
};

export default VehicleType;
