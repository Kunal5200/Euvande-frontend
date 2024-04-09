import React, { useState } from "react";
import {
  Card,
  Grid,
  Box,
  Typography,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { ChevronRight, Favorite } from "@mui/icons-material";
import { useSelector } from "react-redux";
import Dot from "./dot";
import { useRouter } from "next/router";
import { addCarsToFavorite } from "@/api/apiCalling/vehicle";
const CarGrid = ({ data, setCarData, page, setLoading, pageSize }) => {
  const [favourites, setFavourites] = useState(
    new Array(data.length).fill(false)
  );
  const router = useRouter();

  const user = useSelector((state) => state.userInfo);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const favouriteHandler = (carId, index, favourite) => {
    if (user.isAuthenticated) {
      setLoading(true);

      let body = {
        favourite: favourite ? false : true,
        carId: carId,
      };

      addCarsToFavorite({
        data: body,
        setCarData,
        setLoading,
        page,
        pageSize,

        user,
      });
    } else {
      router.push("/login");
    }
  };

  const carDetails = (carId) => {
    router.push(`/vehicles/${carId}/car-details`);
  };
  return (
    <div>
      <Grid container>
        {data &&
          data.map((val, i) => (
            <Grid items lg={4} key={i} mb={2}>
              <Card sx={{ mx: 1 }}>
                <Carousel
                  showArrows={false}
                  showThumbs={false}
                  showIndicators={false}
                  swipeable={true}
                >
                  {val &&
                    val.carImages &&
                    val.carImages.map((image, index) => (
                      <img
                        src={image}
                        key={index}
                        height={220}
                        loading="lazy"
                      />
                    ))}
                </Carousel>
                <Box sx={{ p: 1 }}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      textTransform={"uppercase"}
                      fontSize={13}
                      fontWeight={550}
                    >
                      {val.period.year} {val.make.makeName}{" "}
                      {val.model.modelName}
                    </Typography>
                    <Favorite
                      sx={{
                        fill: val.favourite ? "#ff0000" : "",
                        cursor: "pointer",
                      }}
                      onClick={() => favouriteHandler(val.id, i, val.favourite)}
                    />
                  </Stack>
                  <Typography fontSize={10}>
                    {val.vin || "VIN not Published"}
                  </Typography>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    mt={1}
                  >
                    <Typography sx={{ fontSize: 10 }}>
                      {val.odometer}
                    </Typography>
                    <Dot width={3} height={3} bgColor="#000" />
                    <Typography sx={{ fontSize: 10 }}>
                      {val.ownership}
                    </Typography>
                    <Dot width={3} height={3} bgColor="#000" />
                    <Typography sx={{ fontSize: 10 }}>
                      {val.specification && val.specification.transmission}
                    </Typography>
                  </Stack>
                  <Typography fontSize={15} fontWeight={550} mt={1}>
                    Price : {val.price !== null ? `${val.price} €` : "N/A"}{" "}
                  </Typography>
                </Box>
                <Divider sx={{ backgroundColor: "#000" }} />
                <Button
                  fullWidth
                  sx={{
                    fontSize: 12,
                    color: "#000",
                    ":hover": {
                      color: "#000",
                      backgroundColor: "transparent",
                    },
                  }}
                  onClick={() => carDetails(val.id)}
                >
                  View Car Details <ChevronRight />
                </Button>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default CarGrid;
