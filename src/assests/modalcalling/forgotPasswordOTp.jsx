import React, { useState } from "react";
import OTPInput from "react-otp-input";
import styles from "@/styles/Login.module.css";
import Loading from "react-loading";
import Button from "@/components/button";
import { verifyForgotPasswordOTP } from "@/api/apiCalling/authenticationApi";
import { useDispatch } from "react-redux";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginTextField } from "@/utils/styles";
const OTPverifyPassword = () => {
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    otp: "",
    password: "",
  });
  const [tooglePassword, setTooglePassword] = useState(false);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    let body = {
      otp: otp,
      referenceId: JSON.parse(localStorage.getItem("referenceId")),
      password: password,
    };
    e.preventDefault();
    if (otp === "" || password === "") {
      setError({
        ...error,
        otp: otp === "" && "Please Enter OTP",
        password: password === "" && "Please Enter Password",
      });
      return false;
    } else {
      verifyForgotPasswordOTP({ body, setLoading, dispatch });
      return true;
    }
  };
  return (
    <Box width={500}>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <h5>🚗 Ultimate Car Marketplace OTP Verification 🚀</h5>
          <p className="f-12 text-center">
            Welcome to the fast lane of car dreams! To ensure a secure and swift
            journey on our Ultimate Car Marketplace, we need to verify your
            identity. Buckle up for a quick and easy OTP (One-Time Password)
            verification process.
          </p>
        </div>
        <OTPInput
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => (
            <input {...props} className={styles.inputOTP} />
          )}
          containerStyle={{
            justifyContent: "space-between",
          }}
          onChange={setOTP}
          value={otp}
        />
        {error.otp && <p className="f-12 text-danger">{error.otp}</p>}

        <TextField
          type={tooglePassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={() => setTooglePassword(!tooglePassword)}>
                  {tooglePassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          sx={loginTextField}
          className="mt-5"
          label="Enter New password*"
          helperText={error.password}
          error={error.password}
        />
        <Button className="custom_btn mt-4" width="100%">
          {loading ? (
            <Loading
              type="bars"
              color="#000"
              width={20}
              height={20}
              className="m-auto"
            />
          ) : (
            <>
              <span>Submit OTP</span>
              <span>Submit OTP</span>
            </>
          )}
        </Button>
      </form>
    </Box>
  );
};

export default OTPverifyPassword;
