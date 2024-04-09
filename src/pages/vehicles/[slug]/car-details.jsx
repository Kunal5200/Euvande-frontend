import { getCarDetailsById } from "@/api/apiCalling/listingApi";
import Thankyou from "@/assests/modalcalling/thankyou";
import FeatureCard from "@/components/featureCard";
import dummyCars from "@/icons/cars.jpg";
import { showModal } from "@/redux/reducers/modal";
import { OPTION_TYPE } from "@/utils/enum";
import { loginTextField, scrollToTop } from "@/utils/styles";
import {
  Calculate,
  ChevronLeft,
  Done,
  Expand,
  ExpandMore,
  Favorite,
  LocationOn,
  Security,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsCalendar, BsFuelPump } from "react-icons/bs";
import { FaAngleLeft } from "react-icons/fa";
import { GiGearStickPattern, GiRoad } from "react-icons/gi";
import { PiEngine } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Autoplay, FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
const CarDetails = () => {
  const router = useRouter();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispatch = useDispatch();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.userInfo);
  useEffect(() => {
    const fetchData = async () => {
      const carId = parseInt(router.query.slug);
      if (carId) {
        user.isAuthenticated
          ? await getCarDetailsById({
              carId,
              setCarData,
              setLoading,
              userId: user.id,
            })
          : await getCarDetailsById({
              carId,
              setCarData,
              setLoading,
            });
      } else {
        return () => {};
      }
    };

    fetchData();
  }, [router, user]);

  const specificationArray = [
    {
      icon: <GiRoad />,
      label: "Mileage",
      value: (carData && carData.odometer) || "Not Disclosed",
    },
    {
      icon: <BsCalendar />,
      label: "First Registration",
      value:
        (carData && carData.period && carData.period.year) || "Not Disclosed",
    },
    {
      icon: <GiGearStickPattern />,
      label: "Transmission",
      value:
        (carData &&
          carData.specification &&
          carData.specification.transmission) ||
        "Not Disclosed",
    },
    {
      icon: <PiEngine />,
      label: "Power",
      value:
        `${
          carData && carData.specification && carData.specification.power
        } kw` || "Not Disclosed",
    },
    {
      icon: <BsFuelPump />,
      label: "Fuel",
      value:
        (carData && carData.variant && carData.variant.fuelType) ||
        "Not Disclosed",
    },
  ];
  const details = [
    {
      label: "Make",
      value: carData && carData.make && carData.make.makeName,
    },
    {
      label: "Model",
      value: carData && carData.model && carData.model.modelName,
    },
    {
      label: "Body Color",
      value: carData && carData.specification && carData.specification.color,
    },
    {
      label: "Interior Material",
      value:
        carData &&
        carData.specification &&
        carData.specification.interiorMaterial,
    },
    {
      label: "Body",
      value:
        carData && carData.specification && carData.specification.vehicleType,
    },
    {
      label: "Doors",
      value: carData && carData.specification && carData.specification.doors,
    },
    {
      label: "Seats",
      value: carData && carData.specification && carData.specification.seats,
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
        carData &&
        carData.specification &&
        carData.specification.specificationDetails &&
        carData.specification.specificationDetails.fuelType,
    },
    {
      label: "Transmission",
      value:
        carData && carData.specification && carData.specification.transmission,
    },
    {
      label: "Drive Type",
      value:
        carData &&
        carData.specification &&
        carData.specification.driveType4WD === OPTION_TYPE.Yes
          ? "4x4"
          : "4x2",
    },
    {
      label: "Power",
      value: `${
        carData && carData.specification && carData.specification.power
      } kw`,
    },
  ];
  const vehicleCondition = [
    {
      label: "Mileage",
      value: carData && carData.odometer,
    },
    {
      label: "First registration",
      value: carData && carData.period && carData.period.year,
    },
  ];

  const redirectCheckout = (id) => {
    router.push(`/checkout/${id}/payment`);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Container style={{ maxWidth: 1325 }} sx={{ mb: 5 }}>
      <Box sx={{ p: 2 }}>
        <Button
          onClick={() => router.back()}
          sx={{ fontSize: 10, color: "#000" }}
        >
          <FaAngleLeft />
          back to marketplace
        </Button>
      </Box>
      <Grid container>
        <Grid item lg={7} p={2}>
          {loading ? (
            <Skeleton variant="rectangular" width={600} height={600} />
          ) : (
            <Card>
              <Swiper
                modules={[Navigation, Thumbs, FreeMode, Autoplay, Zoom]}
                navigation={true}
                autoplay={{
                  delay: 2000,
                }}
                thumbs={{ swiper: thumbsSwiper }}
                loop={true}
              >
                {carData &&
                  carData.carImages &&
                  carData.carImages.map((val, i) => (
                    <SwiperSlide key={i}>
                      <img src={val} height={600} width={"100%"} />
                    </SwiperSlide>
                  ))}
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={1}
                slidesPerView={6}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                autoplay={{
                  delay: 2000,
                }}
                className="mySwiper"
              >
                {carData &&
                  carData.carImages &&
                  carData.carImages.map((val, i) => (
                    <SwiperSlide key={i}>
                      <img src={val} width={"100%"} height={90} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </Card>
          )}
        </Grid>
        <Grid item lg={5} p={2}>
          {loading ? (
            <Skeleton variant="text" width={300} />
          ) : (
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={1}
              justifyContent={"flex-start"}
            >
              <Typography
                fontSize={30}
                fontWeight={600}
                textTransform={"capitalize"}
              >
                {carData && carData.make && carData.make.makeName}
              </Typography>

              <Typography
                fontSize={30}
                fontWeight={600}
                textTransform={"capitalize"}
              >
                {carData && carData.model && carData.model.modelName}
              </Typography>
            </Stack>
          )}
          {loading ? (
            <Skeleton variant="text" />
          ) : (
            carData &&
            carData.price && (
              <Box textAlign={"start"} mb={2}>
                <Typography fontSize={20} fontWeight={600}>
                  {carData && carData.price} €
                </Typography>
              </Box>
            )
          )}
          <Box>
            <Card sx={{ mb: 2, p: 1 }}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                mb={1}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Calculate />
                  <Typography fontSize={12}>Monthly installment </Typography>
                </Stack>
                <Typography fontSize={12}>
                  {(carData && carData.monthlyInstallment) || "Not Included"}
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Security />
                  <Typography fontSize={12}>Extended Warranty </Typography>
                </Stack>
                <Typography fontSize={12}>
                  {(carData && carData.extendedWarranty) || "Not Included"}
                </Typography>
              </Stack>
            </Card>
            {/* <Card sx={{ mb: 2 }}>
              {loading ? (
                <Skeleton variant="text" />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1,
                  }}
                >
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <LocationOn />
                    <Typography fontSize={12}>Location</Typography>
                  </Stack>
                  <Typography fontSize={12}>
                    {(carData && carData.location && carData.location.city) ||
                      "Not Specified By Seller"}
                  </Typography>
                </Box>
              )}
            </Card> */}
            <Card sx={{ p: 1 }}>
              {loading ? (
                <Skeleton variant="text" />
              ) : (
                specificationArray.map((val, i) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                    key={i}
                  >
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      {val.icon}
                      <Typography fontSize={12}>{val.label}</Typography>
                    </Stack>
                    <Typography fontSize={12}>{val.value}</Typography>
                  </Box>
                ))
              )}
            </Card>
            <Box sx={{ mt: 2 }}>
              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{ borderBottom: "1px solid #eee" }}
                >
                  <Typography fontSize={15} fontWeight={550}>
                    Features
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                    {carData &&
                      carData.specification &&
                      carData.specification.equipments &&
                      carData.specification.equipments.map((val, i) => (
                        <Chip
                          label={val}
                          key={i}
                          sx={{
                            backgroundColor: "#0000008e",
                            color: "#fff",
                            mx: 1,
                            my: 0.3,
                            textTransform: "capitalize",
                            fontSize: 10,
                            borderRadius: 1,
                          }}
                        />
                      ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
              {/* <Box display={"flex"} flexWrap={"wrap"} my={2}>
                {carData &&
                  carData.specification &&
                  carData.specification.equipments &&
                  carData.specification.equipments.slice(0, 5).map((val, i) => (
                    <Chip
                      label={val}
                      key={i}
                      sx={{
                        backgroundColor: "#0000008e",
                        color: "#fff",
                        mx: 1,
                        my: 0.3,
                        textTransform: "capitalize",
                        fontSize: 10,
                        borderRadius: 1,
                      }}
                    />
                  ))}
                <Accordion
                  sx={{
                    "& ": {
                      boxShadow: "none",
                      p: 0,
                      margin: 0,
                      "& .MuiAccordionSummary-root": {
                        padding: 0,
                        minHeight: 0,
                      },
                      "& .MuiAccordionSummary-content": {
                        margin: 0,
                      },
                    },
                  }}
                >
                  <AccordionSummary>
                    {carData &&
                      carData.specification &&
                      carData.specification.equipments &&
                      carData.specification.equipments.length > 5 && (
                        <Chip
                          sx={{
                            backgroundColor: "#000000",
                            color: "#fff",
                            mx: 1,
                            my: 0.3,
                            textTransform: "capitalize",
                            fontSize: 10,
                            borderRadius: 1,
                            cursor: "pointer",
                          }}
                          label={`+${
                            carData.specification.equipments.length - 5
                          } more`}
                        />
                      )}
                  </AccordionSummary>
                  <AccordionDetails>
                    {carData &&
                      carData.specification &&
                      carData.specification.equipments &&
                      carData.specification.equipments
                        .slice(5, carData.specification.equipments.length)
                        .map((val, i) => (
                          <Chip
                            label={val}
                            key={i}
                            sx={{
                              backgroundColor: "#0000008e",
                              color: "#fff",
                              mx: 1,
                              my: 0.3,
                              textTransform: "capitalize",
                              fontSize: 10,
                              borderRadius: 1,
                            }}
                          />
                        ))}
                  </AccordionDetails>
                </Accordion>
              </Box> */}
            </Box>
            {/* <Stack direction={"row"} alignItems={"center"} mt={3} spacing={2}>
              <Button
                fullWidth
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  p: 1,
                  border: "1px solid #fff",
                  "&:hover": {
                    color: "#000",
                    backgroundColor: "#fff",
                    border: "1px solid #000",
                  },
                }}
              >
                Buy
              </Button>
            </Stack> */}
            {/* <FormLabel sx={{fontSize:}}>Your Offer Price for this vehicle:</FormLabel> */}
            <Stack direction={"row"} alignItems={"center"} spacing={1} mt={2}>
              <TextField
                sx={{ width: "70%" }}
                helperText="Your Offer Price for this vehicle"
                label="Your offer Price (in Euro)"
              />
              <Button
                sx={{
                  border: "1px solid #000",
                  backgroundColor: "#000",
                  color: "#fff",
                  ":hover": {
                    color: "#fff",
                    backgroundColor: "#000",
                  },
                  fontSize: 12,
                  mb: "24px !important",
                  width: 200,
                  p: 2,
                }}
              >
                Make an Offer
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      {/* vehicle Condition Box */}
      <Box
        sx={{
          backgroundColor: "#eee",
          p: 3,
        }}
      >
        <Grid container>
          <Grid item lg={8}>
            <Typography fontSize={25} fontWeight={600}>
              Details
            </Typography>
            <Grid container mt={3} columnSpacing={2}>
              <Grid lg={5}>
                <Card sx={{ p: 2, height: "100%" }}>
                  <Typography fontSize={15} fontWeight={550}>
                    VEHICLE DETAIL
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <FeatureCard data={details} />
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
                    <FeatureCard data={engine} />
                  </Box>
                </Card>
                <Card sx={{ p: 2 }}>
                  <Typography fontSize={15} fontWeight={550}>
                    Vehicle Condition
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <FeatureCard data={vehicleCondition} />
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} sx={{ position: "relative" }}>
            <Card sx={{ p: 2, backgroundColor: "#000", height: 150 }}>
              <Typography
                color={"#fff"}
                textAlign={"center"}
                fontSize={20}
                fontWeight={550}
                textTransform={"capitalize"}
              >
                {carData && carData.make && carData.make.makeName}{" "}
                {carData && carData.variant && carData.variant.variantName}{" "}
                {carData && carData.model && carData.model.modelName}
              </Typography>
            </Card>
            <Card
              sx={{
                width: 300,
                margin: "auto",
                p: 2,
                position: "absolute",
                left: 60,
                top: 80,
              }}
            >
              {carData && carData.price && (
                <Typography
                  color={"#000"}
                  textAlign={"center"}
                  fontSize={25}
                  fontWeight={550}
                >
                  {carData && carData.price} €
                </Typography>
              )}
              {/* <FormHelperText sx={{ textAlign: "center", mt: 1, mb: 1 }}>
                {carData &&
                carData.specification &&
                carData.specification.vatDeduction === OPTION_TYPE.Yes
                  ? "With VAT Deduction"
                  : "Without VAT Deduction"}
              </FormHelperText> */}
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                {/* <IconButton sx={{ border: "1px solid #eee" }}>
                  <Favorite
                    sx={{ fill: carData && carData.favourite ? "#ff0000" : "" }}
                  />
                </IconButton> */}
                <Button
                  fullWidth
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    "&:hover": {
                      border: "1px solid #000",
                      backgroundColor: "#fff",
                      color: "#000",
                    },
                    fontWeight: 550,
                  }}
                  onClick={() => redirectCheckout(carData.id)}
                  // onClick={handleOpenThank}
                >
                  Buy
                </Button>
              </Stack>
            </Card>
            <Card sx={{ mt: 10, p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontSize={12}>
                  CarAudit <sup>TM</sup>
                </Typography>
                <Typography fontSize={12}>
                  {(carData && carData.carAudit) || "Not Included"}
                </Typography>
              </Box>
              <Box sx={{ my: 2 }}>
                <Divider
                  sx={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    color: "#000",
                    fontWeight: 550,
                  }}
                >
                  Additional Services
                </Divider>
                <Box>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography fontSize={12}>Home Delivery</Typography>
                    <Typography fontSize={12}>
                      {(carData && carData.homedelivery) || "Not Included"}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
              <Box>
                <Divider
                  sx={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    color: "#000",
                    fontWeight: 600,
                  }}
                >
                  Optional Services
                </Divider>

                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  mt={2}
                  // mb={1}
                >
                  <Typography fontSize={12} fontWeight={600}>
                    Extended Warranty
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    disabled
                    sx={{
                      fontSize: 10,
                      cursor: "text",
                      "&:disabled": {
                        color: "#fff",
                        backgroundColor: "green",
                      },
                    }}
                  >
                    Free
                  </Button>
                </Stack>
                <FormHelperText sx={{ fontSize: 10 }}>
                  When ordering a car, you can choose additional ancillary
                  services.
                </FormHelperText>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CarDetails;
