import LinkTab from "@/components/linktab";
import Head from "next/head";
import React from "react";

const Variant = () => {
  return (
    <>
      <Head>
        <title>Variant</title>
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

export default Variant;
