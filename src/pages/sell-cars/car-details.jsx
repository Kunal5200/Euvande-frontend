import { addCar, getCarDetails } from "@/api/apiCalling/vehicle";
import CarInfo from "@/components/car-info";
import CarInfoCard from "@/components/carInfoCard";
import styles from "@/styles/carDetails.module.css";
import { CalendarMonth, DirectionsCar } from "@mui/icons-material";
import { Box, Card, Grid, Skeleton, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { BsFuelPump } from "react-icons/bs";
import { GiGearStickPattern, GiRoad } from "react-icons/gi";
import { PiEngine } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const CarDetails = () => {
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const carInfo = useSelector((state) => state.CarInfo);
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
  const [price, setPrice] = useState("");
  const handleInput = (e) => {
    setPrice(e.target.value);
  };
  const addPrice = () => {
    if (price === "") {
      toast.error("Please Enter Price");
    } else {
      let body = {
        price: parseInt(price),
        id: (carInfo && carInfo.id) || parseInt(localStorage.getItem("carId")),
      };
      addCar({ dispatch, body });
    }
  };

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
        <Grid item lg={9} margin={"auto"}>
          <CarInfoCard
            carData={carData}
            loading={loading}
            onChange={handleInput}
            onSubmit={addPrice}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CarDetails;
