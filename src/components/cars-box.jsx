import { Add, CalendarMonth, Done, Public } from "@mui/icons-material";
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
import React from "react";
import { GiRoad, GiGearStickPattern } from "react-icons/gi";
import { PiEngine } from "react-icons/pi";
import { BsFuelPump } from "react-icons/bs";
import { Carousel } from "react-responsive-carousel";
import data from "@/assests/data";
import carImage1 from "@/cars/image1.jpeg";
import carImage2 from "@/cars/image2.jpeg";
import carImage3 from "@/cars/image3.jpeg";
import carImage4 from "@/cars/image4.jpeg";
import carImage5 from "@/cars/image5.jpeg";
import carImage6 from "@/cars/image6.jpeg";
import carImage7 from "@/cars/image7.jpeg";
import carImage8 from "@/cars/image8.jpeg";
import Image from "next/image";
import { loginTextField } from "@/utils/styles";
const BoxCar = () => {
  const specifications = [
    {
      icon: <GiRoad />,
      label: "30 209 km",
    },
    {
      icon: <CalendarMonth />,
      label: "1/2022",
    },
    {
      icon: <PiEngine />,
      label: "235 hp",
    },
    {
      icon: <GiGearStickPattern />,
      label: "Automatic",
    },
    {
      icon: <BsFuelPump />,
      label: "Petrol",
    },
  ];
  const carImages = [
    {
      image: carImage1,
    },
    {
      image: carImage2,
    },
    {
      image: carImage3,
    },
    {
      image: carImage4,
    },
    {
      image: carImage5,
    },
    {
      image: carImage6,
    },
    {
      image: carImage7,
    },
    {
      image: carImage8,
    },
  ];
  return (
    <Box>
      <Card
        sx={{
          "&:hover": {
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          },
        }}
      >
        <Grid container>
          <Grid item lg={4}>
            <Carousel showThumbs={false} swipeable={true}>
              {carImages.map((val, i) => (
                <Image src={val.image} width="100%" height={285} />
              ))}
            </Carousel>
          </Grid>
          <Grid item lg={8} px={2}>
            <Typography
              variant="h5"
              marginBottom={3}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                  color: "purple",
                },
              }}
              fontSize={18}
              fontWeight={600}
            >
              Peugeot 2008 PureTech 130 EAT6 96 kW
            </Typography>
            <Stack
              direction={{ lg: "row" }}
              spacing={2}
              marginBottom={2}
              marginTop={2}
            >
              {specifications.map((val, i) => (
                <Stack
                  direction={"row"}
                  spacing={1}
                  alignItems={"center"}
                  key={i}
                >
                  {val.icon}
                  <Typography variant="p" fontWeight={400} fontSize={14}>
                    {val.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Stack direction={"row"} spacing={1}>
              {data.features.slice(0, 4).map((val, i) => (
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
              {data.features.length > 4 && (
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
                  label={`+${data.features.length - 4} more`}
                />
              )}
            </Stack>
            <Box sx={{ my: 1 }}>
              <Typography fontSize={25} fontWeight={600} sx={{ mx: 1 }}>
                25849 €
              </Typography>
              <Typography fontSize={12} sx={{ mx: 1 }}>
                21363 € without VAT
              </Typography>
            </Box>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"flex-end"}
            >
              <Box>
                <Stack direction={"row"} alignItems={"center"}>
                  <Public sx={{ mx: 0.5 }} />
                  <Typography fontSize={12}>Germany</Typography>
                </Stack>
              </Box>
              <Box>
                <Typography fontSize={12}>
                  <Done fontSize="8px" sx={{ mx: 0.5 }} />
                  Deliverable to Your Location
                </Typography>
                <TextField
                  variant="standard"
                  label="Enter zipcode"
                  sx={loginTextField}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default BoxCar;
