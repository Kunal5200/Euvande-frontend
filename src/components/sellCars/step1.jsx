import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
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
import { Clear } from "@mui/icons-material";
import { toast } from "react-toastify";
import { vehicleController } from "@/api/addVehicle";
import { isVIN } from "@/utils/regex";
import { loginTextField } from "@/utils/styles";
import Loading from "react-loading";
import MakeStep from "./steps/makeStep";
import { getAllMakePublic, getModelByYear } from "@/api/apiCalling/listingApi";
import PeriodStep from "./steps/periodStep";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import demo from "@/cars/iconCar.jpg";
import { Done } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import ClearIcon from "@mui/icons-material/Clear";
import { addCar, getCarDetails } from "@/api/apiCalling/vehicle";
import { useDispatch, useSelector } from "react-redux";
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

  const [vinData, setVinData] = useState(null);
  const decodeVin = () => {
    setLoading(true);
    if (!isVIN(state.vin)) {
      toast.error("Please Enter a Valid VIN");
      setLoading(false);
      return;
    } else {
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
      });
      vehicleController
        .addVehicle(state.vin)
        .then((res) => {
          setVinData(res.data.data);
          setLoading(false);
          setActiveStep(activeStep + 1);
        })
        .catch((err) => {
          let errMessage =
            (err.response && err.response.data.message) || err.message;
          toast.error(errMessage);
          setActiveStep(activeStep + 1);
          setLoading(false);
        });
    }
  };
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

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const filledFields = Object.values(state).filter(Boolean).length;
    const totalFields = Object.keys(state).length;
    const calculatedProgress = (filledFields / totalFields) * 100;
    const roundedProgress = Math.floor(calculatedProgress);
    setProgress(roundedProgress);
  }, [state]);

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

      // localStorage.setItem("vinData", JSON.stringify(vinData));
    }
  }, [carInfo]);
  useEffect(() => {
    if (vinData && vinData.idsObj) {
      setIds(vinData.idsObj);
    }
  }, [vinData]);

  const selectMake = () => {
    if (state.make && state.model) {
      setActiveStep(activeStep + 1);
    } else {
      toast.error("Please Select Make and Model");
    }
  };
  useEffect(() => {
    const fetchCarData = () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        getCarDetails({ carId, setCarData, setLoading, dispatch });
      }
    };
    fetchCarData();
  }, []);


  // const StepIcon = state.vin.length>16 ? Done : Clear;
  //  const StepIcon1 = state.make && state.model && state.vin.length>16? Done : Clear;
  // const StepIcon2 = state.trim && state.model ? Done : Clear;

  return (
    <div>
      <Container style={{ maxWidth: "1350px" }}>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <Box sx={{ display: "flex" }}>
              <Card sx={{ flex: "3" }}>
                <Box sx={{ p: 2 }} >
                  <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                    Vehicle Specification
                  </Typography>
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
                        // backgroundColor: "transparent",
                      },
                      "& .MuiStepIcon-root.Mui-completed": {
                        color: "#008000",
                      },
                    }}
                    activeStep={activeStep}
                    orientation="vertical"
                  >
                    <Step>
                      <StepLabel>Vehicle Vin</StepLabel>
                      <StepContent>
                        <Stack
                          direction="row"
                          alignItems={"center"}
                          spacing={2}
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
                              InputProps={{
                                endAdornment: state.vin ? (
                                  <Done style={{ color: "green" }} />
                                ) : null,
                              }}
                            />
                          </FormControl>

                          <Button
                            sx={{
                              width: 250,
                              border: "1px solid #d7d7d7",
                              p: 2,
                              color: "#000",
                              ":hover": {
                                backgroundColor: "transparent",
                              },
                              marginBottom: error.vin ? "2rem" : "",
                            }}
                            onClick={decodeVin}
                          >
                            {loading ? (
                              <Loading
                                type="balls"
                                color="#000"
                                width={25}
                                height={25}
                                className="m-auto"
                              />
                            ) : (
                              "Load VIN"
                            )}
                          </Button>
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
                    <Step>
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
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={2}
                          mt={2}
                        >
                          <Button
                            sx={{ border: "1px solid #000", color: "#000" }}
                            onClick={selectMake}
                          >
                            Continue
                          </Button>
                          <Button
                            sx={{ border: "1px solid #000", color: "#000" }}
                            onClick={() => setActiveStep(activeStep - 1)}
                          >
                            Back
                          </Button>
                        </Stack>
                      </StepContent>
                    </Step>
                    <Step>
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
                    <Step>
                      <StepLabel>Transmission</StepLabel>
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
                    <Step>
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
                    <Step>
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
                    <Step>
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
                    <Step>
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
                    <Step>
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
                    <Step>
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
                    <Step>
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
                    <Step>
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
                    <Step>
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
                    <Step>
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
              </Card>

              <Box sx={{ flex: "1" }}>
                <Box sx={{ p: 13 }}>
                  <Stepper
                    sx={{
                      "& .MuiStepLabel-label": {
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: "uppercase",
                      },
                      "& .MuiStepIcon-root.Mui-active": {
                        color: "#ff0000",
                      },
                      "& .MuiStepIcon-root.Mui-completed": {
                        color: "#008000",
                      },
                    }}
                    activeStep={activeStep}
                    orientation="vertical"
                  >
                    <Step>
                      <StepLabel
                        StepIconComponent={(props) => {
                          const StepIcon =     
                          
                          state.vin.length > 16 ? CheckCircleRoundedIcon : CancelRoundedIcon;
                            // state.vin.length > 16 ? DoneIcon : ClearIcon;
                          return (
                            <StepIcon
                              {...props}
                              sx={{
                                color: state.vin.length > 16 ? "green" : "red",
                              }}
                            />
                          );
                        }}
                        // StepIconComponent={StepIcon}
                      ></StepLabel>
                      <StepContent >
                        <Stack
                          direction="row"
                          alignItems={"center"}
                          spacing={3}
                        >
                          <FormControl fullWidth>
                            <TextField
                              // sx={loginTextField}
                              // label="Vehicle VIN"
                              sx={{ display: "none" }}
                              // fullWidth
                              value={state.vin}
                              id="vin"
                              onChange={decodeVinHandler}
                              error={Boolean(error.vin)}
                              // inputProps={{ maxLength: 17 }}
                              focused={Boolean(state.vin)}
                            />
                          </FormControl>
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
                    <Step>
                      <StepLabel
                        StepIconComponent={(props) => {
                          const StepIcon =
                          state.vin.length > 16 && state.make && state.model ? CheckCircleRoundedIcon : CancelRoundedIcon;
                            // state.make && state.model && state.vin.length > 16
                            //   ? DoneIcon
                            //   : ClearIcon;
                          return (
                            <StepIcon
                              {...props}
                              sx={{
                                color:
                                  state.vin.length > 16 &&
                                  state.make &&
                                  state.model
                                    ? "green"
                                    : "red",
                              }}
                            />
                          );
                        }}
                        // StepIconComponent={StepIcon1}
                      ></StepLabel>
                      <StepContent sx={{ display: "none" }}>
                        <MakeStep
                          brand={brand}
                          model={modelData}
                          onBrandChange={brandChangeHandler}
                          onModelChange={modelChangeHandler}
                          vinData={vinData}
                          selectedBrand={selectedBrand}
                          selectedModel={selectedModel}
                          sx={{ display: "none" }}
                        />
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={2}
                          mt={2}
                        ></Stack>
                      </StepContent>
                    </Step>
                    <Step>
                      <StepLabel
                        StepIconComponent={(props) => {
                          const StepIcon =
                          state.trim &&
                            state.periodYear &&
                            state.vin.length > 16 ? CheckCircleRoundedIcon : CancelRoundedIcon;
                            // state.trim &&
                            // state.periodYear &&
                            // state.vin.length > 16
                            //   ? DoneIcon
                            //   : ClearIcon;
                          return (
                            <StepIcon
                              {...props}
                              sx={{
                                color:
                                  state.vin.length > 16 &&
                                  state.trim &&
                                  state.periodYear
                                    ? "green"
                                    : "red",
                              }}
                            />
                          );
                        }}
                        // StepIconComponent={StepIcon2}
                      ></StepLabel>
                      <StepContent sx={{ display: "none" }}>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                          vinData={vinData}
                          setCarData={setCarData}
                          sx={{ display: "none" }}
                        />
                      </StepContent>
                    </Step>
                    <Step>
                      <StepLabel
                        StepIconComponent={(props) => {
                          const StepIcon =
                          state.transmission && state.vin.length > 16 ? CheckCircleRoundedIcon :CancelRoundedIcon;
                            // state.transmission && state.vin.length > 16
                            //   ? DoneIcon
                            //   : ClearIcon;
                          return (
                            <StepIcon
                              {...props}
                              sx={{
                                color:
                                  state.vin.length > 16 && state.transmission
                                    ? "green"
                                    : "red",
                              }}
                            />
                          );
                        }}
                        // StepIconComponent={StepIcon2}
                      ></StepLabel>
                      <StepContent sx={{ display: "none" }}>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                          sx={{ display: "none" }}
                        />
                      </StepContent>
                    </Step>
                    <Step>
                      <StepLabel
                        StepIconComponent={(props) => {
                          const StepIcon =
                          state.fuel && state.vin.length > 16 ? CheckCircleRoundedIcon : CancelRoundedIcon;
                            // state.fuel && state.vin.length > 16
                            //   ? DoneIcon
                            //   : ClearIcon;
                          return (
                            <StepIcon
                              {...props}
                              sx={{
                                color:
                                  state.vin.length > 16 && state.fuel
                                    ? "green"
                                    : "red",
                              }}
                            />
                          );
                        }}
                        // StepIconComponent={StepIcon2}
                      ></StepLabel>
                      <StepContent sx={{ display: "none" }}>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                          sx={{ display: "none" }}
                        />
                      </StepContent>
                    </Step>
                    <Step>
                      <StepLabel
                        StepIconComponent={(props) => {
                          const StepIcon =
                          state.fuel && state.vin.length > 16 ? CheckCircleRoundedIcon : CancelRoundedIcon;
                            // state.fuel && state.vin.length > 16
                            //   ? DoneIcon
                            //   : ClearIcon;
                          return (
                            <StepIcon
                              {...props}
                              sx={{
                                color:
                                  state.vin.length > 16 && state.fuel
                                    ? "green"
                                    : "red",
                              }}
                            />
                          );
                        }}
                        // StepIconComponent={StepIcon2}
                      ></StepLabel>
                      <StepContent sx={{ display: "none" }}>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                          sx={{ display: "none" }}
                        />
                      </StepContent>
                    </Step>
                    <Step>
                      <StepLabel
                        StepIconComponent={(props) => {
                          const StepIcon =
                          state.fuel && state.vin.length > 16 ? CheckCircleRoundedIcon : CancelRoundedIcon;
                            // state.fuel && state.vin.length > 16
                            //   ? DoneIcon
                            //   : ClearIcon;
                          return (
                            <StepIcon
                              {...props}
                              sx={{
                                color:
                                  state.vin.length > 16 && state.fuel
                                    ? "green"
                                    : "red",
                              }}
                            />
                          );
                        }}
                        // StepIconComponent={StepIcon2}
                      ></StepLabel>
                      <StepContent sx={{ display: "none" }}>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                          sx={{ display: "none" }}
                        />
                      </StepContent>
                    </Step>
                    <Step>
                      <StepLabel
                        StepIconComponent={(props) => {
                          const StepIcon =
                          state.fuel && state.vin.length > 16 ? CheckCircleRoundedIcon : CancelRoundedIcon;
                            // state.fuel && state.vin.length > 16
                            //   ? DoneIcon
                            //   : ClearIcon;
                          return (
                            <StepIcon
                              {...props}
                              sx={{
                                color:
                                  state.vin.length > 16 && state.fuel
                                    ? "green"
                                    : "red",
                              }}
                            />
                          );
                        }}
                        // StepIconComponent={StepIcon2}
                      ></StepLabel>
                      <StepContent sx={{ display: "none" }}>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                          sx={{ display: "none" }}
                        />
                      </StepContent>
                    </Step>
                    <Step>
                      <StepLabel
                        StepIconComponent={(props) => {
                          const StepIcon =
                          state.fuel && state.vin.length > 16 ? CheckCircleRoundedIcon :CancelRoundedIcon;
                            // state.fuel && state.vin.length > 16
                            //   ? DoneIcon
                            //   : ClearIcon;
                          return (
                            <StepIcon
                              {...props}
                              sx={{
                                color:
                                  state.vin.length > 16 && state.fuel
                                    ? "green"
                                    : "red",
                              }}
                            />
                          );
                        }}
                        // StepIconComponent={StepIcon2}
                      ></StepLabel>
                      <StepContent sx={{ display: "none" }}>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                          sx={{ display: "none" }}
                        />
                      </StepContent>
                    </Step>
                    <Step>
                      <StepLabel
                        StepIconComponent={(props) => {
                          const StepIcon =
                          state.fuel && state.vin.length > 16 ? CheckCircleRoundedIcon :CancelRoundedIcon;
                            // state.fuel && state.vin.length > 16
                            //   ? DoneIcon
                            //   : ClearIcon;
                          return (
                            <StepIcon
                              {...props}
                              sx={{
                                color:
                                  state.vin.length > 16 && state.fuel
                                    ? "green"
                                    : "red",
                              }}
                            />
                          );
                        }}
                        // StepIconComponent={StepIcon2}
                      ></StepLabel>
                      <StepContent sx={{ display: "none" }}>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                          sx={{ display: "none" }}
                        />
                      </StepContent>
                    </Step>
                    <Step>
                      <StepLabel
                        StepIconComponent={(props) => {
                          const StepIcon =
                          state.fuel && state.vin.length > 16 ? CheckCircleRoundedIcon :CancelRoundedIcon;
                            // state.fuel && state.vin.length > 16
                            //   ? DoneIcon
                            //   : ClearIcon;
                          return (
                            <StepIcon
                              {...props}
                              sx={{
                                color:
                                  state.vin.length > 16 && state.fuel
                                    ? "green"
                                    : "red",
                              }}
                            />
                          );
                        }}
                        // StepIconComponent={StepIcon2}
                      ></StepLabel>
                      <StepContent sx={{ display: "none" }}>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                          sx={{ display: "none" }}
                        />
                      </StepContent>
                    </Step>
                    <Step>
                      <StepLabel
                        StepIconComponent={(props) => {
                          const StepIcon =
                          state.fuel && state.vin.length > 16 ? CheckCircleRoundedIcon : CancelRoundedIcon;
                            // state.fuel && state.vin.length > 16
                            //   ? DoneIcon
                            //   : ClearIcon;
                          return (
                            <StepIcon
                              {...props}
                              sx={{
                                color:
                                  state.vin.length > 16 && state.fuel
                                    ? "green"
                                    : "red",
                              }}
                            />
                          );
                        }}
                        // StepIconComponent={StepIcon2}
                      ></StepLabel>
                      <StepContent sx={{ display: "none" }}>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                          sx={{ display: "none" }}
                        />
                      </StepContent>
                    </Step>
                    <Step>
                      <StepLabel
                        StepIconComponent={(props) => {
                          const StepIcon =
                          state.fuel && state.vin.length > 16 ? CheckCircleRoundedIcon : CancelRoundedIcon;
                            // state.fuel && state.vin.length > 16
                            //   ? DoneIcon
                            //   : ClearIcon;
                          return (
                            <StepIcon
                              {...props}
                              sx={{
                                color:
                                  state.vin.length > 16 && state.fuel
                                    ? "green"
                                    : "red",
                              }}
                            />
                          );
                        }}
                        // StepIconComponent={StepIcon2}
                      ></StepLabel>
                      <StepContent sx={{ display: "none" }}>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                          sx={{ display: "none" }}
                        />
                      </StepContent>
                    </Step>
                    <Step>
                      <StepLabel
                        StepIconComponent={(props) => {
                          const StepIcon =
                          state.fuel && state.vin.length > 16 ? CheckCircleRoundedIcon : CancelRoundedIcon;
                            // state.fuel && state.vin.length > 16
                            //   ? DoneIcon
                            //   : ClearIcon;
                          return (
                            <StepIcon
                              {...props}
                              sx={{
                                color:
                                  state.vin.length > 16 && state.fuel
                                    ? "green"
                                    : "red",
                              }}
                            />
                          );
                        }}
                        // StepIconComponent={StepIcon2}
                      ></StepLabel>
                      <StepContent sx={{ display: "none" }}>
                        <PeriodStep
                          state={state}
                          setState={setState}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          ids={ids}
                          sx={{ display: "none" }}
                        />
                      </StepContent>
                    </Step>
                  </Stepper>
                </Box>

                {/* <CircularProgressbarWithChildren
                    value={progress}
                    circleRatio={0.75}
                    styles={buildStyles({
                      rotation: 1 / 2 + 1 / 8,
                      strokeLinecap: "butt",
                      trailColor: "#eee",
                      pathColor: "green",
                    })}
                    strokeWidth={10}
                  >
                   </CircularProgressbarWithChildren> */}
              </Box>
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
          {/* <Grid item lg={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 300,
              }}
            >
              <Box sx={{ width: 250 }}>
                <CircularProgressbarWithChildren
                  value={progress}
                  circleRatio={0.75}
                  styles={buildStyles({
                    rotation: 1 / 2 + 1 / 8,
                    strokeLinecap: "butt",
                    trailColor: "#eee",
                    pathColor: "#000",
                  })}
                  strokeWidth={10}
                >
                  <img
                    style={{ width: 100, marginTop: 100 }}
                    src={demo.src}
                    alt="demo"
                  />
                  <Typography sx={{ fontSize: 15 }}>
                    {`${progress}%`} completed
                  </Typography>
                </CircularProgressbarWithChildren>
                <Typography sx={{ fontSize: 12, textAlign: "center" }}>
                  You're doing great! Keep it up!
                </Typography>
              </Box>
            </Card>
            <Card sx={{ mt: 2, p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Done sx={{ fontSize: 12, mr: 1 }} />
                <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
                  Did You Know That?
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 12, textAlign: "justify" }}>
                Experience the thrill of uncovering up to 30% savings,
                translating to a staggering CZK 100,000 on average-priced
                vehicles. Don't miss out – visit our dealership today and unlock
                unbeatable deals!
              </Typography>
            </Card>
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
};

export default Step1;
