import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import styles from "@/styles/specifications.module.css";
import Loading from "react-loading";
const Transmission = ({
  setActiveStep,
  activeStep,
  data,
  setState,
  state,
  loading,
}) => {
  const [transmission, setTransmission] = useState("");
  const onTransmissionSelect = (transmission) => {
    setTransmission(transmission);
    setActiveStep(activeStep + 1);
    setState({ ...state, transmission: transmission });
  };
  return (
    <div>
      {loading ? (
        <Loading type="bars" className="m-auto" width={20} height={20} />
      ) : (
        <Stack direction={"row"} spacing={2}>
          {data.map((val, i) => (
            <Button
              key={i}
              sx={{
                color: state.transmission === val ? "#fff" : "#000",
                backgroundColor: state.transmission === val ? "#000" : "#fff",
                border: "1px solid #000",
                "&:hover": {
                  color: state.transmission === val ? "#000" : "#ffffff",
                  backgroundColor: state.transmission === val ? "#fff" : "#000",
                  border: "1px solid #000",
                },
              }}
              type="button"
              onClick={() => onTransmissionSelect(val)}
            >
              {val}
            </Button>
          ))}
        </Stack>
      )}
    </div>
  );
};

export default Transmission;
