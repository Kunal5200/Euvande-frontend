import { userRegister } from "@/api/apiCalling/authenticationApi";
import countryData from "@/assests/countries.json";
import { isEmail, isPhonenumber } from "@/utils/regex";
import { registerValidation } from "@/utils/validation";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
// import Button from "./button";
import OTPinput from "./otpInput";
import MobileOtpInput from "./mobile-otp-input";
import Image from "next/image";
import logo from "@/logo/EUVandeLogoWhite.svg";

const loginWhiteTextField = {
  mb: 4,
  "& label.Mui-focused": {
    color: "#ffffff",
  },
  "& label": {
    fontSize: "15px",
    color: "#ffffff",
    mx: 2,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #403f3f",
      color: "#fff",
      borderRadius: 20,
    },
    "&:hover fieldset": {
      borderColor: "#ffffff",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #ffffff",
    },
  },
  "& .MuiInputBase-input": {
    color: "#ffffff",
  },
  "& .Mui-error": {
    "& fieldset": {
      border: "1px solid #d32f2f",
    },
    "&:hover fieldset": {
      border: "1px solid #d32f2f",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #d32f2f",
    },
    "& label.Mui-focused": {
      color: "#d32f2f",
    },
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "#d32f2f",
  },
};
const MobileSignUp = (props) => {
  const [togglePassword, setTogglePassword] = useState(true);
  const router = useRouter();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    countryCode: "",
  });
  const dispatch = useDispatch();
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [emailDisabled, setEmailDisAbled] = useState(true);
  const [phoneDisabled, setPhoneDisabled] = useState(true);
  const inputChangeHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    if (id === "email" && isEmail(value)) {
      setEmailDisAbled(false);
    }

    if (id === "phone" && isPhonenumber(value)) {
      setPhoneDisabled(false);
    }
    setError({
      ...error,
      [id]:
        id === "email"
          ? isEmail(value)
            ? ""
            : "Please Enter Valid Email"
          : id === "phone"
          ? isPhonenumber(value)
            ? ""
            : "Please Enter Valid Phone Number "
          : "",
    });
  };
  const [emailverify, setEmailVerify] = useState(false);
  const [phoneverify, setPhoneVerify] = useState(false);
  const [selected, setSelected] = useState("NL");
  const [dialcode, setDialCode] = useState("+31");
  const onSelect = (e) => {
    setSelected(e);
    const dial_Code = countryData.find((country) => country.code == e);
    if (dial_Code) {
      setDialCode(dial_Code.dial_code);
    } else {
      console.log("no data found");
    }
  };
  const [loading, setLoading] = useState(false);
  const [openPopOverEmail, setOpenPopOverEmail] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const submitHandler = (e) => {
    let body = {
      email: state.email,
      name: state.name,
      password: state.password,
    };

    setLoading(true);
    e.preventDefault();
    if (registerValidation({ state, error, setError })) {
      userRegister({ setLoading, body, setEmailVerify, dispatch });
    } else {
      setLoading(false);
    }
  };
  return (
    <Box sx={{ height: "100%" }}>
      {emailverify ? (
        <MobileOtpInput onClose={() => setEmailVerify(false)} />
      ) : (
        <Box sx={{ height: "100%" }}>
          <Box textAlign={"end"}>
            <IconButton
              sx={{ border: "1px solid #fff", mx: 2 }}
              onClick={() => router.back()}
            >
              <Close htmlColor="#fff" />
            </IconButton>
          </Box>

          <Box
            sx={{
              p: 2,

              height: "100%",
              mt: 1,
            }}
          >
            <Box textAlign={"flex-start"} mb={4}>
              <Typography
                fontWeight={600}
                fontSize={12}
                color={"#fff"}
                lineHeight={1}
              >
                Welcome to EuVande!
              </Typography>
              {/* <Typography fontSize={12} color={"#fff"}>
                  {" "}
                  Ready to get started? Signing up is quick and easy.
                </Typography> */}
            </Box>
            <FormControl sx={{ pt: 10, pb: 10 }}>
              <Box textAlign={"center"} mb={4}>
                <Image src={logo} width={100} />
              </Box>
              <form onSubmit={submitHandler}>
                <TextField
                  label="Name*"
                  variant="outlined"
                  fullWidth
                  sx={loginWhiteTextField}
                  onChange={inputChangeHandler}
                  id="name"
                  error={error.name}
                  helperText={error.name}
                  value={state.name}
                />
                <TextField
                  label="Email*"
                  variant="outlined"
                  fullWidth
                  sx={loginWhiteTextField}
                  id="email"
                  onChange={inputChangeHandler}
                  error={error.email}
                  helperText={error.email}
                  value={state.email}
                />

                <TextField
                  label="Password*"
                  variant="outlined"
                  fullWidth
                  type={!togglePassword ? "text" : "password"}
                  sx={loginWhiteTextField}
                  id="password"
                  onChange={inputChangeHandler}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setTogglePassword(!togglePassword)}
                        >
                          {togglePassword ? (
                            <Visibility sx={{ fill: "#fff" }} />
                          ) : (
                            <VisibilityOff sx={{ fill: "#fff" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={error.password}
                  helperText={error.password}
                  value={state.password}
                />

                <Button
                  sx={{
                    backgroundColor: "#000",
                    p: 1.5,
                    color: "#000",
                    ":hover": {
                      backgroundColor: "#fff",
                      border: "1px solid #000",
                    },
                    border: "1px solid #000",
                    backgroundColor: "#fff",
                    borderRadius: 20,
                  }}
                  fullWidth
                  type="submit"
                >
                  {loading ? (
                    <Loading
                      type="bars"
                      width={20}
                      height={20}
                      color="#000"
                      className="m-auto"
                    />
                  ) : (
                    "Sign UP"
                  )}
                </Button>
                <Box mt={2}>
                  <Typography
                    color={"#403f3f"}
                    textAlign={"start"}
                    fontSize={12}
                  >
                    Already have an account ?{" "}
                    <Typography variant="span" onClick={props.onClick}>
                      Sign In
                    </Typography>
                  </Typography>
                </Box>
              </form>
            </FormControl>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MobileSignUp;
