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
            onClick={() => handelChangeInterior(val)}
            type="button"
            className={
              state.interiorMaterial === val
                ? styles.selected_btn
                : styles.unselected_btn
            }
            textTransform="capitalize"
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

export default Interior;
