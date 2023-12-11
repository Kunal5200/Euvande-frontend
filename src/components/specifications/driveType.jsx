import { Stack } from "@mui/material";
import React, { useState } from "react";
import Button from "../button";
import styles from "@/styles/specifications.module.css";
import { FaAngleLeft } from "react-icons/fa";
const DriveType = ({ setActiveStep, activeStep, setState, state }) => {
  const driveType4x4 = [
    {
      label: "Yes",
    },
    {
      label: "No",
    },
  ];
  const [driveType, setDriveType] = useState("");

  const handleChangeDriveType = (driveType) => {
    setDriveType(driveType);
    setActiveStep(activeStep + 1);
    setState({ ...state, driveType: driveType });
  };
  return (
    <div>
      <Stack direction="row" spacing={2}>
        {driveType4x4.map((val, i) => (
          <Button
            key={i}
            className={
              state.driveType === val.label
                ? styles.selected_btn
                : styles.unselected_btn
            }
            onClick={() => handleChangeDriveType(val.label)}
            width={100}
            type="button"
          >
            {val.label}
          </Button>
        ))}
      </Stack>
      <Button
        onClick={() => setActiveStep(activeStep - 1)}
        className={styles.back_btn}
      >
        <FaAngleLeft />
        Back
      </Button>
    </div>
  );
};

export default DriveType;
