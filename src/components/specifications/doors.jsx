import { Stack } from "@mui/material";
import React, { useState } from "react";
import Button from "../button";
import styles from "@/styles/specifications.module.css";
import { FaAngleLeft } from "react-icons/fa";
const Doors = ({ data, setActiveStep, activeStep, setState, state }) => {
  const [doors, setDoors] = useState("");

  const handleChangeDoors = (doors) => {
    setDoors(doors);
    setActiveStep(activeStep + 1);
    setState({ ...state, doors: doors });
  };
  return (
    <div>
      <Stack direction={"row"} spacing={2}>
        {data.map((val, i) => (
          <Button
            key={i}
            onClick={() => handleChangeDoors(val.label)}
            className={
              val.label === state.doors
                ? styles.selected_btn
                : styles.unselected_btn
            }
            type="button"
            width={70}
          >
            {val.label}
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

export default Doors;
