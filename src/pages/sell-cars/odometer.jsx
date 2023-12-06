import data from "@/assests/data";
import LinkTab from "@/components/linktab";
import { Card, Stack } from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";
import styles from "@/styles/tabs.module.css";
import { useRouter } from "next/router";
const Odometer = () => {
  const [driven, setDriven] = useState("");
  const router = useRouter();
  const handleClick = (driven) => {
    setDriven(driven);
    router.push("/sell-cars/location");
  };
  return (
    <>
      <Head>
        <title>Odometer</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-sm-8 m-auto">
            <LinkTab />

            <Card
              className="p-3"
              style={{ height: "500px", overflowY: "scroll" }}
            >
              <h5 className="mb-2">Select Km Driven</h5>
              <Stack spacing={3}>
                {data.odometer.map((val, i) => (
                  <Card
                    className={`p-2 pointer ${
                      val.driven === driven && styles.year_Selector
                    }`}
                    key={i}
                    onClick={() => handleClick(val.driven)}
                  >
                    {val.driven}
                  </Card>
                ))}
              </Stack>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Odometer;
