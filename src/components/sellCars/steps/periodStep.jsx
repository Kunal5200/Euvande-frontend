import { getPeriod } from "@/api/apiCalling/listingApi";
import { addCar } from "@/api/apiCalling/vehicle";
import { Info } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
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
  // const [carData, setCarData] = useState(null);
  const carInfo = useSelector((state) => state.CarInformation);
  const [periodValue, setPeriodValue] = useState({
    id: (carInfo && carInfo.period && carInfo.period.id) || "",
    year: (carInfo && carInfo.period && carInfo.period.year) || "",
  });
  const [modelyear, setModelYear] = useState([]);
  const handlePeriod = (e, newValue) => {
    setModelYear(newValue);
    if (newValue) {
      setState({ ...state, period: newValue.id });
      // let body = {
      //   period: newValue.year,
      // };
      // addCar({ body, dispatch, path, router, setCarData, setLoading });
    }
  };

  const handleTrimLevel = (e) => {
    const { id, value } = e.target;
    setState({ ...state, [id]: value });
  };

  useEffect(() => {
    if (carInfo && carInfo.period) {
      setPeriodValue({
        id: (carInfo && carInfo.period && carInfo.period.id) || "",
        year: (carInfo && carInfo.period && carInfo.period.year) || "",
      });
    }
  }, [carInfo]);

  useEffect(() => {
    if (carInfo && carInfo.make && carInfo.make.id) {
      let data = {
        makeId: carInfo.make.id,
      };
      getPeriod({ setPeriod, data });
    }
  }, []);

 

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
          <FormHelperText sx={{ fontSize: 12 }}>
            Select the manfacturing year of the Car
          </FormHelperText>
        </Grid>
        <Grid item lg={6}>
          <TextField
            label="Trim Level"
            fullWidth
            id="trim"
            onChange={handleTrimLevel}
            InputProps={{
              endAdornment: (
                <Tooltip title="Trim level refers to the specific configuration or package of features and options available for a particular model of a vehicle. It determines the level of luxury, performance, and technology included in the car.">
                  <Info sx={{ fill: "#333", cursor: "pointer" }} />
                </Tooltip>
              ),
            }}
            value={state.trim}
            focused={Boolean(state.trim)}
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
