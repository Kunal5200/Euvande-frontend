import data from "@/assests/data";
import LinkTab from "@/components/linktab";
import { loginTextField } from "@/utils/styles";
import { Search } from "@mui/icons-material";
import {
  Card,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "@/styles/tabs.module.css";
import { useRouter } from "next/router";
import { vehicleController } from "@/api/addVehicle";
const Model = () => {
  const [selected, setSelected] = useState(false);
  const [model, setModel] = useState("");
  const router = useRouter();
  const handleSelectModel = (modelName) => {
    setModel(modelName);
    setSelected(true);
    router.push("/sell-cars/variant");
    localStorage.setItem("model", modelName);
  };

  const getModel = () => {
    vehicleController
      .getVariants()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const make = localStorage.getItem("brand");
    const year = localStorage.getItem("year");
    
  }, []);
  return (
    <>
      <Head>
        <title>Select Model of your Car</title>
      </Head>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-9 ">
            <LinkTab />

            <Card className="p-3">
              <h5 className="mb-3">Select Your Car Model</h5>
              <TextField
                fullWidth
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={loginTextField}
                label="Search Your Car Model"
                className="mb-3"
              />

              <Grid container spacing={2}>
                {data.carModel.map((val, i) => (
                  <Grid item xs={4} key={i}>
                    <Card
                      className={`p-2 pointer ${
                        val.name === model && selected
                          ? styles.year_Selector
                          : ""
                      }`}
                      onClick={() => handleSelectModel(val.name)}
                    >
                      {val.name}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </div>
          <div className="col-sm-3">
            <Card>hello</Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
