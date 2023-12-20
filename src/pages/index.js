import data from "@/assests/data";
import BannerForm from "@/components/bannerForm";
import BodyType from "@/components/bodyType/bodyType";
import Button from "@/components/button";
import CarCard from "@/components/carCard";
import HowWorks from "@/components/howItWorks";
import styles from "@/styles/Home.module.css";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Aos from "aos";
import Head from "next/head";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
export default function Home() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className={styles.bg_home}>
        <Container>
          <Grid container data-aos="fade-right">
            <Grid item xs={12} lg={6}>
              <BannerForm />
            </Grid>
          </Grid>
        </Container>
      </div>

      <div className={`${styles.howItWorks} py-5`}>
        <Divider className="mb-3">
          <Typography
            fontSize={{ xs: 20, lg: 25 }}
            variant="h4"
            fontWeight={600}
          >
            How it Works ?
          </Typography>
        </Divider>
        <Container>
          <Grid container spacing={2} data-aos="fade-down">
            {data.howWorks.map((val, i) => (
              <Grid item xs={12} lg={4} key={i}>
                <HowWorks
                  img={val.img}
                  heading={val.heading}
                  description={val.description}
                />
              </Grid>
            ))}
          </Grid>

          <div className="text-center mt-4">
            <Button className="custom_btn" width={200} rounded={20}>
              <span>Know More</span>
              <span>Know More</span>
            </Button>
          </div>
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
        <Container className="mt-3">
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
            className="py-2 px-1"
          >
            {data.carDataList.map((val, i) => (
              <SwiperSlide key={i}>
                <CarCard
                  img={val.img.src}
                  carName={val.carName}
                  driven={val.driven}
                  transmission={val.transmission}
                  variant={val.variant}
                  amount={val.amount}
                  emi={val.emi}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="my-4 text-center">
            <Button className="custom_btn" width={200} rounded={20}>
              <span>View All Cars</span>
              <span>View All Cars</span>
            </Button>
          </div>
        </Container>
      </Box>
      <Box className="my-3">
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

        <Container>
          <BodyType />
        </Container>
      </Box>
      <Box className="my-3">
        <Divider>
          <Typography
            variant="h4"
            fontSize={{ xs: 18, lg: 25 }}
            fontWeight={600}
            letterSpacing={1}
          >
            Seamless Solutions at Your Fingertips
          </Typography>
        </Divider>
      </Box>
    </>
  );
}
