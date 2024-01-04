import { countries } from "@/assests/country";
import Button from "@/components/button";
import { loginTextField } from "@/utils/styles";
import {
  Autocomplete,
  Box,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const EditAddress = ({ value }) => {
  console.log("first", value);

  const [state, setState] = useState({
    street: "",
    city: "",
    postalCode: "",
    houseNumber: "",
    countryName: "",
  });
  const [error, setError] = useState({
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    countryName: "",
  });
  const [country, setCountry] = useState("");

  const inputChangeHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
  };
  const handleCountryChange = (event, newValue) => {
    setCountry(newValue);
    if (newValue) {
      setState({
        ...state,
        countryName: newValue.label,
      });
      setError({ ...error, countryName: "" });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Box>
        <Typography variant="h5" fontSize={20}>
          Edit Address
        </Typography>
        <Divider style={{ backgroundColor: "#000" }} />
        <Typography fontSize={12} color={"#ff0000"}>
          *Indicates Required
        </Typography>
        <form className="mt-2" onSubmit={submitHandler}>
          <Box>
            <Grid container className="mb-3" spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Street*"
                  fullWidth
                  sx={loginTextField}
                  id="street"
                  onChange={inputChangeHandler}
                  error={error.street}
                  helperText={error.street}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="House Number*"
                  fullWidth
                  sx={loginTextField}
                  id="houseNumber"
                  onChange={inputChangeHandler}
                  error={error.houseNumber}
                  helperText={error.houseNumber}
                />
              </Grid>
            </Grid>
            <Grid container className="mb-3" spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Postal Code*"
                  fullWidth
                  sx={loginTextField}
                  id="postalCode"
                  onChange={inputChangeHandler}
                  error={error.postalCode}
                  helperText={error.postalCode}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="City*"
                  fullWidth
                  sx={loginTextField}
                  id="city"
                  helperText={error.city}
                  error={error.city}
                  onChange={inputChangeHandler}
                />
              </Grid>
            </Grid>
            <Grid container className="mb-3">
              <Grid item xs={12}>
                <Autocomplete
                  id="country"
                  options={countries}
                  autoHighlight
                  onChange={handleCountryChange}
                  sx={loginTextField}
                  value={country}
                  fullWidth
                  getOptionLabel={(option) =>
                    option ? option.label || "" : ""
                  }
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
                      label="Choose a country*"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                      }}
                      error={error.countryName}
                      helperText={error.countryName}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <div className="text-center ">
              <Button className="custom_btn" width={250}>
                <span>Update Address</span>
                <span>Update Address</span>
              </Button>
            </div>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default EditAddress;
