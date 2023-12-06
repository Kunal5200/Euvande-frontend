import LinkTab from "@/components/linktab";
import { Card } from "@mui/material";
import Head from "next/head";
import React from "react";

const Location = () => {
  return (
    <>
      <Head>
        <title>Location</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-sm-8 m-auto">
            <LinkTab />

            <Card className="p-3">
              <h3>What is Your Location?</h3>
              <p className="f-12 fw-normal">
                In which city you are looking to sell your car?
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
