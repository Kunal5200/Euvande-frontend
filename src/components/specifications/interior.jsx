import { Stack } from "@mui/material";
import React from "react";
import Button from "../button";
import styles from "@/styles/specifications.module.css";
import { FaAngleLeft } from "react-icons/fa";
const Interior = ({ setState, state, setActiveStep, activeStep, data }) => {
  const handelChangeInterior = (interior) => {
    setState({ ...state, interiorMaterial: interior });
    setActiveStep(activeStep + 1);
  };
  return (
    <div>
      <Stack direction={"row"} spacing={2}>
        {data.map((val, i) => (
          <Button
            key={i}
            onClick={() => handelChangeInterior(val.label)}
            type="button"
            className={
              state.interiorMaterial === val.label
                ? styles.selected_btn
                : styles.unselected_btn
            }
          >
            {val.label}
          </Button>
        ))}
      </Stack>
      <Button
        className={styles.back_btn}
        onClick={() => setActiveStep(activeStep - 1)}
      >
        <FaAngleLeft />
        Back
      </Button>
    </div>
  );
};

export default Interior;
