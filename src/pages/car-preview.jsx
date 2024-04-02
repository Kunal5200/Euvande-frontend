import { getCarDetails, sendForApprovalCar } from "@/api/apiCalling/vehicle";
import {
  DirectionsCar,
  Email,
  Person,
  Phone,
  Public,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Player } from "video-react";

import FourImageGrid from "@/components/fourImageGrid";
import TwoImageGrid from "@/components/twoImageGrid";
import { OPTION_TYPE } from "@/utils/enum";
import { useRouter } from "next/router";
import { GiRoad } from "react-icons/gi";
import owners from "@/icons/owners.png";
import Loading from "react-loading";
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
    {
      label: "Ownership",
      value: carData && carData.ownership,
    },
  ];
  const info = [
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

  const [approvalLoading, setApprovalLoading] = useState(false);

  const sendApproval = () => {
    setApprovalLoading(true);
    sendForApprovalCar({
      carId: carData && carData.id,
      router,
      setLoading: setApprovalLoading,
    });
  };

  const carImages = [
    {
      img1:
        carData &&
        carData.media &&
        carData.media.images &&
        carData.media.images.frontRight,
      img2:
        carData &&
        carData.media &&
        carData.media.images &&
        carData.media.images.frontLeft,
    },

    {
      img1:
        carData &&
        carData.media &&
        carData.media.images &&
        carData.media.images.Headlining,
      img2:
        carData &&
        carData.media &&
        carData.media.images &&
        carData.media.images.headlamp,
    },
  ];
  const vehicleImages = [
    {
      img1: carData && carData.media && carData.media.images.dashboard,
      img2: carData && carData.media && carData.media.images.driverDoor,
      img3: carData && carData.media && carData.media.images.driverSeat,
      img4: carData && carData.media && carData.media.images.instrumentPanel,
    },
    {
      img1: carData && carData.media && carData.media.images.engine,
      img2: carData && carData.media && carData.media.images.passengerSeat,
      img3:
        carData &&
        carData.media &&
        carData.media.images.rearPanelOfCenterConsole,
      img4: carData && carData.media && carData.media.images.rearSeat,
    },
  ];
  const carRearView = [
    {
      img1: carData && carData.media && carData.media.images.rearLeft,
      img2: carData && carData.media && carData.media.images.rearRight,
    },
    {
      img1: carData && carData.media && carData.media.images.backLeftTyre,
      img2: carData && carData.media && carData.media.images.backRightTyre,
    },
  ];
  const tyreImages = [
    {
      img1: carData && carData.media && carData.media.images.backLeftTyre,
      img2: carData && carData.media && carData.media.images.backRightTyre,
      img3: carData && carData.media && carData.media.images.backLeftWheel,
      img4: carData && carData.media && carData.media.images.backRightWheel,
    },
    {
      img1: carData && carData.media && carData.media.images.frontLeftTyre,
      img2: carData && carData.media && carData.media.images.frontLeftWheel,
      img3: carData && carData.media && carData.media.images.frontRightTyre,
      img4: carData && carData.media && carData.media.images.frontRightWheel,
    },
  ];
  console.log("cardata", carData);
  const [fixed, setFixed] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => setFixed(window.pageYOffset > 0));
    }
  }, []);
  return (
    <div>
      {loading ? (
        <Box sx={{ height: 1000 }}>
          <Loading
            type="bars"
            width={30}
            height={30}
            className="m-auto"
            color="#000"
          />
        </Box>
      ) : (
        <Box>
          <Grid container>
            <Grid
              item
              lg={8}
              sx={{
                maxHeight: 680,
                overflowY: "scroll",
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Grid container>
                <Grid item lg={12}>
                  <img
                    src={
                      carData &&
                      carData.media &&
                      carData.media.images &&
                      carData.media.images.frontView
                    }
                    width={"100%"}
                    //   height={550}
                  />
                </Grid>
              </Grid>

              <TwoImageGrid data={carImages} />
              <Grid container borderTop={"4px solid #fff"}>
                <Grid item lg={12}>
                  <Player
                    src={carData && carData.media && carData.media.videos}
                  />
                </Grid>
              </Grid>

              <FourImageGrid data={vehicleImages} />
              <Grid container borderTop={"4px solid #fff"}>
                <Grid item lg={12}>
                  <img
                    src={
                      carData &&
                      carData.media &&
                      carData.media.images &&
                      carData.media.images.rearView
                    }
                    width={"100%"}
                    //   height={550}
                  />
                </Grid>
              </Grid>

              <TwoImageGrid data={carRearView} />
              <FourImageGrid data={tyreImages} />
            </Grid>
            <Grid item lg={4} p={2}>
              <Box
                sx={{
                  maxHeight: 525,
                  overflowY: "scroll",
                  "::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 45,
                    fontWeight: 550,
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                    mt: 4,
                  }}
                >
                  {carData && carData.period && carData.period.year}{" "}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 45,
                    fontWeight: 550,
                    textTransform: "uppercase",
                  }}
                >
                  {carData && carData.make && carData.make.makeName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 45,
                    fontWeight: 550,
                    textTransform: "uppercase",
                  }}
                >
                  {carData && carData.model && carData.model.modelName}
                </Typography>
                <Typography sx={{ fontSize: 12, mt: 2, mb: 4 }}>
                  VIN : {carData && carData.vin}
                </Typography>

                <Typography sx={{ fontSize: 20, mt: 4, fontWeight: 550 }}>
                  {carData && carData.price} €
                </Typography>
                <Typography
                  sx={{ pb: 2, mt: 4, fontSize: 22, fontWeight: 550 }}
                >
                  Contact Information
                </Typography>
                <Divider sx={{ backgroundColor: "#000" }} />
                {contactInfo.map((val, i) => (
                  <React.Fragment>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      pb={2}
                      pt={2}
                      key={i}
                    >
                      <Typography fontSize={12}>{val.label}</Typography>
                      <Typography fontSize={12}>{val.value}</Typography>
                    </Stack>
                    {i !== contactInfo.length - 1 && (
                      <Divider sx={{ backgroundColor: "#000" }} />
                    )}
                  </React.Fragment>
                ))}

                <Typography
                  sx={{ pb: 2, mt: 3, fontSize: 22, fontWeight: 550 }}
                >
                  Key Specifications
                </Typography>
                <Divider sx={{ backgroundColor: "#000" }} />
                {specificationArray.map((val, i) => (
                  <React.Fragment>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      pt={2}
                      pb={2}
                    >
                      <Typography fontSize={12}>{val.label}</Typography>
                      <Typography fontSize={12}>{val.value}</Typography>
                    </Stack>
                    {i !== specificationArray.length - 1 && (
                      <Divider sx={{ backgroundColor: "#000" }} />
                    )}
                  </React.Fragment>
                ))}
                <Typography
                  sx={{ pb: 2, mt: 3, fontSize: 22, fontWeight: 550 }}
                >
                  Base Specifications
                </Typography>
                <Divider sx={{ backgroundColor: "#000" }} />
                {info.map((val, i) => (
                  <React.Fragment>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      pt={2}
                      pb={2}
                    >
                      <Typography fontSize={12}>{val.label}</Typography>
                      <Typography fontSize={12}>{val.value}</Typography>
                    </Stack>
                    {i !== info.length - 1 && (
                      <Divider sx={{ backgroundColor: "#000" }} />
                    )}
                  </React.Fragment>
                ))}
              </Box>

              <Button
                sx={{
                  border: "1px solid #008000",
                  backgroundColor: "#008000",
                  color: "#fff",
                  ":hover": {
                    backgroundColor: "#008000",
                  },
                  mt: 2,
                }}
                fullWidth
                onClick={() => router.push("/create-demand")}
              >
                Edit Details
              </Button>
              <Button
                sx={{
                  border: "1px solid #000",
                  backgroundColor: "#000",
                  color: "#fff",
                  ":hover": {
                    backgroundColor: "#000",
                  },
                  mt: 0.4,
                }}
                fullWidth
                onClick={sendApproval}
              >
                {approvalLoading ? (
                  <Loading
                    type="bars"
                    width={20}
                    height={20}
                    className="m-auto"
                    color="#fff"
                  />
                ) : (
                  " Send For Approval"
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default CarPreview;
