import { Stack } from "@mui/material";
import React, { useState } from "react";
import Button from "../button";
import styles from "@/styles/specifications.module.css";
const Transmission = ({ setActiveStep, activeStep, data, setState, state }) => {
  const [transmission, setTransmission] = useState("");
  const onTransmissionSelect = (transmission) => {
    setTransmission(transmission);
    setActiveStep(activeStep + 1);
    setState({ ...state, transmission: transmission });
  };
  return (
    <div>
      <Stack direction={"row"} spacing={2}>
        {data.map((val, i) => (
          <Button
            key={i}
            className={
              state.transmission === val.name
                ? styles.selected_btn
                : styles.unselected_btn
            }
            type="button"
            onClick={() => onTransmissionSelect(val.name)}
          >
            {val.name}
          </Button>
        ))}
      </Stack>
    </div>
  );
};

export default Transmission;
