import { userRegister } from "@/api/apiCalling/authenticationApi";
import countryData from "@/assests/countries.json";
import { isEmail, isPhonenumber } from "@/utils/regex";
import { loginTextField } from "@/utils/styles";
import { registerValidation } from "@/utils/validation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
import Button from "./button";
import OTPinput from "./otpInput";
const SignupForm = () => {
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
      userRegister({ setLoading, body, setEmailVerify });
    } else {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="container">
        {emailverify ? (
          <OTPinput />
        ) : (
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <Typography className="text-center p-2" variant="h1" fontSize={15}>
                🌟 Welcome to the Ultimate Car Marketplace! 🚗
              </Typography>
              <Divider style={{ backgroundColor: "#000" }} />
              <Typography className="f-12 text-center" padding={1}>
                Excited to have you with us! Whether you're parting ways with
                your trusted ride or on the hunt for your dream wheels, our
                platform is the place where car dreams take off. Ready to roll?
                Let's make it quick.
              </Typography>
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
              id="email"
              onChange={inputChangeHandler}
              error={error.email}
              helperText={error.email}
            />

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
            {/* <div className="d-flex align-items-center mb-3 ">
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
                    <IconButton>
                      {phoneverify ? (
                        <Verified />
                      ) : (
                        <FaInfoCircle
                          onClick={() => setopenPopOverPhone(true)}
                          className="animate__animated animate__pulse animate__infinite	infinite"
                          color="#ff0000bd"
                        />
                      )}
                    </IconButton>
                    <Popover
                      anchorEl={anchorEl}
                      onClose={() => setopenPopOverPhone(false)}
                      open={openPopOverPhone}
                      anchorOrigin={{
                        vertical: "center",
                        horizontal: "center",
                      }}
                    >
                      <div className="p-3">
                        <p className="mb-0">
                          Please Click the Button below to verify your Phone
                          Number
                        </p>
                        <Button
                          onClick={VerifyPhone}
                          className="custom_btn my-2"
                          width="100%"
                        >
                          <span>Verify Now</span>
                          <span>Verify Now</span>
                        </Button>
                      </div>
                    </Popover>
                  </InputAdornment>
                ),
              }}
              error={error.phone}
              helperText={error.phone}
              id="phone"
              onChange={inputChangeHandler}
            />
          </div> */}
            <Button className="custom_btn" width="100%" type="submit">
              {!loading ? (
                <>
                  <span>Proceed</span>
                  <span>Proceed</span>
                </>
              ) : (
                <Loading
                  type="bars"
                  color="#000"
                  height={20}
                  width={20}
                  className="m-auto"
                />
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
