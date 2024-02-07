import { Button, Stack } from "@mui/material";
import React from "react";
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
            sx={{
              color: state.seats === val ? "#fff" : "#000",
              backgroundColor: state.seats === val ? "#000" : "#fff",
              border: "1px solid #000",
              "&:hover": {
                color: state.seats === val ? "#000" : "#ffffff",
                backgroundColor: state.seats === val ? "#fff" : "#000",
                border: "1px solid #000",
              },
              textTransform: "capitalize",
              width: 100,
            }}
            type="button"
          >
            {val}
          </Button>
        ))}
      </Stack>
      <Button onClick={() => setActiveStep(activeStep - 1)} sx={{ mt: 2 }}>
        <FaAngleLeft /> Back
      </Button>
    </div>
  );
};

export default Seats;
