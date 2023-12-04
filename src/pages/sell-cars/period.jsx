import LinkTab from "@/components/linktab";
import { Card } from "@mui/material";
import Head from "next/head";
import React from "react";

const Period = () => {
  return (
    <>
      <Head>
        <title>Select period Of time</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-sm-8 m-auto">
            <LinkTab />

            <Card className="p-3">
              <h5>Select the registration year</h5>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Period;
