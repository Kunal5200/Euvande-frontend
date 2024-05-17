import { countries } from "@/assests/country";
import { loginTextField } from "@/utils/styles";
import { Autocomplete, Box, FormHelperText, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const Origin = ({ state, setState, carData }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const originCountryHandler = (e, newValue) => {
    // console.log(newValue);
    if (newValue) {
      setState({ ...state, originOfCar: newValue.label });
    }
  };

  useEffect(() => {
    if (
      carData &&
      carData.specification &&
      carData.specification.specificationDetails &&
      carData.specification.specificationDetails.manufacturedIn
    ) {
      setSelectedCountry({
        label: carData.specification.specificationDetails.manufacturedIn,
      });
    }
  }, [carData]);

  return (
    <div>
      <Autocomplete
        id="originOfCar"
        sx={loginTextField}
        options={countries}
        autoHighlight
        onChange={originCountryHandler}
        value={selectedCountry}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            {option.label}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
            helperText="Select Manfacturer Country of Car"
          />
        )}
      />

      {/* <TextField
        label="Manufactured Country"
        onChange={originCountryHandler}
        value={state.originOfCar}
        fullWidth
      /> */}
    </div>
  );
};

export default Origin;
