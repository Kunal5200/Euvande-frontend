import {
  getUserProfile,
  updateUserDetails,
} from "@/api/apiCalling/authenticationApi";
import { countries } from "@/assests/country";
import Button from "@/components/button";
import LinkTab from "@/components/linktab";
import { isEmail, isPhonenumber } from "@/utils/regex";
import { loginTextField } from "@/utils/styles";
import { contactValidation } from "@/utils/validation";
import CheckIcon from "@mui/icons-material/Check";
import { Autocomplete, Box, Card, Grid, Stack, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loading from "react-loading";
const ContactInformation = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    setError({
      ...error,
      [id]:
        id === "phoneNumber"
          ? isPhonenumber(value)
            ? ""
            : "Please Enter Valid Phone Number"
          : id === "email"
          ? isEmail(value)
            ? ""
            : "Please Enter Valid Email Id"
          : "",
    });
  };

  const [error, setError] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    zipCode: "",
  });
  const [state, setState] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    zipCode: "",
    countryCode: "",
  });

  const [loading, setLoading] = useState(false);

  const [country, setCountry] = useState("");
  const handleCountryChange = (event, newValue) => {
    if (newValue) {
      setState({
        ...state,
        country: newValue.label,
        countryCode: newValue.phone,
      });
      setCountry(newValue);

      setError({ ...error, country: "" });
    } else {
      setState({ ...state, country: "" });
    }
  };
  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    let body = {
      name: state.name,
      countryName: state.country,
      zipCode: state.zipCode,
      phoneNo: state.phoneNumber,
      countryCode: state.countryCode,
      email: state.email,
    };
    if (contactValidation({ state, error, setError })) {
      updateUserDetails({ body, setLoading, router });

      localStorage.setItem("userDetails", JSON.stringify(state));
    } else {
      toast.error("Please Enter Details");
    }
  };

  const [show, setShow] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getUserProfile({ setState, state, setUser, dispatch });
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-9">
            <LinkTab />

            <Card className="">
              <h5 className="border-bottom p-4">Contact information</h5>
              {show ? (
                <Grid
                  container
                  sx={{ backgroundColor: "#0080001f", padding: "8px" }}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item xs={6}>
                    <Stack direction="row" className="text-success fw-bold p-3">
                      <CheckIcon className="me-2" />
                      <p className="mb-0">Please Confirm Your Details</p>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <p className="mb-0 text-success f-12">
                      YOU ARE LOGGED IN WITH THE E-MAIL:
                    </p>
                    <span className="text-success f-13 fw-bold">
                      {state && user.email ? user.email : ""}
                    </span>
                  </Grid>
                </Grid>
              ) : (
                <Grid container className="p-3 mt-2">
                  <Grid item xs={6}>
                    <TextField
                      id="email"
                      onChange={inputHandler}
                      label="Email*"
                      fullWidth
                      sx={loginTextField}
                      error={error.email}
                      helperText={error.email}
                      value={state.email}
                    />
                  </Grid>
                </Grid>
              )}

              <form onSubmit={submitHandler}>
                <Grid container spacing={2} className=" p-3">
                  <Grid item xs={6}>
                    <TextField
                      label="Full Name*"
                      fullWidth
                      sx={loginTextField}
                      onChange={inputHandler}
                      id="name"
                      variant="outlined"
                      error={error.name}
                      helperText={error.name}
                      value={state.name}
                      focused={
                        state.name === "" || state.name === null ? false : true
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Phone Number*"
                      fullWidth
                      sx={loginTextField}
                      onChange={inputHandler}
                      id="phoneNumber"
                      error={error.phoneNumber}
                      helperText={error.phoneNumber}
                      value={state.phoneNumber}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} className=" p-3">
                  <Grid item xs={6}>
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
                          error={error.country}
                          helperText={error.country}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Zip Code*"
                      fullWidth
                      id="zipCode"
                      onChange={inputHandler}
                      sx={loginTextField}
                      error={error.zipCode}
                      helperText={error.zipCode}
                    />
                  </Grid>
                </Grid>
                <div className="text-end my-3 p-3">
                  <Button className="custom_btn" width="200px">
                    {loading ? (
                      <Loading
                        type="bars"
                        color="#000"
                        className="m-auto"
                        width={20}
                        height={20}
                      />
                    ) : (
                      <>
                        <span>Continue</span>
                        <span>Continue</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
          <div className="col-sm-3">
            <Card>Hello</Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
