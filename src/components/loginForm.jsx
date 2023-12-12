import countryData from "@/assests/countries.json";
import { countries } from "@/assests/country";
import { isEmail, isNumber, isPhonenumber } from "@/utils/regex";
import { loginTextField } from "@/utils/styles";
import { loginValidation } from "@/utils/validation";
import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "./button";
import OTPinput from "./otpInput";
import { useRouter } from "next/router";
import Loading from "react-loading";
import { login, loginUser } from "@/api/apiCalling/authenticationApi";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
const LoginForm = ({ otpShow, setOtpShow }) => {
  const [state, setState] = useState({
    identity: "",
    countryCode: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    let { id, value } = e.target;

    setState({ ...state, [id]: value });
    setError({
      ...error,
      [id]:
        id === "identity"
          ? isEmail(value)
            ? ""
            : "Please Enter valid Email"
          : "",
    });
  };

  const [error, setError] = useState({
    identity: "",
    countryCode: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const loginsubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isEmail(state.identity)) {
      setError({ ...error, identity: "Please Enter Valid Email Id" });
      setLoading(false);
      return;
    }
    let body = {
      email: state.identity,
      password: state.password,
    };

    if (loginValidation({ state, setError, error })) {
      loginUser({ body, router, setLoading });
    } else {
      toast.error("Please Enter Valid Details");
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
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
            <TextField
              variant="outlined"
              label="Enter Your Email*"
              sx={loginTextField}
              fullWidth
              type="text"
              onChange={inputHandler}
              error={error.identity}
              helperText={error.identity}
              className="my-4"
              id="identity"
            />
            <TextField
              type={showPassword ? "text" : "password"}
              className="mb-4"
              variant="outlined"
              fullWidth
              label="Password"
              sx={loginTextField}
              id="password"
              onChange={inputHandler}
              error={error.password}
              helperText={error.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {!showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="text-center ">
            <Button className="custom_btn" width="100%">
              {loading ? (
                <Loading
                  type="bars"
                  className="m-auto"
                  width={20}
                  height={20}
                  color="#000"
                />
              ) : (
                <>
                  <span>Login</span>
                  <span>Login</span>
                </>
              )}
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
