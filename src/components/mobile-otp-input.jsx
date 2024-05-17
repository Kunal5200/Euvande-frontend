import { userVerify } from "@/api/apiCalling/authenticationApi";
import styles from "@/styles/Login.module.css";
import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "react-loading";
import OTPInput from "react-otp-input";
import { useDispatch } from "react-redux";
const MobileOtpInput = (props) => {
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
    <Box sx={{ height: "100vh" }}>
      <Box sx={{ position: "relative", m: 1 }}>
        <IconButton
          sx={{ position: "absolute", border: "1px solid #fff", right: 0 }}
          onClick={props.onClose}
        >
          <Close sx={{ fill: "#fff" }} />
        </IconButton>
      </Box>
      <form
        onSubmit={submitHandler}
        style={{
          height: "100%",
          //   display: "grid",
          //   placeItems: "center",
          padding: 16,
        }}
      >
        <Box mt={20}>
          <Box textAlign={"center"} mb={3}>
            <Typography
              color={"#fff"}
              fontSize={{ lg: 18, xs: 30 }}
              lineHeight={1}
            >
              Ultimate Car Marketplace OTP Verification{" "}
            </Typography>
            <Typography
              variant="p"
              textAlign={"center"}
              fontSize={12}
              color={"#fff"}
            >
              we need to verify your identity.
              <br /> Buckle up for a quick and easy OTP (One-Time Password)
              verification process.
            </Typography>
          </Box>

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

          <Button
            fullWidth
            sx={{
              color: "#000",
              backgroundColor: "#fff",
              border: "1px solid #fff",
              ":hover": {
                color: "#000",
                border: "1px solid #fff",
                backgroundColor: "#fff",
              },
              transition: "0.5s ease all",
              mt: 3,
              borderRadius: 20,
            }}
            type="submit"
          >
            {loading ? (
              <Loading
                type="bars"
                color="#000"
                width={20}
                height={20}
                className="auto"
              />
            ) : (
              "Submit"
            )}
          </Button>
          <p className="f-12 text-danger">{error}</p>
        </Box>
        <Typography
          color={"#403f3f"}
          fontSize={12}
          mt={1}
          onClick={props.onClose}
        >
          Wrong Email ?
        </Typography>
      </form>
    </Box>
  );
};

export default MobileOtpInput;
