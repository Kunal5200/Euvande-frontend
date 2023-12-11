import { Stack } from "@mui/material";
import React from "react";
import Button from "../button";
import styles from "@/styles/specifications.module.css";
import { FaAngleLeft } from "react-icons/fa";
const Seats = ({ setActiveStep, activeStep, setState, state }) => {
  const seats = [
    {
      label: "2",
    },
    {
      label: "3",
    },
    {
      label: "4",
    },
    {
      label: "5",
    },
    {
      label: "6",
    },
    {
      label: "7",
    },
    {
      label: "8",
    },
  ];

  const handleChangeSeat = (seat) => {
    setState({ ...state, seats: seat });
    setActiveStep(activeStep + 1);
  };
  return (
    <div>
      <Stack direction={"row"} spacing={2}>
        {seats.map((val, i) => (
          <Button
            key={i}
            onClick={() => handleChangeSeat(val.label)}
            className={
              state.seats === val.label
                ? styles.selected_btn
                : styles.unselected_btn
            }
            type="button"
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

export default Seats;
