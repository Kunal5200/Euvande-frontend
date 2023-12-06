import countryData from "@/assests/countries.json";
import { countries } from "@/assests/country";
import { isEmail, isNumber, isPhonenumber } from "@/utils/regex";
import { loginTextField } from "@/utils/styles";
import { loginValidation } from "@/utils/validation";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "./button";
import OTPinput from "./otpInput";
import { useRouter } from "next/router";
import { login } from "@/api/apiCalling/authenticationApi";
const LoginForm = ({ otpShow, setOtpShow }) => {
  const [state, setState] = useState({
    identity: "",
    countryCode: "",
    password: "",
  });
  const [viaOtp, setViaOTP] = useState(false);

  const router = useRouter();

  const inputHandler = (e) => {
    let { id, value } = e.target;
    if (value == "") {
      setViaOTP(false);
    } else {
      if (id === "identity") {
        if (isNumber(value)) {
          setViaOTP(true);
          setState({ ...state, [id]: value });
          setError({
            ...error,
            [id]: isPhonenumber(value) ? "" : "Please Enter Valid Phone Number",
          });
        }
      } else {
        setViaOTP(false);
        setState({ ...state, [id]: value });
        setError({
          ...error,
          [id]: isEmail(value) ? "" : "Please Enter Valid Email Id",
        });
      }
    }
  };
  const handleCountryChange = (_, newValue) => {
    if (newValue) {
      setState({ ...state, countryCode: newValue.phone });
      setError({ ...error, countryCode: "" });
    }
  };

  const [error, setError] = useState({
    identity: "",
    countryCode: "",
    password: "",
  });

  const loginsubmitHandler = (e) => {
    e.preventDefault();
    if (viaOtp) {
      if (isNumber(state.identity)) {
        if (!isPhonenumber(state.identity)) {
          setError({ ...error, identity: "Please Enter valid Phone Number" });
          return;
        }
      } else {
        if (!isEmail(state.identity)) {
          setError({ ...error, identity: "Please Enter Valid Email Id" });
          return;
        }
      }
    }
    let body = {
      email: state.identity,
      password: state.password,
    };

    if (loginValidation({ state, setError, error, viaOtp })) {
      if (viaOtp) {
      } else {
        login(body);
      }
    } else {
      toast.error("Please Enter Valid Details");
    }
  };

  return (
    <div>
      {!otpShow ? (
        <form className="text-center p-3" onSubmit={loginsubmitHandler}>
          <h4>Euvande Login</h4>
          <p className="f-12">
            Log in to your Car Marketplace account to access a world of seamless
            car buying and selling. Whether you're here to find your dream car
            or list your vehicle for sale, your journey starts with a simple
            login.
          </p>

          <div>
            {viaOtp && (
              <Autocomplete
                sx={loginTextField}
                options={countries}
                autoHighlight
                onChange={handleCountryChange}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width={20}
                      height={20}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                    error={error.countryCode}
                    helperText={error.countryCode}
                  />
                )}
              />
            )}
            <TextField
              variant="outlined"
              label="Enter Your Email or Phone Number*"
              sx={loginTextField}
              fullWidth
              type="text"
              onChange={inputHandler}
              error={error.identity}
              helperText={error.identity}
              className="my-4"
              id="identity"
            />
            {!viaOtp && (
              <TextField
                type="password"
                className="mb-4"
                variant="outlined"
                fullWidth
                label="Password"
                sx={loginTextField}
                id="password"
                onChange={inputHandler}
                error={error.password}
                helperText={error.password}
              />
            )}
          </div>

          {/* <p
            className="ms-2 text-start f-12 text-decoration-underline pointer"
            onClick={() => setViaOTP(!viaOtp)}
          >
            {viaOtp ? "Login Via Email and Password" : "Login Via OTP"}
          </p> */}
          <div className="text-center ">
            <Button className="custom_btn" width="100%">
              <span>Login</span>
              <span>Login</span>
            </Button>
          </div>
        </form>
      ) : (
        <div className="p-3">
          <h5 className="text-center">Euvande Login</h5>
          <p className="f-12 text-center">
            Welcome back! To ensure the security of your account, we need to
            verify your identity. Please enter the One-Time Password (OTP) sent
            to your registered mobile number.
          </p>
          <OTPinput />
        </div>
      )}
    </div>
  );
};

export default LoginForm;
