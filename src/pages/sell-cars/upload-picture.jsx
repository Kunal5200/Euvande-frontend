import Button from "@/components/button";
import LinkTab from "@/components/linktab";
import { Box, Card, Grid, Paper, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { toast } from "react-toastify";

const UploadPicture = () => {
  let carRef = useRef();
  const router = useRouter();
  const [carPicture, setCarPicture] = useState([]);
  const [pictures, setPictures] = useState([]);
  const carPictureHandler = () => {
    const files = carRef.current.files;

    const pictureUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPictures((prevPictures) => ({ ...prevPictures, files }));
    setCarPicture(pictureUrls);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (pictures) {
      localStorage.setItem("pictures", JSON.stringify(carPicture));
        router.push("/sell-cars/car-details");
    } else {
      toast.error("Please Select Pictures");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row mb-3">
          <div className="col-sm-8 m-auto">
            <LinkTab />
            <form onSubmit={submitHandler}>
              <Card className="p-3 py-3">
                <h5>Vehicle Photo Documentation</h5>

                <input
                  type="file"
                  style={{ display: "none" }}
                  id="car_picture"
                  ref={carRef}
                  onChange={carPictureHandler}
                  multiple
                />
                <Grid container>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={4}>
                    <Button
                      className="custom_btn my-4"
                      width="100%"
                      onClick={() => carRef.current.click()}
                      type="button"
                    >
                      <span>Browse Files...</span>
                      <span>Browse Files...</span>
                    </Button>
                  </Grid>
                  <Grid item xs={4}></Grid>
                </Grid>
                {carPicture.length ? (
                  <Carousel autoPlay={true} interval={2000} infiniteLoop={true}>
                    {carPicture.map((val, i) => (
                      <img src={val} key={i} />
                    ))}
                  </Carousel>
                ) : (
                  <></>
                )}

                <div className="text-end">
                  <Button className="custom_btn" type="submit" width={150}>
                    <span>Continue</span>
                    <span>Continue</span>
                  </Button>
                </div>
              </Card>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPicture;
