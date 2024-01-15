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
import { useEffect, useState } from "react";
import styles from "@/styles/tabs.module.css";
import { useRouter } from "next/router";
import { vehicleController } from "@/api/addVehicle";
import { addCar, getCarInfo } from "@/api/apiCalling/vehicle";
import { useDispatch, useSelector } from "react-redux";
const Period = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedYear, setSelectedYear] = useState(null);
  const carInfo = useSelector((state) => state.CarInfo);
  const [year, setYear] = useState(0);
  const handleSelect = (selectedYear) => {
    setSelectedYear(selectedYear === selectedYear ? null : selectedYear);
    setYear(selectedYear);
    let body = {
      periodId: selectedYear,
      id: carInfo.id,
    };
    addCar({ body, router, path: "/sell-cars/model", dispatch });
  };
  const [period, setPeriod] = useState([]);
  const getPeriod = (value) => {
    let body = {
      makeId: parseInt(value),
    };
    vehicleController
      .getPeriodByMake(body)
      .then((res) => {
        setPeriod(res.data.data);
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
        console.log("select brand name");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPeriod = async () => {
      if (carInfo && carInfo.make) {
        await getPeriod(carInfo.make);
      } else {
        return () => {};
      }
    };

    fetchPeriod();
  }, [carInfo]);

  return (
    <>
      <Head>
        <title>Select period Of time</title>
      </Head>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-9 ">
            <LinkTab />

            <Card className="p-3">
              <h5 className="mb-3">Select the registration year</h5>
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
                label="Search Year"
                className="mb-3"
              />
              <Grid container spacing={2}>
                {period.map((val, i) => (
                  <Grid item xs={4} key={i}>
                    <Card
                      className={`p-2 pointer ${
                        val.year === selectedYear ? styles.year_Selector : ""
                      }`}
                      onClick={() => handleSelect(val.id)}
                    >
                      {val.year}
                    </Card>
                  </Grid>
                ))}
              </Grid>
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

export default Period;
