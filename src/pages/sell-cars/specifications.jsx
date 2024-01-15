import { addSpecification, getCarInfo } from "@/api/apiCalling/vehicle";
import Button from "@/components/button";
import LinkTab from "@/components/linktab";
import SpecificationSteps from "@/components/specifications/specificationStep";
import { Card, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const Specifications = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const carInfo = useSelector((state) => state.CarInfo);

  const [state, setState] = useState({
    transmission: "",
    vehicleType: "",
    driveType: "",
    doors: "",
    seats: "",
    interiorMaterial: "",
    vatDeduction: "",
    carId: carInfo.id,
  });
  const {
    transmission,
    vehicleType,
    driveType,
    doors,
    seats,
    interiorMaterial,
    vatDeduction,
  } = state;
  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      transmission === "" ||
      vehicleType === "" ||
      driveType === "" ||
      doors === "" ||
      seats === "" ||
      interiorMaterial === "" ||
      vatDeduction === ""
    ) {
      toast.error("Please Select All Fields*");
      return false;
    } else {
      addSpecification({
        data: state,
        router,
        path: "/sell-cars/contact-information",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        await getCarInfo({ data: carId, dispatch });
      } else {
        return () => {};
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-9 ">
            <LinkTab />
            <Card className="p-3">
              <form onSubmit={submitHandler}>
                <SpecificationSteps
                  setState={setState}
                  state={state}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
                <Stack direction="row" spacing={2} className="my-3">
                  <Button
                    className="custom_btn"
                    type="button"
                    onClick={() => setActiveStep(activeStep - 1)}
                    disabled={activeStep === 0}
                  >
                    <span>Back</span>
                    <span>Back</span>
                  </Button>
                  <Button className="custom_btn" type="submit">
                    <span>Continue</span>
                    <span>Continue</span>
                  </Button>
                </Stack>
              </form>
            </Card>
          </div>
          <div className="col-sm-3">
            <Card>Hello</Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specifications;
