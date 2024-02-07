import { Button, Stack } from "@mui/material";
import React from "react";
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
            sx={{
              color: state.interiorMaterial === val ? "#fff" : "#000",
              backgroundColor: state.interiorMaterial === val ? "#000" : "#fff",
              border: "1px solid #000",
              "&:hover": {
                color: state.interiorMaterial === val ? "#000" : "#ffffff",
                backgroundColor:
                  state.interiorMaterial === val ? "#fff" : "#000",
                border: "1px solid #000",
              },
              textTransform: "capitalize",
              width: 100,
            }}
          >
            {val}
          </Button>
        ))}
      </Stack>
      <Button onClick={() => setActiveStep(activeStep - 1)} sx={{ mt: 2 }}>
        Back
      </Button>
    </div>
  );
};

export default Interior;
