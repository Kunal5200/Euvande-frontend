import { vehicleController } from "@/api/addVehicle";
import {
  addSpecification,
  getCarDetails,
  getCarInfo,
} from "@/api/apiCalling/vehicle";
import Button from "@/components/button";
import AddCarDetails from "@/components/carDetails";
import LinkTab from "@/components/linktab";
import SpecificationSteps from "@/components/specifications/specificationStep";
import { CarInformation } from "@/redux/reducers/carInformation";
import { Card, Container, Grid, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const Specifications = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const carInfo = useSelector((state) => state.CarInfo);
  const carInformation = useSelector((state) => state.CarInformation);
  // console.log(">>>carinformation", carInformation);
  const [state, setState] = useState({
    transmission: "",
    vehicleType: "",
    driveType4WD: "",
    doors: "",
    seats: "",
    interiorMaterial: "",
    vatDeduction: "",
    power: "",
    color: "",
    equipments: [],
  });
  const {
    transmission,
    vehicleType,
    driveType4WD,
    doors,
    seats,
    interiorMaterial,
    vatDeduction,
    power,
    color,
    equipments,
  } = state;
  const router = useRouter();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        await getCarInfo({ data: carId, dispatch });
        getCarDetails({ carId, setCarData, setLoading, dispatch });
      } else {
        return () => {};
      }
    };

    fetchData();
  }, []);

  const submitHandler = () => {
    // e.preventDefault();
    setLoading(true);
    if (
      transmission === "" ||
      vehicleType === "" ||
      driveType4WD === "" ||
      doors === "" ||
      seats === "" ||
      interiorMaterial === "" ||
      vatDeduction === "" ||
      power === "" ||
      color === "" ||
      equipments.length === 0
    ) {
      toast.error("Please Select All Fields*");
      setLoading(false);
      return false;
    } else {
      let data = {
        transmission: state.transmission,
        vehicleType: state.vehicleType,
        driveType4WD: state.driveType4WD,
        doors: state.doors,
        seats: state.seats,
        interiorMaterial: state.interiorMaterial,
        vatDeduction: state.vatDeduction,
        power: state.power,
        color: state.color,
        equipments: state.equipments,
        carId: carInfo.id,
      };
      addSpecification({
        data,
        router,
        path: "/sell-cars/contact-information",
        setLoading,
      });
    }
  };

  useEffect(() => {
    const carId = localStorage.getItem("carId");
    if (carId) {
      vehicleController
        .getVehicleDetails(carId)
        .then((res) => {
          const response = res.data.data;
          console.log("Response object:", response);
          if (response && response.specification) {
            setState((prevState) => ({
              ...prevState,
              transmission: response.specification.transmission,
              color: response.specification.color,
              doors: response.specification.doors,
              driveType4WD: response.specification.driveType4WD,
              equipments: response.specification.equipments,
              interiorMaterial: response.specification.interiorMaterial,
              power: response.specification.power,
              seats: response.specification.seats,
              vatDeduction: response.specification.vatDeduction,
              vehicleType: response.specification.vehicleType,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return null;
    }
  }, []);

  console.log(":::state", state);
  return (
    <div>
      <Container sx={{ my: 5 }}>
        <Grid container spacing={4}>
          <Grid item lg={8}>
            <LinkTab />
            <Card sx={{ p: 3 }}>
              {/* <form onSubmit={submitHandler}> */}
              <SpecificationSteps
                setState={setState}
                state={state}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
              <Stack direction="row" spacing={2} className="my-3">
                <Button
                  className="custom_btn"
                  type="button"
                  onClick={() => setActiveStep(activeStep - 1)}
                  disabled={activeStep === 0}
                  width={120}
                >
                  <span>Back</span>
                  <span>Back</span>
                </Button>
                <Button
                  className="custom_btn"
                  type="submit"
                  onClick={submitHandler}
                  width={150}
                >
                  {loading ? (
                    <Loading
                      type="bars"
                      width={15}
                      height={15}
                      color="red"
                      className="m-auto"
                    />
                  ) : (
                    <React.Fragment>
                      <span>Continue</span>
                      <span>Continue</span>
                    </React.Fragment>
                  )}
                </Button>
              </Stack>
              {/* </form> */}
            </Card>
          </Grid>
          <Grid item lg={4}>
            {carData && <AddCarDetails data={carData} loading={loading} />}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Specifications;
