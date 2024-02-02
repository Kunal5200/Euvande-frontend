import { getCarDetailsById } from "@/api/apiCalling/listingApi";
import { Box, Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import carDummy from "@/icons/cars.jpg";
const CarDetails = () => {
  const router = useRouter();
  const [laoding, setLoading] = useState(true);
  const [carData, setCarData] = useState({});
  useEffect(() => {
    getCarDetailsById({ carId: router.query.carId, setLoading, setCarData });
  }, [router]);
  console.log(carData);
  return (
    <Container>
      <Grid container>
        <Grid item lg={4}>
          <Carousel>
            {carData && carData.carImages ? (
              carData.carImages.map((val, i) => (
                <img src={val} width={"100%"} height={"100%"} key={i} />
              ))
            ) : (
              <img src={carDummy.src} width={"100%"} />
            )}
          </Carousel>
        </Grid>
        <Grid item lg={8}></Grid>
      </Grid>
    </Container>
  );
};

export default CarDetails;
