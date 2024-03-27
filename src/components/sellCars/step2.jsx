import { customLoginAndRegister } from "@/api/apiCalling/authenticationApi";
import { Verify_BY } from "@/utils/enum";
import { isEmail } from "@/utils/regex";
import { loginTextField } from "@/utils/styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
// import CheckIcon from "@material-ui/icons/Check";
import { useEffect, useState } from "react";
import Loading from "react-loading";
import { toast } from "react-toastify";
import CarInfo from "./carInfo";
import { getCarDetailsById } from "@/api/apiCalling/listingApi";
import { getCarDetails } from "@/api/apiCalling/vehicle";
import { useDispatch } from "react-redux";

const Step2 = ({ handleNext, handlePrev }) => {
  const [state, setState] = useState({
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
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setState({ ...state, [id]: value });
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

    setState({
      ...state,
      phoneNumber: countryData.nationalNumber,
      countryCode: countryData.countryCallingCode,
    });
    if (validPhone) {
      setShowGetOtpButtonPhone(true);
    } else {
      setShowGetOtpButtonPhone(false);
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
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const carId = localStorage.getItem("carId");
    if (carId) {
      getCarDetails({ carId, setCarData, setLoading, dispatch });
    }
  }, []);

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
                  helperText="Enter Full Name"
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
                  helperText="Enter valid phone number"
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
                      label="Enter OTP"
                      //   type="number"
                      sx={loginTextField}
                      onChange={phoneOtpHandler}
                      inputProps={{
                        maxLength: 6,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                    />
                  </Grid>
                  <Grid item lg={2}>
                    <Button
                      sx={{ border: "1px solid #000", p: 2, color: "#000" }}
                    >
                      Verify
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>

            <Grid container spacing={3} alignItems={"center"}>
              <Grid item lg={5}>
                <TextField
                  label="Email*"
                  id="email"
                  value={state.email}
                  fullWidth
                  onChange={handleInputChange}
                  helperText="Enter Email Address"
                  sx={loginTextField}
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
            </Grid>

            {/* <Typography sx={{ fontWeight: 350, fontSize: 16, paddingTop: 2 }}>
              <b>Note:</b>{" "}
              <small>
                We'll get in touch with you if the user doesn't verify
                themselves.
              </small>
            </Typography> */}
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
                      const StepIcon =
                        state.phoneNumber && state.otp
                          ? CheckCircleRoundedIcon
                          : CancelRoundedIcon;
                      return (
                        <StepIcon
                          {...props}
                          sx={{
                            color:
                              state.phoneNumber && state.otp ? "green" : "red",
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
                      const StepIcon =
                        state.email && state.otp_email
                          ? CheckCircleRoundedIcon
                          : CancelRoundedIcon;
                      return (
                        <StepIcon
                          {...props}
                          sx={{
                            color:
                              state.email && state.otp_email ? "green" : "red",
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
              p: 2,
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
              width: 150,
              color: "#fff",
              borderRadius: 2,
              p: 1.5,
              ":hover": {
                backgroundColor: "#000",
                color: "#fff",
              },
            }}
            onClick={handleNext}
          >
            Continue <ChevronRight />
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default Step2;
