import React from "react";
import styles from "@/styles/seller.module.css";
import Head from "next/head";
import { Grid } from "@mui/material";
import car from "@/banner_image/car.png";
const SellerLogin = () => {
  return (
    <>
      <Head>
        <title>Seller</title>
      </Head>
      <div className="">
        <div className={styles.bgImage}>
          <Grid container>
            <Grid item xs={6}>
              <img src={car.src} width="100%" />
            </Grid>
            <Grid item xs={6}>
              <div>1</div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default SellerLogin;
