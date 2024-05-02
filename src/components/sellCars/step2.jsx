import {
  customLoginAndRegister,
  getUserProfile,
  verifyOTP,
} from "@/api/apiCalling/authenticationApi";
import { Verify_BY } from "@/utils/enum";
import { isEmail } from "@/utils/regex";
import { loginTextField, scrollToTop } from "@/utils/styles";
import { ChevronLeft, ChevronRight, Info } from "@mui/icons-material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  Box,
  Button,
  Card,
  Container,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
// import CheckIcon from "@material-ui/icons/Check";
import { getCarDetails } from "@/api/apiCalling/vehicle";
import { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CarInfo from "./carInfo";
import { validateContactNumber } from "@/utils/validation";
import { authControllers } from "@/api/authentication";
import { Cg } from "react-flags-select";
import { setDetails } from "@/redux/reducers/userdetails";

const Step2 = ({ handleNext, handlePrev }) => {
  const [state, setState] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    countryCode: "",
  });

  const [error, setError] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    countryCode: "",
  });
  const dispatch = useDispatch();
  const [showGetOtpButtonPhone, setShowGetOtpButtonPhone] = useState(false);
  const [showphoneOTPField, setShowPhoneOTPField] = useState(false);
  const [showGetOtpButtonEmail, setShowOtpButtonEmail] = useState(false);
  const [showEmailOTPField, setShowEmailOTPField] = useState(false);
  // const [user, setUser] = useState(null);
  const [userData, setUser] = useState(null);
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setState({ ...state, [id]: value });
    setError({
      ...error,
      [id]:
        id === "email"
          ? isEmail(value)
            ? ""
            : "Please Enter Valid Email"
          : "",
    });
    if (id === "email") {
      if (isEmail(value)) {
        setShowOtpButtonEmail(true);
      } else {
        setShowOtpButtonEmail(false);
      }
    }
  };
  const [phone, setPhone] = useState("");
  const handleInputPhone = (newValue, countryData) => {
    setPhone(newValue);
    const validPhone = matchIsValidTel(newValue);

    if (validPhone) {
      setError({ ...error, phoneNumber: "" });
      setShowGetOtpButtonPhone(true);
      setState({
        ...state,
        phoneNumber: countryData.nationalNumber,
        countryCode: countryData.countryCallingCode,
      });
    } else {
      setShowGetOtpButtonPhone(false);
      setError({ ...error, phoneNumber: "Please Enter Valid Phone Number" });
    }
  };

  const [OTPPhoneLoading, setOTPPhoneLoading] = useState(false);
  const mobileOTP = () => {
    if (state.phoneNumber === "" || state.countryCode === "") {
      toast.error("Please Enter Valid Phone Number");
      return false;
    } else {
      setOTPPhoneLoading(true);
      let body = {
        phoneNo: state.phoneNumber,
        name: state.name,
        countryCode: state.countryCode,
        verifyBy: Verify_BY.PHONE,
      };
      customLoginAndRegister({
        body,
        showOTPButton: setShowGetOtpButtonPhone,
        showOTPfield: setShowPhoneOTPField,
        loading: setOTPPhoneLoading,
      });
      // dispatch(setDetails({ isPhoneNoVerified: true }));
    }
  };
  const [OTPEmailLoading, setOTPEmailLoading] = useState(false);
  const getEmailOTP = () => {
    if (state.email === "" && !isEmail(state.email) && state.name === "") {
      toast.error("Please Enter Valid email");
      return true;
    } else {
      setOTPEmailLoading(true);
      let body = {
        email: state.email,
        name: state.name,
        verifyBy: Verify_BY.EMAIL,
      };
      customLoginAndRegister({
        body,
        showOTPButton: setShowOtpButtonEmail,
        showOTPfield: setShowEmailOTPField,
        loading: setOTPEmailLoading,
      });
    }
  };

  const [phoneOTP, setPhoneOTP] = useState("");
  const phoneOtpHandler = (e) => {
    const inputValue = e.target.value;
    const numericRegex = /^[0-9]*$/;

    if (!numericRegex.test(inputValue)) {
      console.log("alphabets");
      return;
    }

    // Update state with numeric value
    setPhoneOTP(inputValue);
  };
  const [emailOTP, setEmailOTP] = useState("");
  const emailOTPHandler = (e) => {
    const inputValue = e.target.value;
    setEmailOTP(inputValue);
  };
  const [verifyEmailLoading, setVerifyEmailLoading] = useState(false);
  const verifyEmailOTPHandler = () => {
    setVerifyEmailLoading(true);
    let body = {
      referenceId: parseInt(localStorage.getItem("referenceId")),
      otp: emailOTP,
    };
    verifyOTP({
      body,
      loading: setOTPEmailLoading,
      showOTPfield: setShowEmailOTPField,
      dispatch,
    });
  };
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const carId = localStorage.getItem("carId");
    if (carId) {
      getCarDetails({ carId, setCarData, setLoading, dispatch });
    } else {
      return () => {};
    }
  }, []);
  // const user = useSelector((state) => state.userInfo);
  const [addContactLoading, setAddContactLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState(false);

  const verifyOTPHandler = () => {
    setVerifyLoading(true);
    let body = {
      referenceId: parseInt(localStorage.getItem("referenceId")),
      otp: phoneOTP,
    };
    verifyOTP({
      body,
      loading: setVerifyLoading,
      showOTPfield: setShowPhoneOTPField,
      verified: setVerifiedPhone,
      dispatch,
    });
  };
  // const [user, setUser] = useState(null);
  const handleContact = () => {
    if (validateContactNumber({ state, error, setError })) {
      setAddContactLoading(true);
      let body = {
        name: state.name,
        phoneNo: state.phoneNumber,
        email: state.email,
        countryCode: state.countryCode,
      };
      authControllers
        .customLogin(body)
        .then((res) => {
          console.log("testets", res);
          if (res && res.data && res.data.data) {
            localStorage.setItem("accessToken", res.data.data.accessToken);
            dispatch(setDetails({ ...res.data.data, isAuthenticated: true }));
            getUserProfile({ setUser, dispatch, setLoading });
          }
          setAddContactLoading(false);
          handleNext();
        })
        .catch((err) => {
          let errMessage =
            (err.response && err.response.data.message) || err.message;
          toast.error(errMessage);
          setAddContactLoading(false);
        });
    } else {
      toast.error("Please Enter Valid Details");
    }
  };

  const user = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (localStorage.getItem("group")) {
      authControllers
        .getUserDetails()
        .then((res) => {
          const response = res.data.data;
          setState({
            ...state,
            name: response.name,
            email: response.email,
            phoneNumber: response.phoneNo,
            countryCode: response.countryCode,
          });
          if (response.phoneNo) {
            setPhone(`+${response.countryCode} ${response.phoneNo}`);
          }
          setVerifiedPhone(response.isPhoneNoVerified);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const wrongNumberHandler = () => {
    setShowPhoneOTPField(false);
    setShowGetOtpButtonPhone(true);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  // console.log("user", user);
  return (
    <Container style={{ maxWidth: 1310 }}>
      <CarInfo data={carData} loading={loading} />
      <Card sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 550, fontSize: 25 }}>
          Personal Information
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: "10" }}>
            <Grid container my={2} spacing={2}>
              <Grid item lg={5} spacing={3}>
                <TextField
                  label="Name*"
                  id="name"
                  fullWidth
                  value={state.name}
                  onChange={handleInputChange}
                  sx={loginTextField}
                  helperText={error.name ? error.name : "Enter Full Name"}
                  error={Boolean(error.name)}
                />
              </Grid>
            </Grid>

            {/* .................................PhoneNumber................................... */}

            <Grid container spacing={3} alignItems={"center"} mb={2}>
              <Grid item lg={5}>
                <MuiTelInput
                  label="Phone Number*"
                  continents={["EU"]}
                  defaultCountry="DE"
                  id="phoneNumber"
                  onChange={handleInputPhone}
                  value={phone}
                  fullWidth
                  sx={loginTextField}
                  disabled={showphoneOTPField}
                  helperText={
                    error.phoneNumber
                      ? error.phoneNumber
                      : "Enter valid phone number"
                  }
                  error={Boolean(error.phoneNumber)}
                />
              </Grid>
              {showGetOtpButtonPhone && (
                <Grid item lg={3}>
                  <Button
                    sx={{
                      border: "1px solid #000",
                      p: 1.8,
                      color: "#000",
                      width: 100,
                      mb: 3,
                    }}
                    onClick={mobileOTP}
                    disabled={OTPPhoneLoading}
                  >
                    {OTPPhoneLoading ? (
                      <Loading
                        type="bars"
                        color="#000"
                        width={20}
                        height={20}
                        className="m-auto"
                      />
                    ) : (
                      "Get OTP"
                    )}
                  </Button>
                </Grid>
              )}

              {showphoneOTPField && (
                <>
                  <Grid item lg={3}>
                    <TextField
                      label="Enter OTP Here"
                      sx={loginTextField}
                      onChange={phoneOtpHandler}
                      inputProps={{
                        maxLength: 6,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                      type="number"
                      helperText="Enter 6 digit OTP"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <Tooltip title="Wrong Number ">
                              <IconButton onClick={wrongNumberHandler}>
                                <Info htmlColor="#ff000" />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {/* <FormHelperText
                      onClick={wrongNumberHandler}
                      sx={{ fontSize: 11, cursor: "pointer" }}
                    >
                      Wrong Number ?
                    </FormHelperText> */}
                  </Grid>
                  <Grid item lg={2}>
                    <Button
                      sx={{
                        border: "1px solid #000",
                        p: 2,
                        color: "#000",
                        mb: 3,
                        width: 100,
                      }}
                      onClick={verifyOTPHandler}
                    >
                      {verifyLoading ? (
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
                </>
              )}
            </Grid>
            {/* Email */}
            <Grid container spacing={3} alignItems={"center"}>
              <Grid item lg={5}>
                <TextField
                  label="Email*"
                  id="email"
                  value={state.email}
                  fullWidth
                  onChange={handleInputChange}
                  helperText={error.email ? error.email : "Enter Email Address"}
                  sx={loginTextField}
                  error={Boolean(error.email)}
                />
              </Grid>
              {showGetOtpButtonEmail && (
                <Grid item lg={3}>
                  <Button
                    sx={{
                      border: "1px solid #000",
                      width: 100,
                      mb: 3,
                      p: 1.8,
                      color: "#000",
                    }}
                    loading={OTPEmailLoading}
                    onClick={getEmailOTP}
                  >
                    {OTPEmailLoading ? (
                      <Loading
                        type="bars"
                        width={20}
                        height={20}
                        className="m-auto"
                        color="#000"
                      />
                    ) : (
                      "Get OTP"
                    )}
                  </Button>
                </Grid>
              )}
              {showEmailOTPField && (
                <>
                  <Grid item lg={3}>
                    <TextField
                      label="Enter OTP"
                      sx={loginTextField}
                      onChange={emailOTPHandler}
                      inputProps={{
                        maxLength: 6,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                      helperText="Enter 6 digit OTP"
                      type="number"
                    />
                  </Grid>
                  <Grid item lg={2}>
                    <Button
                      sx={{
                        border: "1px solid #000",
                        p: 2,
                        color: "#000",
                        mb: 3,
                        width: 100,
                      }}
                      onClick={verifyEmailOTPHandler}
                    >
                      {verifyEmailLoading ? (
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
                </>
              )}
            </Grid>
          </Box>

          <Box sx={{ flex: "1" }}>
            <Box sx={{ p: 5 }}>
              <Stepper
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "uppercase",
                  },
                  "& .MuiStepIcon-root.Mui-active": {
                    color: "#ff0000",
                  },
                  "& .MuiStepIcon-root.Mui-completed": {
                    color: "#008000",
                  },
                }}
                orientation="vertical"
              >
                <Step sx={{ pb: 2 }}>
                  <StepLabel
                    StepIconComponent={(props) => {
                      const StepIcon = state.name
                        ? CheckCircleRoundedIcon
                        : CancelRoundedIcon;
                      return (
                        <StepIcon
                          {...props}
                          sx={{
                            color: state.name ? "green" : "red",
                          }}
                        />
                      );
                    }}
                  ></StepLabel>
                  <StepContent sx={{ display: "none" }}>
                    <TextField
                      label="Name*"
                      id="name"
                      fullWidth
                      value={state.name}
                      onChange={handleInputChange}
                    />
                  </StepContent>
                </Step>
                <Step sx={{ pb: 3 }}>
                  <StepLabel
                    StepIconComponent={(props) => {
                      const StepIcon = user.isPhoneNoVerified
                        ? CheckCircleRoundedIcon
                        : CancelRoundedIcon;
                      return (
                        <StepIcon
                          {...props}
                          sx={{
                            color: user.isPhoneNoVerified ? "green" : "red",
                          }}
                        />
                      );
                    }}
                  ></StepLabel>
                  <StepContent sx={{ display: "none" }}>
                    <MuiTelInput
                      label="Phone Number*"
                      continents={["EU"]}
                      defaultCountry="DE"
                      id="phoneNumber"
                      onChange={(value) => handleInputPhone(value)}
                      value={state.phoneNumber}
                      fullWidth
                    />
                  </StepContent>
                </Step>
                <Step>
                  <StepLabel
                    StepIconComponent={(props) => {
                      const StepIcon = user.isEmailVerified
                        ? CheckCircleRoundedIcon
                        : CancelRoundedIcon;
                      return (
                        <StepIcon
                          {...props}
                          sx={{
                            color: user.isEmailVerified ? "green" : "red",
                          }}
                        />
                      );
                    }}
                  ></StepLabel>
                  <StepContent sx={{ display: "none" }}>
                    <TextField
                      label="Email*"
                      id="email"
                      value={state.email}
                      fullWidth
                      onChange={handleInputChange}
                    />
                  </StepContent>
                </Step>
              </Stepper>
            </Box>
          </Box>
        </Box>

        <Stack
          sx={{ textAlign: "end", mt: 2 }}
          direction={"row"}
          alignItems={"center"}
          spacing={2}
          justifyContent={"space-between"}
        >
          <Button
            sx={{
              backgroundColor: "transparent",
              color: "#000",
              borderRadius: 2,
              // p: 2,
              ":hover": {
                textDecoration: "underline",
              },
            }}
            onClick={handlePrev}
          >
            <ChevronLeft /> Back
          </Button>
          <Button
            sx={{
              border: "1px solid #000",
              backgroundColor: "#000",
              color: "#fff",

              width: 150,
              p: 1.5,
              ":hover": {
                backgroundColor: "#000",
                color: "#fff",
              },
            }}
            disabled={addContactLoading}
            onClick={handleContact}
          >
            {addContactLoading ? (
              <Loading
                type="bars"
                color="#fff"
                width={20}
                height={20}
                className="m-auto"
              />
            ) : (
              <>
                Continue <ChevronRight />
              </>
            )}
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default Step2;
