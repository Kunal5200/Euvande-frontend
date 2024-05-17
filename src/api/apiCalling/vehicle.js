import { setVehicleInformation } from "@/redux/reducers/carInformation";
import { hideModal } from "@/redux/reducers/modal";
import { setCarDetails } from "@/redux/reducers/vehicleInformation";
import { toast } from "react-toastify";
import { vehicleController } from "../addVehicle";
import { listingController } from "../listing";
import { getCars, getSellerPendingCars } from "./listingApi";

export const addCar = ({
  body,
  router,
  path,
  dispatch,
  setLoading,
  setCarData,
  setEdit,
  setState,
  state,
  activeStep,
  setActiveStep,
  setShow,
}) => {
  vehicleController
    .addVehicle(body)
    .then((res) => {
      dispatch(setCarDetails({ ...res.data.data }));
      setLoading && setLoading(false);
      getCarDetails({
        setCarData,
        setLoading,
        carId: res.data.data.id,
        setState,
        state,
        dispatch,
      });
      setShow && setShow(true);
      setActiveStep(activeStep + 1);
      // smoothScrollToBottom();

      // // Smooth scroll to top after a brief delay
      // setTimeout(() => {
      //   smoothScrollToTop();
      // }, 1000);

      // smoothScrollTo(document.body.scrollHeight, 5000); // Adjust duration as needed

      // setTimeout(() => {
      //   smoothScrollTo(0, 2000); // Adjust duration as needed
      // }, 3000); // Adjust delay as needed
      localStorage.setItem("carId", res.data.data.id);
      router && path && router.push(path);
      setEdit && setEdit(false);
    })
    .catch((err) => {
      let errMessage = err.response ? err.response.data.message : err.message;
      toast.error(errMessage);
      setLoading && setLoading(false);
    });
};

export const getCarInfo = ({ data, dispatch }) => {
  vehicleController
    .getCarInfo(data)
    .then((res) => {
      //   console.log("carInfo", res.data.data);
      dispatch(setCarDetails({ ...res.data.data }));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addSpecification = ({ data, router, path, setLoading }) => {
  vehicleController
    .addSpecifications(data)
    .then((res) => {
      router.push(path);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};

export const getSpecification = (setSpecification) => {
  vehicleController
    .getSpecifications()
    .then((res) => {
      setSpecification(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const addImageUpload = ({ data, router, setLoading }) => {
  vehicleController
    .uploadPhotos(data)
    .then((res) => {
      setLoading(false);
      router.push("/sell-cars/car-details");
    })
    .catch((err) => {
      let errMessage = err.response ? err.response.data.message : err.message;
      toast.error(errMessage);
      setLoading(false);
    });
};

export const getCarDetails = ({
  carId,
  setCarData,
  setLoading,
  dispatch,
  setState,
  state,
}) => {
  vehicleController
    .getVehicleDetails(carId)
    .then((res) => {
      const response = res.data.data;
      setCarData(res.data.data);
      setLoading && setLoading(false);
      dispatch(setVehicleInformation({ ...res.data.data }));

      setState({
        ...state,
        vin: (response && response.vin) || "",
        make: (response && response.make && response.make.id) || "",
        model: (response && response.model && response.model.id) || "",
        period: (response && response.period && response.period.id) || "",
        trimLevel:
          (response &&
            response.specification &&
            response.specification.specificationDetails &&
            response.specification.specificationDetails.trimLevel) ||
          "",
        transmission:
          (response &&
            response.specification &&
            response.specification.transmission) ||
          "",
        fuelType:
          (response && response.variant && response.variant.fuelType) || "",
        vehicleType:
          (response &&
            response.specification &&
            response.specification.vehicleType) ||
          (response &&
            response.specification &&
            response.specification.specificationDetails &&
            response.specification.specificationDetails.bodyStyle) ||
          "",
        doors:
          (response &&
            response.specification &&
            response.specification.doors) ||
          "",
        driveType4WD:
          (response &&
            response.specification &&
            response.specification.driveType4WD) ||
          "",
        power:
          (response &&
            response.specification &&
            response.specification.power) ||
          "",
        displacementL:
          (response &&
            response.specification &&
            response.specification.specificationDetails &&
            response.specification.specificationDetails.displacementL) ||
          "",
        seats:
          (response &&
            response.specification &&
            response.specification.seats) ||
          "",
        mileage: (response && response.odometer) || "",
        interiorMaterial:
          (response &&
            response.specification &&
            response.specification.interiorMaterial) ||
          "",
        vatdeduction:
          (response &&
            response.specification &&
            response.specification.vatDeduction) ||
          "",
        originOfCar:
          (response &&
            response.specification &&
            response.specification.specificationDetails &&
            response.specification.specificationDetails.manufacturedIn) ||
          "",
        price: (response && response.price) || "",
      });
    })
    .catch((error) => {
      console.log(error);
      setLoading && setLoading(true);
    });
};

export const sendForApprovalCar = ({ carId, setLoading, router }) => {
  vehicleController
    .sendForApprovals(carId)
    .then((res) => {
      toast.success(res.data.message);
      localStorage.removeItem("carId");
      setLoading(false);
      router.push("/user-profile");
    })
    .catch((err) => {
      let errMessage =
        (err.response && err.response.data.message) ||
        err.message ||
        "Network Error";
      toast.error(errMessage);
      setLoading(false);
    });
};

export const removePendingCar = ({
  carId,
  dispatch,
  setData,
  setLoading,
  page,
  pageSize,
}) => {
  vehicleController
    .deletePendingCars(carId)
    .then((res) => {
      toast.success("Car removed Successfully");
      getSellerPendingCars({ setData, setLoading, page, pageSize });
      dispatch(hideModal());
      localStorage.removeItem("carId");
    })
    .catch((err) => {
      let errMessage =
        (err.response && err.response.data.message) || err.message;
      toast.error(errMessage);
    });
};

export const addCarsToFavorite = ({
  data,
  setCarData,
  setLoading,
  page,
  pageSize,
  user,
}) => {
  vehicleController
    .favoriteCars(data)
    .then((res) => {
      getCars({
        setCarData,
        loading: setLoading,
        page,
        pageSize,
        body: { userId: user.id },
      });
      setLoading(false);
    })
    .catch((err) => {
      let errMessage =
        (err.response && err.response.data.message) || err.message;
      toast.error(errMessage);
    });
};

export const getFavouriteCars = ({ setCarData, loading }) => {
  vehicleController
    .getFavoriteCars()
    .then((res) => {
      setCarData(res.data.data);
      loading(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getFuelType = ({ setFuelType, modelId }) => {
  vehicleController
    .getFuelType(modelId)
    .then((res) => {
      setFuelType(res.data.data.fuelType);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const vehicleMakeCount = ({ setMake }) => {
  listingController
    .getMakeCarsCount()
    .then((res) => {
      setMake(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllModels = ({ setAllModels, setLoading }) => {
  listingController
    .getAllModels()
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => {
      console.log("err", err);
    });
};
