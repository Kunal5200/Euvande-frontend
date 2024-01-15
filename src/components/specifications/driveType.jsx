import { Stack } from "@mui/material";
import React, { useState } from "react";
import Button from "../button";
import styles from "@/styles/specifications.module.css";
import { FaAngleLeft } from "react-icons/fa";
const DriveType = ({ setActiveStep, activeStep, setState, state, data }) => {
  // const [driveType, setDriveType] = useState("");
  const handleChangeDriveType = (driveType) => {
    // setDriveType(driveType);
    setActiveStep(activeStep + 1);
    setState({ ...state, driveType: driveType });
  };
  return (
    <div>
      <Stack direction="row" spacing={2}>
        {data.map((val, i) => (
          <Button
            key={i}
            className={
              state.driveType === val
                ? styles.selected_btn
                : styles.unselected_btn
            }
            onClick={() => handleChangeDriveType(val)}
            width={100}
            type="button"
          >
            {val}
          </Button>
        ))}
      </Stack>
      <Button
        onClick={() => setActiveStep(activeStep - 1)}
        className={styles.back_btn}
        type="button"
      >
        <FaAngleLeft />
        Back
      </Button>
    </div>
  );
};

export default DriveType;
