import { Stack } from "@mui/material";
import React from "react";
import Button from "../button";
import styles from "@/styles/specifications.module.css";
import { FaAngleLeft } from "react-icons/fa";
const Seats = ({ setActiveStep, activeStep, setState, state, data }) => {
  const handleChangeSeat = (seat) => {
    setState({ ...state, seats: seat });
    setActiveStep(activeStep + 1);
  };
  return (
    <div>
      <Stack direction={"row"} spacing={2}>
        {data.map((val, i) => (
          <Button
            key={i}
            onClick={() => handleChangeSeat(val)}
            className={
              state.seats === val
                ? styles.selected_btn
                : styles.unselected_btn
            }
            type="button"
          >
            {val}
          </Button>
        ))}
      </Stack>
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

export default Seats;
