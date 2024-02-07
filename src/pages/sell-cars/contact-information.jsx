import {
  getUserProfile,
  updateUserDetails,
} from "@/api/apiCalling/authenticationApi";
import { countries } from "@/assests/country";
import Button from "@/components/button";
import LinkTab from "@/components/linktab";
import { isEmail, isPhonenumber } from "@/utils/regex";
import { loginTextField } from "@/utils/styles";
import { contactValidation } from "@/utils/validation";
import CheckIcon from "@mui/icons-material/Check";
import { Autocomplete, Box, Card, Grid, Stack, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "react-loading";
import { addCar, getCarInfo } from "@/api/apiCalling/vehicle";
const ContactInformation = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const carInfo = useSelector((state) => state.CarInfo);
  const inputHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    setError({
      ...error,
      [id]:
        id === "phoneNumber"
          ? isPhonenumber(value)
            ? ""
            : "Please Enter Valid Phone Number"
          : id === "email"
          ? isEmail(value)
            ? ""
            : "Please Enter Valid Email Id"
          : "",
    });
  };

  const [error, setError] = useState({
    name: "",
    phoneNumber: "",
    country: "",
    zipCode: "",
  });
  const [state, setState] = useState({
    name: "",
    phoneNumber: "",
    country: "",
    zipCode: "",
    countryCode: "",
  });

  const [loading, setLoading] = useState(false);

  const [country, setCountry] = useState("");
  const handleCountryChange = (event, newValue) => {
    if (newValue) {
      setState({
        ...state,
        country: newValue.label,
        countryCode: newValue.phone,
      });
      setCountry(newValue);

      setError({ ...error, country: "" });
    } else {
      setState({ ...state, country: "" });
    }
  };
  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();

    if (contactValidation({ state, error, setError, setLoading })) {
      if (isPhonenumber(state.phoneNumber)) {
        let body = {
          name: state.name,
          countryName: state.country,
          zipCode: state.zipCode,
          phoneNo: state.phoneNumber,
          countryCode: state.countryCode,
        };
        let data = {
          id: carInfo.id,
          contactInfo: body,
        };
        addCar({
          
          body: data,
          router,
          dispatch,
          path: "/sell-cars/upload-picture",
          setLoading,
        });
      } else {
        toast.error("Please Enter valid Mobile Number");
        setLoading(false);
      }
    } else {
      setLoading(false);
      return;
    }
  };

  const [show, setShow] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getUserProfile({ setState, state, setUser, dispatch });
      setShow(true);
    } else {
      setShow(false);
    }

    const fetchData = async () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        getCarInfo({ data: carId, dispatch });
      } else {
        return () => {};
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-9">
            <LinkTab />

            <Card className="">
              <h5 className="border-bottom p-4">Contact information</h5>
              {show ? (
                <Grid
                  container
                  sx={{ backgroundColor: "#0080001f", padding: "8px" }}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item xs={6}>
                    <Stack direction="row" className="text-success fw-bold p-3">
                      <CheckIcon className="me-2" />
                      <p className="mb-0">Please Confirm Your Details</p>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <p className="mb-0 text-success f-12">
                      YOU ARE LOGGED IN WITH THE E-MAIL:
                    </p>
                    <span className="text-success f-13 fw-bold">
                      {state && user.email ? user.email : ""}
                    </span>
                  </Grid>
                </Grid>
              ) : (
                <Grid container className="p-3 mt-2">
                  <Grid item xs={6}>
                    <TextField
                      id="email"
                      onChange={inputHandler}
                      label="Email*"
                      fullWidth
                      sx={loginTextField}
                      error={Boolean(error.email)}
                      helperText={error.email}
                      value={state.email}
                    />
                  </Grid>
                </Grid>
              )}

              <form onSubmit={submitHandler}>
                <Grid container spacing={2} className=" p-3">
                  <Grid item xs={6}>
                    <TextField
                      label="Full Name*"
                      fullWidth
                      sx={loginTextField}
                      onChange={inputHandler}
                      id="name"
                      variant="outlined"
                      error={Boolean(error.name)}
                      helperText={error.name}
                      value={state.name}
                      focused={
                        state.name === "" || state.name === null ? false : true
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Phone Number*"
                      fullWidth
                      type="number"
                      sx={loginTextField}
                      onChange={inputHandler}
                      id="phoneNumber"
                      error={Boolean(error.phoneNumber)}
                      helperText={error.phoneNumber}
                      value={state.phoneNumber}
                      focused={
                        state.phoneNumber === "" || state.phoneNumber === null
                          ? false
                          : true
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} className=" p-3">
                  <Grid item xs={6}>
                    <Autocomplete
                      id="country"
                      options={countries}
                      autoHighlight
                      onChange={handleCountryChange}
                      sx={loginTextField}
                      value={country}
                      fullWidth
                      getOptionLabel={(option) =>
                        option ? option.label || "" : ""
                      }
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
                          error={Boolean(error.country)}
                          helperText={error.country}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Zip Code*"
                      fullWidth
                      type="number"
                      id="zipCode"
                      onChange={inputHandler}
                      sx={loginTextField}
                      error={Boolean(error.zipCode)}
                      helperText={error.zipCode}
                    />
                  </Grid>
                </Grid>
                <div className="text-end my-3 p-3">
                  <Button className="custom_btn" width="200px">
                    {loading ? (
                      <Loading
                        type="bars"
                        color="red"
                        className="m-auto"
                        width={20}
                        height={20}
                      />
                    ) : (
                      <>
                        <span>Continue</span>
                        <span>Continue</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
          <div className="col-sm-3">
            <Card>Bar Show</Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
