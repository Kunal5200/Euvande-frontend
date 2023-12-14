import rollsRoyce from "@/banner_image/sliderImage1.jpeg";
import Button from "@/components/button";
import CarInfo from "@/components/car-info";
import styles from "@/styles/carDetails.module.css";
import { Grid, Paper, Stack } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { BsFuelPump } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { FaCar } from "react-icons/fa";
import { GiRoad, GiGearStickPattern, GiCarWheel } from "react-icons/gi";
const CarDetails = () => {
  const [image, setImage] = useState([]);
  const [variant, setVariant] = useState("");
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
    setVariant(localStorage.getItem("variant"));
    setDriven(localStorage.getItem("driven"));
    const quality = localStorage.getItem("specifications");
    setSpecifications(JSON.parse(quality));
    const images = localStorage.getItem("pictures");
    setImage(JSON.parse(images));
  }, []);

  return (
    <div>
      <Head>
        <title>Car details</title>
      </Head>
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
                  <img src={rollsRoyce.src} height={200} width="100%" />
                </Grid>
                <Grid item xs={6} padding={2}>
                  <Stack direction={"row"} spacing={2}>
                    <h4>{brandName}</h4> <span>-</span>
                    <h4>{modelName}</h4>
                  </Stack>
                  <Grid container className="mt-3">
                    <Grid item xs={4}>
                      <Stack direction={"row"} spacing={0.5}>
                        <GiRoad />
                        <p className="f-10  mb-0">{driven}</p>
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack direction={"row"} spacing={0.5}>
                        <CiCalendarDate />
                        <p className="f-10  mb-0">{year}</p>
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack direction={"row"} spacing={0.5}>
                        <FaCar />
                        <p className="f-10  mb-0">{variant}</p>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid container className="mt-3">
                    <Grid item xs={4}>
                      <Stack direction={"row"} spacing={0.5}>
                        <BsFuelPump />
                        <p className="f-10  mb-0">{variantType}</p>
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack direction={"row"} spacing={0.5}>
                        <GiGearStickPattern />
                        <p className="f-10  mb-0">
                          {specifications.transmission}
                        </p>
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack direction={"row"} spacing={0.5}>
                        <GiCarWheel />
                        <p className="f-10  mb-0">
                          {specifications.driveType === "Yes" ? "4x4" : ""}
                        </p>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      <div>
        <Button></Button>
      </div>
    </div>
  );
};

export default CarDetails;
