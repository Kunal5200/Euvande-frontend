import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Transmission = ({ data, state, setState, carData }) => {
  const addTransmission = (val) => {
    setState({ ...state, transmission: val });
  };

  const [selectedTransmission, setSelectedTransmission] = useState(null);
  const carInfo = useSelector((state) => state.CarInformation);
  const transmissionHandler = (e, newValue) => {
    setState({ ...state, transmission: newValue });
  };
  // console.log("speed", carInfo);
  useEffect(() => {
    if (
      carInfo &&
      carInfo.specification &&
      carInfo.specification.transmission
    ) {
      setSelectedTransmission(
        carInfo && carInfo.specification && carInfo.specification.transmission
      );
    }
  }, [carInfo.specification]);

  return (
    <div>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        {data &&
          data.transmission &&
          data.transmission.map((val, i) => (
            <Button
              key={i}
              sx={{
                border: "1px solid #000",
                color: state && state.transmission === val ? "#fff" : "#000",
                backgroundColor:
                  state && state.transmission === val ? "#000" : "#fff",
                ":hover": {
                  backgroundColor: state.transmission === val ? "#000" : "#fff",
                },
                fontSize: 12,
              }}
              onClick={() => addTransmission(val)}
            >
              {val}
            </Button>
          ))}
      </Stack>
      {/* <Grid container spacing={2}>
        <Grid item lg={12}>
          <Autocomplete
            options={data.transmission}
            renderInput={(params) => (
              <TextField {...params} label="Select Transmission" />
            )}
            value={selectedTransmission}
            onChange={transmissionHandler}
          />
        </Grid>
      </Grid> */}
    </div>
  );
};

export default Transmission;
