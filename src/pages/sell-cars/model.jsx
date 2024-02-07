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
import { addCar, getCarInfo } from "@/api/apiCalling/vehicle";
import { useDispatch, useSelector } from "react-redux";
const Model = () => {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const carInfo = useSelector((state) => state.CarInfo);
  const [model, setModel] = useState("");
  const router = useRouter();
  const handleSelectModel = (modelName) => {
    setModel(modelName);
    setSelected(true);
    let body = {
      id: carInfo.id,
      modelId: modelName,
    };
    addCar({ body, router, path: "/sell-cars/variant", dispatch });
  };
  const [modelName, setModelName] = useState([]);

  const getModel = (body) => {
    vehicleController
      .getModels(body)
      .then((res) => {
        setModelName(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      const carId = parseInt(localStorage.getItem("carId"));
      if (carId) {
        await getCarInfo({ data: carId, dispatch });
      } else {
        console.log("not callinng");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchModel = async () => {
      if (carInfo.id) {
        let body = {
          makeId: carInfo.make,
          periodId: carInfo.period,
        };
        await getModel(body);
      } else {
        () => {};
      }
    };

    fetchModel();
  }, [carInfo.id]);

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
                {modelName.map((val, i) => (
                  <Grid item xs={4} key={i}>
                    <Card
                      className={`p-2 pointer ${
                        val.modelName === model && selected
                          ? styles.year_Selector
                          : ""
                      }`}
                      onClick={() => handleSelectModel(val.id)}
                    >
                      {val.modelName}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </div>
          <div className="col-sm-3">
            <Card>Bar Show</Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
