import { authControllers } from "@/api/authentication";
import { loginTextField } from "@/utils/styles";
import { addAddressValidation } from "@/utils/validation";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { countries } from "../assests/country";
import { ChevronLeft } from "@mui/icons-material";

const AddAddress = () => {
  const [state, setState] = useState({
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    countryName: "",
    addressType: "home",
  });
  const router = useRouter();
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState({
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    countryName: "",
  });
  const inputChangeHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    setError({ ...error, [id]: "" });
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
  const handleAddressType = (e) => {
    let { checked, value } = e.target;
    if (value === "home" || value === "office") {
      setState({ ...state, addressType: value });
    } else {
      setState({ ...state, addressType: value });
    }
  };

  const addUserAddress = () => {
    let body = {
      street: state.street,
      houseNo: state.houseNumber,
      postalCode: state.postalCode,
      city: state.city,
      country: state.countryName,
      isDefault: false,
      addressType: state.addressType,
    };
    authControllers
      .addAddress(body)
      .then((res) => {
        toast.success(res.data.message);
        router.push("/manage-address");
      })
      .catch((err) => {
        let errMessage =
          (err.response && err.response.data.message) || err.message;
        toast.error(errMessage);
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (addAddressValidation({ state, setError, error })) {
      addUserAddress();
    } else {
      toast.error("Please Enter Required Fields");
    }
  };
  return (
    <Container maxWidth="lg">
      {/* <Button>
        <ChevronLeft /> back
      </Button> */}
      <Box>
        <Typography variant="h6" mt={{ xs: 1 }}>
          Add New Address{" "}
        </Typography>
        {/* <Divider style={{ backgroundColor: "#000" }} /> */}

        <Typography fontSize={10} color={"#ff0000"} variant="p">
          *Indicates Required
        </Typography>
        <form onSubmit={submitHandler}>
          <Box mt={1}>
            <Grid container className="mb-3" spacing={2}>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
            <Grid container mb={3} spacing={2}>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
            <FormLabel>Address Type*</FormLabel>
            <RadioGroup
              row
              defaultValue={"home"}
              onChange={handleAddressType}
              id="addressType"
              sx={{ mb: 3 }}
            >
              <FormControlLabel
                value={"home"}
                control={<Radio defaultValue={"home"} />}
                label="Home"
              />
              <FormControlLabel
                value={"office"}
                control={<Radio defaultValue={"office"} />}
                label="Office"
              />
              <FormControlLabel
                value={"other"}
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            {state.addressType === "home" || state.addressType === "office" ? (
              <></>
            ) : (
              <TextField
                type="text"
                label="Address Type*"
                sx={loginTextField}
                id="addressType"
                className="mb-3"
                onChange={handleAddressType}
                fullWidth
              />
            )}
            <div className="text-center ">
              <Button
                sx={{
                  border: "1px solid #000",
                  backgroundColor: "#000",
                  color: "#fff",
                  ":hover": {
                    color: "#fff",
                    backgroundColor: "#000",
                  },
                }}
                fullWidth
                type="submit"
              >
                Add Address
              </Button>
            </div>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddAddress;
