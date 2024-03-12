import data from "@/assests/data";
import Button from "@/components/button";
import ProgressStep from "@/components/stepper";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "@/styles/createDemand.module.css";
import Step1 from "@/components/sellCars/step1";

const CreateDemand = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const stepsContent = [
    <Step1 />,
    <Box>
      <Typography>Hey</Typography>
      <Button onClick={handleNext}>Next</Button>
    </Box>,
    // Add more steps content as needed
  ];

  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setFixed(window.pageYOffset > 50)
      );
    }
  }, []);

  return (
    <div>
      <div className={fixed ? styles.fixed_image : styles.image_bg}>
        <Container style={{ maxWidth: "1300px" }}>
          <ProgressStep
            data={data.carModifySteps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            fixed={fixed}
          />
        </Container>
      </div>

      {stepsContent[activeStep]}
    </div>
  );
};

export default CreateDemand;
