import { vehicleController } from "@/api/addVehicle";
import { getCarDetails, getCarInfo } from "@/api/apiCalling/vehicle";
import data from "@/assests/data";
import ImageUpload from "@/components/imageUpload";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Container,
  Divider,
  Grid,
} from "@mui/material";
import ReactPlayer from "react-player";
import VideoUpload from "../video";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const Step3 = () => {
  const inputRefs = useRef({});
  const dispatch = useDispatch();
  const [carId, setCarId] = useState("");
  const carInfo = useSelector((state) => state.CarInfo);
  const [imagePreviews, setImagePreviews] = useState({});
  const [state, setState] = useState({
    frontView: null,
    frontLeft: null,
    frontRight: null,
    rearView: null,
    rearLeft: null,
    headlamp: null,
    engine: null,
    driverDoor: null,
    driverSeat: null,
    passengerSeat: null,
    instrumentPanel: null,
    dashboard: null,
    rearPanelOfCenterConsole: null,
    rearSeat: null,
    Headlining: null,
    frontLeftWheel: null,
    backLeftWheel: null,
    backRightWheel: null,
    frontRightWheel: null,
    frontLeftTyre: null,
    backLeftTyre: null,
    backRightTyre: null,
  });

  // ........................................................................
  const [photoAccordionOpen, setPhotoAccordionOpen] = useState(true);
  const [videoAccordionOpen, setVideoAccordionOpen] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [videoResponse, setVideoResponse]= useState(null)

  const togglePhotoAccordion = () => {
    setPhotoAccordionOpen(!photoAccordionOpen);
    setVideoAccordionOpen(false);
  };

  const toggleVideoAccordion = () => {
    setVideoAccordionOpen(!videoAccordionOpen);
    setPhotoAccordionOpen(false);
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    if (file) {
      setThumbnailLoading(true);
      setVideoFile(file);
      generateThumbnail(file);
    }

    try {
      const result = await vehicleController.uploadvideo(
        file,
        (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setProgress((prevProgress) => ({
            ...prevProgress,
            [id]: progress,
          }));
        }
      );

      setVideoResponse(result.data);
      setProgress((prevProgress) => {
        const updatedProgress = { ...prevProgress };
        delete updatedProgress[id];
        return updatedProgress;
      });
      generateThumbnail(file);
    } catch (error) {
      console.log(error);
      // Handle errors
      // console.error(`${id} upload failed:`, error);
    }
  };

  const generateThumbnail = (videoFile) => {
    console.log("Thumbnil", videoFile);
    // const reader = new FileReader();

    const video = document.createElement("video");
    video.setAttribute("crossOrigin", "anonymous");
    video.src = URL.createObjectURL(videoFile);
    video.onloadeddata = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // Draw video frame onto canvas

      const image = canvas.toDataURL();
      setThumbnail(image);
      console.log(image);
      setThumbnailLoading(false);
    };

    video.onerror = (error) => {
      console.error("Error loading video:", error);
      setThumbnailLoading(false);
    };
  };

  useEffect(() => {}, [videoFile]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({});
  const handleImageUpload = async (id) => {
    const file = inputRefs.current[id].files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setImagePreviews((prevPreviews) => ({
        ...prevPreviews,
        [id]: imageUrl,
      }));
      setState({ ...state, [id]: file });
      const formData = new FormData();
      formData.append(id, file);
      formData.append("carId", carInfo && carInfo.id);

      try {
        const result = await vehicleController.uploadPhotos(
          formData,
          (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress((prevProgress) => ({
              ...prevProgress,
              [id]: progress,
            }));
          }
        );

        setProgress((prevProgress) => {
          const updatedProgress = { ...prevProgress };
          delete updatedProgress[id];
          return updatedProgress;
        });
      } catch (error) {
        console.log(error);
        // Handle errors
        // console.error(`${id} upload failed:`, error);
      }
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const isAtLeastOneImageUploaded = Object.values(state).some(
      (image) => image !== null
    );
    if (!isAtLeastOneImageUploaded) {
      // Notify the user to upload at least one image
      toast.error("Please upload at least one image before submitting.");
      return;
    } else {
      setLoading(true);
      router.push("/sell-cars/car-details");
    }
  };

  const [carData, setCarData] = useState(null);
  const [carDataLoading, setCarDataLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const carId = localStorage.getItem("carId");
      setCarId(carId);
      if (carId) {
        getCarInfo({ data: carId, dispatch });
        getCarDetails({ carId, setCarData, setLoading: setCarDataLoading });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        vehicleController
          .getVehicleDetails(carId)
          .then((res) => {
            const response = res.data.data.media.images;
            if (response) {
              setImagePreviews((prevPreviews) => ({
                ...prevPreviews,
                frontLeft: response.frontLeft || null,
                frontView: response.frontView || null,
                frontRight: response.frontRight || null,
                rearRight: response.rearRight || null,
                rearView: response.rearView || null,
                rearLeft: response.rearLeft || null,
                Headlining: response.Headlining || null,
                headlamp: response.headlamp || null,
                engine: response.engine || null,
                driverDoor: response.driverDoor || null,
                backLeftTyre: response.backLeftTyre || null,
                backLeftWheel: response.backLeftWheel || null,
                backRightTyre: response.backRightTyre || null,
                backRightWheel: response.backRightWheel || null,
                dashboard: response.dashboard || null,
                driverDoor: response.driverDoor || null,
                driverSeat: response.driverSeat || null,
                engine: response.engine || null,
                frontLeftTyre: response.frontLeftTyre || null,
                frontLeftWheel: response.frontLeftWheel || null,
                frontRightTyre: response.frontRightTyre || null,
                frontRightWheel: response.frontRightWheel || null,
                instrumentPanel: response.instrumentPanel || null,
                passengerSeat: response.passengerSeat || null,
                rearPanelOfCenterConsole:
                  response.rearPanelOfCenterConsole || null,
                rearSeat: response.rearSeat || null,
              }));
              setState((state) => ({
                ...state,
                frontLeft: response.frontLeft || null,
                frontView: response.frontView || null,
                frontRight: response.frontRight || null,
                rearRight: response.rearRight || null,
                rearView: response.rearView || null,
                rearLeft: response.rearLeft || null,
                Headlining: response.Headlining || null,
                headlamp: response.headlamp || null,
                engine: response.engine || null,
                driverDoor: response.driverDoor || null,
                backLeftTyre: response.backLeftTyre || null,
                backLeftWheel: response.backLeftWheel || null,
                backRightTyre: response.backRightTyre || null,
                backRightWheel: response.backRightWheel || null,
                dashboard: response.dashboard || null,
                driverDoor: response.driverDoor || null,
                driverSeat: response.driverSeat || null,
                engine: response.engine || null,
                frontLeftTyre: response.frontLeftTyre || null,
                frontLeftWheel: response.frontLeftWheel || null,
                frontRightTyre: response.frontRightTyre || null,
                frontRightWheel: response.frontRightWheel || null,
                instrumentPanel: response.instrumentPanel || null,
                passengerSeat: response.passengerSeat || null,
                rearPanelOfCenterConsole:
                  response.rearPanelOfCenterConsole || null,
                rearSeat: response.rearSeat || null,
              }));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      <Head>
        <title>Upload Photos-car</title>
      </Head>
      <Container sx={{ my: 5 }}>
        {/* <Grid container spacing={4}> */}
        <Grid item lg={12}>
          {/* <LinkTab /> */}
          <form onSubmit={submitHandler}>
            <Card className=" py-3">
              <div>
                <Button
                  onClick={togglePhotoAccordion}
                  style={{
                    backgroundColor: photoAccordionOpen ? "black" : "inherit",
                    color: photoAccordionOpen ? "White" : "black",
                  }}
                >
                  Vehicle Photo Documentation
                </Button>
                <Button
                  onClick={toggleVideoAccordion}
                  style={{
                    backgroundColor: videoAccordionOpen ? "black" : "inherit",
                    color: videoAccordionOpen ? "white" : "black",
                  }}
                >
                  Vehicle Video Documentation
                </Button>

                {/* Photo accordion */}
                {photoAccordionOpen && (
                  <Accordion
                    expanded={photoAccordionOpen}
                    onChange={togglePhotoAccordion}
                  >
                    {/* <AccordionSummary expandIcon={<ExpandMore />}>
                        <h4 className="mb-2">Vehicle Photo Documentation</h4>
                      </AccordionSummary> */}
                    <p className="f-12 fw-semibold mt-4">
                      Take photos of the car from all four sides as well as the
                      dashboard and interior equipment, including any damage or
                      wear to the interior and exterior (paint damage, curbed
                      rims, cracks, etc.).
                    </p>
                    <AccordionDetails>
                      {/* Your photo upload component goes here */}
                      {/* <Divider style={{ backgroundColor: "#000" }} /> */}
                      <Accordion
                        defaultExpanded={true}
                        //  expanded={photoAccordionOpen} onChange={togglePhotoAccordion}
                      >
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <h4 className="mb-2">Exterior</h4>
                        </AccordionSummary>
                        <AccordionDetails>
                          <ImageUpload
                            data={data.photoUpload}
                            handleImageUpload={handleImageUpload}
                            imagePreviews={imagePreviews}
                            inputRefs={inputRefs}
                            progress={progress}
                          />
                        </AccordionDetails>
                      </Accordion>
                      <Accordion defaultExpanded={true}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <h4 className="mb-2">Interior</h4>
                        </AccordionSummary>
                        <AccordionDetails>
                          <ImageUpload
                            data={data.interiorPhotoUpload}
                            handleImageUpload={handleImageUpload}
                            imagePreviews={imagePreviews}
                            inputRefs={inputRefs}
                            progress={progress}
                          />
                        </AccordionDetails>
                      </Accordion>
                      <Accordion defaultExpanded={true}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <h4 className="mb-2">Wheel and Tyres</h4>
                        </AccordionSummary>
                        <AccordionDetails>
                          <ImageUpload
                            data={data.tyres}
                            handleImageUpload={handleImageUpload}
                            imagePreviews={imagePreviews}
                            inputRefs={inputRefs}
                            progress={progress}
                          />
                        </AccordionDetails>
                      </Accordion>
                    </AccordionDetails>
                  </Accordion>
                )}

                {/* Video accordion */}
                {videoAccordionOpen && (
                  <Accordion
                    expanded={videoAccordionOpen}
                    onChange={toggleVideoAccordion}
                  >
                    <AccordionDetails>
                      <div className="mt-3">
                        <Container>
                          <Grid container spacing={2} sx={{ display: "flex" }}>
                            <Grid
                              item
                              xs={6}
                              sx={{ flex: "3", marginRight: 0 }}
                            >
                              <VideoUpload
                                handleVideoUpload={handleVideoUpload}
                              />
                            </Grid>
                            <Grid item  sx={{ marginLeft: 5, flex: "3" }}>

                              {/* {thumbnailLoading ? (
                                <p>Loading thumbnail...</p>
                              ) : (
                                thumbnail && (
                                  <img
                                    src={thumbnail}
                                    width={150}
                                    height={150}
                                    alt="Thumbnail"
                                  />
                                )
                              )} */}

                              {thumbnailLoading ? (
                                <p className="text-center" style={{color:"white",background:"black"}}>Loading video...</p>
                              ) : (
                                // videoResponse
                                videoFile && (
                                  <ReactPlayer
                                    className="react-player mt-3"
                                    // url={URL.createObjectURL(videoResponse)}
                                    url={URL.createObjectURL(videoFile)}
                                    controls={true}
                                    width="70%"
                                    height="80%"
                                  />
                                )
                              )}
                            </Grid>

                            {/* <Grid item xs={6} >
                              {console.log("Thumbnail:", thumbnail)}
                              {thumbnail && (
        <img src={thumbnail} width={150} height={150} alt="Thumbnail" />
      )}
                              </Grid> */}
                          </Grid>
                        </Container>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                )}
              </div>
              {/* ................................ */}
            </Card>
          </form>
        </Grid>
        {/* <Grid item lg={4}>
            {carData && (
              <AddCarDetails data={carData} loading={carDataLoading} />
            )}
          </Grid> */}
        {/* </Grid> */}
      </Container>
    </div>
  );
};

export default Step3;
