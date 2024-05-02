import { addCarsToFavorite, getFavouriteCars } from "@/api/apiCalling/vehicle";
import {
  AddRoad,
  CalendarMonth,
  ChevronRight,
  DirectionsCar,
  Favorite,
  Person,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  TablePagination,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsFuelPump } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import Loading from "react-loading";
import { Carousel } from "react-responsive-carousel";
import dummyCars from "@/icons/cars.jpg";
import { useSelector } from "react-redux";
import { vehicleController } from "@/api/addVehicle";
import { PiEngine } from "react-icons/pi";
const ShortListedVehicle = () => {
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const router = useRouter();
  useEffect(() => {
    getFavouriteCars({
      setCarData,
      loading: setLoading,
    });
  }, []);

  const user = useSelector((state) => state.userInfo);
  const removefavourite = (value) => {
    setLoading(true);
    let body = {
      favourite: false,
      carId: value.id,
    };
    vehicleController
      .favoriteCars(body)
      .then((res) => {
        getFavouriteCars({ setCarData, loading: setLoading });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const routerPage = (id) => {
    router.push(`/vehicles/${id}/car-details`);
  };
  const phoneMatches = useMediaQuery("(max-width:600px)");

  return (
    <Box>
      <Box
        sx={{
          display: { lg: "flex", xs: "column" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography fontSize={20} fontWeight={600}>
          Favourite Vehicles
        </Typography>

        <TablePagination
          count={carData && carData.totalDocs}
          rowsPerPage={10}
          page={page}
          sx={{
            "& .MuiTablePagination-selectLabel": {
              fontSize: { xs: 12 },
            },
            "& .MuiSvgIcon-root": {
              fontSize: { xs: 20 },
            },
            "& .MuiTablePagination-toolbar": {
              paddingLeft: { xs: 0 },
            },
          }}
        />
      </Box>
      {loading ? (
        <Loading
          type="bars"
          width={30}
          height={30}
          color="#000"
          className="m-auto"
        />
      ) : carData && carData.docs.length === 0 ? (
        <Typography
          fontSize={15}
          textAlign={"center"}
          fontWeight={600}
          mt={{ xs: 1 }}
        >
          {" "}
          No Car Found
        </Typography>
      ) : (
        carData &&
        carData.docs &&
        carData.docs.map((val, i) => (
          <Card key={i} sx={{ my: 3 }}>
            <Grid container spacing={{ lg: 3, xs: 1 }}>
              <Grid item lg={4} xs={12}>
                <Carousel
                  showThumbs={false}
                  showIndicators={false}
                  showArrows={false}
                >
                  {val.carImages ? (
                    val.carImages.map((image, index) => (
                      <img src={image} key={index} height={200} />
                    ))
                  ) : (
                    <img src={dummyCars.src} height={200} />
                  )}
                </Carousel>
              </Grid>
              <Grid item lg={8} xs={12} px={{ xs: 2 }}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  pt={{ lg: 2, xs: 0 }}
                >
                  <Typography
                    fontSize={{ lg: 20, xs: 15 }}
                    fontWeight={600}
                    textTransform={"capitalize"}
                    px={2}
                  >
                    {val && val.period && val.period.year}{" "}
                    {val && val.make && val.make.makeName}{" "}
                    {val && val.model && val.model.modelName}
                  </Typography>

                  <IconButton onClick={() => removefavourite(val)}>
                    <Favorite sx={{ fill: val.favourite ? "#ff0000" : "" }} />
                  </IconButton>
                </Stack>
                <Typography fontSize={10} ml={{ xs: 2 }}>
                  {val.vin || "VIN not disclosed"}
                </Typography>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={{ lg: 5, xs: 4 }}
                  mt={2}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    px={{ xs: 2 }}
                  >
                    <AddRoad sx={{ fontSize: { lg: 12, xs: 9 } }} />
                    <Typography fontSize={{ lg: 12, xs: 9 }}>{`${
                      val && val.odometer
                    } km`}</Typography>
                  </Stack>

                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <BsFuelPump fontSize={12} />
                    <Typography fontSize={{ lg: 12, xs: 9 }}>
                      {(val &&
                        val.specification &&
                        val.specification.specificationDetails &&
                        val.specification.specificationDetails.fuelType) ||
                        "Not Disclosed"}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <GiGearStickPattern fontSize={12} />
                    <Typography fontSize={{ lg: 12, xs: 9 }}>
                      {(val &&
                        val.specification &&
                        val.specification.transmission) ||
                        "Not Disclosed"}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={5}
                  my={1}
                  px={{ xs: 2 }}
                >
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Person sx={{ fontSize: { lg: 12, xs: 9 } }} />
                    <Typography fontSize={{ lg: 12, xs: 9 }}>
                      {val && val.ownership}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <PiEngine sx={{ fontSize: { lg: 12, xs: 9 } }} />
                    <Typography fontSize={{ lg: 12, xs: 9 }}>
                      {val &&
                        val.specification &&
                        val.specification.power &&
                        `${val.specification.power} kw`}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <DirectionsCar sx={{ fontSize: { lg: 12, xs: 9 } }} />
                    <Typography fontSize={{ lg: 12, xs: 9 }}>
                      {val &&
                        val.specification &&
                        val.specification.vehicleType}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack
                  direction={{ lg: "row", xs: "column" }}
                  alignItems={{ lg: "center", xs: "flex-start" }}
                  justifyContent={"space-between"}
                  mr={{ lg: 2, xs: 0 }}
                >
                  {val && val.price && (
                    <Typography
                      fontSize={{ lg: 25, xs: 15 }}
                      fontWeight={600}
                      // mt={2}
                      mb={2}
                      mx={{ xs: 2 }}
                      alignSelf={{ lg: "center", xs: "flex-start" }}
                    >
                      {`${val && val.price} €` || "Not Disclosed"}
                    </Typography>
                  )}
                  {phoneMatches ? (
                    <>
                      <Divider sx={{ backgroundColor: "#000" }} />
                      <Button sx={{ color: "#000", fontSize: 12 }} fullWidth>
                        View Car Details <ChevronRight fontSize="small" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      color="inherit"
                      sx={{
                        fontSize: 12,
                        alignSelf: "end",
                        backgroundColor: "#000",
                        color: "#fff",
                        ":hover": {
                          color: "#fff",
                          backgroundColor: "#000",
                        },
                      }}
                      onClick={() => routerPage(val.id)}
                    >
                      View Car Details <ChevronRight />
                    </Button>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ShortListedVehicle;
