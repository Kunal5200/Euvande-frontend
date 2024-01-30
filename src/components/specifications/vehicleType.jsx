import { Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import Button from "../button";
import styles from "@/styles/specifications.module.css";
import { FaAngleLeft } from "react-icons/fa";
const VehicleType = ({ data, setActiveStep, activeStep, setState, state }) => {
  const [vehicleType, setVehicleType] = useState("");
  const handleVehicleType = (vehicleType) => {
    setVehicleType(vehicleType);
    setActiveStep(activeStep + 1);
    setState({ ...state, vehicleType: vehicleType });
  };
  return (
    <div>
      <Grid container spacing={1}>
        {data.map((val, i) => (
          <Grid item xs={3} key={i}>
            <Button
              className={
                state.vehicleType === val
                  ? styles.selected_btn
                  : styles.unselected_btn
              }
              width={150}
              onClick={() => handleVehicleType(val)}
              type="button"
              textTransform="capitalize"
            >
              {val}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button
        className="custom_btn_white mt-2"
        onClick={() => setActiveStep(activeStep - 1)}
        type="button"
        backgroundColor="#000"
        color="#fff"
        width="100px"
      >
        Back
      </Button>
    </div>
  );
};

export default VehicleType;
