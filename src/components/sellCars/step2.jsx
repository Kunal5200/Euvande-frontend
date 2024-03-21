import { countries } from "@/assests/country";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControl,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { useEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { Done } from "@mui/icons-material";
import { MuiTelInput } from "mui-tel-input";
import React from "react";
import { ButtonBase } from "@mui/material";
import CheckIcon from "@material-ui/icons/Check";
import { useState } from "react";
import { toast } from "react-toastify";

const Step2 = ({ handleNext, handlePrev }) => {
  const [formstate, setFormstate] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    otp: "",
    otp_email: "",
  });
  const [showFirstButton, setShowFirstButton] = useState(true);
  const [showSecondButton, setShowSecondButton] = useState(false);
  const [showemailButton, setShowemailButton] = useState(true);
  const [showemailtwoButton, setShowemailtwoButton] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    console.log("check", e.target);
    setFormstate({ ...formstate, [id]: value });
    console.log("FormData is", formstate);

    if (!formstate.name) {
      toast.error("Name is Empty");
    } else if (!formstate.phoneNumber) {
      toast.error("Phone Number is Empty");
    }
  };

  const handleInputPhone = (value) => {
    console.log("Phone input value is", value);
    setFormstate({ ...formstate, phoneNumber: value });
    if (!formstate.email) {
      toast.error("Email is empty");
    } else if (!/\S+@\S+\.\S+/.test(formstate.email)) {
      toast.error("Email is not valid");
    }
  };

  const handleFirstButtonClick = () => {
    setShowFirstButton(false);
    setShowSecondButton(true);
  };

  const handleSecondButtonClick = () => {
    setShowFirstButton(false);
    setShowSecondButton(false);
  };

  const handleEmailButtonClick = () => {
    setShowemailButton(false);
    setShowemailtwoButton(true);
  };

  const handleEmailVerifyButtonClick = () => {
    setShowemailButton(false);
    setShowemailtwoButton(false);
  };

  return (
    <Container style={{ maxWidth: 1350 }}>
      <Card sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 550, fontSize: 25 }}>
          Personal Information
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: "3" }}>
            <Grid container my={2} spacing={2}>
              <Grid item lg={6}>
                <TextField
                  label="Name*"
                  id="name"
                  // name="name"
                  fullWidth
                  value={formstate.name}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment:
                      formstate.name.length > 2 ? (
                        <Done style={{ color: "green" }} />
                      ) : null,
                  }}
                />
                {/* <ButtonBase onClick={handleButtonClick}>
        <div style={{ padding: '6px 12px', backgroundColor: 'blue', color: 'white', marginLeft: '8px' }}>Button</div>
      </ButtonBase> */}
              </Grid>
            </Grid>

            {/* .................................PhoneNumber................................... */}

            <Box sx={{ display: "flex" }}>
              <Box sx={{ flex: "4", marginRight: 0 }}>
                {formstate.phoneNumber || formstate.otp ? (
                  <Grid container spacing={40}>
                    <Grid item lg={9}>
                      <MuiTelInput
                        label="Phone Number*"
                        continents={["EU"]}
                        defaultCountry="DE"
                        id="phoneNumber"
                        onChange={(value) => handleInputPhone(value)}
                        value={formstate.phoneNumber}
                        fullWidth
                        InputProps={{
                          endAdornment: formstate.phoneNumber.length>12 && formstate.phoneNumber.length<14 ? (
                            <Done style={{ color: "green" }} />
                          ) : null,
                        }}
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={2}>
                    <Grid item lg={6}>
                      <MuiTelInput
                        label="Phone Number*"
                        continents={["EU"]}
                        defaultCountry="DE"
                        id="phoneNumber"
                        onChange={(value) => handleInputPhone(value)}
                        value={formstate.phoneNumber}
                        fullWidth
                        InputProps={{
                          endAdornment: formstate.phoneNumber ? (
                            <Done style={{ color: "green" }} />
                          ) : null,
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
                
                
                {/* {
                  !formstate.phoneNumber && formstate.otp ? (
<Grid container spacing={40}>
                    <Grid item lg={9}>
                      <MuiTelInput
                        label="Phone Number*"
                        continents={["EU"]}
                        defaultCountry="DE"
                        id="phoneNumber"
                        onChange={(value) => handleInputPhone(value)}
                        value={formstate.phoneNumber}
                        fullWidth
                        InputProps={{
                          endAdornment: formstate.phoneNumber.length>9 && formstate.phoneNumber.length<11 ? (
                            <Done style={{ color: "green" }} />
                          ) : null,
                        }}
                      />
                    </Grid>
                  </Grid>

                  ):null 
                } */}
              </Box>

              {formstate.phoneNumber && showFirstButton && (
                <Box sx={{ flex: "1" }}>
                  <Button onClick={handleFirstButtonClick}>Verify</Button>
                </Box>
              )}

              {!showFirstButton && (
                <Box sx={{ flex: "1", marginLeft: 0 }}>
                  <Box sx={{ display: "flex" }}>
                    <TextField
                      sx={{ flex: "2" }}
                      label="OTP"
                      fullWidth
                      value={formstate.otp}
                      id="otp"
                      onChange={handleInputChange}
                    />

                    <Box sx={{ flex: "1" }}>
                      <Button onClick={handleSecondButtonClick}>Verify</Button>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>

            {/* ..................................Email................................... */}

            <Box sx={{ display: "flex" }}>
              <Box sx={{ flex: "4", marginRight: 0 }}>
                {formstate.email || formstate.otp_email ? (
                  <Grid container spacing={40}>
                    <Grid item lg={9} sx={{ marginTop: 2 }}>
                      <TextField
                        label="Email*"
                        id="email"
                        value={formstate.email}
                        fullWidth
                        onChange={handleInputChange}
                        InputProps={{
                          endAdornment:
                            formstate.email.length > 6 ? (
                              <Done style={{ color: "green" }} />
                            ) : null,
                        }}
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={2}>
                    <Grid item lg={6} sx={{ marginTop: 2 }}>
                      <TextField
                        label="Email*"
                        id="email"
                        value={formstate.email}
                        fullWidth
                        onChange={handleInputChange}
                        InputProps={{
                          endAdornment:
                            formstate.email.length > 6 ? (
                              <Done style={{ color: "green" }} />
                            ) : null,
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
              </Box>

              {formstate.email && showemailButton && (
                <Box sx={{ flex: "1", marginTop: 1 }}>
                  <Button onClick={handleEmailButtonClick}>Verify</Button>
                </Box>
              )}

              {!showemailButton && (
                <Box sx={{ flex: "1", marginLeft: 0, marginTop: 2 }}>
                  <Box sx={{ display: "flex" }}>
                    <TextField
                      sx={{ flex: "2" }}
                      label="OTP"
                      fullWidth
                      value={formstate.otp_email}
                      id="otp_email"
                      onChange={handleInputChange}
                    />

                    <Box sx={{ flex: "1" }}>
                      <Button onClick={handleEmailVerifyButtonClick}>
                        Verify
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          {/* ..................................Display Right and Wrong on Right Side....................... */}

          <Box sx={{ flex: "2", marginTop: 5, paddingLeft: 5 }}>
            <Stepper
              sx={{
                "& .MuiStepLabel-label": {
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                },
                "& .MuiStepIcon-root.Mui-active": {
                  color: "#000",
                },
                "& .MuiStepIcon-root.Mui-completed": {
                  color: "#008000",
                },
              }}
              orientation="vertical"
            >
              <Step>
                <StepLabel
                  StepIconComponent={(props) => {
                    const StepIcon = formstate.name.length>2 ? DoneIcon : ClearIcon;
                    return (
                      <StepIcon
                        {...props}
                        sx={{ color: formstate.name.length>2 ? "green" : "red" }}
                      />
                    );
                  }}
                ></StepLabel>
                <StepContent>
                  <Stack direction="row" alignItems={"center"} spacing={2}>
                    <FormControl fullWidth>
                      <TextField sx={{ display: "none" }} fullWidth id="name" />
                    </FormControl>
                  </Stack>
                </StepContent>
              </Step>
              <Step>
                <Box> </Box>
                <StepLabel
                  StepIconComponent={(props) => {
                    const StepIcon = formstate.otp.length>5 && formstate.otp.length<7
                      ? DoneIcon
                      : ClearIcon;
                    return (
                      <StepIcon
                        {...props}
                        sx={{ color: formstate.otp.length>5 && formstate.otp.length<7 ? "green" : "red" }}
                      />
                    );
                  }}
                ></StepLabel>
                <StepContent>
                  <Stack direction="row" alignItems={"center"} spacing={2}>
                    <FormControl fullWidth>
                      <TextField
                        sx={{ display: "none" }}
                        fullWidth
                        value={formstate.phoneNumber}
                        id="phoneNumber"
                      />
                    </FormControl>
                  </Stack>
                </StepContent>
              </Step>

              <Step>
                <StepLabel
                  StepIconComponent={(props) => {
                    let StepIcon = ClearIcon;
                    if (
                      formstate.email.length > 6 &&
                      /\S+@\S+\.\S+/.test(formstate.email)  && formstate.otp_email.length>5 && formstate.otp_email.length<7
                    ) {
                      StepIcon = DoneIcon;
                    }
                    return (
                      <StepIcon
                        {...props}
                        sx={{
                          color:
                            formstate.email.length > 6 &&
                            /\S+@\S+\.\S+/.test(formstate.email) && formstate.otp_email.length>5 && formstate.otp_email.length<7
                              ? "green"
                              : "red",
                        }}
                      />
                    );
                  }}
                ></StepLabel>
                <StepContent>
                  <Stack direction="row" alignItems={"center"} spacing={2}>
                    <FormControl fullWidth>
                      <TextField
                        sx={{ display: "none" }}
                        value={formstate.email}
                        fullWidth
                        id="email"
                      />
                    </FormControl>
                  </Stack>
                </StepContent>
              </Step>
            </Stepper>
          </Box>
        </Box>

        {/* ...............................Country and Postal code.................................. */}

        {/* <Grid container my={1} spacing={2}>
          <Grid item lg={6}> </Grid> */}
        {/* <Grid item lg={6}>
            <Grid container spacing={2}>
              <Grid item lg={6}>
                <Autocomplete
                  options={countries}
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
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Country*" fullWidth />
                  )}
                />
              </Grid>
              <Grid item lg={6}>
                <TextField label="Postal Code*" fullWidth />
              </Grid>
            </Grid>
          </Grid> */}
        {/* <Grid item lg={6}>
            <TextField label="Address*" id="address" fullWidth />
          </Grid> */}
        {/* </Grid> */}

        {/* ......................................Continue and Back Button................................. */}

        <Stack
          sx={{ textAlign: "end", mt: 2 }}
          direction={"row"}
          alignItems={"center"}
          spacing={2}
          justifyContent={"end"}
        >
          <Button
            sx={{
              border: "1px solid #000",
              backgroundColor: "transparent",
              width: 200,
              color: "#000",
              borderRadius: 2,
              p: 2,
            }}
            onClick={handlePrev}
          >
            Back
          </Button>
          <Button
            sx={{
              border: "1px solid #000",
              backgroundColor: "transparent",
              width: 200,
              color: "#000",
              borderRadius: 2,
              p: 2,
            }}
            onClick={handleNext}
          >
            Continue
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default Step2;
