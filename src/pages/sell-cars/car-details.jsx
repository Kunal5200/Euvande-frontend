import React, { useEffect, useState } from "react";
import styles from "@/styles/carDetails.module.css";
import CarInfo from "@/components/car-info";
import { Grid, Paper } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
const CarDetails = () => {
  const [image, setImage] = useState([]);

  useEffect(() => {
    const images = localStorage.getItem("pictures");
    setImage(JSON.parse(images));
  }, []);

  console.log(image);
  return (
    <div>
      <div className={styles.bg_image}>
        <div className="text-center mt-5">
          <CarInfo />
        </div>
      </div>

      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <div className={`${styles.parent_wrapper} mb-5`}>
            <Paper elevation={3}  className={styles.child_wrapper}>
              <Grid container height={200} >
                <Grid item xs={6}>
                  <Carousel
                    showThumbs={false}
                    showArrows={false}
                    showIndicators={false}
                    showStatus={false}
                  >
                    {image.map((val, i) => (
                      <img src={val} key={i} />
                    ))}
                  </Carousel>
                </Grid>
                <Grid item xs={6}>
                  Hello
                </Grid>
              </Grid>
            </Paper>
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
};

export default CarDetails;
