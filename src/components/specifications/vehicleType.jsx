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
          <Grid item xs={3}>
            <Button
              key={i}
              className={
                state.vehicleType === val.label
                  ? styles.selected_btn
                  : styles.unselected_btn
              }
              width={150}
              onClick={() => handleVehicleType(val.label)}
              type="button"
            >
              {val.label}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button
        className={styles.back_btn}
        onClick={() => setActiveStep(activeStep - 1)}
        type="button"
      >
        <FaAngleLeft />
        Back
      </Button>
    </div>
  );
};

export default VehicleType;
