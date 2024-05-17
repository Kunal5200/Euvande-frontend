import { loginUser } from "@/api/apiCalling/authenticationApi";
import { isEmail } from "@/utils/regex";
import { loginValidation } from "@/utils/validation";
import {
  Close,
  Visibility,
  VisibilityOff,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
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
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import OTPinput from "./otpInput";
import { showModal } from "@/redux/reducers/modal";
import ForgotPassword from "@/assests/modalcalling/forgot-password";
import Loading from "react-loading";
import logo from "@/logo/EUVandeLogoWhite.svg";
import Image from "next/image";
const loginWhiteTextField = {
  mb: 4,
  "& label.Mui-focused": {
    color: "#ffffff",
  },
  "& label": {
    fontSize: "12px",
    color: "#ffffff",
    mx: 2,
    top: 5,
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
const MobileLogin = ({ otpShow, setOtpShow }) => {
  const [state, setState] = useState({
    identity: "",
    countryCode: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    let { id, value } = e.target;

    setState({ ...state, [id]: value });
    setError({
      ...error,
      [id]:
        id === "identity"
          ? isEmail(value)
            ? ""
            : "Please Enter valid Email"
          : "",
    });
  };

  const [error, setError] = useState({
    identity: "",
    countryCode: "",
    password: "",
  });

  const ForgotPasswordModal = () => {
    dispatch(showModal(<ForgotPassword />));
  };

  const [loading, setLoading] = useState(false);

  const loginsubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isEmail(state.identity)) {
      setError({ ...error, identity: "Please Enter Valid Email Id" });
      setLoading(false);
      return;
    }
    let body = {
      email: state.identity,
      password: state.password,
    };

    if (loginValidation({ state, setError, error })) {
      loginUser({ body, router, setLoading, dispatch });
    } else {
      toast.error("Please Enter Valid Details");
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box sx={{ height: "100%" }}>
      <Box textAlign={"end"} px={2} pt={2} pb={2}>
        <IconButton
          sx={{ border: "1px solid #fff" }}
          onClick={() => router.back()}
        >
          <Close htmlColor="#fff" />
        </IconButton>
      </Box>
      {/* <Divider sx={{ backgroundColor: "#fff" }} /> */}
      {!otpShow ? (
        <Box sx={{ height: "100%" }}>
          <Box ml={3}>
            <Typography
              fontWeight={600}
              fontSize={12}
              color={"#fff"}
              lineHeight={1}
            >
              Welcome Back
            </Typography>
          </Box>

          <FormControl fullWidth sx={{ pt: 14, pb: 10 }}>
            <Box sx={{ mb: 2, textAlign: "center" }}>
              <Image src={logo} width={150} />
            </Box>
            <form onSubmit={loginsubmitHandler}>
              {/* <Image src={logo} width={200} className="" /> */}

              <Box sx={{ p: 2 }}>
                <TextField
                  variant="outlined"
                  label="Enter Your Email*"
                  sx={loginWhiteTextField}
                  fullWidth
                  type="text"
                  onChange={inputHandler}
                  error={error.identity}
                  helperText={error.identity}
                  // className="mb-4"
                  id="identity"
                />
                <TextField
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  label="Password"
                  sx={loginWhiteTextField}
                  id="password"
                  onChange={inputHandler}
                  error={error.password}
                  helperText={error.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {!showPassword ? (
                            <VisibilityOutlined sx={{ fill: "#fff" }} />
                          ) : (
                            <VisibilityOffOutlined sx={{ fill: "#fff" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  sx={{
                    color: "#000",
                    backgroundColor: "#fff",
                    ":hover": {
                      color: "#000",
                      backgroundColor: "#fff",
                      border: "1px solid #fff",
                    },
                    border: "1px solid #fff",
                    p: 1.4,
                    transition: "0.5s ease all",
                    borderRadius: 20,
                    fontSize: 12,
                  }}
                  fullWidth
                  type="submit"
                >
                  {loading ? (
                    <Loading type="bars" width={20} height={20} color="#000" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <Box textAlign={"start"}>
                  <Typography
                    textAlign={"start"}
                    color={"#403f3f"}
                    fontSize={12}
                    mt={2}
                    sx={{ cursor: "pointer" }}
                    onClick={ForgotPasswordModal}
                  >
                    Forgot Password ?
                  </Typography>
                </Box>
              </Box>
            </form>
          </FormControl>
        </Box>
      ) : (
        <div className="p-3">
          <h5 className="text-center">EuVande Login</h5>
          <p className="f-12 text-center">
            Welcome back! To ensure the security of your account, we need to
            verify your identity. Please enter the One-Time Password (OTP) sent
            to your registered mobile number.
          </p>
          <OTPinput />
        </div>
      )}
    </Box>
  );
};

export default MobileLogin;
