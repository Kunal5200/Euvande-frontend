import { authControllers } from "@/api/authentication";
import { countries } from "@/assests/country";
import Button from "@/components/button";
import { hideModal } from "@/redux/reducers/modal";
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
import Loading from "react-loading";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const EditAddress = ({ value, getAddress }) => {
  const [state, setState] = useState({
    street: value.street || "",
    city: value.city || "",
    postalCode: value.postalCode || "",
    houseNumber: value.houseNo || "",
    country: value.country || "",
    id: value.id,
  });
  const dispatch = useDispatch();
  const [error, setError] = useState({
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    country: "",
  });
  const [country, setCountry] = useState({
    label: value.country || "",
    code: value.countryCode || "",
  });

  const inputChangeHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
  };
  const handleCountryChange = (event, newValue) => {
    setCountry(newValue);
    if (newValue) {
      setState({
        ...state,
        country: newValue.label,
      });
      setError({ ...error, countryName: "" });
    }
  };
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    authControllers
      .editAddress(state)
      .then((res) => {
        toast.success(res.data.data);
        setLoading(false);
        dispatch(hideModal());
        getAddress();
      })
      .catch((err) => {
        let errMessage = err.response.data.message || err.message;
        toast.error(errMessage);
        setLoading(false);
      });
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
                  value={state.street}
                  focused={state.street != "" ? true : false}
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
                  value={state.houseNumber}
                  focused={state.houseNumber != "" ? true : false}
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
                  value={state.postalCode}
                  focused={state.postalCode != "" ? true : false}
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
                  value={state.city}
                  focused={state.city != "" ? true : false}
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
              <Button className="custom_btn" width={250} disabled={loading}>
                {loading ? (
                  <Loading
                    type="bars"
                    color="#ffdb58"
                    width={20}
                    height={20}
                    className="m-auto"
                  />
                ) : (
                  <>
                    <span>Update Address</span>
                    <span>Update Address</span>
                  </>
                )}
              </Button>
            </div>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default EditAddress;
