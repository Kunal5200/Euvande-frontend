import { guestLogin } from "@/api/apiCalling/authenticationApi";
import data from "@/assests/data";
import Step1 from "@/components/sellCars/step1";
import Step2 from "@/components/sellCars/step2";
import Step3 from "@/components/sellCars/step3";
import ProgressStep from "@/components/stepper";
import styles from "@/styles/createDemand.module.css";
import { Container, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

const CreateDemand = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const stepsContent = [
    <Step1 handleNext={handleNext} handlePrev={handlePrev} />,
    <Step2 handleNext={handleNext} handlePrev={handlePrev} />,
    <Step3 handleNext={handleNext} handlePrev={handlePrev} />,
  ];

  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setFixed(window.pageYOffset > 50)
      );
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      guestLogin();
    }
  }, []);

  const phone = useMediaQuery("(max-width:600px)");

  return (
    <div>
      <div className={fixed ? styles.fixed_image : styles.image_bg}>
        <Container style={{ maxWidth: phone ? "" : "1320px" }}>
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
