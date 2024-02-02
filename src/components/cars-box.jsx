import { loginTextField } from "@/utils/styles";
import {
  CalendarMonth,
  Done,
  Favorite,
  FavoriteBorderOutlined,
  Public,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { BsFuelPump } from "react-icons/bs";
import { GiGearStickPattern, GiRoad } from "react-icons/gi";
import { PiEngine } from "react-icons/pi";
import { Carousel } from "react-responsive-carousel";
import dummyCar from "@/icons/cars.jpg";
import { OPTION_TYPE } from "@/utils/enum";
import { useRouter } from "next/router";
const BoxCar = ({ data }) => {
  console.log(data);
  const [favourites, setFavourites] = useState(
    new Array(data.length).fill(false)
  );

  const favouriteHandler = (index) => {
    const updatedFavourites = [...favourites];
    updatedFavourites[index] = !updatedFavourites[index];
    setFavourites(updatedFavourites);
  };
  const router = useRouter();
  const carDetails = (carId) => {
    router.push(`/cars/${carId}/car-details`);
  };
  return (
    <Box>
      {data.map((val, i) => (
        <Card
          sx={{
            "&:hover": {
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            },
            marginBottom: 3,
          }}
          key={i}
        >
          <Grid container>
            <Grid item lg={4}>
              <Carousel
                showThumbs={false}
                swipeable={true}
                showIndicators={false}
              >
                {val && val.carImages ? (
                  val.carImages.map((image, index) => (
                    <img src={image} width={"100%"} height={220} key={index} />
                  ))
                ) : (
                  <img src={dummyCar.src} />
                )}
              </Carousel>
            </Grid>
            <Grid item lg={8} p={2}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  variant="h5"
                  marginBottom={3}
                  fontSize={20}
                  fontWeight={600}
                >
                  {val && val.make && val.make.makeName}{" "}
                  {val && val.model && val.model.modelName}
                  {val && val.variant && val.variant.variantName}{" "}
                  {val && val.variant && val.variant.fuelType}
                </Typography>
                {favourites[i] ? (
                  <Favorite
                    sx={{ fill: "#ff0000", cursor: "pointer" }}
                    onClick={() => favouriteHandler(i)}
                  />
                ) : (
                  <FavoriteBorderOutlined
                    onClick={() => favouriteHandler(i)}
                    sx={{ cursor: "pointer" }}
                  />
                )}
              </Stack>
              <Typography fontSize={12}>
                {(val && val.vin) || "Not Disclosed"}
              </Typography>
              <Stack
                direction={{ lg: "row" }}
                spacing={2}
                marginBottom={2}
                marginTop={2}
              >
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Box>
                    <GiRoad />
                    <Typography
                      ml={1}
                      variant="p"
                      fontWeight={400}
                      fontSize={14}
                    >
                      {(val && val.odometer) || "Not Disclosed"}
                    </Typography>
                  </Box>
                  <Box>
                    <CalendarMonth />
                    <Typography
                      ml={1}
                      variant="p"
                      fontWeight={400}
                      fontSize={14}
                    >
                      {(val && val.period && val.period.year) ||
                        "Not Published by Seller"}
                    </Typography>
                  </Box>
                  <Box>
                    <PiEngine />
                    <Typography
                      ml={1}
                      variant="p"
                      fontWeight={400}
                      fontSize={14}
                    >
                      {(val && val.specification && val.specification.power) ||
                        "Not Disclosed"}
                    </Typography>
                  </Box>
                  <Box>
                    <GiGearStickPattern />
                    <Typography
                      ml={1}
                      variant="p"
                      fontWeight={400}
                      fontSize={14}
                    >
                      {(val &&
                        val.specification &&
                        val.specification.transmission) ||
                        "Not Published by Seller"}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                {val &&
                  val.specification &&
                  val.specification.equipments &&
                  val.specification.equipments.slice(0, 3).map((item, id) => (
                    <Chip
                      sx={{ bgcolor: "#0000ff75", color: "#fff", fontSize: 12 }}
                      avatar={
                        <Avatar sx={{ padding: 1, bgcolor: "#fff" }}>
                          <Done sx={{ fill: "blue", fontSize: 15 }} />
                        </Avatar>
                      }
                      label={item}
                      key={id}
                    />
                  ))}
                {val &&
                  val.specification &&
                  val.specification.equipments &&
                  val.specification.equipments.length > 3 && (
                    <Chip
                      sx={{
                        bgcolor: "#0000ff75",
                        color: "#fff",
                        border: "1px solid #0000ff75",
                        fontSize: 12,
                        "&:hover": {
                          bgcolor: "transparent",
                          border: "1px solid #0000ff75",
                          color: "#000",
                        },
                        transition: "0.5s ease all",
                        cursor: "pointer",
                      }}
                      label={`+${val.specification.equipments.length - 3} more`}
                    />
                  )}
              </Stack>

              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mt={2}
              >
                <Box>
                  <Typography textAlign={"end"} fontSize={18}>
                    {val && val.price != null ? `${val.price}€` : ""}
                  </Typography>
                  <Typography fontSize={12}>
                    {val &&
                    val.specification &&
                    val.specification.vatDeduction === OPTION_TYPE.No
                      ? "Without VAT Deduction"
                      : "Including VAT Dedcution"}
                  </Typography>
                </Box>
                <Button onClick={() => carDetails(val.id)}>
                  View Car Details
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      ))}
    </Box>
  );
};

export default BoxCar;
