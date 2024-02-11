import data from "@/assests/data";
import {
  Grid,
  InputLabel,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import Doors from "./doors";
import DriveType from "./driveType";
import Seats from "./seats";
import Transmission from "./transmission";
import VehicleType from "./vehicleType";
import Interior from "./interior";
import Vatdeduction from "./vatDeduction";
import { useEffect, useState } from "react";
import { getSpecification } from "@/api/apiCalling/vehicle";
import { loginTextField } from "@/utils/styles";
import Button from "../button";
import Features from "./features";
import Equipment from "./equipment";
const SpecificationSteps = ({ setState, state, activeStep, setActiveStep }) => {
  const [specification, setSpecification] = useState(null);

  useEffect(() => {
    getSpecification(setSpecification);
  }, []);
  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step active={state.transmission}>
          <StepLabel>
            <h6 className="mb-0">Transmission</h6>
          </StepLabel>
          <StepContent>
            {specification && specification.transmission && (
              <Transmission
                data={specification.transmission}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                setState={setState}
                state={state}
              />
            )}
          </StepContent>
        </Step>
        <Step active={state.vehicleType}>
          <StepLabel>
            <h6 className="mb-0">Vehicle Type</h6>
          </StepLabel>
          <StepContent>
            {specification && specification.vehicleType && (
              <VehicleType
                data={specification.vehicleType}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
                setState={setState}
                state={state}
              />
            )}
          </StepContent>
        </Step>
        <Step active={state.doors}>
          <StepLabel>
            <h6 className="mb-0">Doors</h6>
          </StepLabel>
          {specification && specification.doors && (
            <StepContent>
              <Doors
                data={specification.doors}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
                setState={setState}
                state={state}
              />
            </StepContent>
          )}
        </Step>
        <Step active={state.driveType4WD}>
          <StepLabel>
            <h6 className="mb-0">Drive Type 4x4</h6>
          </StepLabel>
          {specification && specification.driveType4WD && (
            <StepContent>
              <DriveType
                data={specification.driveType4WD}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
                setState={setState}
                state={state}
              />
            </StepContent>
          )}
        </Step>
        <Step active={state.seats}>
          <StepLabel>
            <h6 className="mb-0">Seats</h6>
          </StepLabel>
          <StepContent>
            {specification && specification.seats && (
              <Seats
                data={specification.seats}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
                setState={setState}
                state={state}
              />
            )}
          </StepContent>
        </Step>
        <Step active={state.interiorMaterial}>
          <StepLabel>
            <h6 className="mb-0">Interior Material</h6>
          </StepLabel>
          <StepContent>
            {specification && specification.interiorMaterial && (
              <Interior
                data={specification.interiorMaterial}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
                setState={setState}
                state={state}
              />
            )}
          </StepContent>
        </Step>
        <Step active={state.vatDeduction}>
          <StepLabel>
            <h6 className="mb-0">POSSIBILITY OF VAT DEDUCTION</h6>
          </StepLabel>
          <StepContent>
            {specification && specification.vatDeduction && (
              <Vatdeduction
                data={specification.vatDeduction}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
                setState={setState}
                state={state}
              />
            )}
          </StepContent>
        </Step>
        <Step active={state.power && state.color}>
          <StepLabel>
            <h6 className="mb-0">Features</h6>
          </StepLabel>
          <StepContent>
            <Features
              setActiveStep={setActiveStep}
              activeStep={activeStep}
              setState={setState}
              state={state}
            />
          </StepContent>
        </Step>
        <Step active={state.equipments}>
          <StepLabel>
            <h6 className="mb-0">Equipment</h6>
          </StepLabel>
          <StepContent>
            {specification && specification.equipments && (
              <Equipment
                data={specification.equipments}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
                setState={setState}
                state={state}
              />
            )}
          </StepContent>
        </Step>
      </Stepper>
    </div>
  );
};

export default SpecificationSteps;
