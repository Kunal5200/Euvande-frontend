import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { loginWhiteTextField } from "@/utils/styles";
const LoginOTP = () => {
  const [state, setState] = useState({
    countryCode: "",
    identity: "",
  });

  const [phone, setPhone] = useState("");

  const inputHandlerPhone = (newValue, countryData) => {
    setPhone(newValue);
    const validPhone = matchIsValidTel(newValue);
    if (validPhone) {
        console.log("country",countryData)
      setState({ ...state, identity: countryData.nationalNumber });
    }
  };

  return (
    <div>
      <Box>
        <Box textAlign={"center"} pt={4} pb={4}>
          <Typography fontWeight={600} fontSize={30} color={"#fff"}>
            Welcome Back to EuVande!
          </Typography>
          <Typography fontSize={12} color={"#fff"}>
            If you're already a member, logging in is a breeze.
          </Typography>
        </Box>
        <Box sx={{ p: 2, mt: 5 }}>
          <MuiTelInput
            fullWidth
            continents={["EU"]}
            defaultCountry="DE"
            sx={loginWhiteTextField}
            onChange={inputHandlerPhone}
            label="Enter Phone Number"
            value={phone}
          />
          <Button
            sx={{
              mt: 4,
              p: 1,
              backgroundColor: "#000",
              color: "#fff",
              ":hover": {
                color: "#fff",
                backgroundColor: "transparent",
                border: "1px solid #000",
              },
              transition: "0.5s ease all",
              border: "1px solid #000",
            }}
            fullWidth
          >
            Send OTP
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default LoginOTP;
