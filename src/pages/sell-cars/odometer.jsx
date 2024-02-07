import data from "@/assests/data";
import LinkTab from "@/components/linktab";
import { Card, Stack } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "@/styles/tabs.module.css";
import { useRouter } from "next/router";
import { vehicleController } from "@/api/addVehicle";
import { useDispatch, useSelector } from "react-redux";
import { addCar, getCarInfo } from "@/api/apiCalling/vehicle";
const Odometer = () => {
  const [driven, setDriven] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const carInfo = useSelector((state) => state.CarInfo);
  const handleClick = (driven) => {
    setDriven(driven);
    let body = {
      id: carInfo.id,
      odometer: driven.driven,
    };
    addCar({ body, router, path: "/sell-cars/location", dispatch });
  };
  const [odometer, setOdoMeter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        await getCarInfo({ data: carId, dispatch });
      } else {
        return () => {};
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Head>
        <title>Odometer</title>
      </Head>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-9 ">
            <LinkTab />

            <Card className={`p-3 ${styles.overflow_wrapper}`}>
              <h5 className="mb-2">Select Km Driven</h5>
              <Stack spacing={3}>
                {data.odometer.map((val, i) => (
                  <Card
                    className={`p-2 pointer ${
                      val.driven === driven && styles.year_Selector
                    }`}
                    key={i}
                    onClick={() => handleClick(val)}
                    sx={{
                      "&:hover": {
                        boxShadow:
                          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                      },
                    }}
                  >
                    {val.driven}
                  </Card>
                ))}
              </Stack>
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

export default Odometer;
