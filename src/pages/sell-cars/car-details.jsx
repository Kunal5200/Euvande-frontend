import React, { useEffect, useState } from "react";
import styles from "@/styles/carDetails.module.css";
import CarInfo from "@/components/car-info";
import { Divider, Grid, Paper, Stack } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { FaRoad } from "react-icons/fa";
const CarDetails = () => {
  const [image, setImage] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [modelName, setModelName] = useState("");
  const [year, setYear] = useState("");
  const [variantType, setVariantType] = useState("");
  const [driven, setDriven] = useState("");
  const [specifications, setSpecifications] = useState({});
  useEffect(() => {
    setBrandName(localStorage.getItem("brand"));
    setModelName(localStorage.getItem("model"));
    setYear(localStorage.getItem("year"));
    setVariantType(localStorage.getItem("variantType"));
    setDriven(localStorage.getItem("driven"));
    const quality = localStorage.getItem("specifications");
    setSpecifications(JSON.parse(quality));
    const images = localStorage.getItem("pictures");
    setImage(JSON.parse(images));
  }, []);

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
            <Paper elevation={3} className={styles.child_wrapper}>
              <Grid container height={200}>
                <Grid item xs={6}>
                  <Carousel
                    showThumbs={false}
                    showArrows={false}
                    showIndicators={false}
                    showStatus={false}
                  >
                    {image.map((val, i) => (
                      <img src={val} key={i} height={200} />
                    ))}
                  </Carousel>
                </Grid>
                <Grid item xs={6} padding={2}>
                  <Stack direction={"row"} spacing={2}>
                    <h4>{brandName}</h4> <span>-</span>
                    <h4>{modelName}</h4>
                  </Stack>
                  <Grid container className="mt-3">
                    <Grid item xs={4}>
                      <Stack direction={"row"} spacing={0.5}>
                        <FaRoad />
                        <p className="f-10  mb-0">{driven}</p>
                      </Stack>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                  </Grid>
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
