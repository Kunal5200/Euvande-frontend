import data from "@/assests/data";
import BannerForm from "@/components/bannerForm";
import BodyType from "@/components/bodyType/bodyType";
import BrandCard from "@/components/brandCard";
import CarCard from "@/components/carCard";
import HowWorks from "@/components/howItWorks";
import TestimonialCard from "@/components/testimonialCard";
import styles from "@/styles/Home.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Aos from "aos";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AutoPlay, Autoplay, Navigation } from "swiper/modules";
import { ExpandMore } from "@mui/icons-material";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import { responsive } from "@/utils/styles";
import { useRouter } from "next/router";
import { getCars } from "@/api/apiCalling/listingApi";
import "swiper/css/navigation";
import { vehicleMakeCount } from "@/api/apiCalling/vehicle";
import SearchForm from "@/components/searchCar";
export default function Home() {
  useEffect(() => {
    Aos.init();
  }, []);
  const [expanded, setExpanded] = useState(`panel0`);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };
  const router = useRouter();
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [make, setMake] = useState([]);
  useEffect(() => {
    getCars({ setCarData, loading: setLoading });
    vehicleMakeCount({ setMake });
  }, []);

  const handleMake = (val) => {
    const data = {
      make: val.id,
    };

    const body = encodeURIComponent(JSON.stringify(data));
    router.push(`/buy-cars?state=${body}`);
  };
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Box className={styles.bg_home}>
        {/* <Container style={{ maxWidth: 1400 }}>
          <Grid container data-aos="fade-right">
            <Grid item xs={12} lg={6} mt={10}>
              <BannerForm />
            </Grid>
          </Grid>
        </Container> */}
        <Container style={{ maxWidth: 1320 }}>
          <Grid container alignItems={"center"}>
            <Grid item lg={4}>
              <Typography fontSize={55} color={"#fff"} lineHeight={1.2}>
                Effortless Car Transactions Made Simple!
              </Typography>
              <Typography fontSize={14} color={"#fff"} mt={3} mb={5}>
                Buy or sell cars hassle-free with our simplified steps.
                Streamlined process, maximum convenience.
              </Typography>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={2}
                mt={4}
                mb={3}
              >
                <Button
                  sx={{
                    border: "0.4px solid grey",
                    width: 200,
                    color: "#fff",
                    p: 1.5,
                  }}
                >
                  Buy Premium Cars
                </Button>
                <Button
                  sx={{
                    border: "0.4px solid grey",
                    width: 200,
                    color: "#fff",
                    p: 1.5,
                  }}
                >
                  Sell Premium Cars
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container style={{ maxWidth: 1300 }}>
        <Grid container>
          <Grid item lg={10} margin={"auto"}>
            <SearchForm />
          </Grid>
        </Grid>
      </Container>

      <div className={`${styles.howItWorks} py-5`}>
        <Divider className="mb-3">
          <Typography
            fontSize={{ xs: 20, lg: 25 }}
            variant="h4"
            fontWeight={600}
            color={"#dbac5b"}
          >
            How it Works?
          </Typography>
        </Divider>
        <Container style={{ maxWidth: 1300 }}>
          <Grid container spacing={2} data-aos="fade-down">
            {data.howWorks.map((val, i) => (
              <Grid item xs={12} md={4} sm={4} lg={4} key={i}>
                <HowWorks
                  img={val.img}
                  heading1={val.heading1}
                  heading2={val.heading2}
                  description={val.description}
                />
              </Grid>
            ))}
          </Grid>

          {/* <div className="text-center mt-4">  </div> */}
        </Container>
      </div>
      <Box data-aos="fade-right">
        <Divider className="my-4">
          <Typography
            variant="h4"
            fontSize={{ xs: 20, lg: 25 }}
            fontWeight={600}
            letterSpacing={1}
          >
            Featured Cars
          </Typography>
        </Divider>
        <Container className="mt-3" style={{ maxWidth: 1300, p: 0 }}>
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
            modules={[Navigation]}
            navigation={true}
            className="py-2 px-1"
            loop
          >
            {carData &&
              carData.docs &&
              carData.docs.map((val, i) => (
                <SwiperSlide key={i}>
                  <CarCard data={val} />
                </SwiperSlide>
              ))}
          </Swiper>

          <div className="my-4 text-center">
            <Button
              sx={{
                width: 200,
                border: "1px solid #000",
                color: "#fff",
                backgroundColor: "#000",
                ":hover": {
                  color: "#000",
                  backgroundColor: "#fff",
                },
                transition: "0.5s ease all",
              }}
              onClick={() => router.push("/buy-cars")}
            >
              View All Cars
            </Button>
          </div>
        </Container>
      </Box>
      <Box marginY={4}>
        <Divider>
          <Typography
            variant="h4"
            fontSize={{ xs: 20, lg: 25 }}
            fontWeight={600}
            letterSpacing={1}
          >
            Explore By Body Type
          </Typography>
        </Divider>

        <Container style={{ maxWidth: 1300 }}>
          <BodyType />
        </Container>
      </Box>

      <Box marginY={5}>
        <Divider>
          <Typography
            variant="h4"
            fontSize={{ xs: 18, lg: 25 }}
            fontWeight={600}
            letterSpacing={1}
          >
            Find Your Perfect Ride in Our Car Marketplace
          </Typography>
        </Divider>
        <Container style={{ maxWidth: 1300 }}>
          <Grid container spacing={3} marginTop={2} marginBottom={2}>
            {make.length === 13
              ? make.map((val, i) => (
                  <Grid item lg={2} key={i}>
                    <BrandCard
                      brandName={val.makeName}
                      img={val.logo}
                      carNumber={val.carCount}
                      onClick={() => handleMake(val)}
                    />
                  </Grid>
                ))
              : make.slice(0, 6).map((val, i) => (
                  <Grid item lg={2} key={i}>
                    <BrandCard
                      brandName={val.makeName}
                      img={val.logo}
                      carNumber={val.carCount}
                      onClick={() => handleMake(val)}
                    />
                  </Grid>
                ))}
          </Grid>
        </Container>
      </Box>
      <Box sx={{ my: 3 }}>
        <Divider sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            fontSize={{ xs: 18, lg: 25 }}
            fontWeight={600}
            letterSpacing={1}
          >
            What do our customers think?
          </Typography>
        </Divider>
        <Container style={{ maxWidth: 1300 }}>
          <Grid container alignItems={"center"}>
            <Grid item lg={3}>
              <Typography variant="h4" fontWeight={600} fontSize={30}>
                Hear What Our Clients Have to Say!
              </Typography>
            </Grid>
            <Grid item lg={9}>
              <Carousel responsive={responsive}>
                {data.testimonials.map((val, i) => (
                  <TestimonialCard
                    testimonial={val.testimonial}
                    name={val.name}
                    img={val.img}
                    key={i}
                  />
                ))}
              </Carousel>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box paddingY={3}>
        <Divider>
          <Typography
            variant="h4"
            fontSize={{ xs: 18, lg: 25 }}
            fontWeight={600}
            letterSpacing={1}
          >
            Frequently Asked Questions
          </Typography>
        </Divider>
        <Container style={{ maxWidth: 1300 }}>
          {data.faqs.map((val, i) => (
            <Accordion
              key={i}
              sx={{ marginY: 4 }}
              expanded={expanded === `panel${i}`}
              onChange={handleChange(`panel${i}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  borderBottom:
                    expanded === `panel${i}`
                      ? "1px solid #000"
                      : "1px solid #eee",
                }}
              >
                <Typography variant="h5" fontSize={14} fontWeight={600}>
                  {val.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography fontSize={13}>{val.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>
    </>
  );
}
