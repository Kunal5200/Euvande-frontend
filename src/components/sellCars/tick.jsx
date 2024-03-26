import { Box, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import React from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
const Tick = ({ activeStep, state }) => {
  // console.log("activeStep", activeStep);

  // const steps = Object.keys(state).findIndex((key) => !state[key]);
  // console.log("steps",steps)
  return (
    <div>
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
            <Step active sx={{pt:4}}>
              <StepLabel
                StepIconComponent={(props) => {
                  const StepIcon =
                    state.vin.length > 16
                      ? CheckCircleRoundedIcon
                      : CancelRoundedIcon;
                  return (
                    <StepIcon
                      {...props}
                      sx={{
                        color: state.vin.length > 16 ? "green" : "red",
                      }}
                    />
                  );
                }}
              ></StepLabel>
              <StepContent></StepContent>
            </Step>
            <Step sx={{ pt: 10 }} active>
              <StepLabel
                StepIconComponent={(props) => {
                  const StepIcon =
                    state.make && state.model
                      ? CheckCircleRoundedIcon
                      : CancelRoundedIcon;

                  return (
                    <StepIcon
                      {...props}
                      sx={{
                        color: state.make && state.model ? "green" : "red",
                      }}
                    />
                  );
                }}
              ></StepLabel>
              <StepContent sx={{ display: "none" }}></StepContent>
            </Step>
            <Step sx={{ pt: 10 }} active>
              <StepLabel
                StepIconComponent={(props) => {
                  const StepIcon =
                    state.trimLevel && state.period
                      ? CheckCircleRoundedIcon
                      : CancelRoundedIcon;

                  return (
                    <StepIcon
                      {...props}
                      sx={{
                        color:
                          state.trimLevel && state.period ? "green" : "red",
                      }}
                    />
                  );
                }}
              ></StepLabel>
              <StepContent sx={{ display: "none" }}></StepContent>
            </Step>
            <Step sx={{ pt: 10 }} active>
              <StepLabel
                StepIconComponent={(props) => {
                  const StepIcon = state.transmission
                    ? CheckCircleRoundedIcon
                    : CancelRoundedIcon;

                  return (
                    <StepIcon
                      {...props}
                      sx={{
                        color: state.transmission ? "green" : "red",
                      }}
                    />
                  );
                }}
              ></StepLabel>
              <StepContent sx={{ display: "none" }}></StepContent>
            </Step>
            <Step sx={{ pt: 10 }} active>
              <StepLabel
                StepIconComponent={(props) => {
                  const StepIcon = state.fuelType
                    ? CheckCircleRoundedIcon
                    : CancelRoundedIcon;

                  return (
                    <StepIcon
                      {...props}
                      sx={{
                        color: state.fuelType ? "green" : "red",
                      }}
                    />
                  );
                }}
              ></StepLabel>
              <StepContent sx={{ display: "none" }}></StepContent>
            </Step>
            <Step sx={{ pt: 5 }} active>
              <StepLabel
                StepIconComponent={(props) => {
                  const StepIcon = state.vehicleType
                    ? CheckCircleRoundedIcon
                    : CancelRoundedIcon;

                  return (
                    <StepIcon
                      {...props}
                      sx={{
                        color: state.vehicleType ? "green" : "red",
                      }}
                    />
                  );
                }}
              ></StepLabel>
              <StepContent sx={{ display: "none" }}></StepContent>
            </Step>
            <Step sx={{ pt: 14 }} active>
              <StepLabel
                StepIconComponent={(props) => {
                  const StepIcon = state.doors
                    ? CheckCircleRoundedIcon
                    : CancelRoundedIcon;

                  return (
                    <StepIcon
                      {...props}
                      sx={{
                        color: state.doors ? "green" : "red",
                      }}
                    />
                  );
                }}
              ></StepLabel>
              <StepContent sx={{ display: "none" }}></StepContent>
            </Step>
            <Step active sx={{ pt: 5 }}>
              <StepLabel
                StepIconComponent={(props) => {
                  const StepIcon = state.driveType4WD
                    ? CheckCircleRoundedIcon
                    : CancelRoundedIcon;

                  return (
                    <StepIcon
                      {...props}
                      sx={{
                        color: state.driveType4WD ? "green" : "red",
                      }}
                    />
                  );
                }}
              ></StepLabel>
              <StepContent></StepContent>
            </Step>
            <Step active sx={{ pt: 8 }}>
              <StepLabel
                StepIconComponent={(props) => {
                  const StepIcon =
                    state.power && state.displacementL
                      ? CheckCircleRoundedIcon
                      : CancelRoundedIcon;

                  return (
                    <StepIcon
                      {...props}
                      sx={{
                        color:
                          state.power && state.displacementL ? "green" : "red",
                      }}
                    />
                  );
                }}
              ></StepLabel>
              <StepContent sx={{ display: "none" }}></StepContent>
            </Step>
            <Step active sx={{ pt: 14 }}>
              <StepLabel
                StepIconComponent={(props) => {
                  const StepIcon = state.seats
                    ? CheckCircleRoundedIcon
                    : CancelRoundedIcon;

                  return (
                    <StepIcon
                      {...props}
                      sx={{
                        color: state.seats ? "green" : "red",
                      }}
                    />
                  );
                }}
              ></StepLabel>
              <StepContent sx={{ display: "none" }}></StepContent>
            </Step>
            <Step active sx={{ pt: 5 }}>
              <StepLabel
                StepIconComponent={(props) => {
                  const StepIcon = state.mileage
                    ? CheckCircleRoundedIcon
                    : CancelRoundedIcon;

                  return (
                    <StepIcon
                      {...props}
                      sx={{
                        color: state.mileage ? "green" : "red",
                      }}
                    />
                  );
                }}
              ></StepLabel>
              <StepContent sx={{ display: "none" }}></StepContent>
            </Step>
            <Step active sx={{ pt: 10 }}>
              <StepLabel
                StepIconComponent={(props) => {
                  const StepIcon = state.interiorMaterial
                    ? CheckCircleRoundedIcon
                    : CancelRoundedIcon;

                  return (
                    <StepIcon
                      {...props}
                      sx={{
                        color: state.interiorMaterial ? "green" : "red",
                      }}
                    />
                  );
                }}
              ></StepLabel>
              <StepContent sx={{ display: "none" }}></StepContent>
            </Step>
            <Step sx={{ pt: 13 }} active>
              <StepLabel
                StepIconComponent={(props) => {
                  const StepIcon = state.vatDeduction
                    ? CheckCircleRoundedIcon
                    : CancelRoundedIcon;

                  return (
                    <StepIcon
                      {...props}
                      sx={{
                        color: state.vatDeduction ? "green" : "red",
                      }}
                    />
                  );
                }}
              ></StepLabel>
              <StepContent sx={{ display: "none" }}></StepContent>
            </Step>
            <Step sx={{ pt: 7 }} active>
              <StepLabel
                StepIconComponent={(props) => {
                  const StepIcon = state.originOfCar
                    ? CheckCircleRoundedIcon
                    : CancelRoundedIcon;
                  //
                  return (
                    <StepIcon
                      {...props}
                      sx={{
                        color: state.originOfCar ? "green" : "red",
                      }}
                    />
                  );
                }}
              ></StepLabel>
              <StepContent sx={{ display: "none" }}></StepContent>
            </Step>
            <Step sx={{ pt: 7 }} active>
              <StepLabel
                StepIconComponent={(props) => {
                  const StepIcon = state.price
                    ? CheckCircleRoundedIcon
                    : CancelRoundedIcon;
                  //
                  return (
                    <StepIcon
                      {...props}
                      sx={{
                        color: state.price ? "green" : "red",
                      }}
                    />
                  );
                }}
              ></StepLabel>
              <StepContent sx={{ display: "none" }}></StepContent>
            </Step>
          </Stepper>
        </Box>
      </Box>
    </div>
  );
};

export default Tick;
