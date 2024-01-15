import { Stack } from "@mui/material";
import React, { useState } from "react";
import Button from "../button";
import styles from "@/styles/specifications.module.css";
import Loading from "react-loading";
const Transmission = ({
  setActiveStep,
  activeStep,
  data,
  setState,
  state,
  loading,
}) => {
  const [transmission, setTransmission] = useState("");
  const onTransmissionSelect = (transmission) => {
    setTransmission(transmission);
    setActiveStep(activeStep + 1);
    setState({ ...state, transmission: transmission });
  };
  return (
    <div>
      {loading ? (
        <Loading type="bars" className="m-auto" width={20} height={20} />
      ) : (
        <Stack direction={"row"} spacing={2}>
          {data.map((val, i) => (
            <Button
              key={i}
              className={
                state.transmission === val
                  ? styles.selected_btn
                  : styles.unselected_btn
              }
              type="button"
              onClick={() => onTransmissionSelect(val)}
            >
              {val}
            </Button>
          ))}
        </Stack>
      )}
    </div>
  );
};

export default Transmission;
