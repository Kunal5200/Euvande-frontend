import { Stack } from "@mui/material";
import React from "react";
import Button from "../button";
import styles from "@/styles/specifications.module.css";
import { FaAngleLeft } from "react-icons/fa";
const Vatdeduction = ({ setActiveStep, activeStep, setState, state }) => {
  const vat = [
    {
      label: "Yes",
    },
    {
      label: "No",
    },
  ];
  const handleChangeVat = (vat) => {
    setState({ ...state, vatDeduction: vat });
    setActiveStep(activeStep + 1);
  };
  return (
    <div>
      <Stack direction={"row"} spacing={2}>
        {vat.map((val, i) => (
          <Button
            type="button"
            key={i}
            onClick={() => handleChangeVat(val.label)}
            className={
              state.vatDeduction === val.label
                ? styles.selected_btn
                : styles.unselected_btn
            }
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

export default Vatdeduction;
