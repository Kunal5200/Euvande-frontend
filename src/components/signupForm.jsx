import countriesData from "@/assests/countriesCode";
import countryFlag from "@/assests/countriesFlag";
import { loginTextField, phonetextField } from "@/utils/styles";
import {
  Info,
  MarkEmailRead,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { IconButton, InputAdornment, Popover, TextField } from "@mui/material";
import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import Button from "./button";
import styles from "@/styles/signup.module.css";
import countryData from "@/assests/countries.json";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import { VerifyOtp } from "@/assests/modalcalling/otpform";
import {
  addUser,
  phoneNumberVerification,
  verifyEmail,
} from "@/api/apiCalling/authenticationApi";
import carLoader from "@/loader/car.webp";
import { registerValidation } from "@/utils/validation";
import { isEmail, isPhonenumber } from "@/utils/regex";
import { toast } from "react-toastify";
import Loading from "react-loading";
import otp from "@/icons/otp.png";
const Signup = () => {
  const [togglePassword, setTogglePassword] = useState(true);
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
  const [emailverify, setEmailVerify] = useState(true);
  const [phoneverify, setPhoneVerify] = useState(true);

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

  const VerifyEmail = () => {
    if (state.email === "") {
      toast.error("Please Enter Valid Email ID");
    } else {
      verifyEmail({ data: state.email, dispatch });
    }
  };

  const VerifyPhone = () => {
    let body = {
      countryCode: dialcode,
      phoneNo: state.phone,
    };
    if (state.phone === "") {
      toast.error("Please Enter Valid Phone Number");
    } else {
      phoneNumberVerification({ data: body, dispatch });
    }
  };
  const [loading, setLoading] = useState(false);
  const [openPopOverEmail, setOpenPopOverEmail] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const submitHandler = (e) => {
    let body = {
      email: state.email,
      phoneNo: state.phone,
      countryCode: dialcode,
      name: state.name,
      password: state.password,
    };
    setLoading(true);
    e.preventDefault();
    if (registerValidation({ state, error, setError })) {
      addUser({ setLoading, body });
    } else {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="container">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <h5 className="text-center">
              🌟 Welcome to the Ultimate Car Marketplace! 🚗
            </h5>
            <p className="f-12 text-center">
              Excited to have you with us! Whether you're parting ways with your
              trusted ride or on the hunt for your dream wheels, our platform is
              the place where car dreams take off. Ready to roll? Let's make it
              quick.
            </p>
          </div>
          <TextField
            label="Name*"
            variant="outlined"
            fullWidth
            sx={loginTextField}
            className="mb-3"
            onChange={inputChangeHandler}
            id="name"
            error={error.name}
            helperText={error.name}
          />
          <TextField
            label="Email*"
            variant="outlined"
            fullWidth
            sx={loginTextField}
            className="mb-3"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton
                    disabled={emailDisabled}
                    onClick={VerifyEmail}
                    sx={{
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      "&.MuiTouchRipple": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <MarkEmailRead />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            id="email"
            onChange={inputChangeHandler}
            error={error.email}
            helperText={error.email}
          />
          <Popover
            anchorEl={anchorEl}
            onClose={() => setOpenPopOverEmail(false)}
            open={openPopOverEmail}
          >
            Your Email is not Verified
          </Popover>
          <TextField
            label="Password*"
            variant="outlined"
            fullWidth
            type={!togglePassword ? "text" : "password"}
            sx={loginTextField}
            className="mb-3"
            id="password"
            onChange={inputChangeHandler}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setTogglePassword(!togglePassword)}
                  >
                    {togglePassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={error.password}
            helperText={error.password}
          />
          <div className="d-flex align-items-center mb-3 ">
            <ReactFlagsSelect
              searchable={true}
              onSelect={onSelect}
              selected={selected}
              showSecondarySelectedLabel={false}
              showSecondaryOptionLabel={true}
              showSelectedLabel={true}
              showOptionLabel={true}
              countries={countriesData}
              customLabels={countryFlag}
              selectedSize={13}
              optionsSize={13}
              fullWidth={true}
              className={
                error.phone ? styles.flags_select_error : styles.flags_select
              }
            />
            <TextField
              label="Phone Number*"
              variant="outlined"
              fullWidth
              sx={phonetextField}
              className=""
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton disabled={phoneDisabled} onClick={VerifyPhone}>
                      <img src={otp.src} width={20} height={20} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={error.phone}
              helperText={error.phone}
              id="phone"
              onChange={inputChangeHandler}
            />
          </div>
          <Button className="custom_btn" width="100%" type="submit">
            {!loading ? (
              <>
                <span>Proceed</span>
                <span>Proceed</span>
              </>
            ) : (
              <Loading
                type="bars"
                color="#ffffff"
                height={20}
                width={50}
                className="m-auto"
              />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
