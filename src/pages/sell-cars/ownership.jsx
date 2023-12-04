import LinkTab from "@/components/linktab";
import Head from "next/head";
import React from "react";

const Ownership = () => {
  return (
    <>
      <Head>
        <title>Ownership</title>
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

export default Ownership;
