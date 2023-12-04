import LinkTab from "@/components/linktab";
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
