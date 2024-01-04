import data from "@/assests/data";
import LinkTab from "@/components/linktab";
import { Card, Stack } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "@/styles/tabs.module.css";
import { useRouter } from "next/router";
import { vehicleController } from "@/api/addVehicle";
const Odometer = () => {
  const [driven, setDriven] = useState("");
  const router = useRouter();
  const handleClick = (driven) => {
    setDriven(driven);
    router.push("/sell-cars/location");
    localStorage.setItem("driven", driven);
  };
  const [odometer, setOdoMeter] = useState([]);

  const getOdoMeter = (body) => {
    vehicleController
      .getOdometer(body)
      .then((res) => {
        setOdoMeter(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const variant = localStorage.getItem("variant");

    if (variant) {
      let body = {
        variantId: parseInt(variant),
      };
      getOdoMeter(body);
    } else {
    }
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
                    onClick={() => handleClick(val.id)}
                  >
                    {val.driven}
                  </Card>
                ))}
              </Stack>
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

export default Odometer;
