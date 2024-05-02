import {
  sendOtpEmail,
  updateUserDetails,
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
import { MuiTelInput } from "mui-tel-input";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";

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
  const mobileChangeHandler = (newPhone, countryData) => {
    setPhone(newPhone);
  };
  const [showGetOtpButtonEmail, setGetOtpButtonEmail] = useState(false);

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
    }
  };
  return (
    <div>
      <Container maxWidth="lg">
        <Stack direction={"row"} alignItems={"center"} spacing={2} py={2}>
          {/* <Button
            sx={{
              border: "1px solid gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => router.back()}
          >
            <ArrowBack htmlColor="gray" />
          </Button> */}
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
                      <InputAdornment>
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
                <Grid item xs={8}>
                  <TextField label="Enter OTP" />
                </Grid>
                <Grid item xs={4}>
                  <Button >verify</Button>
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
                        <InputAdornment>
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
            <Grid container mb={4}>
              <Grid item xs={12}>
                <MuiTelInput
                  value={phone}
                  continents={["EU"]}
                  defaultCountry="DE"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
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
            </Grid>
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
              }}
              fullWidth
              type="submit"
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
