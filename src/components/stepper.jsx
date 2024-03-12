import { Step, StepLabel, Stepper } from "@mui/material";

const ProgressStep = (props) => {
  const handleStepClick = (stepIndex) => {
    if (props.activeStep === 0) return;

    if (stepIndex <= props.activeStep) {
      props.setActiveStep(stepIndex);
    }
  };

  return (
    <div>
      <Stepper
        activeStep={props.activeStep}
        sx={{
          pt: props.fixed ? 4 : 2,
          "& .MuiStepIcon-root.Mui-active": {
            color: "green",
          },
          "& .MuiStepLabel-label.Mui-active": {
            color: "green",
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "#000",
          },
          "& .MuiStepConnector-horizontal.Mui-active": {
            "& .MuiStepConnector-line": {
              borderColor: "green",
            },
          },
          "& .MuiStepConnector-horizontal.Mui-completed": {
            "& .MuiStepConnector-line": {
              borderColor: "#000",
            },
          },
        }}
      >
        {props.data.map((val, i) => (
          <Step key={i} onClick={() => handleStepClick(i)}>
            <StepLabel>{val.name}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default ProgressStep;
