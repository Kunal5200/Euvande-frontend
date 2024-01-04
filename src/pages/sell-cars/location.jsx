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
import React, { useState } from "react";
import detectloc from "@/icons/detectLoc.svg";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/router";
const Location = () => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");

  const handleClearClick = () => {
    setSearchValue("");
  };
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  const submitHandle = (e) => {
    e.preventDefault();
    localStorage.setItem("location", searchValue);
    router.push("/sell-cars/specifications");
  };
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
                      label="Search Your City"
                      fullWidth
                      value={searchValue}
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
                    <span>Continue</span>
                    <span>Continue</span>
                  </Button>
                </div>
              </form>
            </Card>
          </div>
          <div className="col-sm-3">
            <Card>Hello</Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
