import {
  phoneOtpVerify,
  sendOtpEmail,
  updatePhoneNumber,
  updateUserDetails,
  verifyOtpEmail,
} from "@/api/apiCalling/authenticationApi";
import { isEmail } from "@/utils/regex";
import { loginTextField } from "@/utils/styles";
import { updateDetailsValidation } from "@/utils/validation";
import { ArrowBack, Email, Person, Phone } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProfileInformation = () => {
  const user = useSelector((state) => state.userInfo);
  const router = useRouter();
  const [state, setState] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    countryCode: "",
  });
  const [phone, setPhone] = useState(null);
  const [showGetOtpButtonEmail, setGetOtpButtonEmail] = useState(false);
  const [showGetPhoneOtpButton, setShowGetPhoneOtpButton] = useState(false);

  const mobileChangeHandler = (newPhone, countryData) => {
    setPhone(newPhone);
    const valid = matchIsValidTel(newPhone);
    if (valid) {
      setState({
        ...state,
        phoneNumber: countryData.nationalNumber,
        countryCode: countryData.countryCallingCode,
      });
      setShowGetPhoneOtpButton(true);
    } else {
      setShowGetPhoneOtpButton(false);
    }
  };
  const inputChangeHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    if (id === "email") {
      isEmail(value) ? setGetOtpButtonEmail(true) : setGetOtpButtonEmail(false);
    }
  };
  useEffect(() => {
    if (user) {
      setState({
        ...state,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNo,
        countryCode: user.countryCode,
      });

      setPhone(user.phoneNo ? `+${user.countryCode} ${user.phoneNo}` : null);
    }
  }, [user]);
  const [userData, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState({
    name: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
  });
  // email otp
  const [emailOtp, setEmailOTP] = useState("");
  const [otpEmailLoading, setOtpEmailLoading] = useState(false);
  const [emailOtpField, setEmailOtpField] = useState(false);
  const sendOtpOnEmail = () => {
    setOtpEmailLoading(true);
    let body = {
      email: state.email,
    };
    sendOtpEmail({
      data: body,
      setLoading: setOtpEmailLoading,
      showOtpField: setEmailOtpField,
      showOtpButton: setGetOtpButtonEmail,
    });
  };
  const emailOtpHandler = (e) => {
    if (e.target.value > 6) {
      return;
    }
    setEmailOTP(e.target.value);
  };
  const [emailOtpLoading, setEmailOtpLoading] = useState(false);
  const verifyEmailOtp = () => {
    let body = {
      otp: emailOtp,
      referenceId: parseInt(localStorage.getItem("referenceId")),
    };
    if (emailOtp === "" || emailOtp.length > 6) {
      toast.error("Please Enter Valid OTP");
    } else {
      setEmailOtpLoading(true);
      verifyOtpEmail({
        data: body,
        showOtpField: setEmailOtpField,
        setLoading: setEmailOtpLoading,
      });
    }
  };

  //  phone otp
  const [showPhoneOtpField, setShowPhoneOtpField] = useState(false);
  const [mobileOtpLoading, setMobileOtpLoading] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneOtpLoading, setPhoneOtpLoading] = useState(false);
  const sendOtpPhone = () => {
    let body = {
      phoneNo: state.phoneNumber,
      countryCode: state.countryCode,
    };
    if (state.phoneNumber === "") {
      toast.success("Please Enter Valid Phone Number");
    } else {
      setMobileOtpLoading(true);
      updatePhoneNumber({
        data: body,
        setLoading: setMobileOtpLoading,
        showOtpField: setShowPhoneOtpField,
      });
    }
  };
  const phoneOtpHandler = (e) => {
    const numericRegex = /^[0-9]*$/;

    if (!numericRegex.test(e.target.value)) {
      return;
    }

    if (e.target.value.length > 6) {
      return;
    }

    // Set the phone OTP state with the entered value
    setPhoneOtp(e.target.value);
  };
  const verifyOtpPhone = () => {
    let body = {
      otp: phoneOtp,
      referenceId: parseInt(localStorage.getItem("referenceId")),
    };
    if (phoneOtp === "" || phoneOtp.length > 6) {
      toast.error("Please Enter Valid OTP");
    } else {
      phoneOtpVerify({
        data: body,
        setLoading: setPhoneOtpLoading,
        showOTPfield: setShowPhoneOtpField,
        showGetOtpButton: setShowGetPhoneOtpButton,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (updateDetailsValidation({ state, setError, error })) {
      setLoading(true);
      let body = {
        name: state.name,
        email: state.email,
        countryCode: state.countryCode,
        phoneNo: state.phoneNumber,
      };

      updateUserDetails({ body, setLoading, setUser, dispatch });
    } else {
      toast.error("All Fields are Mandatory");
    }
  };
  return (
    <div>
      <Container maxWidth="lg">
        <Stack direction={"row"} alignItems={"center"} spacing={2} py={2}>
          <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
            Profile Information
          </Typography>
        </Stack>
        <form onSubmit={submitHandler}>
          <Box sx={{ mt: 2 }}>
            <Grid container mb={4}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  id="name"
                  value={state.name}
                  sx={loginTextField}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                  onChange={inputChangeHandler}
                />
              </Grid>
            </Grid>
            {emailOtpField ? (
              <Grid container mb={4} alignItems={"center"} spacing={2}>
                <Grid item xs={9}>
                  <TextField
                    label="Enter OTP"
                    value={emailOtp}
                    fullWidth
                    sx={loginTextField}
                    onChange={emailOtpHandler}
                    type="number"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    sx={{ border: "1px solid #d7d7d7", color: "#000", p: 1.6 }}
                    onClick={verifyEmailOtp}
                  >
                    {emailOtpLoading ? (
                      <Loading
                        type="bars"
                        width={20}
                        height={20}
                        className="m-auto"
                        color="#000"
                      />
                    ) : (
                      "verify"
                    )}
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container alignItems={"center"} mb={4} spacing={2}>
                <Grid item xs={showGetOtpButtonEmail ? 9 : 12}>
                  <TextField
                    fullWidth
                    label="Email"
                    id="email"
                    value={state.email}
                    type="email"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                    onChange={inputChangeHandler}
                    sx={loginTextField}
                  />
                </Grid>
                {showGetOtpButtonEmail && (
                  <Grid item xs={3}>
                    <Button
                      sx={{
                        border: "1px solid #d7d7d7",
                        p: 2,
                        color: "#000",
                        fontSize: 12,
                      }}
                      onClick={sendOtpOnEmail}
                    >
                      {otpEmailLoading ? (
                        <Loading
                          type="bars"
                          width={20}
                          height={20}
                          className="m-auto"
                          color="#000"
                        />
                      ) : (
                        "verify"
                      )}
                    </Button>
                  </Grid>
                )}
              </Grid>
            )}
            {showPhoneOtpField ? (
              <Grid container spacing={2} mb={4} alignItems={"center"}>
                <Grid item xs={9}>
                  <TextField
                    label="Enter OTP"
                    sx={loginTextField}
                    value={phoneOtp}
                    onChange={phoneOtpHandler}
                    fullWidth
                    type="number"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    sx={{ border: "1px solid #000", color: "#000", p: 1.5 }}
                    onClick={verifyOtpPhone}
                  >
                    {phoneOtpLoading ? (
                      <Loading
                        type="bars"
                        color="#000"
                        width={20}
                        height={20}
                        className="m-auto"
                      />
                    ) : (
                      "Verify"
                    )}
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container mb={4} spacing={2} alignItems={"center"}>
                <Grid item xs={showGetPhoneOtpButton ? 9 : 12}>
                  <MuiTelInput
                    value={phone}
                    continents={["EU"]}
                    defaultCountry="DE"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Phone />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    label="Phone Number"
                    onChange={mobileChangeHandler}
                    sx={loginTextField}
                  />
                </Grid>
                {showGetPhoneOtpButton && (
                  <Grid item xs={3}>
                    <Button
                      sx={{ border: "1px solid #000", color: "#000", p: 1.5 }}
                      onClick={sendOtpPhone}
                    >
                      {mobileOtpLoading ? (
                        <Loading
                          type="bars"
                          width={20}
                          height={20}
                          className="m-auto"
                          color="#000"
                        />
                      ) : (
                        "Verify"
                      )}
                    </Button>
                  </Grid>
                )}
              </Grid>
            )}
            <Button
              sx={{
                border: "1px solid #000",
                fontSize: 12,
                p: 1.5,
                color: "#fff",
                backgroundColor: "#000",
                ":hover": {
                  color: "#fff",
                  backgroundColor: "#000",
                },
                ":disabled": {
                  color: "#fff",
                  backgroundColor: "#00000049",
                  border: "1px solid #00000049",
                },
              }}
              fullWidth
              type="submit"
              disabled={
                showGetOtpButtonEmail ||
                emailOtpField ||
                showGetPhoneOtpButton ||
                showPhoneOtpField ||
                loading
              }
            >
              {loading ? (
                <Loading
                  type="bars"
                  width={20}
                  height={20}
                  className="m-auto"
                  color="#fff"
                />
              ) : (
                "Save Changes"
              )}
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default ProfileInformation;
