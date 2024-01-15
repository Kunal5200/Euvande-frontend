import data from "@/assests/data";
import BannerForm from "@/components/bannerForm";
import BodyType from "@/components/bodyType/bodyType";
import BrandCard from "@/components/brandCard";
import Button from "@/components/button";
import CarCard from "@/components/carCard";
import HowWorks from "@/components/howItWorks";
import TestimonialCard from "@/components/testimonialCard";
import styles from "@/styles/Home.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Aos from "aos";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AutoPlay, Autoplay } from "swiper/modules";
import { ExpandMore } from "@mui/icons-material";
import { useSelector } from "react-redux";
export default function Home() {
  useEffect(() => {
    Aos.init();
  }, []);
  const [expanded, setExpanded] = useState(`panel0`);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

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

        <Container>
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
        <Container>
          <Grid container spacing={3} marginTop={2} marginBottom={2}>
            {data.brandsSelector.slice(0, 12).map((val, i) => (
              <Grid item lg={2} key={i}>
                <BrandCard
                  brandName={val.name}
                  img={val.logo}
                  carNumber={val.carNumber}
                />
              </Grid>
            ))}
          </Grid>
          <Box textAlign={"center"} marginY={4}>
            <Button className="custom_btn" rounded={20} width={200}>
              <span>View All Cars</span>
              <span>View All Cars</span>
            </Button>
          </Box>
        </Container>
      </Box>
      <Box marginTop={3} marginBottom={3}>
        <Divider>
          <Typography
            variant="h4"
            fontSize={{ xs: 18, lg: 25 }}
            fontWeight={600}
            letterSpacing={1}
          >
            What do our customers think?
          </Typography>
        </Divider>
        <Container>
          <Grid container alignItems={"center"}>
            <Grid item lg={3}>
              <Typography variant="h4" fontWeight={600} fontSize={30}>
                Hear What Our Clients Have to Say!
              </Typography>
            </Grid>
            <Grid item lg={9}>
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
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                }}
                className="py-3 px-3"
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                grabCursor={true}
                loop={true}
              >
                {data.testimonials.map((val, i) => (
                  <SwiperSlide key={i}>
                    <TestimonialCard
                      testimonial={val.testimonial}
                      name={val.name}
                      img={val.img}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
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
        <Container>
          {data.faqs.map((val, i) => (
            <Accordion
              key={i}
              sx={{ marginY: 1 }}
              expanded={expanded === `panel${i}`}
              onChange={handleChange(`panel${i}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{ borderBottom: "1px solid #eee" }}
              >
                <Typography variant="h5" fontSize={15} fontWeight={500}>
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
