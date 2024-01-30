import {
  addImageUpload,
  getCarDetails,
  getCarInfo,
} from "@/api/apiCalling/vehicle";
import data from "@/assests/data";
import Button from "@/components/button";
import ImageUpload from "@/components/imageUpload";
import LinkTab from "@/components/linktab";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Divider,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const UploadPicture = () => {
  const inputRefs = useRef({});
  const dispatch = useDispatch();
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
    carId: carInfo.id,
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleImageUpload = (id) => {
    const file = inputRefs.current[id].files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviews((prevPreviews) => ({
        ...prevPreviews,
        [id]: imageUrl,
      }));
      setState({ ...state, [id]: file });
    }
  };
  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      state.Headlining != null ||
      state.backLeftTyre != null ||
      state.backLeftWheel != null ||
      state.backRightTyre != null ||
      state.backRightWheel != null ||
      state.dashboard != null ||
      state.driverDoor != null ||
      state.driverSeat != null ||
      state.engine != null ||
      state.frontLeft != null ||
      state.frontLeftTyre != null ||
      state.frontLeftWheel != null ||
      state.frontRight != null ||
      state.frontRightWheel != null ||
      state.frontView != null ||
      state.headlamp != null ||
      state.instrumentPanel != null ||
      state.passengerSeat != null ||
      state.rearLeft != null ||
      state.rearPanelOfCenterConsole != null ||
      state.rearSeat != null ||
      state.rearView != null
    ) {
      addImageUpload({ data: state, router, setLoading });
    } else {
      toast.error("Please select Pictures");
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const carId = localStorage.getItem("carId");

      if (carId) {
        getCarInfo({ data: carId, dispatch });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>Upload Photos-car</title>
      </Head>
      <div className="container">
        <div className="row my-5">
          <div className="col-sm-9">
            <LinkTab />
            <form onSubmit={submitHandler}>
              <Card className=" py-3">
                <div className="p-2">
                  <h5>Vehicle Photo Documentation</h5>
                </div>
                <Divider style={{ backgroundColor: "#000" }} />
                <div className="p-2">
                  <p className="f-12 fw-semibold mt-2">
                    Take photos of the car from all four sides as well as the
                    dashboard and interior equipment, including any damage or
                    wear to the interior and exterior (paint damage, curbed
                    rims, cracks, etc.).
                  </p>
                  <div>
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <h4 className="mb-2">Exterior</h4>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ImageUpload
                          data={data.photoUpload}
                          handleImage={handleImageUpload}
                          imagePreviews={imagePreviews}
                          inputRefs={inputRefs}
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
                          handleImage={handleImageUpload}
                          imagePreviews={imagePreviews}
                          inputRefs={inputRefs}
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
                          handleImage={handleImageUpload}
                          imagePreviews={imagePreviews}
                          inputRefs={inputRefs}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  <div className="text-end mt-2">
                    <Button
                      className="custom_btn"
                      type="submit"
                      width={150}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loading
                          type="bars"
                          width={30}
                          height={30}
                          className="m-auto"
                          color="#ffdb58"
                        />
                      ) : (
                        <>
                          <span>Continue</span>
                          <span>Continue</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </form>
          </div>
          <div className="col-sm-3">
            <Card>Hello</Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPicture;
