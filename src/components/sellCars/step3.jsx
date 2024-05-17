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
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import TabPanel from "../tabPanel";
import MyDropzone from "./videoUpload";
const Step3 = ({ handlePrev }) => {
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
  // const [videoFile, setVideoFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [videoprogress, setVideoProgress] = useState(0);

  const [thumbnail, setThumbnail] = useState(null);

  const togglePhotoAccordion = () => {
    setPhotoAccordionOpen(!photoAccordionOpen);
    setVideoAccordionOpen(false);
  };

  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setVideoFile(file);
    if (file) {
      const formData = new FormData();
      formData.append("video", file);
      formData.append("carId", localStorage.getItem("carId"));
      const body = Object.fromEntries(formData);
      vehicleController
        .uploadPhotos(body)
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  // console.log("videoFile", videoFile);

  // const generateThumbnail = (videoFile) => {
  //   console.log("Thumbnil", videoFile);

  //   const video = document.createElement("video");
  //   video.setAttribute("crossOrigin", "anonymous");
  //   video.src = URL.createObjectURL(videoFile);
  //   video.onloadeddata = () => {
  //     const canvas = document.createElement("canvas");
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;

  //     const ctx = canvas.getContext("2d");
  //     ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // Draw video frame onto canvas

  //     const image = canvas.toDataURL();
  //     setThumbnail(image);
  //     console.log(image);
  //     setThumbnailLoading(false);
  //   };

  //   video.onerror = (error) => {
  //     console.error("Error loading video:", error);
  //     setThumbnailLoading(false);
  //   };
  // };
  const [value, setValue] = useState(0);

  const photoUploadHandler = (e, newValue) => {
    setValue(newValue);
  };

  // useEffect(() => {}, [videoFile]);
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
      // const formData = new FormData();
      // formData.append(id, file);
      // formData.append("carId", carInfo && carInfo.id);

      // try {
      //   const result = await vehicleController.uploadPhotos(
      //     formData,
      //     (progressEvent) => {
      //       const progress = Math.round(
      //         (progressEvent.loaded / progressEvent.total) * 100
      //       );
      //       setProgress((prevProgress) => ({
      //         ...prevProgress,
      //         [id]: progress,
      //       }));
      //     }
      //   );

      //   setProgress((prevProgress) => {
      //     const updatedProgress = { ...prevProgress };
      //     delete updatedProgress[id];
      //     return updatedProgress;
      //   });
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();

    const allImagesUploaded = Object.values(state).every(
      (image) => image !== null
    );

    if (!allImagesUploaded) {
      toast.error("Please upload all images before submitting.");
      return;
    }

    const formData = new FormData();

    for (const key in state) {
      if (state[key] !== null) {
        formData.append(key, state[key]);
      }
    }
    formData.append("carId", carInfo && carInfo.id);

    vehicleController
      .uploadPhotos(formData)
      .then((res) => {
        // console.log(res);
        toast.success(res.data.message);
        router.push("/car-preview");
        setLoading(false);
      })
      .catch((err) => {
        let errMessage =
          (err.response && err.response.data.message) || err.message;
        toast.error(errMessage);
        setLoading(false);
      });
  };

  const [carData, setCarData] = useState(null);
  const [carDataLoading, setCarDataLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const carId = localStorage.getItem("carId");
      setCarId(carId);
      if (carId) {
        getCarInfo({ data: carId, dispatch });
        getCarDetails({
          carId,
          setCarData,
          setLoading: setCarDataLoading,
        });
      }
    };

    fetchData();
  }, []);

  const fetchImages = async () => {
    const carId = localStorage.getItem("carId");
    if (!carId) return;

    try {
      const {
        data: {
          data: {
            media: { images, videos },
          },
        },
      } = await vehicleController.getVehicleDetails(carId);
      if (!images) return;

      const updatedImagePreviews = {};
      Object.keys(state).forEach((key) => {
        if (images[key]) {
          updatedImagePreviews[key] = images[key];
        }
      });

      setImagePreviews(updatedImagePreviews);
      setState({ ...state, ...updatedImagePreviews });

      // setUploadedFile({ name: videos, video });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);
  return (
    <div>
      <Head>
        <title>Upload Photos-car</title>
      </Head>
      <Container sx={{ my: 5 }} style={{ maxWidth: 1325 }}>
        <Grid item lg={12}>
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
              <form onSubmit={submitHandler}>
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
                    type="submit"
                  >
                    {loading ? (
                      <Loading
                        type="bars"
                        width={20}
                        height={20}
                        className="m-auto"
                        color="#fff"
                      />
                    ) : (
                      <>
                        Continue <ChevronRight />
                      </>
                    )}
                  </Button>
                </Stack>
              </form>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <p className="f-12 fw-semibold mt-4 p-2">
                Comprehensive Car Showcase: Explore Every Detail Inside and Out
                with 360-Degree Video!
              </p>
              <form onSubmit={submitHandler}>
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
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  mt={2}
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
                    type="submit"
                  >
                    Continue <ChevronRight />
                  </Button>
                </Stack>
              </form>
            </TabPanel>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default Step3;
