import { getCarDetailsById } from "@/api/apiCalling/listingApi";
import { getCarDetails } from "@/api/apiCalling/vehicle";
import dummyCars from "@/icons/cars.jpg";
import { CarStatus, OPTION_TYPE } from "@/utils/enum";
import { Done, Favorite, LocationOn } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsCalendar, BsFuelPump } from "react-icons/bs";
import { FaAngleLeft } from "react-icons/fa";
import { GiGearStickPattern, GiRoad } from "react-icons/gi";
import { PiEngine } from "react-icons/pi";
import { Carousel } from "react-responsive-carousel";
const CarDetails = () => {
  const router = useRouter();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (router.query.status) {
      setStatus(router.query.status);
    }
  }, [router.query.status]);

  useEffect(() => {
    const fetchData = async () => {
      const carId = parseInt(router.query.slug);
      if (carId && status) {
        await getCarDetailsById({
          carId,
          setCarData,
          setLoading,
          status,
        });
      } else {
        return () => {};
      }
    };

    if (status) {
      fetchData();
    }
  }, [status, router.query.slug]);

  // console.log(carData);

  const specificationArray = [
    {
      icon: <GiRoad />,
      label: "Mileage",
      value: (carData && carData.odometer) || "Not Published by Seller",
    },
    {
      icon: <BsCalendar />,
      label: "First Registration",
      value:
        (carData && carData.period && carData.period.year) ||
        "Not Published by Seller",
    },
    {
      icon: <GiGearStickPattern />,
      label: "Transmission",
      value:
        (carData &&
          carData.specification &&
          carData.specification.transmission) ||
        "Not Published by Seller",
    },
    {
      icon: <PiEngine />,
      label: "Power",
      value:
        (carData &&
          carData.specification &&
          carData.specification.power &&
          `${carData.specification.power} kw`) ||
        "Not Published by Seller",
    },
    {
      icon: <BsFuelPump />,
      label: "Fuel",
      value:
        (carData &&
          carData.specification &&
          carData.specification.specificationDetails &&
          carData.specification.specificationDetails.fuelType) ||
        "Not Published by Seller",
    },
  ];
  const details = [
    {
      label: "Make",
      value:
        (carData && carData.make && carData.make.makeName) ||
        "Not Published by the Seller",
    },
    {
      label: "Model",
      value:
        (carData && carData.model && carData.model.modelName) ||
        "Not Published by the Seller",
    },
    {
      label: "Body Color",
      value:
        (carData && carData.specification && carData.specification.color) ||
        "Not Published by the Seller",
    },
    {
      label: "Interior Material",
      value:
        (carData &&
          carData.specification &&
          carData.specification.interiorMaterial) ||
        "Not Published by the Seller",
    },
    {
      label: "Body",
      value:
        (carData &&
          carData.specification &&
          carData.specification.vehicleType) ||
        "Not Published by the Seller",
    },
    {
      label: "Doors",
      value:
        (carData && carData.specification && carData.specification.doors) ||
        "Not Published by the Seller",
    },
    {
      label: "Seats",
      value:
        (carData && carData.specification && carData.specification.seats) ||
        "Not Published by the Seller",
    },
    {
      label: "VIN",
      value: (carData && carData.vin) || "Not Published by the Seller",
    },
  ];
  const engine = [
    {
      label: "Fuel",
      value:
        (carData &&
          carData.specification &&
          carData.specification.specificationDetails &&
          carData &&
          carData.specification.specificationDetails.fuelType) ||
        "Not Disclosed",
    },
    {
      label: "Transmission",
      value:
        (carData &&
          carData.specification &&
          carData.specification.transmission) ||
        "Not Disclosed",
    },
    {
      label: "Drive Type",
      value:
        (carData &&
        carData.specification &&
        carData.specification.driveType4WD === OPTION_TYPE.Yes
          ? "4x4"
          : "2x4") || "Not Disclosed",
    },
    {
      label: "Power",
      value:
        (carData && carData.specification && carData.specification.power) ||
        "Not Disclosed",
    },
  ];
  const vehicleCondition = [
    {
      label: "Mileage",
      value: (carData && carData.odometer) || "Not Disclosed",
    },
    {
      label: "First registration",
      value:
        (carData && carData.period && carData.period.year) || "Not Disclosed",
    },
    {
      label: "Ownership",
      value: (carData && carData.ownership) || "Not Specified",
    },
  ];

  return (
    <Container maxWidth={1400}>
      <Button
        sx={{ mt: 3, fontSize: 12, color: "#000" }}
        onClick={() => router.back()}
      >
        <FaAngleLeft /> Back to results
      </Button>
      <Grid container>
        <Grid item lg={7} p={2}>
          {/* {loading ? (
            <Skeleton variant="text" />
          ) : (
            <Box display={"flex"} flexWrap={"wrap"}>
              {carData &&
                carData.specification &&
                carData.specification.equipments &&
                carData.specification.equipments.map((val, i) => (
                  <Chip
                    avatar={
                      <Avatar sx={{ p: 1, backgroundColor: "#ffffff" }}>
                        <Done sx={{ fontSize: 12, fill: "#000" }} />
                      </Avatar>
                    }
                    label={val}
                    key={i}
                    sx={{
                      backgroundColor: "#000",
                      color: "#fff",
                      mx: 1,
                      my: 0.3,
                      textTransform: "capitalize",
                      borderRadius: 0,
                    }}
                  />
                ))}
            </Box>
          )} */}
          {loading ? (
            <Skeleton variant="rectangular" width={"100%"} height={"90%"} />
          ) : (
            <Carousel
              dynamicHeight={true}
              showIndicators={false}
              autoPlay={true}
              infiniteLoop={true}
              showArrows={false}
            >
              {carData && carData.carImages ? (
                carData.carImages.map((val, i) => <img src={val} key={i} />)
              ) : (
                <img src={dummyCars.src} />
              )}
            </Carousel>
          )}
        </Grid>
        <Grid item lg={5} p={2}>
          {loading ? (
            <Skeleton variant="text" sx={{ fontSize: 30 }} />
          ) : (
            <Stack
              spacing={1}
              direction={"row"}
              alignItems={"center"}
              textTransform={"uppercase"}
            >
              <Typography fontSize={40} fontWeight={600}>
                {carData && carData.make && carData.make.makeName}
              </Typography>

              <Typography fontSize={40} fontWeight={600}>
                {carData && carData.model && carData.model.modelName}
              </Typography>
            </Stack>
          )}

          {loading ? (
            <Skeleton sx={{ fontSize: 20 }} />
          ) : (
            carData &&
            carData.price && (
              <Box textAlign={"start"}>
                <Typography fontSize={20} fontWeight={600}>
                  Price : {carData && carData.price} €
                </Typography>
              </Box>
            )
          )}
          <Card sx={{ mt: 2, mb: 2 }}>
            {loading ? (
              <Skeleton variant="rectangular" width={"100%"} />
            ) : (
              carData &&
              carData.specification &&
              carData.specification.specificationDetails &&
              carData.specification.specificationDetails.manufacturedIn && (
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
                    {carData &&
                      carData.specification &&
                      carData.specification.specificationDetails &&
                      carData.specification.specificationDetails.manufacturedIn}
                  </Typography>
                </Box>
              )
            )}
          </Card>
          {loading ? (
            <Skeleton />
          ) : (
            <Card sx={{ p: 2 }}>
              {specificationArray.map((val, i) => (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                      p: 1,
                    }}
                    key={i}
                  >
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      {val.icon}
                      <Typography fontSize={12}>{val.label}</Typography>
                    </Stack>
                    <Typography fontSize={12}>{val.value}</Typography>
                  </Box>
                  {i != specificationArray.length - 1 && (
                    <Divider sx={{ my: 0.5, backgroundColor: "#000" }} />
                  )}
                </>
              ))}
            </Card>
          )}
        </Grid>
      </Grid>
      <Box
        sx={{
          backgroundColor: "#eee",
          p: 3,
        }}
      >
        <Grid container>
          <Grid item lg={8}>
            <Typography fontSize={30} fontWeight={600}>
              Details
            </Typography>
            <Grid container mt={3} columnSpacing={2}>
              <Grid lg={5}>
                <Card sx={{ p: 2 }}>
                  <Typography fontSize={15} fontWeight={550}>
                    VEHICLE DETAIL
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    {details.map((val, i) => (
                      <Box key={i}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 2,
                            mt: 1,
                            p: 1,
                          }}
                        >
                          <Typography sx={{ fontSize: 12, color: "grey" }}>
                            {val.label}
                          </Typography>
                          <Typography sx={{ fontSize: 12 }}>
                            {val.value}
                          </Typography>
                        </Box>

                        {i !== details.length - 1 && (
                          <Divider sx={{ backgroundColor: "#000" }} />
                        )}
                      </Box>
                    ))}
                  </Box>
                </Card>
              </Grid>
              <Grid lg={1}></Grid>
              <Grid lg={5}>
                <Card sx={{ p: 2, mb: 2 }}>
                  <Typography fontSize={15} fontWeight={550}>
                    Engine
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    {engine.map((val, i) => (
                      <Box key={i}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 2,
                            mt: 1,
                            p: 1,
                          }}
                        >
                          <Typography sx={{ fontSize: 12, color: "grey" }}>
                            {val.label}
                          </Typography>
                          <Typography sx={{ fontSize: 12 }}>
                            {val.value}
                          </Typography>
                        </Box>

                        {i !== engine.length - 1 && (
                          <Divider sx={{ backgroundColor: "#000" }} />
                        )}
                      </Box>
                    ))}
                  </Box>
                </Card>
                <Card sx={{ p: 2 }}>
                  <Typography fontSize={15} fontWeight={550}>
                    Vehicle Condition
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    {vehicleCondition.map((val, i) => (
                      <Box key={i}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 2,
                            mt: 1,
                            p: 0.5,
                          }}
                        >
                          <Typography sx={{ fontSize: 12, color: "grey" }}>
                            {val.label}
                          </Typography>
                          <Typography sx={{ fontSize: 12 }}>
                            {val.value}
                          </Typography>
                        </Box>

                        {i !== vehicleCondition.length - 1 && (
                          <Divider sx={{ backgroundColor: "#000" }} />
                        )}
                      </Box>
                    ))}
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item lg={4} sx={{ position: "relative" }}>
            <Card sx={{ p: 2, backgroundColor: "#000", height: 200 }}>
              <Typography textAlign={"center"} fontSize={12} color={"#fff"}>
                TOTAL PRICE OF THE CAR INCL. SERVICES
              </Typography>
              <Typography
                textAlign={"center"}
                color={"#fff"}
                my={1}
                fontSize={30}
                fontWeight={600}
              >
                17042 €
              </Typography>
              <Typography textAlign={"center"} fontSize={12} color={"#fff"}>
                This price is final, with no hidden fees.
              </Typography>
            </Card>
            <Card
              sx={{
                width: 300,
                margin: "auto",
                p: 2,
                position: "absolute",
                left: 60,
                top: 130,
              }}
            >
              <Typography
                color={"#000"}
                textAlign={"center"}
                fontSize={16}
                fontWeight={550}
              >
                Peugeot 208 81 kW
              </Typography>
              <Typography
                color={"#000"}
                textAlign={"center"}
                fontSize={25}
                fontWeight={550}
              >
                17042 €
              </Typography>
              
            </Card>
          </Grid> */}
        </Grid>
      </Box>
    </Container>
  );
};

export default CarDetails;
