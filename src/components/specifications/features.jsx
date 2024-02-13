import { loginTextField } from "@/utils/styles";
import { Box, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../button";
import { useSelector } from "react-redux";

const Features = ({ setActiveStep, activeStep, state, setState }) => {
  const inputHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    setError({ ...error, [id]: "" });
  };
  const [error, setError] = useState({
    power: "",
    color: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (state.power === "" || state.color === "") {
      setError({
        ...error,
        power: state.power === "" && "Please Enter Engine Power in KWs",
        color: state.color === "" && "Please enter the Car Color",
      });
      return false;
    } else {
      setActiveStep(activeStep + 1);
      //   console.log(state);
      return true;
    }
  };
  const carInfo = useSelector((state) => state.CarInformation);

  useEffect(() => {
    setState({
      ...state,
      power:
        (carInfo && carInfo.specification && carInfo.specification.power) || "",
      color:
        (carInfo && carInfo.specification && carInfo.specification.color) || "",
    });
  }, [carInfo]);
  return (
    <Box>
      <form onSubmit={submitHandler}>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <TextField
            sx={loginTextField}
            label="Power (kw)*"
            id="power"
            onChange={inputHandler}
            error={Boolean(error.power)}
            helperText={error.power}
            value={state.power}
            focused={state.power != "" ? true : false}
          />
          <TextField
            sx={loginTextField}
            label="Color*"
            id="color"
            onChange={inputHandler}
            error={Boolean(error.color)}
            helperText={error.color}
            value={state.color}
            focused={state.color != "" ? true : false}
          />
        </Stack>
        <Stack
          direction={"row"}
          marginTop={2}
          alignItems={"center"}
          spacing={2}
        >
          <Button className="custom_btn" width="100px">
            <span>Submit</span>
            <span>Submit</span>
          </Button>
          <Button
            className="custom_btn_white"
            type="button"
            backgroundColor="#000"
            color="#fff"
            width="100px"
            onClick={() => setActiveStep(activeStep - 1)}
          >
            <span>Back</span>
            <span>Back</span>
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Features;
