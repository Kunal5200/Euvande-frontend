import { getPeriod } from "@/api/apiCalling/listingApi";
import { addCar } from "@/api/apiCalling/vehicle";
import { Autocomplete, Button, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const PeriodStep = ({
  state,
  setState,
  activeStep,
  setActiveStep,
  setCarData,
}) => {
  const [period, setPeriod] = useState([]);
  const dispatch = useDispatch();
  const carInfo = useSelector((state) => state.CarInformation);
  const [periodValue, setPeriodValue] = useState({
    id: carInfo && carInfo.period && carInfo.period.id,
    year: carInfo && carInfo.period && carInfo.period.year,
  });
  const handlePeriod = (e, newValue) => {
    setModelYear(newValue);
    if (newValue) {
      setState({ ...state, period: newValue.id });
    }
  };

  const handleTrimLevel = (e) => {
    const { id, value } = e.target;
    setState({ ...state, [state.trim]: value });
  };
  const handleTrimPeriod = () => {
    if (state.period === "" || state.trim === "") {
      toast.error("Please Enter Trim and Period");
      return false;
    } else {
      let body = {
        periodId: state.period,
        trim: state.trim,
        id: carInfo && carInfo.id,
      };
      addCar({ body, dispatch, setCarData, setActiveStep, activeStep });
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <Autocomplete
            renderInput={(params) => (
              <TextField {...params} label="Year of 1st Registration" />
            )}
            options={period}
            getOptionLabel={(option) => option.year}
            onChange={handlePeriod}
            defaultValue={periodValue}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            label="Trim Level"
            fullWidth
            id="trim"
            onChange={handleTrimLevel}
          />
        </Grid>
      </Grid>
      {/* <Stack direction={"row"} alignItems={"center"} spacing={2} mt={2}>
        <Button
          sx={{ border: "1px solid #000", width: 100, color: "#000" }}
          onClick={handleTrimPeriod}
        >
          Continue
        </Button>
        <Button
          sx={{ border: "1px solid #000", width: 100, color: "#000" }}
          onClick={() => setActiveStep(activeStep - 1)}
        >
          Back
        </Button>
      </Stack> */}
    </div>
  );
};

export default PeriodStep;
