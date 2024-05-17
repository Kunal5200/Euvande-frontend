import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Stepper, Step, StepLabel, Typography } from "@mui/material";
import { useRouter } from "next/router";

const LinkStepper = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [disableSteps, setDisableSteps] = useState(Array(10).fill(true));

  const steps = [
    { label: "Make", route: "/sell-cars/make" },
    { label: "Period", route: "/sell-cars/period" },
    { label: "Model", route: "/sell-cars/model" },
    { label: "Variant", route: "/sell-cars/variant" },
    { label: "Ownership", route: "/sell-cars/ownership" },
    { label: "Odometer", route: "/sell-cars/odometer" },
    { label: "Location", route: "/sell-cars/location" },
    { label: "Specifications", route: "/sell-cars/specifications" },
    { label: "Contact Information", route: "/sell-cars/contact-information" },
    { label: "Photos", route: "/sell-cars/upload-picture" },
  ];

  const carInfo = useSelector((state) => state.CarInfo);

  useEffect(() => {
    const newDisableSteps = [...disableSteps];
    if (carInfo) {
      steps.forEach((step, index) => {
        switch (step.label) {
          case "Make":
            newDisableSteps[index] = !carInfo.make;
            break;
          case "Period":
            newDisableSteps[index] = !carInfo.period;
            break;
          case "Model":
            newDisableSteps[index] = !carInfo.model;
            break;
          case "Variant":
            newDisableSteps[index] = !carInfo.variant;
            break;
          case "Ownership":
            newDisableSteps[index] = !carInfo.ownership;
            break;
          case "Odometer":
            newDisableSteps[index] = !carInfo.odometer;
            break;
          case "Location":
            newDisableSteps[index] =
              !carInfo.location || !carInfo.location.city;
            break;
          case "Specifications":
            newDisableSteps[index] = !carInfo.specification;
            break;
          case "Contact Information":
            newDisableSteps[index] = !carInfo.contactInfo;
            break;
          case "Photos":
            newDisableSteps[index] = false;
            break;
          default:
            break;
        }
      });
      setDisableSteps(newDisableSteps);
    }
  }, [carInfo, disableSteps, steps]);

  useEffect(() => {
    const path = router.pathname;
    const index = steps.findIndex((step) => step.route === path);
    if (index !== -1) {
      setActiveStep(index);
    }
  }, [router.pathname, steps]);

  const handleStep = (index) => {
    setActiveStep(index);
    router.push(steps[index].route);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index} disabled={disableSteps[index]}>
            <StepLabel
              onClick={() => !disableSteps[index] && handleStep(index)}
              style={{ cursor: !disableSteps[index] ? "pointer" : "default" }}
            >
              <Typography variant="caption">{step.label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default LinkStepper;
