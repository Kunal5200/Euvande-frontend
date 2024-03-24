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
const Step1 = ({ handleNext }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState({
    vin: "",
    make: "",
    model: "",
    periodYear: "",
    trim: "",
    transmission: "",
    fuel: "",
    vechicaltype: "",
    door: "",
    drivetype: "",
    powerengine: "",
    seat: "",
    mileage: "",
    interialmaterial: "",
    vatdeduction: "",
    originofcar: "",
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

    if (isVIN(value)) {
      setLoading(true);
      let body = {
        vin: value,
      };
      addCar({
        body,
        dispatch,
        setLoading,
        setActiveStep,
        activeStep,
        setCarData,
      });
    }
  };

  const [carData, setCarData] = useState(null);

  const [vinData, setVinData] = useState(null);

  useEffect(() => {
    getAllMakePublic({ setBrand });
  }, []);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
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

  const carInfo = useSelector((state) => state.CarInformation);
  useEffect(() => {
    if (carInfo) {
      setState({
        ...state,
        vin: carInfo.vin || "",
        make: carInfo && carInfo.make && carInfo.make.id,
        model: carInfo && carInfo.model && carInfo.model.id,
        periodYear: carInfo && carInfo.period && carInfo.period.id,
      });
    }
  }, [carInfo]);

  useEffect(() => {
    const fetchCarData = () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        getCarDetails({ carId, setCarData, setLoading, dispatch });
      }
    };
    fetchCarData();
  }, []);

  return (
    <div>
      <Container style={{ maxWidth: "1350px" }}>
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
                    <Typography fontSize={12} width={600} textAlign={"justify"}>
                      {" "}
                      By entering the VIN number of the car, the system will
                      automatically retrieve detailed information about the
                      vehicle, including make, model, year, engine type,
                      transmission, and more. This feature saves time and
                      ensures accurate data entry for vehicle specifications.
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
                    <Step active>
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

                          {/* <Avatar
                            sx={{
                              backgroundColor:
                                state.vin && isVIN(state.vin)
                                  ? "green"
                                  : "#ff0000",
                              // fontSize: 10,
                              width: 35,
                              height: 35,
                            }}
                          >
                            {state.vin && isVIN(state.vin) ? (
                              <Done sx={{ fontSize: 20 }} />
                            ) : (
                              <close />
                            )}
                          </Avatar> */}
                        </Stack>
                        <Typography
                          variant="body2"
                          color={
                            state.vin.length > 17 ? "error" : "text.primary"
                          }
                        >
                          {state.vin.length}/17
                        </Typography>
                      </StepContent>
                    </Step>
                    <Step active>
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
                        />
                        {/* <Grid container alignItems={"start"}>
                          <Grid item lg={11}>
                            {" "}
                            <MakeStep
                              brand={brand}
                              model={modelData}
                              onBrandChange={brandChangeHandler}
                              onModelChange={modelChangeHandler}
                              vinData={vinData}
                              selectedBrand={selectedBrand}
                              selectedModel={selectedModel}
                            />
                          </Grid>
                          <Grid
                            item
                            lg={1}
                            sx={{
                              display: "flex",
                              alignItems: "start",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Avatar
                              sx={{
                                backgroundColor:
                                  state.make && state.model
                                    ? "green"
                                    : "#ff0000",
                                // fontSize: 10,
                                width: 35,
                                height: 35,
                                mt:1
                              }}
                            >
                              {state.make && state.model ? (
                                <Done sx={{ fontSize: 20 }} />
                              ) : (
                                <Close />
                              )}
                            </Avatar>
                          </Grid>
                        </Grid> */}
                      </StepContent>
                    </Step>
                    <Step active>
                      <StepLabel>Period and Trim</StepLabel>
                      <StepContent>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                          vinData={vinData}
                          setCarData={setCarData}
                        />
                      </StepContent>
                    </Step>
                    <Step active>
                      <StepLabel>Transmission</StepLabel>
                      <StepContent>
                        <Transmission />
                      </StepContent>
                    </Step>
                    <Step active>
                      <StepLabel>Fuel</StepLabel>
                      <StepContent>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                        />
                      </StepContent>
                    </Step>
                    <Step active>
                      <StepLabel>Vehicle Type</StepLabel>
                      <StepContent>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                        />
                      </StepContent>
                    </Step>
                    <Step active>
                      <StepLabel>Doors</StepLabel>
                      <StepContent>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                        />
                      </StepContent>
                    </Step>
                    <Step active>
                      <StepLabel>Drive Type 4x4</StepLabel>
                      <StepContent>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                        />
                      </StepContent>
                    </Step>
                    <Step active>
                      <StepLabel>Power and Engine Displacement</StepLabel>
                      <StepContent>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                        />
                      </StepContent>
                    </Step>
                    <Step active>
                      <StepLabel>Seats</StepLabel>
                      <StepContent>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                        />
                      </StepContent>
                    </Step>
                    <Step active>
                      <StepLabel>Mileage</StepLabel>
                      <StepContent>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                        />
                      </StepContent>
                    </Step>
                    <Step active>
                      <StepLabel>Interior Material</StepLabel>
                      <StepContent>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                        />
                      </StepContent>
                    </Step>
                    <Step active>
                      <StepLabel>Possibility of VAT Deduction</StepLabel>
                      <StepContent>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                        />
                      </StepContent>
                    </Step>
                    <Step active>
                      <StepLabel>Country of origin of the car</StepLabel>
                      <StepContent>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                        />
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
                onClick={handleNext}
                sx={{
                  color: "#000",
                  border: "1px solid #000",
                  backgroundColor: "transparent",
                  width: 200,
                  p: 2,
                }}
              >
                Continue
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Step1;
