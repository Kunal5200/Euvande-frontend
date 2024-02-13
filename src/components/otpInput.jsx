import React, { useState } from "react";
import OTPInput from "react-otp-input";
import styles from "@/styles/Login.module.css";
import Button from "./button";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { userVerify } from "@/api/apiCalling/authenticationApi";
import Loading from "react-loading";
import logo from "@/logo/EUVandeLogoBlack.svg";
import { Box, FormHelperText } from "@mui/material";
import Image from "next/image";
import { useDispatch } from "react-redux";
const OTPinput = () => {
  const dispatch = useDispatch();
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    let body = {
      otp: otp,
      referenceId: JSON.parse(localStorage.getItem("referenceId")),
    };
    setLoading(true);
    if (otp === "") {
      setError("Please Enter OTP");
      setLoading(false);
      return false;
    } else {
      userVerify({ body, router, setLoading, dispatch });
      return true;
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        {/* <div className="mb-3">
          <h5>🚗 Ultimate Car Marketplace OTP Verification 🚀</h5>
          <p className="f-12 text-center">
            Welcome to the fast lane of car dreams! To ensure a secure and swift
            journey on our Ultimate Car Marketplace, we need to verify your
            identity. Buckle up for a quick and easy OTP (One-Time Password)
            verification process.
          </p>
        </div> */}
        <Box textAlign={"center"} marginBottom={4}>
          <Image src={logo} width={200} />
        </Box>
        <FormHelperText
          sx={{ textAlign: "center", fontSize: 15, color: "#000" }}
        >
          Please Enter OTP sent to your entered Mail
        </FormHelperText>
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
        <Button className="custom_btn mt-4" width="100%">
          {loading ? (
            <Loading
              type="bars"
              color="#ff0000"
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
        <p className="f-12 text-danger">{error}</p>
      </form>
    </div>
  );
};

export default OTPinput;
