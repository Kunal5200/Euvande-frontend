import Button from "@/components/button";
import LinkTab from "@/components/linktab";
import { loginTextField } from "@/utils/styles";
import {
  Autocomplete,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import detectloc from "@/icons/detectLoc.svg";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addCar, getCarInfo } from "@/api/apiCalling/vehicle";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "react-loading";
const Location = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const carInfo = useSelector((state) => state.CarInfo);
  const [state, setState] = useState({
    city: "",
    lat: "",
    long: "",
  });
  const handleClearClick = () => {
    setState({ ...state, city: "" });
  };
  const handleChange = (e) => {
    setState({ ...state, city: e.target.value });
  };
  const handleClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?key=d8f80813a79c4255b03221765ad65a3c&language=en&pretty=1&q=${latitude}+${longitude}`
            );

            const city = response.data.results[0]?.components?.city;

            setState({
              ...state,
              city: city || "",
              lat: latitude,
              long: longitude,
            });
          } catch (error) {
            console.error("Error getting location:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();
    setLoading(true);
    if (state.city === "") {
      toast.error("Please Enter Your City");
      return false;
    } else {
      let body =
        state.lat && state.long != ""
          ? {
              id: carInfo.id,
              location: {
                latitude: state.lat,
                longitude: state.long,
                city: state.city,
              },
            }
          : {
              id: carInfo.id,

              location: {
                city: state.city,
              },
            };

      addCar({
        body,
        router,
        path: "/sell-cars/specifications",
        dispatch,
        setLoading,
      });
      return true;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        await getCarInfo({ data: carId, dispatch });
      } else {
        () => {};
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Head>
        <title>Location</title>
      </Head>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-9 ">
            <LinkTab />

            <Card className="p-3">
              <h5>What is Your Location?</h5>
              <p className="f-12 fw-normal">
                In which city you are looking to sell your car?
              </p>
              <form onSubmit={submitHandle} className="mt-3">
                <Grid container alignItems={"center"} spacing={2}>
                  <Grid item xs={7}>
                    <TextField
                      sx={loginTextField}
                      onChange={handleChange}
                      label="Enter Your City Name"
                      fullWidth
                      value={state.city}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <IconButton onClick={handleClearClick}>
                              <Close />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Button
                      className="custom_btn"
                      width="100%"
                      padding="18px"
                      type="button"
                      onClick={handleClick}
                    >
                      <span>
                        <img src={detectloc.src} /> Use Current Location
                      </span>
                      <span>
                        <img src={detectloc.src} color="#ffffff" />
                        Use Current Location
                      </span>
                    </Button>
                  </Grid>
                </Grid>

                <div className="text-end my-4">
                  <Button className="custom_btn" width={280}>
                    {loading ? (
                      <Loading
                        type="bars"
                        width={20}
                        height={20}
                        color="orange"
                        className="m-auto"
                      />
                    ) : (
                      <React.Fragment>
                        <span>Continue</span>
                        <span>Continue</span>
                      </React.Fragment>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
          <div className="col-sm-3">
            <Card>
              Bar Show
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
