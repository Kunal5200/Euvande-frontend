import { getAllMakePublic, getModelByYear } from "@/api/apiCalling/listingApi";
import { addCar, getCarDetails } from "@/api/apiCalling/vehicle";
import { isVIN } from "@/utils/regex";
import { loginTextField } from "@/utils/styles";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MakeStep from "./steps/makeStep";
import PeriodStep from "./steps/periodStep";
import Transmission from "./steps/transmission";
import Tick from "./tick";
import { listingController } from "@/api/listing";
import FuelStep from "./steps/fuel";
import VehicleTypeStep from "./steps/vehicleType";
import Doors from "./steps/doors";
import DriveType from "./steps/driveType";
import Power from "./steps/power";
import Seats from "./steps/seats";
import { toast } from "react-toastify";
import Loading from "react-loading";
import { vehicleController } from "@/api/addVehicle";
import { setVehicleInformation } from "@/redux/reducers/carInformation";
import Mileage from "./steps/mileage";
import InteriorMaterial from "./steps/interiorMaterial";
import Vat from "./steps/vat";
import Origin from "./steps/origin";
import Price from "./steps/price";
import { setCarDetails } from "@/redux/reducers/vehicleInformation";
const Step1 = ({ handleNext }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState({
    vin: "",
    make: "",
    model: "",
    period: "",
    trimLevel: "",
    transmission: "",
    fuelType: "",
    vehicleType: "",
    doors: "",
    driveType4WD: "",
    power: "",
    seats: "",
    mileage: "",
    interiorMaterial: "",
    vatDeduction: "",
    originOfCar: "",
    displacementL: "",
    price: "",
  });
  const dispatch = useDispatch();

  const [ids, setIds] = useState({});
  const [error, setError] = useState({
    vin: "",
  });

  const [brand, setBrand] = useState([]);
  const [modelData, setModelData] = useState([]);

  const [loading, setLoading] = useState(false);

  const decodeVinHandler = (e) => {
    const { id, value } = e.target;
    setState({ ...state, [id]: value });
    setError({
      ...error,
      [id]: id === "vin" ? (isVIN(value) ? "" : "Please Enter Valid VIN") : "",
    });
  };

  const [carData, setCarData] = useState(null);
  const [specification, setSpecification] = useState(null);

  const [vinData, setVinData] = useState(null);

  useEffect(() => {
    getAllMakePublic({ setBrand });
  }, []);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const brandChangeHandler = (e, newValue) => {
    setSelectedBrand(newValue);
    if (!newValue && selectedBrand.id && selectedBrand.makeName) {
      let data = {
        makeId: selectedBrand.id,
      };
      getModelByYear({ setModel: setModelData, data });
    } else if (newValue && newValue.id && newValue.makeName) {
      setState({ ...state, make: newValue.id });
      let data = {
        makeId: newValue.id,
      };
      getModelByYear({ setModel: setModelData, data });
    }
  };

  const modelChangeHandler = (e, newValue) => {
    if (newValue) {
      setState({ ...state, model: newValue.id });
    }
  };

  useEffect(() => {
    if (vinData && vinData.vinDetail && vinData.idsObj) {
      setSelectedBrand({
        makeName: vinData.vinDetail.make,
        id: vinData.idsObj.makeId,
      });
      setSelectedModel({
        modelName: vinData.vinDetail.model,
        id: vinData.idsObj.modelId,
      });
    }
  }, [vinData]);

  useEffect(() => {
    const fetchData = () => {
      if (selectedBrand && selectedBrand.id) {
        let data = {
          makeId: selectedBrand.id,
        };
        getModelByYear({ setModel: setModelData, data });
      }
    };
    fetchData();
  }, [selectedBrand]);
  const getCarDetails = (carId) => {
    vehicleController
      .getVehicleDetails(carId)
      .then((res) => {
        const response = res.data.data;
        setCarData(response);
        setState({
          ...state,
          vin: response && response.vin,
          make: response && response.make && response.make.id,
          model: response && response.model && response.model.id,
          period: response && response.period && response.period.id,
          trimLevel:
            response &&
            response.specification &&
            response.specification.specificationDetails &&
            response.specification.specificationDetails.trimLevel,
          transmission:
            response &&
            response.specification &&
            response.specification.transmission,
          fuelType: response && response.variant && response.variant.fuelType,
          vehicleType:
            (response &&
              response.specification &&
              response.specification.vehicleType) ||
            (response &&
              response.specification &&
              response.specification.specificationDetails &&
              response.specification.specificationDetails.bodyStyle),
          doors:
            response && response.specification && response.specification.doors,
          driveType4WD:
            response &&
            response.specification &&
            response.specification.driveType4WD,
          power:
            response && response.specification && response.specification.power,
          displacementL:
            response &&
            response.specification &&
            response.specification.specificationDetails &&
            response.specification.specificationDetails.displacementL,
          seats:
            (response &&
              response.specification &&
              response.specification.seats) ||
            "",
          mileage: response && response.odometer,
          interiorMaterial:
            response &&
            response.specification &&
            response.specification.interiorMaterial,
          vatDeduction:
            response &&
            response.specification &&
            response.specification.vatDeduction,
          originOfCar:
            response &&
            response.specification &&
            response.specification.specificationDetails &&
            response.specification.specificationDetails.manufacturedIn,
          price: response && response.price,
        });
        dispatch(setVehicleInformation({ ...response }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const carInfo = useSelector((state) => state.CarInformation);
  useEffect(() => {
    const fetchData = () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        getCarDetails(carId);
      } else {
        return null;
      }
    };

    fetchData();
  }, []);
  // console.log("state",state)

  useEffect(() => {
    listingController
      .getDefaultSpecificationPublic()
      .then((res) => {
        setSpecification(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const decodeVin = () => {
    if (!isVIN(state.vin)) {
      toast.error("Please Enter Valid VIN");
      return false;
    } else {
      setLoading(true);
      let body = {
        vin: state.vin,
      };
      addCar({
        body,
        dispatch,
        setLoading,
        setActiveStep,
        activeStep,
        setCarData,
        setState,
        state,
      });
      // setState("");
    }
  };
  const [addLoading, setAddLoading] = useState(false);

  const addCarInformation = () => {
    if (
      state.displacementL &&
      state.doors &&
      state.driveType4WD &&
      state.fuelType &&
      state.interiorMaterial &&
      state.make &&
      state.mileage &&
      state.model &&
      state.originOfCar &&
      state.period &&
      state.power &&
      state.price &&
      state.seats &&
      state.transmission &&
      state.trimLevel &&
      state.vatDeduction &&
      state.vehicleType &&
      state.vin
    ) {
      setAddLoading(true);
      let body = {
        displacementL: state.displacementL,
        doors: state.doors,
        driveType4WD: state.driveType4WD,
        fuelType: state.fuelType,
        interiorMaterial: state.interiorMaterial,
        makeId: state.make,
        odometer: state.mileage,
        modelId: state.model,
        manufacturedIn: state.originOfCar,
        periodId: state.period,
        power: state.power,
        price: parseInt(state.price),
        seats: state.seats,
        transmission: state.transmission,
        trimLevel: state.trimLevel,
        vatDeduction: state.vatDeduction,
        vehicleType: state.vehicleType,
        // vin: state.vin,
        id: carInfo && carInfo.id,
      };
      // toast.info("Completed Information");
      // addCar({ body, setLoading, dispatch, setCarData });
      vehicleController
        .addVehicle(body)
        .then((res) => {
          console.log(res);
          dispatch(setCarDetails({ ...res.data.data }));
          setAddLoading(false);
          handleNext();
        })
        .catch((err) => {
          let errMessage =
            (err.response && err.response.data.message) || err.message;
          toast.error(errMessage);
          setAddLoading(false);
        });
      // handleNext();
    } else {
      toast.error("Kindly fill out every field.");
    }
  };

  return (
    <div>
      <Container style={{ maxWidth: "1325px" }}>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <Box sx={{ display: "flex" }}>
              {/* <Card sx={{ flex: "3" }}> */}
              <Box sx={{ flex: "3" }}>
                <Box sx={{ p: 2 }}>
                  <Stack>
                    <Typography
                      sx={{ fontSize: 30, fontWeight: 600 }}
                      variant="h1"
                    >
                      Vehicle Specification{" "}
                    </Typography>
                    <Typography fontSize={12} textAlign={"justify"}>
                      {" "}
                      {/* You just need to enter VIN Number of your car and we will
                      automatically fetch detailed information about the vehicle
                      from the authority. You can{" "} */}
                      You only need to enter your car's VIN, and we'll
                      immediately retrieve comprehensive details on it from the
                      relevant authority. If any of the information in the
                      authority database is outdated or inaccurate, you{" "}
                      <span
                        style={{
                          fontStyle: "italic",
                          color: "#f15d17",
                          fontWeight: 600,
                        }}
                      >
                        may modify
                      </span>{" "}
                      {/* if any information is old or incorrect in authority
                      database. */}
                      them.
                    </Typography>
                  </Stack>
                </Box>
                <Divider sx={{ backgroundColor: "#000" }} />
                <Box sx={{ p: 2 }}>
                  <Stepper
                    sx={{
                      "& .MuiStepLabel-label": {
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: "uppercase",
                      },
                      "& .MuiStepIcon-root.Mui-active": {
                        color: "#000",
                      },
                      "& .MuiStepIcon-root.Mui-completed": {
                        color: "#000000",
                      },
                    }}
                    activeStep={activeStep}
                    orientation="vertical"
                  >
                    <Step active sx={{ mb: 2 }}>
                      <StepLabel>
                        Vehicle Vin{" "}
                        <small>(Vehicle Identification Number) </small>
                      </StepLabel>
                      <StepContent>
                        <Stack
                          direction="row"
                          alignItems={"center"}
                          spacing={5}
                          justifyContent={"space-between"}
                        >
                          <FormControl fullWidth>
                            <TextField
                              sx={loginTextField}
                              label="Vehicle VIN"
                              fullWidth
                              value={state.vin}
                              id="vin"
                              onChange={decodeVinHandler}
                              error={Boolean(error.vin)}
                              inputProps={{ maxLength: 17 }}
                              focused={Boolean(state.vin)}
                            />
                          </FormControl>
                          <Button
                            sx={{
                              border: "1px solid #000",
                              backgroundColor: "#000",
                              width: 150,
                              p: 2,
                              color: "#fff",
                              ":hover": {
                                color: "#fff",
                                backgroundColor: "#000",
                              },
                            }}
                            disabled={loading}
                            onClick={decodeVin}
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
                              "Load Vin"
                            )}
                          </Button>
                        </Stack>
                        <FormHelperText sx={{ fontSize: 12 }}>
                          Enter a VIN (Vehicle Identification Number) in English
                          alphanumeric format, typically 17 characters,
                          including both letters and numbers.
                        </FormHelperText>
                        {/* <Typography
                          variant="body2"
                          color={
                            state.vin.length > 17 ? "error" : "text.primary"
                          }
                        >
                          {state.vin.length}/17
                        </Typography> */}
                      </StepContent>
                    </Step>
                    <Step active sx={{ mb: 2 }}>
                      <StepLabel>Make and Model</StepLabel>
                      <StepContent>
                        <MakeStep
                          brand={brand}
                          model={modelData}
                          onBrandChange={brandChangeHandler}
                          onModelChange={modelChangeHandler}
                          vinData={vinData}
                          selectedBrand={selectedBrand}
                          selectedModel={selectedModel}
                          setSelectedBrand={setSelectedBrand}
                          setSelectedModel={setSelectedModel}
                          carData={carData}
                        />
                      </StepContent>
                    </Step>
                    <Step active sx={{ mb: 2 }}>
                      <StepLabel>Period and trimLevel</StepLabel>
                      <StepContent>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                          vinData={vinData}
                          carData={carData}
                        />
                      </StepContent>
                    </Step>
                    <Step active sx={{ mb: 2 }}>
                      <StepLabel>Transmission</StepLabel>
                      <StepContent>
                        {specification && specification.transmission && (
                          <Transmission
                            data={specification}
                            state={state}
                            setState={setState}
                          />
                        )}
                      </StepContent>
                    </Step>
                    <Step active sx={{ mb: 2 }}>
                      <StepLabel>Fuel</StepLabel>
                      <StepContent>
                        {specification && specification.fuel && (
                          <FuelStep
                            data={specification}
                            state={state}
                            setState={setState}
                          />
                        )}
                      </StepContent>
                    </Step>
                    <Step active sx={{ mb: 2 }}>
                      <StepLabel>Vehicle Type</StepLabel>
                      <StepContent>
                        {specification && specification.vehicleType && (
                          <VehicleTypeStep
                            data={specification}
                            state={state}
                            setState={setState}
                          />
                        )}
                      </StepContent>
                    </Step>
                    <Step active sx={{ mb: 2 }}>
                      <StepLabel>Doors</StepLabel>
                      <StepContent>
                        {specification && specification.doors && (
                          <Doors
                            data={specification}
                            state={state}
                            setState={setState}
                          />
                        )}
                      </StepContent>
                    </Step>
                    <Step active sx={{ mb: 2 }}>
                      <StepLabel>Drive Type 4x4</StepLabel>
                      <StepContent>
                        {specification && specification.driveType4WD && (
                          <DriveType
                            data={specification}
                            state={state}
                            setState={setState}
                          />
                        )}
                      </StepContent>
                    </Step>
                    <Step active sx={{ mb: 2 }}>
                      <StepLabel>Power and Engine displacementL</StepLabel>
                      <StepContent>
                        <Power state={state} setState={setState} />
                      </StepContent>
                    </Step>
                    <Step active>
                      <StepLabel>Seats</StepLabel>
                      <StepContent>
                        {specification && specification.seats && (
                          <Seats
                            state={state}
                            setState={setState}
                            data={specification}
                          />
                        )}
                      </StepContent>
                    </Step>
                    <Step active sx={{ mb: 2 }}>
                      <StepLabel>Mileage</StepLabel>
                      <StepContent>
                        <Mileage state={state} setState={setState} />
                      </StepContent>
                    </Step>
                    <Step active sx={{ mb: 2 }}>
                      <StepLabel>Interior Material</StepLabel>
                      <StepContent>
                        {specification && specification.interiorMaterial && (
                          <InteriorMaterial
                            data={specification}
                            state={state}
                            setState={setState}
                          />
                        )}
                      </StepContent>
                    </Step>
                    <Step active sx={{ mb: 2 }}>
                      <StepLabel>Possibility of VAT Deduction</StepLabel>
                      <StepContent>
                        {specification && specification.vatDeduction && (
                          <Vat
                            data={specification}
                            state={state}
                            setState={setState}
                          />
                        )}
                      </StepContent>
                    </Step>
                    <Step active sx={{ mb: 2 }}>
                      <StepLabel>Country of origin of the car</StepLabel>
                      <StepContent>
                        <Origin
                          state={state}
                          setState={setState}
                          carData={carData}
                        />
                      </StepContent>
                    </Step>
                    <Step active>
                      <StepLabel>Price</StepLabel>
                      <StepContent>
                        <Price state={state} setState={setState} />{" "}
                      </StepContent>
                    </Step>
                  </Stepper>
                </Box>
              </Box>
              {/* </Card> */}

              <Tick activeStep={activeStep} state={state} />
            </Box>
            <Box sx={{ p: 1, textAlign: "end" }}>
              <Button
                onClick={addCarInformation}
                sx={{
                  color: "#000",
                  border: "1px solid #000",
                  backgroundColor: "transparent",
                  width: 200,
                  p: 2,
                }}
              >
                {addLoading ? (
                  <Loading
                    type="bars"
                    width={30}
                    height={30}
                    className="m-auto"
                    color="#000"
                  />
                ) : (
                  "Continue"
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Step1;
