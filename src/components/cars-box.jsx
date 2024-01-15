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
const BoxCar = (props) => {
  const [favourite, setFavourite] = useState(false);
  const favouriteHandler = () => {
    setFavourite(!favourite);
  };
  return (
    <Box>
      <Card
        sx={{
          "&:hover": {
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          },
          marginBottom: 3,
        }}
      >
        <Grid container>
          <Grid item lg={4}>
            <Carousel showThumbs={false} swipeable={true} showIndicators={false}>
              {props.carImages.map((val, i) => (
                <Image src={val.img} width="100%" height={248} key={i} />
              ))}
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
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "purple",
                  },
                  textDecoration: "underline",
                }}
                fontSize={20}
                fontWeight={600}
              >
                {/* Peugeot 2008 PureTech 130 EAT6 96 kW */}
                {props.carName}
              </Typography>
              {favourite ? (
                <Favorite
                  sx={{ fill: "#ff0000", cursor: "pointer" }}
                  onClick={favouriteHandler}
                />
              ) : (
                <FavoriteBorderOutlined
                  onClick={favouriteHandler}
                  sx={{ cursor: "pointer" }}
                />
              )}
            </Stack>
            <Stack
              direction={{ lg: "row" }}
              spacing={2}
              marginBottom={2}
              marginTop={2}
            >
              {props.specifications.map((val, i) => (
                <Stack
                  direction={"row"}
                  spacing={2}
                  alignItems={"center"}
                  key={i}
                >
                  <Box>
                    <GiRoad />
                    <Typography
                      ml={1}
                      variant="p"
                      fontWeight={400}
                      fontSize={14}
                    >
                      {val.driven}
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
                      {val.registration}
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
                      {val.engine}
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
                      {val.transmission}
                    </Typography>
                  </Box>
                  <Box>
                    <BsFuelPump />
                    <Typography
                      ml={1}
                      variant="p"
                      fontWeight={400}
                      fontSize={14}
                    >
                      {val.fuelType}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
            <Stack direction={"row"} spacing={1}>
              {props.features.slice(0, 3).map((val, i) => (
                <Chip
                  sx={{ bgcolor: "#0000ff75", color: "#fff", fontSize: 12 }}
                  avatar={
                    <Avatar sx={{ padding: 1, bgcolor: "#fff" }}>
                      <Done sx={{ fill: "blue", fontSize: 15 }} />
                    </Avatar>
                  }
                  label={val.label}
                  key={i}
                />
              ))}
              {props.features.length > 3 && (
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
                  label={`+${props.features.length - 3} more`}
                />
              )}
            </Stack>

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={2}
            >
              <Box
                sx={{
                  "&:hover": {
                    backgroundColor: "#eee",
                  },
                  padding: 1,
                  transition: "0.5s ease all",
                  borderRadius: 4,
                  cursor: "pointer",
                  width: 150,
                }}
              >
                <Stack direction={"row"} alignItems={"center"}>
                  <Public sx={{ mx: 0.5 }} />
                  <Typography fontSize={12}>
                    {props.countryName},Delivery:
                  </Typography>
                </Stack>
                <TextField
                  variant="standard"
                  sx={loginTextField}
                  label="Enter Zip Code"
                />
                {/* <Typography
                  ml={4}
                  fontSize={13}
                  color={"purple"}
                  sx={{ textDecoration: "underline" }}
                >
                  {props.deliveryAmount} €
                </Typography> */}
              </Box>
              <Box>
                {/* <Typography fontSize={12}>
                  <Done fontSize="8px" sx={{ mx: 0.5 }} />
                  Deliverable to Your Location
                </Typography>
                <TextField
                  variant="standard"
                  label="Enter zipcode"
                  sx={loginTextField}
                /> */}
              </Box>
              <Box>
                <Typography fontSize={25} fontWeight={600} sx={{ mx: 1 }}>
                  {props.carAmount} €
                </Typography>
                {props.amountWithoutVAT ? (
                  <Typography fontSize={12} sx={{ mx: 1 }}>
                    {props.amountWithoutVAT} € without VAT
                  </Typography>
                ) : (
                  <Typography fontSize={12} textAlign={"center"}>
                    Not deductible
                  </Typography>
                )}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default BoxCar;
