import { addSpecification, getCarInfo } from "@/api/apiCalling/vehicle";
import Button from "@/components/button";
import LinkTab from "@/components/linktab";
import SpecificationSteps from "@/components/specifications/specificationStep";
import { Card, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const Specifications = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const carInfo = useSelector((state) => state.CarInfo);
  const [state, setState] = useState({
    transmission: "",
    vehicleType: "",
    driveType4WD: "",
    doors: "",
    seats: "",
    interiorMaterial: "",
    vatDeduction: "",
    power: "",
    color: "",
    equipments: [],
    carId: carInfo.id,
  });
  const {
    transmission,
    vehicleType,
    driveType4WD,
    doors,
    seats,
    interiorMaterial,
    vatDeduction,
    power,
    color,
    equipments,
  } = state;
  const router = useRouter();
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

  const [loading, setLoading] = useState(false);
  const submitHandler = () => {
    // e.preventDefault();
    setLoading(true);
    if (
      transmission === "" ||
      vehicleType === "" ||
      driveType4WD === "" ||
      doors === "" ||
      seats === "" ||
      interiorMaterial === "" ||
      vatDeduction === "" ||
      power === "" ||
      color === "" ||
      equipments === ""
    ) {
      toast.error("Please Select All Fields*");
      setLoading(false);
      return false;
    } else {
      addSpecification({
        data: state,
        router,
        path: "/sell-cars/contact-information",
        setLoading,
      });
    }
  };

  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-9 ">
            <LinkTab />
            <Card className="p-3">
              {/* <form onSubmit={submitHandler}> */}
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
                  width={120}
                >
                  <span>Back</span>
                  <span>Back</span>
                </Button>
                <Button
                  className="custom_btn"
                  type="submit"
                  onClick={submitHandler}
                  width={120}
                >
                  {loading ? (
                    <Loading
                      type="bars"
                      width={20}
                      height={20}
                      color="blue"
                      className="m-auto"
                    />
                  ) : (
                    <React.Fragment>
                      <span>Continue</span>
                      <span>Continue</span>
                    </React.Fragment>
                  )}
                </Button>
              </Stack>
              {/* </form> */}
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
