import { updateUserDetails } from "@/api/apiCalling/authenticationApi";
import { hideModal } from "@/redux/reducers/modal";
import { isEmail, isPhonenumber } from "@/utils/regex";
import { loginTextField } from "@/utils/styles";
import { updateDetailsValidation } from "@/utils/validation";
import { Button, Divider, Grid, TextField } from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const EditUserProfile = ({ value, setUser }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phoneNo: "",
    countryName: "",
    countryCode: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    phoneNo: "",
    countryName: "",
    countryCode: "",
  });
  const [phone, setPhone] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const inputChangeHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    setError({
      ...error,
      [id]:
        id === "email"
          ? isEmail(value)
            ? ""
            : "Please Enter Valid Email"
          : id === "phoneNo"
          ? isPhonenumber(value)
            ? ""
            : "Please Enter Valid Phone No"
          : "",
    });
  };
  const cancelHandler = () => {
    dispatch(hideModal());
  };
  const [country, setCountry] = useState({
    label: value.countryName || "",
    code: value.countryCode || "",
  });
  const handleCountryChange = (event, newValue) => {
    setCountry(newValue);
    if (newValue) {
      setState({
        ...state,
        countryName: newValue.label,
        countryCode: newValue.phone,
      });
      setError({ ...error, countryName: "" });
    }
  };
  const handlePhoneNumberHandler = (newPhone, countryData) => {
    setPhone(newPhone);
    const validPhone = matchIsValidTel(newPhone);
    if (validPhone) {
      setState({
        ...state,
        phoneNo: countryData.nationalNumber,
        countryCode: countryData.countryCallingCode,
      });
      setError({ ...error, phoneNo: "" });
    } else {
      setError({ ...error, phoneNo: "Please Enter Valid Phone Number" });
    }
  };

  const submitHandler = (e) => {
    setLoading(false);
    e.preventDefault();

    let body = {
      name: state.name,
      email: state.email,
      phoneNo: state.phoneNo,
      countryName: state.countryName,
      countryCode: state.countryCode,
    };

    if (updateDetailsValidation({ state, error, setError })) {
      updateUserDetails({ body, setLoading, dispatch, setUser });
    } else {
      toast.error("Please Enter Required Fields");
      setLoading(false);
      console.log(state)
    }
  };
  useEffect(() => {
    if (value) {
      setState({
        ...state,
        name: value.name,
        email: value.email,
        phoneNo: value.phoneNo,
        countryCode: value.countryCode,
      });
      setPhone(value.phoneNo && `+${value.countryCode} ${value.phoneNo}`);
    }
  }, [value]);
  return (
    <div style={{ width: "600px" }}>
      <div className="container-fluid">
        <div className="">
          <h4 className="mb-2">Edit Personal Details</h4>
        </div>
        <Divider style={{ backgroundColor: "#000 " }} />

        <form className="mt-5" onSubmit={submitHandler}>
          <Grid container className="mb-3" spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name*"
                sx={loginTextField}
                fullWidth
                id="name"
                value={state.name}
                focused={state.name === "" ? false : true}
                onChange={inputChangeHandler}
                error={error.name}
                helperText={error.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email*"
                sx={loginTextField}
                fullWidth
                value={state.email}
                onChange={inputChangeHandler}
                focused={state.email === "" ? false : true}
                id="email"
                error={error.email}
                helperText={error.email}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container className="mb-3" spacing={2}>
            <Grid item xs={12}>
              {/* <TextField
                label="Phone Number*"
                sx={loginTextField}
                fullWidth
                value={state.phoneNo}
                type="tel"
                id="phoneNo"
                onChange={inputChangeHandler}
                focused={state.phoneNo === "" ? false : true}
                error={error.phoneNo}
                helperText={error.phoneNo}
              /> */}
              <MuiTelInput
                defaultCountry="DE"
                continents={["EU"]}
                fullWidth
                value={phone}
                onChange={handlePhoneNumberHandler}
              />
            </Grid>
            {/* <Grid item xs={6}>
              <Autocomplete
                id="country"
                options={countries}
                autoHighlight
                onChange={handleCountryChange}
                sx={loginTextField}
                value={country}
                fullWidth
                getOptionLabel={(option) => (option ? option.label || "" : "")}
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
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country*"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                    error={error.countryName}
                    helperText={error.countryName}
                  />
                )}
              />
            </Grid> */}
          </Grid>

          <Grid container className="mb-2">
            <Grid item xs={6}></Grid>

            <Grid item xs={6} className="text-end">
              {/* <Button
                className="custom_btn_white"
                width="200px"
                backgroundColor="#000"
                color="#fff"
              >
                {loading ? (
                  <Loading
                    type="bars"
                    color="#FFDB58"
                    width={20}
                    height={20}
                    className="m-auto"
                  />
                ) : (
                  <>
                    <span>Save Changes</span>
                    <span>Save Changes</span>
                  </>
                )}
              </Button> */}
              <Button
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  fontSize: 12,
                  ":hover": {
                    color: "#fff",
                    backgroundColor: "#000",
                  },
                }}
                type="submit"
              >
                {loading ? (
                  <Loading
                    type="bars"
                    width={20}
                    height={20}
                    color="#fff"
                    className="m-auto"
                  />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfile;
