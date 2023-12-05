import countriesData from "@/assests/countriesCode";
import countryFlag from "@/assests/countriesFlag";
import { loginTextField, phonetextField } from "@/utils/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import Button from "./button";
import styles from "@/styles/signup.module.css";
import countryData from "@/assests/countries.json";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import { VerifyOtp } from "@/assests/modalcalling/otpform";
const Signup = () => {
  const [togglePassword, setTogglePassword] = useState(true);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const dispatch = useDispatch();
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const inputChangeHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
  };

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

  const showOtpModal = () => {
    dispatch(showModal(<VerifyOtp />));
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const verifyEmailAddress = () => {};
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
                  <Button
                    className="custom_btn"
                    type="button"
                    onClick={showOtpModal}
                  >
                    <span>Verify</span>
                    <span>Verify</span>
                  </Button>
                </InputAdornment>
              ),
            }}
            id="email"
            onChange={inputChangeHandler}
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
          />
          <div className="d-flex align-items-center mb-3 ">
            {/* <Autocomplete
              sx={loginTextField}
              options={countries}
              autoHighlight
              // onChange={handleCountryChange}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width={20}
                    height={20}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt=""
                  />
                  {option.label} ({option.code}) +{option.phone}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a country"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  error={error.countryCode}
                  helperText={error.countryCode}
                />
              )}
            /> */}
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
              className={styles.flags_select}
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
                    <Button className="custom_btn" type="button">
                      <span>Verify</span>
                      <span>Verify</span>
                    </Button>
                  </InputAdornment>
                ),
              }}
              id="phone"
              onChange={inputChangeHandler}
            />
          </div>
          <Button className="custom_btn" width="100%" type="submit">
            <span>Proceed</span>
            <span>Proceed</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
