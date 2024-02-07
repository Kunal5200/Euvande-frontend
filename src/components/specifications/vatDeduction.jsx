import { Button, Stack } from "@mui/material";
import React from "react";
import styles from "@/styles/specifications.module.css";
import { FaAngleLeft } from "react-icons/fa";
const Vatdeduction = ({ setActiveStep, activeStep, setState, state, data }) => {
  const handleChangeVat = (vat) => {
    setState({ ...state, vatDeduction: vat });
    setActiveStep(activeStep + 1);
  };
  return (
    <div>
      <Stack direction={"row"} spacing={2}>
        {data.map((val, i) => (
          <Button
            type="button"
            key={i}
            onClick={() => handleChangeVat(val)}
            sx={{
              color: state.vatDeduction === val ? "#fff" : "#000",
              backgroundColor: state.vatDeduction === val ? "#000" : "#fff",
              border: "1px solid #000",
              "&:hover": {
                color: state.vatDeduction === val ? "#000" : "#ffffff",
                backgroundColor:
                  state.vatDeduction === val ? "#fff" : "#000",
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
        <FaAngleLeft /> Back
      </Button>
    </div>
  );
};

export default Vatdeduction;
