import { vehicleController } from "@/api/addVehicle";
import { getCarDetails, getCarInfo } from "@/api/apiCalling/vehicle";
import data from "@/assests/data";
import ImageUpload from "@/components/imageUpload";
import {
  ChevronLeft,
  ChevronRight,
  ExpandMore,
  UploadFile,
  VideoCall,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import TabPanel from "../tabPanel";
import MyDropzone from "./videoUpload";
const Step3 = ({ handleNext, handlePrev }) => {
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
  const [uploadedFile, setUploadedFile] = useState(null);
  const [videoprogress, setVideoProgress] = useState(0);

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [videoResponse, setVideoResponse] = useState(null);

  const togglePhotoAccordion = () => {
    setPhotoAccordionOpen(!photoAccordionOpen);
    setVideoAccordionOpen(false);
  };
  const removeVideo = () => {
    setVideoFile(null);
    setThumbnail(null);
  };

  const toggleVideoAccordion = () => {
    setVideoAccordionOpen(!videoAccordionOpen);
    setPhotoAccordionOpen(false);
  };

  const [uploadCompleted, setUploadCompleted] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log("file", file);
    const simulateUpload = () => {
      return new Promise((resolve, reject) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setVideoProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, 500);
      });
    };

    simulateUpload().then(() => {
      setUploadedFile({ name: file.name, file });
      setUploadCompleted(true);
    });
  }, []);

  const generateThumbnail = (videoFile) => {
    console.log("Thumbnil", videoFile);

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
  const [value, setValue] = useState(0);

  const photoUploadHandler = (e, newValue) => {
    setValue(newValue);
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
              [id]: progress, // Update progress for the specific image ID
            }));
          }
        );

        // After successful upload, remove the progress for this image
        setProgress((prevProgress) => {
          const updatedProgress = { ...prevProgress };
          delete updatedProgress[id];
          return updatedProgress;
        });
      } catch (error) {
        let errMessage =
          (err.response && err.response.data.message) || err.message;
        // Handle errors
      }
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const allImagesUploaded = Object.values(state).every(
      (image) => image !== null
    );
    if (!allImagesUploaded) {
      toast.error("Please upload all images before submitting.");
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
      <Container sx={{ my: 5 }} style={{ maxWidth: 1325 }}>
        <Grid item lg={12}>
          <form onSubmit={submitHandler}>
            <div>
              <Tabs
                sx={{
                  borderBottom: "1px solid #eee",
                  "& .Mui-selected": {
                    color: "#000 !important",
                    borderBottom: "2px solid #000",
                    fontWeight: 550,
                  },
                }}
                value={value}
                onChange={photoUploadHandler}
              >
                <Tab
                  label="Upload Image"
                  icon={<UploadFile />}
                  iconPosition="end"
                />
                <Tab
                  label="Upload Video"
                  icon={<VideoCall />}
                  iconPosition="end"
                />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Accordion
                  expanded={photoAccordionOpen}
                  onChange={togglePhotoAccordion}
                  sx={{
                    "&": {
                      boxShadow: "none",
                    },
                  }}
                >
                  <p className="f-12 fw-semibold mt-4 p-2">
                    Take photos of the car from all four sides as well as the
                    dashboard and interior equipment, including any damage or
                    wear to the interior and exterior (paint damage, curbed
                    rims, cracks, etc.).
                  </p>
                  <AccordionDetails>
                    <Accordion defaultExpanded={true}>
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
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Button
                    sx={{
                      color: "#000",
                      ":hover": {
                        textDecoration: "underline",
                      },
                    }}
                    onClick={handlePrev}
                  >
                    <ChevronLeft /> back
                  </Button>
                  <Button
                    sx={{
                      border: "1px solid #000",
                      backgroundColor: "#000",
                      width: 150,
                      p: 1.5,
                      color: "#fff",
                      ":hover": {
                        backgroundColor: "#000",
                      },
                    }}
                  >
                    Continue <ChevronRight />
                  </Button>
                </Stack>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <p className="f-12 fw-semibold mt-4 p-2">
                  Comprehensive Car Showcase: Explore Every Detail Inside and
                  Out with 360-Degree Video!
                </p>
                <Card sx={{ p: 2 }}>
                  <Grid container>
                    <Grid item lg={8}>
                      <MyDropzone
                        onDrop={onDrop}
                        uploadedFile={uploadedFile}
                        setUploadedFile={setUploadedFile}
                        uploadCompleted={uploadCompleted}
                        setUploadCompleted={setUploadCompleted}
                        setProgress={setVideoProgress}
                        progress={videoprogress}
                      />
                    </Grid>
                  </Grid>
                </Card>
                {/* <Accordion
                  expanded={videoAccordionOpen}
                  onChange={toggleVideoAccordion}
                  sx={{ mt: 3, py: 3 }}
                >
                  <AccordionDetails>
                    <div className="mt-3">
                      <Container>
                        <Grid container spacing={2} sx={{ display: "flex" }}>
                          <Grid item xs={6} sx={{ flex: "3", marginRight: 0 }}>
                            {videoFile ? (
                              <Typography sx={{ color: "#000" }}>
                                {videoFile.name}
                              </Typography>
                            ) : (
                              <VideoUpload
                                handleVideoUpload={handleVideoUpload}
                              />
                            )}
                          </Grid>
                          <Grid item sx={{ marginLeft: 5, flex: "3" }}>
                            {thumbnailLoading ? (
                              <p
                                className="text-center"
                                style={{ color: "white", background: "black" }}
                              >
                                Loading video...
                              </p>
                            ) : (
                              videoFile && (
                                <>
                                  <ReactPlayer
                                    className="react-player mt-3"
                                    url={URL.createObjectURL(videoFile)}
                                    controls={true}
                                    width="100%"
                                    height="90%"
                                  />
                                  <Close
                                    sx={{
                                      position: "absolute",
                                      right: 10,
                                      top: 10,
                                      cursor: "pointer",
                                    }}
                                    onClick={removeVideo}
                                  />
                                </>
                              )
                            )}
                          </Grid>
                        </Grid>
                      </Container>
                    </div>
                  </AccordionDetails>
                </Accordion> */}
              </TabPanel>
            </div>
          </form>
        </Grid>
      </Container>
    </div>
  );
};

export default Step3;
