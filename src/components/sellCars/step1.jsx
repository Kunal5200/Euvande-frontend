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
import { toast } from "react-toastify";
import { vehicleController } from "@/api/addVehicle";
import { isVIN } from "@/utils/regex";
import { loginTextField } from "@/utils/styles";
import Loading from "react-loading";
import MakeStep from "./steps/makeStep";
import { getAllMakePublic, getModelByYear } from "@/api/apiCalling/listingApi";

const Step1 = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState({
    vin: "",
    make: "",
    model: "",
    periodYear: "",
    trim: "",
  });
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

  const [vinData, setVinData] = useState(null);
  const decodeVin = () => {
    if (!isVIN(state.vin)) {
      toast.error("Please Enter a Valid VIN");
      return;
    } else {
      setLoading(true);
      vehicleController
        .decodeVIN(state.vin)
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

  console.log(selectedBrand);
  console.log(vinData);
  console.log("modelData", modelData);

  return (
    <div>
      <Container style={{ maxWidth: "1350px" }}>
        <Grid container>
          <Grid item lg={8}>
            <Card>
              <Box sx={{ p: 2 }}>
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
                    },
                  }}
                  activeStep={activeStep}
                  orientation="vertical"
                >
                  <Step>
                    <StepLabel>Vehicle VIN</StepLabel>
                    <StepContent>
                      <Stack direction="row" alignItems={"center"} spacing={2}>
                        <FormControl fullWidth>
                          <TextField
                            sx={loginTextField}
                            label="Vehicle VIN"
                            fullWidth
                            id="vin"
                            onChange={decodeVinHandler}
                            error={Boolean(error.vin)}
                            inputProps={{ maxLength: 17 }}
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
                        color={state.vin.length > 17 ? "error" : "text.primary"}
                      >
                        {state.vin.length}/17
                      </Typography>
                    </StepContent>
                  </Step>
                  <Step>
                    <StepLabel>Make</StepLabel>
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
                    </StepContent>
                  </Step>
                </Stepper>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Step1;
