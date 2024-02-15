import { getCars } from "@/api/apiCalling/listingApi";
import { listingController } from "@/api/listing";
import hatchback from "@/icons/bodyType/hatchback.svg";
import muv from "@/icons/bodyType/muv.svg";
import sedan from "@/icons/bodyType/sedan.svg";
import suv from "@/icons/bodyType/suv.svg";
import { bodyTypeTabButton } from "@/utils/styles";
import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import Button from "../button";
import TabPanel from "../tabPanel";
import Icons from "./icons";
import CarCard from "../carCard";
import { useRouter } from "next/router";
import Loading from "react-loading";
const BodyType = () => {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const tabs = [
    {
      icon: suv.src,
    },
    {
      icon: hatchback.src,
    },
    {
      icon: sedan.src,
    },

    {
      icon: suv.src,
    },
    {
      icon: muv.src,
    },
    {
      icon: muv.src,
    },
    {
      icon: muv.src,
    },
    {
      icon: muv.src,
    },
  ];
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e, newValue) => {
    setValue(newValue);
    // let body = {
    //   vehicleType: e.target.innerText,
    // };
    // getCars({ setCarData });
  };
  const [vehicleType, setVehicleType] = useState("coupe");
  const getCarsbyVehicleType = (value) => {
    let body = {
      vehicleType: value.label,
    };
    setVehicleType(value.label);
    getCars({ setCarData, loading: setLoading, body });
  };

  console.log("....carData", carData);
  const [tabData, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      listingController
        .getDefaultSpecificationPublic()
        .then((res) => {
          const response = res.data.data.vehicleType;
          const transformedResponse = response.map((item) => ({ label: item }));

          const mergedData = transformedResponse.map((item, i) => ({
            ...item,
            icons: tabs[i] ? tabs[i].icon : null,
          }));
          setData(mergedData);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
    getCars({
      setCarData,
      loading: setLoading,
      body: {
        vehicleType: vehicleType,
      },
    });
  }, [vehicleType]);

  return (
    <Box className="my-4">
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Tabs
          scrollButtons={"auto"}
          allowScrollButtonsMobile
          variant="scrollable"
          value={value}
          onChange={handleChange}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "8px",
            border: "1px solid #000",
          }}
        >
          {tabData.map((val, i) => (
            <Tab
              label={val.label}
              icon={<Icons img={val.icons} />}
              sx={bodyTypeTabButton}
              key={i}
              onClick={() => getCarsbyVehicleType(val)}
            />
          ))}
        </Tabs>
      </Box>
      <Box marginTop={{ xs: 2, lg: 4 }}>
        <TabPanel index={value} value={value}>
          {loading ? (
            <Loading type="bars" color={"#000"} className="loader" />
          ) : (
            <Container style={{ maxWidth: 1300 }}>
              {carData && carData.docs && carData.docs.length ? (
                <>
                  <Swiper
                    breakpoints={{
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                      },
                    }}
                    spaceBetween={5}
                    // modules={[Navigation]}
                    navigation={true}
                  >
                    {carData &&
                      carData.docs &&
                      carData.docs.map((val, i) => (
                        <SwiperSlide key={i} className="my-3">
                          <CarCard data={val} />
                        </SwiperSlide>
                      ))}
                  </Swiper>

                  <Box textAlign={"center"}>
                    <Button
                      sx={{
                        width: 250,
                        borderRadius: 20,
                        mt: 3,
                        border: "1px solid #000",
                        color: "#000",
                        "&:hover": {
                          color: "#fff",
                          backgroundColor: "#000",
                        },
                      }}
                      onClick={() => router.push("/buy-cars")}
                    >
                      <span>View All Cars</span>
                    </Button>
                  </Box>
                </>
              ) : (
                <Box textAlign={"center"}>
                  <Typography fontSize={20}>No Car Found</Typography>
                  <Button
                    sx={{
                      border: "1px solid #000",
                      color: "#000",
                      "&:hover": {
                        color: "#fff",
                        backgroundColor: "#000",
                      },
                      mt: 2,
                    }}
                    onClick={() => router.push("/buy-cars")}
                  >
                    Brwose Cars
                  </Button>
                </Box>
              )}
            </Container>
          )}
        </TabPanel>
      </Box>
    </Box>
  );
};

export default BodyType;
