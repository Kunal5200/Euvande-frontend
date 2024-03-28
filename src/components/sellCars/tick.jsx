import { Box, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { isVIN } from "@/utils/regex";
const Tick = ({ activeStep, state, showStep }) => {
  const [failedStepIndex, setFailedStepIndex] = useState(-1);
  const [scrollToEnd, setScrollToEnd] = useState(true);
  const lastStepRef = useRef(null);
  const firstStepRef = useRef(null);
  const failedStepRef = useRef(null);

  useEffect(() => {
    // Check if any step has failed validation
    const failedStep = Object.keys(state).findIndex((key) => !state[key]);
    if (failedStep !== -1) {
      setFailedStepIndex(failedStep);
    }
  }, [state]);

  // useEffect(() => {
  //   // Scroll to the end of the content when the component mounts
  //   if (scrollToEnd && lastStepRef.current) {
  //     const containerHeight = lastStepRef.current.scrollHeight;
  //     lastStepRef.current.scrollTo({
  //       top: containerHeight,
  //       behavior: "smooth", // or "smooth" for smooth scrolling
  //     });
  //     setScrollToEnd(false);
  //   }
  // }, [scrollToEnd]);

  // useEffect(() => {
  //   // After a delay, smoothly scroll back to the first step
  //   const delay = 3000; // Adjust the delay as needed
  //   const timeout = setTimeout(() => {
  //     if (firstStepRef.current) {
  //       firstStepRef.current.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //     }
  //   }, delay);

  //   return () => clearTimeout(timeout);
  // }, []);
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
            <Step sx={{ pt: 4 }}>
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
            <Step
              // sx={{ pt: 10 }}
              // active={isVIN(state.vin) && state.make && state.model}
              ref={failedStepIndex === 1 ? failedStepRef : null}
              sx={{ pt: 10 }}
              active={showStep}
            >
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
            <Step
              // sx={{ pt: state.make && state.model ? 10 : 2 }}
              sx={{ pt: showStep ? 10 : 2 }}
              // active={state.make && state.model}
              active={showStep}
              ref={failedStepIndex === 2 ? failedStepRef : null}
            >
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
            <Step
              sx={{
                pt: showStep ? 12 : 3,
              }}
              active={showStep}
              // sx={{
              //   pt:
              //     (state.period && state.trimLevel) || state.transmission
              //       ? 10
              //       : 3,
              // }}
              // active={(state.period && state.trimLevel) || state.transmission}
              ref={failedStepIndex === 3 ? failedStepRef : null}
            >
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
            <Step
              sx={{
                pt: showStep ? 8 : 1,
              }}
              active={showStep}
              ref={failedStepIndex === 4 ? failedStepRef : null}

              // sx={{
              //   pt:
              //     state.transmission || state.fuel || isVIN(state.vin) ? 10 : 1,
              // }}
              // active={state.transmission || state.fuel || isVIN(state.vin)}
            >
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
            <Step
              // sx={{ pt: isVIN(state.vin) || state.vehicleType ? 5 : 2 }}
              // active={isVIN(state.vin) || state.vehicleType}
              sx={{ pt: showStep ? 12 : 2 }}
              active={showStep}
              ref={failedStepIndex === 5 ? failedStepRef : null}
            >
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
            <Step
              // sx={{ pt: isVIN(state.vin) || state.doors ? 14 : 2 }}
              // active={isVIN(state.vin) || state.doors}
              sx={{ pt: showStep ? 14 : 2 }}
              active={showStep}
              ref={failedStepIndex === 6 ? failedStepRef : null}
            >
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
            <Step
              active={showStep}
              sx={{ pt: showStep ? 4 : 2 }}
              ref={failedStepIndex === 7 ? failedStepRef : null}

              // active={isVIN(state.vin) || state.driveType4WD}
              // sx={{ pt: isVIN(state.vin) || state.driveType4WD ? 5 : 2 }}
            >
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
            <Step
              active={showStep}
              sx={{
                pt: showStep ? 8 : 2,
              }}
              ref={failedStepIndex === 8 ? failedStepRef : null}

              // active={isVIN(state.vin) || state.displacementL || state.power}
              // sx={{
              //   pt:
              //     isVIN(state.vin) || state.displacementL || state.power
              //       ? 8
              //       : 2,
              // }}
            >
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
            <Step
              // active={isVIN(state.vin) || state.seats}
              // sx={{ pt: isVIN(state.vin) || state.seats ? 14 : 2 }}
              active={showStep}
              sx={{ pt: showStep ? 14 : 2 }}
              ref={failedStepIndex === 9 ? failedStepRef : null}
            >
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
            <Step
              // active={isVIN(state.vin) || state.mileage}
              // sx={{ pt: isVIN(state.vin) || state.mileage ? 5 : 1 }}
              active={showStep}
              sx={{ pt: showStep ? 5 : 1 }}
              ref={failedStepIndex === 10 ? failedStepRef : null}
            >
              <StepLabel
                StepIconComponent={(props) => {
                  const StepIcon =
                    state.mileage && state.ownership
                      ? CheckCircleRoundedIcon
                      : CancelRoundedIcon;

                  return (
                    <StepIcon
                      {...props}
                      sx={{
                        color:
                          state.mileage && state.ownership ? "green" : "red",
                      }}
                    />
                  );
                }}
              ></StepLabel>
              <StepContent sx={{ display: "none" }}></StepContent>
            </Step>
            <Step
              active={showStep}
              sx={{ pt: showStep ? 10 : 2 }}
              ref={failedStepIndex === 11 ? failedStepRef : null}

              // active={isVIN(state.vin) || state.interiorMaterial}
              // sx={{ pt: isVIN(state.vin) || state.interiorMaterial ? 10 : 2 }}
            >
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
            <Step
              // sx={{ pt: isVIN(state.vin) || state.vatDeduction ? 13 : 2 }}
              // active={isVIN(state.vin) || state.vatDeduction}
              sx={{ pt: showStep ? 13 : 2 }}
              active={showStep}
              ref={failedStepIndex === 12 ? failedStepRef : null}
            >
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
            <Step
              sx={{ pt: showStep ? 7 : 2 }}
              active={showStep}
              ref={failedStepIndex === 13 ? failedStepRef : null}

              // sx={{ pt: isVIN(state.vin) || state.originOfCar ? 7 : 2 }}
              // active={isVIN(state.vin) || state.originOfCar}
            >
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
            <Step
              sx={{ pt: showStep ? 10 : 2 }}
              active={showStep}
              ref={failedStepIndex === 14 ? failedStepRef : null}

              // sx={{ pt: isVIN(state.vin) || state.price ? 10 : 2 }}
              // active={isVIN(state.vin) || state.price}
            >
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
