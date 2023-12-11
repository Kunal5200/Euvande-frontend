import data from "@/assests/data";
import { Step, StepContent, StepLabel, Stepper } from "@mui/material";
import Doors from "./doors";
import DriveType from "./driveType";
import Seats from "./seats";
import Transmission from "./transmission";
import VehicleType from "./vehicleType";
import Interior from "./interior";
import Vatdeduction from "./vatDeduction";
const SpecificationSteps = ({ setState, state, activeStep, setActiveStep }) => {
  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>
            <h6 className="mb-0">Transmission</h6>
          </StepLabel>
          <StepContent>
            <Transmission
              data={data.transmissionType}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              setState={setState}
              state={state}
            />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <h6 className="mb-0">Vehicle Type</h6>
          </StepLabel>
          <StepContent>
            <VehicleType
              data={data.vehicleType}
              setActiveStep={setActiveStep}
              activeStep={activeStep}
              setState={setState}
              state={state}
            />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <h6 className="mb-0">Doors</h6>
          </StepLabel>
          <StepContent>
            <Doors
              data={data.doors}
              setActiveStep={setActiveStep}
              activeStep={activeStep}
              setState={setState}
              state={state}
            />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <h6 className="mb-0">Drive Type 4x4</h6>
          </StepLabel>
          <StepContent>
            <DriveType
              setActiveStep={setActiveStep}
              activeStep={activeStep}
              setState={setState}
              state={state}
            />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <h6 className="mb-0">Seats</h6>
          </StepLabel>
          <StepContent>
            <Seats
              setActiveStep={setActiveStep}
              activeStep={activeStep}
              setState={setState}
              state={state}
            />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <h6 className="mb-0">Interior Material</h6>
          </StepLabel>
          <StepContent>
            <Interior
              data={data.interior}
              setActiveStep={setActiveStep}
              activeStep={activeStep}
              setState={setState}
              state={state}
            />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <h6 className="mb-0">POSSIBILITY OF VAT DEDUCTION</h6>
          </StepLabel>
          <StepContent>
            <Vatdeduction
              setActiveStep={setActiveStep}
              activeStep={activeStep}
              setState={setState}
              state={state}
            />
          </StepContent>
        </Step>
      </Stepper>
    </div>
  );
};

export default SpecificationSteps;
