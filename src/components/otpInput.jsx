import React, { useState } from "react";
import OTPInput from "react-otp-input";
import styles from "@/styles/Login.module.css";
import Button from "./button";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const OTPinput = () => {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    if (otp === "") {
      setError("Please Enter OTP");
      return false;
    } else {
      toast.success("Login Succesfully");
      router.push("/");
      return true;
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <OTPInput
          numInputs={4}
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
          <span>Submit OTP</span>
          <span>Submit OTP</span>
        </Button>
        <p className="f-12 text-danger">{error}</p>
      </form>
    </div>
  );
};

export default OTPinput;
