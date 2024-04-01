import { getCarDetails, sendForApprovalCar } from "@/api/apiCalling/vehicle";
import { isImageURL } from "@/utils/regex";
import {
  ChevronLeft,
  ChevronRight,
  DirectionsCar,
  Edit,
  Email,
  Person,
  Phone,
  Public,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Player } from "video-react";

import dummycars from "@/icons/cars.jpg";
import { GiRoad } from "react-icons/gi";
import InfoCard from "@/components/infoCard";
import { OPTION_TYPE } from "@/utils/enum";
import { useRouter } from "next/router";
import Loading from "react-loading";
import TabPanel from "@/components/tabPanel";
const CarPreview = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCarData = async () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        getCarDetails({ carId, setCarData, setLoading, dispatch });
      } else {
        router.push("/create-demand");
      }
    };

    fetchCarData();
  }, []);
  const arrowStyles = {
    position: "absolute",
    zIndex: 2,
    top: "calc(50% - 15px)",
    width: 30,
    height: 30,
    cursor: "pointer",
    border: "1px solid #000",
    borderRadius: "50%",
    backgroundColor: "#000",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
  };
  const [value, setValue] = useState(0);

  const tabChange = (e, newValue) => {
    setValue(newValue);
  };

  //   console.log("carData", carData);

  const carInfo = [
    {
      label: "Make",
      value: carData && carData.make && carData.make.makeName,
    },
    {
      label: "Model",
      value: carData && carData.model && carData.model.modelName,
    },
    {
      label: "Manufacturing Year",
      value: carData && carData.period && carData.period.year,
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
          : "2x4",
    },
  ];
  const engine = [
    {
      label: "Engine Power",
      value: `${
        carData && carData.specification && carData.specification.power
      } kw`,
    },
    {
      label: "Engine Displacement",
      value:
        carData &&
        carData.specification &&
        carData.specification.specificationDetails &&
        carData.specification.specificationDetails.displacementL,
    },
    {
      label: "Fuel Type",
      value: carData && carData.variant && carData.variant.fuelType,
    },
    {
      label: "Body Type",
      value:
        carData && carData.specification && carData.specification.vehicleType,
    },
    {
      label: "Interior Material",
      value:
        carData &&
        carData.specification &&
        carData.specification.interiorMaterial,
    },
  ];
  const user = useSelector((state) => state.userInfo);

  const contactInfo = [
    {
      label: "Name",
      value:
        (carData && carData.contactInfo && carData.contactInfo.name) ||
        (user && user.name),
      icon: <Person sx={{ fontSize: 12 }} />,
    },
    {
      label: "Email",
      value:
        (carData && carData.contactInfo && carData.contactInfo.email) ||
        (user && user.email),
      icon: <Email sx={{ fontSize: 12 }} />,
    },
    {
      label: "Phone",
      value:
        (carData && carData.contactInfo && carData.contactInfo.phoneNo) ||
        (user && user.phoneNo),
      icon: <Phone sx={{ fontSize: 12 }} />,
    },
  ];

  const specificationArray = [
    {
      icon: <DirectionsCar sx={{ fontSize: 13 }} />,
      label: "VIN",
      value: (carData && carData.vin) || "Not Published by Seller",
    },
    {
      icon: <GiRoad size={13} />,
      label: "Mileage",
      value: (carData && carData.odometer) || "Not Specified",
    },
    {
      label: "Ownership",
      value: (carData && carData.ownership) || "Not Specified",
      icon: <Person sx={{ fontSize: 13 }} />,
    },
    {
      icon: <Public sx={{ fontSize: 12 }} />,
      label: "Manfactured In",
      value:
        carData &&
        carData.specification &&
        carData.specification.specificationDetails &&
        carData.specification.specificationDetails.manufacturedIn,
    },
  ];
  const info = [
    {
      label: "Doors",
      value: carData && carData.specification && carData.specification.doors,
    },
    {
      label: "Seats",
      value: carData && carData.specification && carData.specification.seats,
    },
    {
      label: "Trim",
      value:
        carData &&
        carData.specification &&
        carData.specification.specificationDetails &&
        carData.specification.specificationDetails.trimLevel,
    },
  ];

  const [approvalLoading, setApprovalLoading] = useState(false);

  const sendApproval = () => {
    setApprovalLoading(true);
    sendForApprovalCar({
      carId: carData && carData.id,
      router,
      setLoading: setApprovalLoading,
    });
  };

  const tabs = [
    {
      label: "Basic Information",
    },
    {
      label: "Contact Information",
    },
    {
      label: "Specifications",
    },
  ];
  return (
    <div>
      <div className="container-fluid p-0">
        <Card >
          <Carousel
            showThumbs={true}
            showIndicators={false}
            showStatus={false}
            infiniteLoop={true}
            dynamicHeight={true}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  style={{ ...arrowStyles, left: 15 }}
                >
                  <ChevronLeft />
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  style={{ ...arrowStyles, right: 15 }}
                >
                  <ChevronRight />
                </button>
              )
            }
            renderThumbs={() => {
              return (
                carData &&
                carData.carImages &&
                carData.carImages.map((val, i) => {
                  return isImageURL(val) ? (
                    <img src={val} />
                  ) : (
                    <img src={dummycars.src} />
                  );
                })
              );
            }}
          >
            {carData &&
              carData.carImages &&
              carData.carImages.map((val, i) => {
                return isImageURL(val) ? (
                  <img
                    src={val}
                    alt="carImage"
                    loading="lazy"
                    height={750}
                    width={"100%"}
                  />
                ) : (
                  <Player src={val} poster={val} playsInline />
                );
              })}
          </Carousel>
        </Card>
      </div>

      <Container style={{ maxWidth: 1320, marginTop: "2rem" }}>
        <Typography fontSize={30} textTransform={"uppercase"} fontWeight={600}>
          {carData && carData.period && carData.period.year}{" "}
          {carData && carData.make && carData.make.makeName}{" "}
          {carData && carData.model && carData.model.modelName}{" "}
          {carData && carData.variant && carData.variant.variantName}
        </Typography>
        <Typography mt={1} fontSize={25} fontWeight={550}>
          {carData && carData.price} €
        </Typography>
        <Tabs
          onChange={tabChange}
          value={value}
          sx={{
            borderBottom: "1px solid #eee",
            "& .MuiTab-root.Mui-selected": {
              color: "#000",
              borderBottom: "2px solid #000",
            },
          }}
        >
          {tabs.map((val, i) => (
            <Tab label={val.label} key={i} />
          ))}
        </Tabs>
        <TabPanel index={0} value={value}>
          <Grid container spacing={4}>
            <Grid item lg={4}>
              <InfoCard data={specificationArray} />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel index={1} value={value}>
          <Grid container>
            <Grid item lg={4}>
              <InfoCard data={contactInfo} />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel index={2} value={value}>
          <Grid container spacing={3}>
            <Grid item lg={4}>
              <InfoCard data={carInfo} />
            </Grid>
            <Grid item lg={4}>
              <InfoCard data={engine} />
            </Grid>
            <Grid item lg={4}>
              <InfoCard data={info} />
            </Grid>
          </Grid>
        </TabPanel>
        <Stack direction={"row"} alignItems={"center"} spacing={2} mt={2}>
          <Button
            sx={{
              color: "#fff",
              border: "1px solid green",
              backgroundColor: "green",
              ":hover": {
                backgroundColor: "green",
              },
              fontSize: 12,
            }}
            onClick={() => router.push("/create-demand")}
          >
            Edit Details
          </Button>
          <Button
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              p: 1,
              fontSize: 12,
              ":hover": {
                color: "#fff",
                backgroundColor: "#000",
              },
              width: 200,
            }}
            onClick={sendApproval}
          >
            {approvalLoading ? (
              <Loading
                type="bars"
                color="#fff"
                width={20}
                height={20}
                className="m-auto"
              />
            ) : (
              "Send Car For Approval"
            )}
          </Button>
        </Stack>
      </Container>

    </div>
  );
};

export default CarPreview;
