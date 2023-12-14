import { loginTextField } from "@/utils/styles";
import { Autocomplete, Box, Divider, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { countries } from "../country";
import Button from "@/components/button";
import { useDispatch } from "react-redux";
import { hideModal } from "@/redux/reducers/modal";

const EditUserProfile = () => {
  const dispatch = useDispatch();
  const cancelHandler = () => {
    dispatch(hideModal());
  };
  const [country, setCountry] = useState("");
  const handleCountryChange = (event, newValue) => {
    console.log(newValue);
    setCountry(newValue);
  };
  return (
    <div style={{ width: "600px" }}>
      <div className="container-fluid">
        <div className="">
          <h4 className="mb-2">Edit Details</h4>
        </div>
        <Divider style={{ backgroundColor: "#000 " }} />

        <form className="mt-5">
          <Grid container className="mb-3" spacing={2}>
            <Grid item xs={6}>
              <TextField label="Name*" sx={loginTextField} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Email*" sx={loginTextField} fullWidth />
            </Grid>
          </Grid>
          <Grid container className="mb-3" spacing={2}>
            <Grid item xs={6}>
              <TextField label="Phone Number*" sx={loginTextField} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="country"
                options={countries}
                autoHighlight
                onChange={handleCountryChange}
                sx={loginTextField}
                value={country}
                fullWidth
                getOptionLabel={(option) => (option ? option.label || "" : "")}
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
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container className="mb-2">
            <Grid item xs={6}></Grid>

            <Grid item xs={6} className="text-end">
              <Button
                className="custom_btn_white"
                width="200px"
                backgroundColor="#000"
                color="#fff"
              >
                <span>Save Changes</span>
                <span>Save Changes</span>
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfile;
