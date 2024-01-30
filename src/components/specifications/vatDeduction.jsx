import { Stack } from "@mui/material";
import React from "react";
import Button from "../button";
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
            className={
              state.vatDeduction === val
                ? styles.selected_btn
                : styles.unselected_btn
            }
            width={50}
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

export default Vatdeduction;
