import { getCarDetails } from "@/api/apiCalling/vehicle";
import CarInfo from "@/components/car-info";
import styles from "@/styles/carDetails.module.css";
import { Grid } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
const CarDetails = () => {
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        await getCarDetails({ carId, setCarData, setLoading });
      } else {
        return () => {};
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>Car details</title>
      </Head>
      <div className={styles.bg_image}>
        <div className="text-center mt-5">
          <CarInfo carData={carData} loading={loading} />
        </div>
      </div>

      <Grid container>
        <Grid item xs={3}></Grid>

        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
};

export default CarDetails;
