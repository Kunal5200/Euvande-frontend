import { getCarDetails } from "@/api/apiCalling/vehicle";
import { Done } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Grid,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import dummyCars from "@/icons/cars.jpg";
const CarDetails = () => {
  const router = useRouter();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const carId = parseInt(router.query.carId);
      if (carId) {
        await getCarDetails({
          carId,
          setCarData,
          setLoading,
        });
      } else {
        return () => {};
      }
    };

    fetchData();
  }, [router]);

  console.log(carData);
  return (
    <Container>
      <Grid container>
        <Grid item lg={7} p={2}>
          {loading ? (
            <Skeleton variant="text" width={300} />
          ) : (
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Typography fontSize={30} fontWeight={600}>
                {carData && carData.make && carData.make.makeName}
              </Typography>
              <Typography fontSize={30} fontWeight={600}>
                {carData && carData.variant && carData.variant.variantName}
              </Typography>
              <Typography fontSize={30} fontWeight={600}>
                {carData && carData.model && carData.model.modelName}
              </Typography>
            </Stack>
          )}
          {loading ? (
            <Skeleton variant="text" />
          ) : (
            // <Grid container spacing={1}>
            //   {carData &&
            //     carData.specification &&
            //     carData.specification.equipments.map((val, i) => (
            //       <Grid item lg={2}>
            //         <Tooltip title={val}>
            //           <Chip
            //             avatar={
            //               <Avatar sx={{ p: 1, backgroundColor: "#ffffff" }}>
            //                 <Done sx={{ fontSize: 12, fill: "#800080" }} />
            //               </Avatar>
            //             }
            //             label={val}
            //             key={i}
            //             sx={{ backgroundColor: "#800080", color: "#ffffff" }}
            //           />
            //         </Tooltip>
            //       </Grid>
            //     ))}
            // </Grid>
            <Box display={"flex"} flexWrap={"wrap"}>
              {carData &&
                carData.specification &&
                carData.specification.equipments.map((val, i) => (
                  <Chip
                    avatar={
                      <Avatar sx={{ p: 1, backgroundColor: "#ffffff" }}>
                        <Done sx={{ fontSize: 12, fill: "#800080" }} />
                      </Avatar>
                    }
                    label={val}
                    key={i}
                    sx={{
                      backgroundColor: "#800080",
                      color: "#ffffff",
                      mx: 1,
                      my: 0.3,
                      textTransform: "capitalize",
                    }}
                  />
                ))}
            </Box>
          )}
          {loading ? (
            <Skeleton variant="rectangular" width={400} height={400} />
          ) : (
            <Carousel>
              {carData && carData.carImages ? (
                carData.carImages.map((val, i) => (
                  <img src={val} width={"100%"} height={"100%"} key={i} />
                ))
              ) : (
                <img src={dummyCars.src} />
              )}
            </Carousel>
          )}
        </Grid>
        <Grid item lg={5}></Grid>
      </Grid>
    </Container>
  );
};

export default CarDetails;
