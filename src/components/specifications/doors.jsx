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
            onClick={() => handleChangeDoors(val)}
            className={
              val.label === state.doors
                ? styles.selected_btn
                : styles.unselected_btn
            }
            type="button"
            width={70}
          >
            {val}
          </Button>
        ))}
      </Stack>
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

export default Doors;
