import { getCarDetails } from "@/api/apiCalling/vehicle";
import dummyCars from "@/icons/cars.jpg";
import { OPTION_TYPE } from "@/utils/enum";
import { Done, LocationOn } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsCalendar, BsFuelPump } from "react-icons/bs";
import { GiGearStickPattern, GiRoad } from "react-icons/gi";
import { PiEngine } from "react-icons/pi";
import { Carousel } from "react-responsive-carousel";
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

  const specificationArray = [
    {
      icon: <GiRoad />,
      label: "Mileage",
      value: carData && carData.odometer,
    },
    {
      icon: <BsCalendar />,
      label: "First Registration",
      value: carData && carData.period && carData.period.year,
    },
    {
      icon: <GiGearStickPattern />,
      label: "Transmission",
      value:
        carData && carData.specification && carData.specification.transmission,
    },
    {
      icon: <PiEngine />,
      label: "Power",
      value: `${
        carData && carData.specification && carData.specification.power
      } kw`,
    },
    {
      icon: <BsFuelPump />,
      label: "Fuel",
      value: carData && carData.variant && carData.variant.fuelType,
    },
  ];

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
                      color: "#fff",
                      mx: 1,
                      my: 0.3,
                      textTransform: "capitalize",
                      borderRadius: 0,
                    }}
                  />
                ))}
            </Box>
          )}
          {loading ? (
            <Skeleton variant="rectangular" width={400} height={400} />
          ) : (
            <Carousel showIndicators={false} showThumbs={false}>
              {carData && carData.carImages ? (
                carData.carImages.map((val, i) => (
                  <img src={val} width={"100%"} key={i} height={550} />
                ))
              ) : (
                <img src={dummyCars.src} />
              )}
            </Carousel>
          )}
        </Grid>
        <Grid item lg={5} p={2}>
          <Box textAlign={"center"}>
            <Typography fontSize={30} fontWeight={600}>
              {carData && carData.price} €
            </Typography>
            <Typography fontSize={12}>
              {carData &&
              carData.specification &&
              carData.specification.vatDeduction === OPTION_TYPE.No
                ? "Without VAT Deduction"
                : "With VAT Deduction"}
            </Typography>
          </Box>
          <Card sx={{ mt: 5, mb: 2, borderRadius: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
              }}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <LocationOn />
                <Typography>Location</Typography>
              </Stack>
              <Typography>
                {carData && carData.location && carData.location.city}
              </Typography>
            </Box>
          </Card>
          <Card sx={{ p: 2 }}>
            {specificationArray.map((val, i) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                }}
                key={i}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  {val.icon}
                  <Typography>{val.label}</Typography>
                </Stack>
                <Typography>{val.value}</Typography>
              </Box>
            ))}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CarDetails;
