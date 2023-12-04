import data from "@/assests/data";
import FAQ from "@/components/accordion";
import Brands from "@/components/brands";
import Button from "@/components/button";
import Review from "@/components/review";
import hands from "@/icons/hands.png";
import wallet from "@/icons/purse.png";
import certificate from "@/icons/stamp.png";
import styles from "@/styles/seller.module.css";
import { cardStyles, loginTextField, responsive } from "@/utils/styles";
import { Card, Divider, Grid, Stack, TextField } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Carousel from "react-multi-carousel";
const SellerLogin = () => {
  return (
    <>
      <Head>
        <title>Seller</title>
      </Head>
      <div className="">
        <div className={styles.bgImage}>
          <Grid container alignItems="center" sx={{ height: "100%" }}>
            {/* <Grid item xs={12} sm={6}>
              <img src={car.src} width="100%" />
            </Grid> */}
            <Grid item sm={6}></Grid>
            <Grid
              alignItems={"center"}
              item
              xs={12}
              sm={6}
              className="p-5 "
              justifyContent="start"
            >
              <h4 className={styles.seller_banner_heading}>
                Sell your car at best price instantly from home
              </h4>
              <Stack
                spacing={{ xs: 1, sm: 2, md: 4 }}
                direction={{ xs: "row", sm: "row" }}
                alignItems="center"
                justifyItems="start"
                className="mt-5"
              >
                <div className="d-flex align-items-center">
                  <img src={hands.src} width={40} />
                  <p className="mb-0 ms-2 f-13">Best Price</p>
                </div>
                <div className="d-flex align-items-center ">
                  <img src={wallet.src} width={40} />
                  <p className="mb-0 ms-2 f-13">Best Price</p>
                </div>
                <div className="d-flex align-items-center ">
                  <img src={certificate.src} width={40} />
                  <p className="mb-0 ms-2 f-13">Best Price</p>
                </div>
              </Stack>
            </Grid>
          </Grid>
        </div>
        <Grid container>
          <Grid xs={2} item></Grid>
          <Grid xs={12} sm={8} md={8} item>
            <Card className="p-4" sx={cardStyles}>
              <h4 className="text-center f-30">Enter your VIN No.</h4>
              <Stack
                justifyContent="center"
                spacing={3}
                direction={{ xs: "column", sm: "row" }}
                className="mt-4"
              >
                <div>
                  <TextField
                    sx={loginTextField}
                    id="carNumber"
                    label="Enter Your VIN No."
                    variant="outlined"
                    style={{ width: "300px" }}
                  />
                  <p className="f-13">
                    Just here to check price?<span>Check Price</span>
                  </p>
                </div>
                <Button
                  className="custom_btn"
                  width={200}
                  rounded="5px"
                  height="50px"
                >
                  <span>
                    Sell My Car <FaArrowRight className="ms-2" />
                  </span>
                  <span className="d-flex align-items-center">
                    Sell My Car <FaArrowRight className="ms-2" />
                  </span>
                </Button>
              </Stack>

              <Divider>
                <span className={styles.divider_text}>OR</span>
              </Divider>

              <div className="mt-4">
                <h3 className="text-center mb-3">
                  Let's select your car brand
                </h3>

                <Stack
                  spacing={1}
                  direction={{ xs: "column", sm: "row" }}
                  alignItems={"center"}
                >
                  {data.brandsSelector.slice(0, 7).map((val, i) => (
                    <Brands img={val.logo} brands={val.name} key={i} />
                  ))}
                  <Link href={'/sell-cars/make'} className="link">
                    <Card
                      sx={{
                        width: "95px",
                        height: "80px",
                        display: "flex",

                        alignItems: "center",
                        textAlign: "center",
                      }}
                      className="brands"
                    >
                      View All Brands
                    </Card>
                  </Link>
                </Stack>
              </div>
            </Card>
          </Grid>
          <Grid xs={2} item></Grid>
        </Grid>
        <div className="container">
          <h4 className="text-capitalize mb-4 text-center f-30 ">
            Easy auto sales
          </h4>
          <Grid container>
            {data.selling.map((val, i) => (
              <Grid item xs={4} key={i}>
                <Card
                  sx={{ width: "350px", height: "400px", paddingBottom: "5px" }}
                >
                  <img src={val.img} width="100%" height={200} />
                  <h5 className="px-2 mt-1">{val.heading}</h5>
                  <p
                    className="text-justify px-2 mt-2 f-12"
                    style={{ height: "80px" }}
                  >
                    {val.para}
                  </p>
                  <div className=" text-center">
                    <Button className="custom_btn" width="200px">
                      <span className="f-12">{val.btn}</span>
                      <span className="f-12">{val.btn}</span>
                    </Button>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <div className="container mt-5">
          <h4 className="text-center mb-3 f-30">Customer Reviews</h4>
          <Carousel responsive={responsive}>
            {data.reviews.map((val, i) => (
              <Review
                img={val.img.src}
                name={val.name}
                review={val.review}
                key={i}
              />
            ))}
          </Carousel>
        </div>
        <div className="container mt-5">
          <h4 className="text-center mb-3 f-30">FAQs</h4>
          <FAQ />
        </div>
      </div>
    </>
  );
};

export default SellerLogin;
