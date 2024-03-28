import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Autocomplete,
  Grid,
  TextField,
  FormHelperText,
  Tooltip,
} from "@mui/material";
import { getPeriod } from "@/api/apiCalling/listingApi";
import { Info } from "@mui/icons-material";
import { loginTextField } from "@/utils/styles";

const PeriodStep = ({ state, setState, carData }) => {
  const [period, setPeriod] = useState([]);
  const dispatch = useDispatch();
  const carInfo = useSelector((state) => state.CarInformation);
  const [periodValue, setPeriodValue] = useState(null); // Initialize with null

  const [modelyear, setModelYear] = useState([]);
  const handlePeriod = (e, newValue) => {
    setModelYear(newValue);
    if (newValue) {
      setState({ ...state, period: newValue.id });
    }
  };

  const handletrimLevelLevel = (e) => {
    const { id, value } = e.target;
    setState({ ...state, [id]: value });
  };

  useEffect(() => {
    if (carData && carData.period) {
      setPeriodValue({
        id: carData.period.id,
        year: carData.period.year,
      });
    }
  }, [carData]);

  useEffect(() => {
    if (carData && carData.make && carData.make.id) {
      let data = {
        makeId: carData.make.id,
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
            value={periodValue}
            loading={!periodValue}
            sx={loginTextField}
          />
          <FormHelperText sx={{ fontSize: 12 }}>
            Select the manufacturing year of the Car
          </FormHelperText>
        </Grid>
        <Grid item lg={6}>
          <TextField
            label="Trim Level"
            fullWidth
            id="trimLevel"
            onChange={handletrimLevelLevel}
            value={state.trimLevel}
            InputProps={{
              endAdornment: (
                <Tooltip title="Trim Level refers to the specific configuration or package of features and options available for a particular model of a vehicle. It determines the level of luxury, performance, and technology included in the car.">
                  <Info sx={{ fill: "#333", cursor: "pointer" }} />
                </Tooltip>
              ),
            }}
            sx={loginTextField}
            helperText="Trim Level : Specific configuration or package of features ."
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PeriodStep;
